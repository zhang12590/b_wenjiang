import os
import json
import math

from app.api import api
from app import db, redis_store
from flask import current_app, jsonify, request, Response, g
from datetime import datetime, timedelta
from app.utils.captcha import Code
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from app.constants import step_map, TIME_STEP_LIST, AGE_STEP_LIST
import re
from sqlalchemy import and_, or_
from app.models import Business, BusinessStatus, People, Item, Subject, Addr, User, Msg, Department


@api.route("/search", methods=['POST'])
@login_required
def search():
    '''查询人员情况'''
    req_dict = request.get_json()
    date = req_dict.get("date")
    subject = req_dict.get('subject')
    item = req_dict.get("item")
    people_id = req_dict.get("people_id") 
    addr = req_dict.get("work_addr") 
    print("++++查询人员情况++++", req_dict)
    # 校验数据
    param_keys = ["date","subject","people_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 制作日期列表
    year,month,day = date.split("-")
    today = int(datetime(int(year),int(month),int(day)).strftime("%w"))
    today = 7 if today==0 else today
    date_list = list()
    for i in range(1,8):
        date_list.append(datetime(int(year),int(month),int(day),0,0)-timedelta(today-i))
    current_subject = Subject.query.filter_by(name=subject).first()
    current_item = Item.query.filter_by(name=item).first() if item else None
    # 以日期列表查询结果
    week_data_list = list()
    for i in date_list:
        if current_item:
            ret = BusinessStatus.query.filter(and_(BusinessStatus.addr==addr,BusinessStatus.subject==subject,
BusinessStatus.user_id==people_id,BusinessStatus.create_time.between(i,i+timedelta(1)),BusinessStatus.item==item)).all()
        else:
            ret = BusinessStatus.query.filter(and_(BusinessStatus.addr==addr,BusinessStatus.subject==subject,
BusinessStatus.user_id==people_id,BusinessStatus.create_time.between(i,i+timedelta(1)))).all()
        water_num_ret = [i.water_num for i in ret]
        week_data_list.append(len(set(water_num_ret)))
    # 制作时间段列表
    time_list = list()
    for i in TIME_STEP_LIST:
        time_list.append((datetime(int(year),int(month),int(day),i%24,0),datetime(int(year),int(month),int(day),(i+1)%24,0)))
    # 以时间段列表查询结果
    time_data_list = list()
    for i in time_list:
        if current_item:
            ret = BusinessStatus.query.filter(and_(BusinessStatus.addr==addr,BusinessStatus.subject==subject,
BusinessStatus.user_id==people_id,BusinessStatus.create_time.between(i[0],i[1]),BusinessStatus.item==item)).all()
        else:
            ret = BusinessStatus.query.filter(and_(BusinessStatus.addr==addr,BusinessStatus.subject==subject,
BusinessStatus.user_id==people_id,BusinessStatus.create_time.between(i[0],i[1]))).all()
        water_num_ret = [i.water_num for i in ret]
        time_data_list.append(len(set(water_num_ret)))
    # 返回数据 
    return jsonify(errno=RET.OK,errmsg="成功",data={
    "week":{
        "legend":['一周办件量'],
        "xAxis": ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
        "yAxis1":{
            "name": '一周办件量',
            "data": week_data_list
        },
        "yAxis2":{
            "name": '一周平均效率',
            "data": list(map(lambda x:"%.2f%%"%(x/sum(week_data_list)) if sum(week_data_list) else 0,week_data_list))
        }
    },
    "timeSlot":{
        "legend":['%s各时间段办件量'%date],
        "xAxis": ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00'],
        "yAxis1":{
            "name": '%s各时间段办件量'%date,
            "data": time_data_list
        },
        "yAxis2":{
            "name": '%s各时间段效率'%date,
            "data": list(map(lambda x:"%.2f%%"%(x/sum(time_data_list)) if sum(week_data_list) else 0,time_data_list))
        }
    }
})


@api.route("/searchnumber", methods=['POST'])
@login_required
def searchnumber():
    '''查询取号情况'''
    req_dict = request.get_json()
    date = req_dict.get("date")
    addr = req_dict.get("work_addr")
    print("++++查询取号情况++++", req_dict)
    # 校验数据
    param_keys = ["date",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    year,month,day = date.split("-")
    # 制作时间段列表
    time_list = list()
    for i in TIME_STEP_LIST:
        time_list.append((datetime(int(year),int(month),int(day),i%24,0),datetime(int(year),int(month),int(day),(i+1)%24,0)))
    # 以时间段列表查询结果
    time_data_list = list()
    for i in time_list:
        time_data_list.append(len(Business.query.filter(Business.addr==addr,Business.create_time.between(i[0],i[1])).all()))
    # 返回数据 
    return jsonify(errno=RET.OK,errmsg="成功",data={
        "legend":['%s各时间段取号量'%date],
        "xAxis": ['9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00'],
        "yAxis1":{
            "name": '%s各时间段取号量'%date,
            "data": time_data_list
        }
})


@api.route("/getusers", methods=['POST'])
@login_required
def get_users():
    '''查询人员'''
    req_dict = request.get_json()
    subject = req_dict.get('subject')
    addr = req_dict.get('work_addr')
    item = req_dict.get('item')
    print("获取员工---------------", req_dict)
    # 校验数据
    param_keys = ["subject",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    users = []
    try:
        current_subject = Subject.query.filter_by(name=subject).first()
        current_item = Item.query.filter_by(name=item).first() if item else None
        if current_item and current_subject:
            current_business_status = BusinessStatus.query.filter_by(subject=subject,item=item).all()
            id_list = [i.id for i in current_business_status]
            for i in set(id_list):
                ret = User.query.filter_by(id=i).first()
                if ret:
                    users.append(ret)
        else:
            users = User.query.filter_by(subject=subject).all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR,errmsg="数据库错误")
    return jsonify(errno=RET.OK,errmsg="成功",data=[user.to_dict() for user in users] if users else [])


@api.route("/search_pass_deal", methods=["POST"])
@login_required
def search_pass_deal():
    """查询固定日期各主题接件通过量"""
    req_dict = request.get_json()
    date = req_dict.get("date")
    addr = req_dict.get("work_addr")
    print("查询接件通过量------------------")
    # 校验数据
    param_keys = ["date",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    year,month,day = date.split("-")
    start = datetime(int(year),int(month),int(day),0,0)
    end = datetime(int(year),int(month),int(day)+1,0,0)
    subjects = Subject.query.all()
    subject_name_list = [subject.name for subject in subjects]
    subject_pass_deal_list = list()
    for i in subject_name_list:
        ret = Business.query.filter(and_(Business.addr==addr,Business.subject==i,Business.create_time.between(start,end),Business.current_process!="接件")).all()
        subject_pass_deal_list.append(len(ret))
    return jsonify(errno=RET.OK,errmsg="成功",data={
    "legend":['%s大厅各主题接件量'%date],
    "xAxis": subject_name_list,
    "yAxis1":{
        "name": '大厅各主题接件量',
        "data": subject_pass_deal_list
    }
})


@api.route("/searchwaitdeal", methods=["GET","POST"])
@login_required
def search_wait_deal():
    """待处理处搜索功能"""
    req_dict = request.get_json()
    page = req_dict.get("page")
    page_size = 1
    offset = (int(page)-1)*page_size if page else 0
    param = req_dict.get("param")
    user_id = req_dict.get("user_id")
    addr = req_dict.get("work_addr")
    print("待处理搜索-----------------",req_dict,page,param)
    # 校验数据
    param_keys = ["param","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    current_user = User.query.filter_by(id=user_id).first()
    department_obj = Department.query.filter_by(department=current_user.department).first()
    subject = department_obj.subjects if department_obj else ''
    if not subject:
        return jsonify(errno=RET.OK, errmsg="成功",data={})
    business,business1=None,None
    if current_user.role.name == "大厅":
        business = Business.query.filter(and_(Business.addr==addr,Business.in_deal==0,Business.current_process=="经办人",
                                         Business.subject==subject,
                                         or_(Business.water_num.contains(param),
                                         Business.item.contains(param),
                                         Business.p_project.contains(param)))).all()
        business1 = Business.query.filter(and_(Business.addr==addr,Business.in_deal==1,Business.current_process=="经办人",
                                          Business.current_user==user_id,
                                          Business.subject==subject,
                                         or_(Business.water_num.contains(param),
                                         Business.item.contains(param),
                                         Business.p_project.contains(param)))).all()
    elif current_user.role.name == "科室负责人":
        business = Business.query.filter(and_(Business.addr==addr,Business.in_deal==0,Business.current_process=="科室负责人",
                                         Business.subject==subject,
                                         or_(Business.water_num.contains(param),
                                         Business.item.contains(param),
                                         Business.p_project.contains(param)))).all()
        business1 = Business.query.filter(and_(Business.addr==addr,Business.in_deal==1,Business.current_process=="科室负责人",
                                          Business.current_user==user_id,
                                          Business.subject==subject,
                                         or_(Business.water_num.contains(param),
                                         Business.item.contains(param),
                                         Business.p_project.contains(param)))).all()
    else:
        business = Business.query.filter(and_(Business.addr==addr,Business.in_deal==0,Business.current_process==current_user.role.name,
                                         or_(Business.water_num.contains(param),
                                         Business.item.contains(param),
                                         Business.p_project.contains(param)))).all()
        business1 = Business.query.filter(and_(Business.addr==addr,Business.in_deal==1,Business.current_process==current_user.role.name,
                                          Business.current_user==user_id,
                                         or_(Business.water_num.contains(param),
                                         Business.item.contains(param),
                                         Business.p_project.contains(param)))).all()

    wait_deal_list,in_deal_list = [], []
    if business:
        wait_deal_list = [add_time_step_to_business(bus) for bus in business]
    if business1:
        in_deal_list = [add_time_step_to_business(bus1) for bus1 in business1]
    in_deal_list_ret = in_deal_list[offset:offset+page_size]
    start_offset = offset-len(in_deal_list_ret) if offset-len(in_deal_list_ret)>=0 else 0
    if len(in_deal_list_ret)==0:
        start_offset = offset-len(in_deal_list)
    wait_deal_list_ret = wait_deal_list[start_offset:start_offset+page_size-len(in_deal_list_ret)]
    return jsonify(errno=RET.OK, errmsg="成功",data={"in_deal":in_deal_list_ret,
                                                     "wait_deal":wait_deal_list_ret,
                                                     "total":len(in_deal_list)+len(wait_deal_list),
                                                     "size":page_size,
                                                     "pages":math.ceil((len(in_deal_list)+len(wait_deal_list))/page_size)})
        
@api.route('/start_number', methods=['GET']) 
@login_required
def start_number():
    """获取待处理的数量"""
    addr = request.args.get('work_addr')
    if not addr:
        return jsonify(errno=RET.PARAMERR, errmsg="缺少地址")
    user_id = request.args.get("user_id")
    if not user_id:
        return jsoniify(errno=RET.PARAMERR, errmsg="用户未登陆")
    print("++++获取待处理数量++++",addr,user_id)
    try:
        current_user = User.query.filter_by(id=user_id).first()
        department_obj = Department.query.filter_by(department=current_user.department).first()
        subject = department_obj.subjects if department_obj else ''
        if not subject:
            return jsonify(errno=RET.OK, errmsg="成功",data={"total":0})
        if current_user.role.name == "大厅":
            business = Business.query.filter(and_(Business.addr==addr,Business.current_process=="经办人",
                                              Business.in_deal==0,
                                              Business.subject==subject)).all()
            business1 = Business.query.filter(and_(Business.addr==addr,Business.current_process == "经办人",
                                                   Business.in_deal==1,
                                                   Business.subject==subject,
                                                   Business.current_user==user_id)).all()
        elif current_user.role.name == "科室负责人":
            business = Business.query.filter(and_(Business.addr==addr,Business.current_process=="科室负责人",
                                              Business.in_deal==0,
                                              Business.subject==subject)).all()
            business1 = Business.query.filter(and_(Business.addr==addr,Business.current_process == "科室负责人",
                                                   Business.in_deal==1,
                                                   Business.subject == subject,
                                                   Business.current_user == user_id)).all()
        elif current_user.role.name == "踏勘中心":
            business = Business.query.filter(and_(Business.addr==addr,Business.current_process=="踏勘中心",
                                              Business.in_deal==0)).all()
            business1 = Business.query.filter(and_(Business.addr==addr,Business.current_process == "踏勘中心",
                                                   Business.in_deal==1,
                                                   Business.current_user == user_id)).all()
        elif current_user.role.name == "分管领导":
            business = Business.query.filter(and_(Business.addr==addr,Business.current_process=="分管领导",
                                              Business.in_deal==0)).all()
            business1 = Business.query.filter(and_(Business.addr==addr,Business.current_process == "分管领导",
                                                   Business.in_deal==1,
                                                   Business.current_user == user_id)).all()
        elif current_user.role.name == "发证":
            business = Business.query.filter(and_(Business.addr==addr,Business.current_process=="发证",
                                              Business.in_deal==0)).all()
            business1 = Business.query.filter(and_(Business.addr==addr,Business.current_process == "发证",
                                                   Business.in_deal==1,
                                                   Business.current_user == user_id)).all()
        else:
            business = None
            business1 = None
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    wait_deal_list,in_deal_list = [], []
    if business:
        wait_deal_list = [add_time_step_to_business(bus) for bus in business]
    if business1:
        in_deal_list = [add_time_step_to_business(bus1) for bus1 in business1]
    return jsonify(errno=RET.OK, errmsg="成功",data={"total":len(in_deal_list)+len(wait_deal_list)})

@api.route("/get_wait_num", methods=["GET"])
def get_wait_num():
    """获取等待数量"""
    addr = request.args.get("work_addr") 
    #addr = "新津县"
    if not addr:
        return jsonify(errno=RET.PARAMERR, errmsg="缺少地址")
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify(errno=RET.PARAMERR, errmsg="用户未登陆")
    subject = request.args.get("subject")
    if not subject:
        return jsonify(errno=RET.PARAMERR, errmsg="缺少主题")
    print("++++获取等待数量++++",addr,user_id,subject)
    length = redis_store.llen(addr + subject)
    return jsonify(errno=RET.OK,errmsg='成功',data=length)


@api.route("/get_item_history", methods=["POST"])
def get_item_history():
    """获取事项历史"""
    req_dict = request.get_json()
    item = req_dict.get('item')
    print("++++获取事项历史++++", req_dict)
    # 校验数据
    param_keys = ["item"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    current_day = datetime(datetime.now().year,datetime.now().month,datetime.now().day,0,0)
    business = Business.query.filter(and_(Business.item==item,Business.create_time.between(current_day,current_day+timedelta(1)),Business.current_process!="接件")).all()
    water_nums = [i.water_num for i in business]
    business_status = list()
    for bus in business:
        current_process = bus.current_process
        next_process = "over"
        if current_process == "科室负责人" and bus.is_scene==1:
            next_process = bus.process.split("-")[bus.process.split("-").index(current_process)+2]
        elif current_process == "踏勘中心":
            next_process = bus.process.split("-")[bus.process.split("-").index(current_process)-1]
        elif current_process != "发证":
            next_process = bus.process.split("-")[bus.process.split("-").index(current_process)+1]
        ret = BusinessStatus.query.filter_by(water_num=bus.water_num).order_by(BusinessStatus.modify_time).all()
        print([i.to_dict() for i in ret])
        business_status.append({"matter":item,
                                "water_num":bus.water_num,
                                "next_process":next_process,
                                "processinfo":[i.to_dict() for i in ret]})
    return jsonify(errno=RET.OK, errmsg="成功", data=business_status)


@api.route("/commonsearch", methods=["GET","POST"])
@login_required
def commonsearch():
    """通用搜索功能"""
    req_dict = request.get_json()
    page = req_dict.get("page")
    page_size = 1
    offset = (int(page)-1)*page_size if page else 0
    search_obj = req_dict.get("search_obj")
    param = req_dict.get("param")
    user_id = req_dict.get("user_id")
    addr = req_dict.get("work_addr")
    print("通用搜索-----------------",req_dict,page)
    # 校验数据
    param_keys = ["search_obj","param","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    if search_obj == "Subject":
        ret = Subject.query.filter(Subject.name.contains(param)).all()
    elif search_obj == "Item":
        ret = Item.query.filter(Item.name.contains(param)).all()
    elif search_obj == "Step":
        ret = Step.query.filter(Step.name.contains(param)).all()
    elif search_obj == "Review":
        ret = Review.query.filter(Review.name.contains(param)).all()
    elif search_obj == "Business":
        ret = Business.query.filter(and_(Business.addr==addr,Business.water_num.contains(param))).all()
    elif search_obj == "BusinessStatus":
        ret = BusinessStatus.query.filter(and_(BusinessStatus.addr==addr,BusinessStatus.water_num.contains(param))).all()
    elif search_obj == "People":
        ret = People.query.filter(or_(People.idno.contains(param),People.mobile.contains(param))).all()
    elif search_obj == "Addr":
        ret = Addr.query.filter(Addr.name.contains(param)).all()
    elif search_obj == "User":
        ret = User.query.filter(or_(User.mobile.contains(param),User.name.contains(param),User.email.contains(param),User.department.contains(param))).all()
    elif search_obj == "Role":
        ret = Role.query.filter(Role.name.contains(param)).all()
    elif search_obj == "Permission":
        ret = Permission.query.filter(Permission.label.contains(param)).all()
    elif search_obj == "Msg":
        ret = Mst.query.filter(Msg.step.contains(param)).all()
    elif search_obj == "Location":
        ret = Location.query.filter(and_(Location.addr==addr,Location.subject.contains(param))).all()
    elif search_obj == "CurrentCall":
        ret = CurrentCall.query.filter(and_(CurrentCall.addr==addr,CurrentCall.water_num.contains(param))).all()
    elif search_obj == "LingPai":
        ret = LingPai.query.filter(LingPai.lingpai.contains(param)).all()
    else:
        return jsonify(errno=RET.PARAMERR, errmsg="没有此查询对象")
    data = [i.to_dict() for i in ret]
    return jsonify(errno=RET.OK,errmsg="成功",data=data)
