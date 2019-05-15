from app.api import api
from app.models import Item, Subject, Business
from app.utils.response_code import RET
from app.utils.commons import get_data_from_redis,sort_subject_by_click,sort_item_by_click
from flask import request, jsonify, current_app
from business_calendar import Calendar
from datetime import datetime, timedelta
from app.constants import TIME_STEP_LIST,AGE_STEP_LIST
from app import redis_store
from sqlalchemy import and_, or_


@api.route('/dataAnalysis', methods=['POST'])
def data_analysis():
    req_dict = request.get_json()
    addr = req_dict.get("work_addr")
    print("++++数据分析++++",addr)
    if not addr:
        return jsonify(errno=RET.PARAMERR, errmsg='缺少地址')
    # 获取今天三周几
    current_day = datetime(datetime.now().year,datetime.now().month,datetime.now().day,0,0)
    weekday = int(datetime.now().strftime("%w"))
    weekday = 7 if weekday==0 else weekday
    this_date_list = list()
    last_date_list = list()
    this_week_data_list = list()
    last_week_data_list = list()
    for i in range(1,8):
        this_date_list.append(current_day-timedelta(weekday-i))
        last_date_list.append(current_day-timedelta(weekday-i+7))
    # 从数据库拿出主题和事项
    try:
        subjects = Subject.query.all()
        items = Item.query.all()
        # 获取本周人流量
        for i in this_date_list:
            obj = Business.query.filter(Business.create_time.between(i,i+timedelta(1))).all()
            this_week_data_list.append(len(obj))
        # 获取上周人流量
        for i in last_date_list:
            obj = Business.query.filter(Business.create_time.between(i,i+timedelta(1))).all()
            last_week_data_list.append(len(obj))
        # 获取总人流量和周天平均值
        daliy_datas = Business.query.all()
        week_avg_data_list = [0 for i in range(7)]
        for i in daliy_datas:
            week_avg_data_list[(int(i.create_time.strftime("%w"))-1)]+=1
        week_avg_data_list = list(map(lambda x:int(x/len(daliy_datas)*7) if len(daliy_datas) else 0,week_avg_data_list))
        # 获取上周时间段人流量
        last_week_time_step_list = [0 for i in TIME_STEP_LIST]
        for i in last_date_list:
            for j in TIME_STEP_LIST:
                start_search_time = datetime(i.year,i.month,i.day,j%24,0)
                end_search_time = datetime(i.year,i.month,i.day,(j+1)%24,0)
                ret = Business.query.filter(Business.create_time.between(start_search_time,end_search_time)).all()
                last_week_time_step_list[TIME_STEP_LIST.index(j)]+=len(ret)
        # 获取时间段平均值
        avg_time_step_data = [0 for i in TIME_STEP_LIST]
        for i in daliy_datas:
            for j in TIME_STEP_LIST:
                if i.create_time.hour==j:
                    avg_time_step_data[TIME_STEP_LIST.index(j)]+=1
                    break
        avg_time_step_data = list(map(lambda x:int(x/len(daliy_datas)*7) if len(daliy_datas) else 0,avg_time_step_data))
        # 获取当天时间段
        time_step_list = [0 for i in TIME_STEP_LIST]
        for i in daliy_datas:
            for j in TIME_STEP_LIST:
                if i.create_time.hour==j and i.create_time.strftime("%Y%m%d")==datetime.now().strftime("%Y%m%d"):
                    time_step_list[TIME_STEP_LIST.index(j)]+=1
                    break
        # 获取上周各主题取号量
        last_week_subject_click = [0 for i in subjects]
        subjects_name_list_for_search = [subject.name for subject in subjects]
        for i in subjects_name_list_for_search:
            for j in last_date_list:
                ret = Business.query.filter(Business.addr==addr,Business.subject==i,Business.create_time.between(j,j+timedelta(1))).all()
                last_week_subject_click[subjects_name_list_for_search.index(i)]+=len(ret)       
        # 获取本周各主题取号量
        this_week_subject_click = [0 for i in subjects]
        for i in subjects_name_list_for_search:
            for j in this_date_list:
                ret = Business.query.filter(Business.addr==addr,Business.subject==i,Business.create_time.between(j,j+timedelta(1))).all()
                this_week_subject_click[subjects_name_list_for_search.index(i)]+=len(ret)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    # 从缓存拿出所需数据
    try:
        # 获取历史取号总量，当天取号总量，当天叫号总量，当天接件通过总量，当天转号总量，当天等待总时间，历史省内外比例，历史年龄分段情况
        today_daliy_datas = Business.query.filter(Business.create_time.between(current_day,current_day+timedelta(1))).all()
        history_total = len(daliy_datas)
        total_number = len(today_daliy_datas)
        # 计算省内数量并统计年龄段
        province = 0
        age_step_list = [0 for i in range(10)]
        for i in daliy_datas:
            province += int(i.idno[:2]=='51')
            age_step_list[int(i.idno[8])] += 1
        # 叫号，接件，转号，等待
        total_call,total_deal,total_move,total_wait_seconds = 0,0,0,0
        for i in today_daliy_datas:
            if i.current_user:
                total_call += 1
            if i.current_process != "接件":
                total_deal += 1
            if i.move_times:
                total_move += i.move_times
            if i.wait_seconds:
                total_wait_seconds += i.wait_seconds
        # 年龄分段情况
        age_step_dict_list = list()
        for index,i in enumerate(age_step_list):
            if i:
                age_step_dict_list.append({"value":i,"name":str(index)+"0后"})
            elif len(age_step_dict_list)==0 and index==len(age_step_list)-1:
                age_step_dict_list.append({"value":i,"name":str(index)+"0后"})
        # 当前等待总人数
        total_wait = 0
        for sub in subjects:
            total_wait += redis_store.llen(addr + sub.name)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
    # 当天情况，时间段，男女，省内外，年龄段，主题五，事项五，主题，周数据
    today_data_dict = dict()
    today_province_data_list = list()
    theme_dict_list = list()
    area_dict_list = list()
    today_data_dict.__setitem__("Total",history_total)
    today_data_dict.__setitem__("pickNum",total_number)
    today_data_dict.__setitem__("waitNum",total_wait)
    today_data_dict.__setitem__("didBNum",total_deal)
    today_data_dict.__setitem__("moveNum",total_move)
    today_data_dict.__setitem__("waitTime",str(int(total_wait_seconds/total_call/60) if total_call else 0)+"min")
    today_province_data_list.append({"value":province,"name":"省内"})
    today_province_data_list.append({"value":history_total-province,"name":"省外"})
    # 主题值，服务区值
    area_list = list()
    sub_name_list = list()
    area_and_sub_list = list()
    area_dict = dict()
    sub_name_dict = dict()
    for i in subjects:
        sub_name_list.append(i.name)
        sub_name_dict[i.name] = 0
        if i.area not in area_list:
            area_list.append(i.area)
            area_dict[i.area] = 0
    for i in today_daliy_datas:
        for j in subjects:
            if i.subject == j.name:
                sub_name_dict[j.name] += 1
                area_dict[j.area] += 1
                break
    for index,i in enumerate(area_list):
        if area_dict[i]:
            area_dict_list.append({"value":area_dict[i],"name":i})
            area_and_sub_list.append(i)
        elif len(area_dict_list)==0 and index==len(area_list)-1:
            area_dict_list.append({"value":area_dict[i],"name":i})
            area_and_sub_list.append(i)
    for index,i in enumerate(sub_name_list):
        if sub_name_dict[i]:
            theme_dict_list.append({"value":sub_name_dict[i],"name":i})
            area_and_sub_list.append(i)
        elif len(theme_dict_list)==0 and index==len(sub_name_list)-1:
            theme_dict_list.append({"value":sub_name_dict[i],"name":i})
            area_and_sub_list.append(i)
    theme_dict = dict()
    theme_dict.__setitem__("rAxis",area_and_sub_list)
    theme_dict.__setitem__("data1",area_dict_list)
    theme_dict.__setitem__("data2",theme_dict_list)
    item_click_list = list()
    for i in items:
        ret = Business.query.filter(and_(Business.create_time.between(current_day,current_day+timedelta(1)),Business.item==i.name,Business.current_process!="接件")).all()
        item_click_list.append((len(ret),i.name))
    item_click_list.sort(reverse=True)
    item_click_dict_list = list()
    item_click_total = 0
    for k,v in item_click_list:
        item_click_dict_list.append({"matter":v,"peoperNum":k})
        item_click_total += k
    for i in item_click_dict_list:
        i.__setitem__("per","%.2f%%"%(i["peoperNum"]/item_click_total*100 if item_click_total else 0))
    matterTop5_dict = dict()
    matterTop5_dict.__setitem__("data",item_click_dict_list[:15])
    # 返回结果
    return jsonify(errno=RET.OK, errmsg="成功", data={"realData":today_data_dict,
                                                    "pieSeriesData2":today_province_data_list,
                                                    "pieSeriesData":age_step_dict_list,
                                                    "matterTop5":matterTop5_dict,
                                                    "theme":theme_dict,
"perWeek":{"legend":['上周人流量','本周人流量','平均值'],
        "xAxis": ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        "yAxis1":{
            "name": '上周人流量',
            "data": last_week_data_list
        },
        "yAxis2":{
            "name": '本周人流量',
            "data": this_week_data_list
        },
        "yAxis3":{
            "name": '平均值',
            "data": week_avg_data_list
        }},
"timeSlot":{
        "legend":['上周时间段人流量','当天时间段人流量','平均值'],
        "xAxis": ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14;00-15:00','15:00-16:00','16:00-17:00','17:00-18:00'],
        "yAxis1":{
            "name": '上周时间段人流量',
            "data":last_week_time_step_list
        },
        "yAxis2":{
            "name": '当天时间段人流量',
            "data": time_step_list 
        },
        "yAxis3":{
            "name": '平均值',
            "data":avg_time_step_data
        },
    },
"preTheme":{
        "legend":['上周主题','本周主题'],
        "xAxis": subjects_name_list_for_search,
        "yAxis1":{
            "name": '上周主题',
            "data":last_week_subject_click
        },
        "yAxis2":{
            "name": '本周主题',
            "data":this_week_subject_click
        },
    },})
