from app.api import api
from app.models import Item, Subject, DaliyData
from app.utils.response_code import RET
from app.utils.commons import get_data_from_redis,sort_subject_by_click,sort_item_by_click
from flask import request, jsonify, current_app
from business_calendar import Calendar
from datetime import datetime, timedelta
from app.constants import TIME_STEP_LIST,AGE_STEP_LIST
from app import redis_store


@api.route('/dataAnalysis', methods=['POST'])
def data_analysis():
    addr = request.cookies.get("addr")
    addr = "新津县"
    if not addr:
        return jsonify(errno=RET.PARAMERR,errmsg="缺少地址")
    # 获取今天三周几
    weekday = datetime.now().strftime("%w")
    date_list = list()
    week_data_list = list()
    if weekday == '1':
        pass
        # 只查询今天的其余的都为0
        # 日期列表
        date_list.append(datetime.now().strftime("%Y-%m-%d"))
    elif weekday == '2':
        pass
        # 查询今天和昨天的，其余的都为0
        date_list.append((datetime.today() + timedelta(-1)).strftime("%Y-%m-%d"))
        date_list.append(datetime.now().strftime("%Y-%m-%d"))
    elif weekday == '3':
        pass
        # 查询今天、昨天、前天，其余的都为0
        date_list.append((datetime.today() + timedelta(-2)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-1)).strftime("%Y-%m-%d"))
        date_list.append(datetime.now().strftime("%Y-%m-%d"))
    elif weekday == '4':
        pass
        date_list.append((datetime.today() + timedelta(-3)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-2)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-1)).strftime("%Y-%m-%d"))
        date_list.append(datetime.now().strftime("%Y-%m-%d"))
    elif weekday == '5':
        pass
        date_list.append((datetime.today() + timedelta(-4)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-3)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-2)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-1)).strftime("%Y-%m-%d"))
        date_list.append(datetime.now().strftime("%Y-%m-%d"))
    elif weekday == '6':
        pass
        date_list.append((datetime.today() + timedelta(-5)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-4)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-3)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-2)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-1)).strftime("%Y-%m-%d"))
        date_list.append(datetime.now().strftime("%Y-%m-%d"))
    elif weekday == '0':
        pass
        date_list.append((datetime.today() + timedelta(-6)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-5)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-4)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-3)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-2)).strftime("%Y-%m-%d"))
        date_list.append((datetime.today() + timedelta(-1)).strftime("%Y-%m-%d"))
        date_list.append(datetime.now().strftime("%Y-%m-%d"))
    print("date_list-----------------------",date_list)
    # 从数据库拿出主题和事项
    try:
        subjects = Subject.query.all()
        subjects = sort_subject_by_click(subjects, addr)
        items = Item.query.all()
        items = sort_item_by_click(items, addr)
        for i in date_list:
            obj = DaliyData.query.filter_by(addr=addr,date=i).first()
            if obj:
                week_data_list.append(obj.total_number)
            else:
                week_data_list.append(0)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    if not all([subjects,items]):
        return jsonify(errno=RET.NODATA, errmsg="无数据")
    # 从缓存拿出所需数据
    try:
        # 当天取号总量
        total_number = int(get_data_from_redis(redis_store.get(addr+"total_number")).decode())
        # 时间段取号情况
        time_step_list = [int(get_data_from_redis(redis_store.get(addr+"time_step"+str(i).rjust(2,'0')+"0000")).decode()) for i in TIME_STEP_LIST]
        # 男女比列
        sex = int(get_data_from_redis(redis_store.get(addr+"sex_man_and_woman")).decode())
        # 省内外比列
        province = int(get_data_from_redis(redis_store.get(addr+"province_in_and_out")).decode())
        # 年龄分段情况
        age_step_list0 = [{"value":int(get_data_from_redis(redis_store.get(addr+"age_step"+str(i)[2:])).decode()),"name":str(i)[2:]+"后"} for i in AGE_STEP_LIST]
        age_step_list = list()
        for i in range(len(age_step_list0)):
            if age_step_list0[i].get("value") != 0:
                age_step_list.append(age_step_list0[i])
            elif i == len(age_step_list0)-1 and len(age_step_list) == 0:
                age_step_list.append(age_step_list0[i])
        # 叫号总量
        total_call = int(get_data_from_redis(redis_store.get(addr+"total_call")).decode())
        # 等待总时长
        total_wait_minute = int(get_data_from_redis(redis_store.get(addr+"total_wait_minute")).decode())
        # 接待总量
        total_deal = int(get_data_from_redis(redis_store.get(addr+"total_deal")).decode())
        # 接待通过量
        total_pass_deal = int(get_data_from_redis(redis_store.get(addr+"total_pass_deal")).decode())
        # 主题点击量
        subject_click_list = [(int(get_data_from_redis(redis_store.get(addr+subject.name+"click")).decode()),subject.name,subject.area) for subject in subjects]
        #subject_click_list.sort(reverse=True)
        # 事项点击量
        item_click_list = [(int(get_data_from_redis(redis_store.get(addr+item.name+"click")).decode()),item.name) for item in items]
        item_click_list.sort(reverse=True)
        # 转号量
        total_move = int(get_data_from_redis(redis_store.get(addr+"total_move")).decode())
        total_wait = 0
        for sub in subjects:
            total_wait += redis_store.llen(addr + sub.name)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
    # 对数据进行分析计算
    #print(subject_click_list)
    # 准备容器
    realData,quaho,pieSeriesData1,pieSeriesData2,pieSeriesData,themeTop5,matterTop5,theme,weekData={},{},[],[],[],{},{},{},{}
    realData.__setitem__("pickNum",total_number)
    realData.__setitem__("waitNum",total_wait)
    realData.__setitem__("curDoNum",total_number-total_wait-total_deal if total_number-total_wait-total_deal>0 else 0)
    realData.__setitem__("didBNum",total_deal)
    realData.__setitem__("moveNum",total_move)
    if total_call == 0 or total_wait_minute <= 0:
        realData.__setitem__("waitTime", 0)
    else:
        realData.__setitem__("waitTime",str(int(total_wait_minute/total_call))+"min")
    if total_deal == 0:
        realData.__setitem__("didPer", "{}%".format(0))
    else:
        realData.__setitem__("didPer","{:.2f}%".format((total_pass_deal/total_deal)*100))
    quaho.__setitem__("time",[str(i)+":00" for i in TIME_STEP_LIST])
    quaho.__setitem__("Num",time_step_list)
    pieSeriesData1.append({"value":sex,"name":"男"})
    pieSeriesData1.append({"value":total_number-sex,"name":"女"})
    pieSeriesData2.append({"value":province,"name":"省内"})
    pieSeriesData2.append({"value":total_number-province,"name":"省外"})
    pieSeriesData = age_step_list
    xAxis,rAxis,data,data1,data2,area_dict=[],[],[],[],[],{}
    # 服务区字典
    for j in subjects:
        area_dict.__setitem__(j.area,0)
    index0 = 0
    for k,v,area in subject_click_list:
        index0 += 1
        temp = {}
        xAxis.append(v)
        data.append(k)
        temp.__setitem__("value",k)
        temp.__setitem__("name",v)
        if k != 0:
            # 统计主题数据
            data2.append(temp)
        elif index0 == len(subject_click_list)-1 and len(data2) == 0:
            data2.append(temp)
        area_dict[area] += k
    zip_data_xAxis,sort_xAxis,sort_data = [],[],[]
    for i in zip(data,xAxis):
        zip_data_xAxis.append(i)
    zip_data_xAxis.sort(reverse=True)
    for i in zip_data_xAxis:
        sort_data.append(i[0])
        sort_xAxis.append(i[1])
    themeTop5.__setitem__("xAxis",sort_xAxis[0:5])
    themeTop5.__setitem__("data",sort_data[0:5])
    for i in area_dict:
        if area_dict[i]>0:
            rAxis.append(i)
            # 统计服务区数据
            data1.append({"value":area_dict[i],"name":i})
    for i in data2:
        rAxis.append(i["name"])
    theme.__setitem__("rAxis",rAxis)
    theme.__setitem__("data1",data1)
    theme.__setitem__("data2",data2)
    data3,top_total=[],0
    for k,v in item_click_list:
        temp1 = {}
        top_total += k
        temp1.__setitem__("matter",v)
        temp1.__setitem__("peoperNum",k)
        data3.append(temp1)
    for i in data3:
        if top_total == 0:
            i.__setitem__("per", "%.2f%%" % (0))
        else:
            i.__setitem__("per","%.2f%%"%(i["peoperNum"]/top_total*100))
    matterTop5.__setitem__("data",data3[:15])
    weekData.__setitem__("xAxis",['星期一', '星期二', '星期三', '星期四', '星期五'])
    for i in range(1,8):
        if i == int(weekday):
            week_data_list[i-1]=total_number
        # elif i > len(week_data_list):
        #     week_data_list.append(0)
    weekData.__setitem__("data",week_data_list[:5])
    # 返回结果
    return jsonify(errno=RET.OK, errmsg="成功", data={"realData":realData,
                                                    "quaho":quaho,
                                                    "pieseriesData1":pieSeriesData1,
                                                    "pieSeriesData2":pieSeriesData2,
                                                    "pieSeriesData":pieSeriesData,
                                                    "themeTop5":themeTop5,
                                                    "matterTop5":matterTop5,
                                                    "theme":theme,
                                                    "weekData":weekData})
