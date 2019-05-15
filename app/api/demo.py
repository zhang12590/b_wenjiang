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
from app.models import Business, BusinessStatus, People, Item, Subject, Addr, User, Msg, Location, CurrentCall, LingPai,Department


@api.before_app_first_request
def handel_before_first_request():
    """在第一次请求处理之前，从数据库读出主题和地点生成队列"""
    try:
        addrs = Addr.query.all()
        subjects = Subject.query.all()
        msgs = Msg.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库查询错误")
    if not all([addrs, subjects, msgs]):
        return jsonify(errno=RET.NODATA, errmsg="数据不足")
    #for addr in addrs:
    #    for subject in subjects:
    #        current_app.config['QUEUE'].__setitem__(addr.name + subject.name, 0)
        #current_app.config['QUEUE'].__setitem__(addr.name + "其他", 0)
    for msg in msgs:
        current_app.config['MSG'].__setitem__(msg.step+"开始", msg.start_msg)
        current_app.config['MSG'].__setitem__(msg.step+"通过", msg.pass_msg)
        current_app.config['MSG'].__setitem__(msg.step+"未通过", msg.unpass_msg)


@api.route("/number", methods=['POST'])
def get_number():
    """排号 涉及办事人员表添加取号记录，办事表查询和添加记录，队列"""
    # 获取数据
    req_dict = request.get_json()
    subject = req_dict.get('subject',"")  # 主题
    item = req_dict.get('item',"")  # 事项
    mobile = req_dict.get('mobile',"")  # 电话
    idno = req_dict.get('idno',"")  # 身份证
    addr = req_dict.get('work_addr',"")  # 地址
    print("++++取号++++", req_dict)
    # 校验数据
    param_keys = ["subject","item","mobile","idno","work_addr"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 判断手机号格式
    if not re.match(r"1[34578]\d{9}", mobile):
        # 表示格式不对
        return jsonify(errno=RET.PARAMERR, errmsg="手机号格式错误")
    # 判断身份证号
    if not re.match(r"[1-9]\d{16}[0-9a-zA-Z]", idno):
        return jsonify(errno=RET.PARAMERR, errmsg="身份证格式错误")
    # 记录对应主题取号总量
    redis_store.incr(addr+subject+"total_number")
    totle = int(redis_store.get(addr+subject+"total_number").decode("utf-8"))
    print("取号总量-----------", totle)
    # 查询办事表检查当事人是否来过
    try:
        current_people = People.query.filter_by(idno=idno).first()
        current_addr = Addr.query.filter_by(name=addr).first()
        current_subject = Subject.query.filter_by(name=subject).first()
        current_item = Item.query.filter_by(name=item).first()
        current_location = Location.query.filter_by(subject=subject).first() 
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")

    # 生成流水号
    water_num = current_addr.seq +datetime.now().strftime("%Y%m%d%H%M%S")+ str(current_item.id).rjust(3, '0')
    # 生成号码
    number = current_subject.seq + str((0 + totle * 1) % 1000).rjust(3, '0')
    # 记录事件
    current_business = Business(water_num=water_num, idno=idno, addr=addr, subject=subject, item=item,
                                process=current_item.process, current_process="接件",in_deal=0,is_scene=0,
                                number=number,timeout=current_item.timeout,takan_used_time=0,wait_seconds=0,move_times=0)
    age = datetime.now().year - int(idno[6:10])
    sex = int(idno[16:17]) % 2
    try:
        db.session.add(current_business)
        if not current_people:
            current_people = People(idno=idno, mobile=mobile)
            db.session.add(current_people)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")

    # 添加队列
    try:
        # 发送短信
        length = redis_store.llen(addr + subject)
        location = current_location.location
        try:
            result = current_app.config['MSG_SENDER'].send_with_param(86, mobile, current_app.config['TEMPLATE_NUMBER'],
                                                                      [number, length,location,datetime.now().strftime('%H:%M:%S')],
                                                                      sign=current_app.config['SMS_SIGN'], extend="",
                                                                      ext="")  # 签名参数未提供或者为空时，会使用默认签名发送短信
            pass
        except Exception as e:
            current_app.logger.error(e)
            return jsonify(errno=RET.THIRDERR, errmsg="第三方系统错误")
        # 添加排队队列
        redis_store.rpush(addr + subject, water_num)
        # 添加排队时间队列
        redis_store.rpush(addr + subject + "time", datetime.now().strftime("%H%M%S"))
        # 添加用户头顶屏幕显示人数
        redis_store.rpush('usershead', json.dumps({"subject":subject,"length":length,"show":"true"}))
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
    else:
        # 返回流水号，号码，位置，等待人数
        return jsonify(errno=RET.OK, errmsg="成功", data={"water_num": water_num, "number": number, "location":location,"wait":length})


@api.route("/call", methods=['POST'])
@login_required
def make_call():
    '''叫号'''
    req_dict = request.get_json()
    subject = req_dict.get('subject','')
    lingpai = req_dict.get("lingpai",'')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get('work_addr',"")  # 地址
    print("++++叫号++++", req_dict)
    # 校验数据
    param_keys = ["subject","lingpai","user_id","work_addr"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 修改用户当前状态
    lingpai_obj = LingPai.query.filter_by(user_id=user_id).first()
    if not lingpai_obj:
        return jsonify(errno=RET.DBERR,errmsg="未登录")
    lingpai_obj.status="办理中"
    db.session.add(lingpai_obj)
    db.session.commit()
    window = lingpai_obj.win
    # 获取当前主题等待人数
    current_wait_number = redis_store.llen(addr + subject)
    # 获取当前用户今日办件量
    current_day = datetime(datetime.now().year,datetime.now().month,datetime.now().day,0,0)
    current_user_call_number = len(Business.query.filter(and_(Business.create_time.between(current_day,current_day+timedelta(1)),Business.current_user==user_id)).all())
    # 通过比对数据库查看是否有中断事件，如果有则返回中断事件，否则返回队列事件
    # 首先比对数据库查看是否有中断事件
    broken_business = Business.query.filter_by(addr=addr,subject=subject,current_user=user_id,current_process="接件",in_deal=1).first()
    # 如果有中断事件，则返回中断事件和窗口
    if broken_business:
        # 比对数据库查看是否有上次未完成事件
        before_business = Business.query.filter(and_(Business.idno==broken_business.idno,Business.item==broken_business.item,Business.water_num!=broken_business.water_num)).order_by(Business.modify_time.desc()).all()
        current_p_comes = 0
        for i in before_business:
            if i.status == "完成":
                break
            current_p_comes += 1
        number = broken_business.number
        current_item = Item.query.filter_by(name=broken_business.item).first()
        people = People.query.filter_by(idno=broken_business.idno).first()
        # 记录当前叫号情况
        current_call_obj = CurrentCall.query.filter_by(water_num=broken_business.water_num).first()
        if current_call_obj:
            current_call_obj.win=window
        else:
            current_call_obj=CurrentCall(addr=addr,water_num=broken_business.water_num,number=broken_business.number,win=window,status=0)
        if current_call_obj:
            db.session.add(current_call_obj)
            db.session.commit()
        # 是否发送短信
        mobile = people.mobile
        try:
    	    result = current_app.config['MSG_SENDER'].send_with_param(86, mobile, current_app.config['TEMPLATE_CALL'], [number,window,datetime.now().strftime('%H:%M:%S')],
    				     sign=current_app.config['SMS_SIGN'], extend="",
    				     ext="")  # 签名参数未提供或者为空时，会使用默认签名发送短
        except Exception as e:
    	    current_app.logger.error(e)
    	    return jsonify(errno=RET.THIRDERR, errmsg="第三方系统错误")
        # 添加语音队列
        redis_store.rpush(addr+"voice", json.dumps({"number":number,"window":window}))
        # 添加用户头顶屏幕队
        redis_store.rpush('usershead', json.dumps({"number":number,"lingpai":lingpai,"length":redis_store.llen(addr + subject),"show":"true"}))
        # 添加用户对面屏幕队列
        step_reviews_list = list()
        for step in current_item.steps.all():
    	    review_list = [review.to_dict() for review in step.reviews.all()]
    	    for i in review_list:
    	        i.__setitem__("father_order",step.order)
    	        i.__setitem__("process",current_item.process)
    	    step_reviews_list.extend(review_list)
        print("+"*100)
        redis_store.rpush("itemreviews",json.dumps({"lingpai":lingpai,"itemreviews":step_reviews_list,"reviewsclick":before_business[0].reviews if before_business else "","cometimes":len(before_business),"show":"true","current_click":str(step_reviews_list[0]['id']),"business":add_time_step_to_business(broken_business)}))
        print("+"*100)
        result = add_time_step_to_business(broken_business)
        result.__setitem__("last_reviews",before_business[0].reviews if before_business else "")
        result.__setitem__("window",window)
        result.__setitem__("cometimes",current_p_comes)
        return jsonify(errno=RET.OK, errmsg="成功", data={"business":result,
                                                          "wait":current_wait_number,
                                                          "called":current_user_call_number})
    # 否则从队列中取第一个消息
    else:
        ret = redis_store.blpop(addr + subject, timeout=2)
        ret1 = redis_store.blpop(addr+subject+"time", timeout=2)
        if ret and ret1:
            water_num = ret[1].decode()
            print("water_num-----",water_num)
            # 查询所需信息
            business = Business.query.filter_by(water_num=water_num).first()
            current_item = Item.query.filter_by(name=business.item).first()
            business.current_user = user_id
            business.current_process_timeout = current_item.steps.filter_by(name=business.current_process).first().timeout
            business.wait_seconds = (datetime.now()-business.create_time).seconds
            business.in_deal = 1
            business.current_process_start_time = datetime.now()
            db.session.add(business)
            db.session.commit()
            # 比对数据库查看是否有上次未完成事件
            before_business = Business.query.filter(and_(Business.idno==business.idno,Business.item==business.item,Business.water_num!=business.water_num)).order_by(Business.modify_time.desc()).all()
            current_p_comes = 0
            for i in before_business:
                if i.status == "完成":
                    break
                current_p_comes += 1
            number = business.number
            people = People.query.filter_by(idno=business.idno).first()
            # 添加叫号情况
            current_call_obj = CurrentCall.query.filter_by(water_num=water_num).first()
            if current_call_obj:
                current_call_obj.win=window
            else:
                current_call_obj = CurrentCall(addr=addr,water_num=water_num,number=number,win=window,status=0)
            if current_call_obj:
                db.session.add(current_call_obj)
                db.session.commit()
            # 是否发送短信
            mobile = people.mobile
            try:
                result = current_app.config['MSG_SENDER'].send_with_param(86, mobile, current_app.config['TEMPLATE_CALL'], [number,window],
            		     sign=current_app.config['SMS_SIGN'], extend="",
            		     ext="")  # 签名参数未提供或者为空时，会使用默认签名发送短信
            except Exception as e:
                current_app.logger.error(e)
                return jsonify(errno=RET.THIRDERR, errmsg="第三方系统错误")
            # 添加语音队列
            redis_store.rpush(addr+"voice", json.dumps({"number":number,"window":window}))
            # 添加用户头顶屏幕队
            redis_store.rpush('usershead', json.dumps({"number":number,"lingpai":lingpai,"length":redis_store.llen(addr + subject),"show":"true"}))
            # 添加用户对面屏幕队列
            step_reviews_list = list()
            for step in current_item.steps.all():
                review_list = [review.to_dict() for review in step.reviews.all()]
                for i in review_list:
                    i.__setitem__("father_order",step.order)
                    i.__setitem__("process",current_item.process)
                step_reviews_list.extend(review_list)
            print("-"*100)
            redis_store.rpush("itemreviews",json.dumps({"lingpai":lingpai,"itemreviews":step_reviews_list,"reviewsclick":before_business[0].reviews if before_business else "","cometimes":len(before_business),"show":"true","current_click":str(step_reviews_list[0]['id']),"business":add_time_step_to_business(business)}))
            print("-"*100)
            result = add_time_step_to_business(business)
            result.__setitem__("last_reviews",before_business[0].reviews if before_business else "")
            result.__setitem__("window",window)
            result.__setitem__("cometimes",current_p_comes)
            return jsonify(errno=RET.OK, errmsg="成功", data={"business":result,
                                                              "wait":current_wait_number,
                                                              "called":current_user_call_number})
        return jsonify(errno=RET.DATAERR, errmsg="没人了")
 
 
@api.route("/deal", methods=["POST"])
#@login_required
def deal_end():
    req_dict = request.get_json()
    lingpai = req_dict.get('lingpai','')  # 大厅人员必须
    reviews = req_dict.get("reviews",'')  # 大厅人员非必须
    p_name = req_dict.get("p_name",'')  # 大厅人员必须
    p_project = req_dict.get("p_project",'')  # 大厅人员必须
    water_num = req_dict.get("water_num",'')
    subject = req_dict.get("subject",'')
    item = req_dict.get("item",'')
    deal_status = req_dict.get("deal_status",'')
    current_process = req_dict.get("current_process",'')
    description = req_dict.get("description",'')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get('work_addr',"")  # 地址
    print("++++处理++++",req_dict)
    # 校验数据
    param_keys = ["water_num","deal_status","current_process","user_id","work_addr",'subject','item']
    if current_process == "接件":
        param_keys.extend(["lingpai"])
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    ## 修改用户当前状态
    #lingpai_obj = LingPai.query.filter_by(user_id=user_id).first()
    #if not lingpai_obj:
    #    return jsonify(errno=RET.DBERR,errmsg="未登录")
    #lingpai_obj.status="空闲"
    #db.session.add(lingpai_obj)
    #db.session.commit()
    # 修改当前叫号情况
    current_call_obj = CurrentCall.query.filter_by(water_num=water_num).first()
    if current_call_obj:
        current_call_obj.status=1
        db.session.add(current_call_obj)
        db.session.commit()
    # 修改当前时间主题和事项,当前流程时限和已用时间
    business = Business.query.filter_by(water_num=water_num).first()
    if business:
        business.subject=subject
        business.item=item
        db.session.add(business)
        db.session.commit()
    else:
        return jsonify(errno=RET.DBERR,errmsg="没有此事件")
    # 检验要素是否属于当前事项
    item_obj = Item.query.filter_by(name=business.item).first()
    if reviews:
        review_id_list = list()
        for i in item_obj.steps.all():
            review_id_list.extend([j.id for j in i.reviews.all()])
        if reviews.split("-")[0] not in review_id_list:
            return jsonify(errno=RET.DATAERR,errmsg="要素与事项不符")
    try:
        current_subject = business.subject
        start_time = business.modify_time
        current_process = business.current_process
        next_process = None
        current_item = business.item
        people = People.query.filter_by(idno=business.idno).first()
        if deal_status == "N":
            business.current_user = user_id
            business.status = "不合格"
            business.in_deal = 0
            business.current_process = "发证"
            if current_process =="接件":
                business.current_process = "接件"  # 如果当前流程为接件则不流到发证处
                business.in_deal = 2 
                business.p_name = p_name 
                business.p_project = p_project 
                business.reviews = reviews if reviews else ""
            if current_process == "发证":  # 如果发证处不合格则直接作废
                business.in_deal = 2 
        elif deal_status == "Y":
            business.current_user = user_id
            business.status = "完成"
            business.in_deal = 0
            if current_process == "接件":
                next_process = business.process.split("-")[business.process.split("-").index(current_process)+1]
                business.current_process = next_process 
                business.p_name = p_name 
                business.p_project = p_project 
                business.reviews = reviews if reviews else ""
            elif current_process == "科室负责人" and business.is_scene==1:
                next_process = business.process.split("-")[business.process.split("-").index(current_process)+2]
                business.current_process = next_process 
            elif current_process == "踏勘中心":
                next_process = business.process.split("-")[business.process.split("-").index(current_process)-1]
                business.current_process = next_process 
                business.is_scene = 1
            elif current_process != "发证":
                next_process = business.process.split("-")[business.process.split("-").index(current_process)+1]
                business.current_process = next_process 
            elif current_process == "发证":
                next_process = '发证'
                business.in_deal = 3 
            item_obj = Item.query.filter_by(name=business.item).first()
            business.current_process_timeout = item_obj.steps.filter_by(name=next_process).first().timeout
            business.current_process_start_time = datetime.now()
        # 修改办理已花费时间，添加事件状态记录
        used_time_obj = datetime.now() - start_time
        if current_process == "踏勘中心":
            business.takan_used_time += used_time_obj.seconds/3600 + used_time_obj.days*24
        # 查询数据库，如果存在则修改，否则创建
        business_status = BusinessStatus.query.filter_by(water_num=water_num,current_process=current_process).first()
        if business_status:
            business_status.addr=addr
            business_status.user_id=user_id
            business_status.subject=current_subject
            business_status.item=current_item
            business_status.starts=start_time
            business_status.ends=datetime.now()
            business_status.result=deal_status
            business_status.description=description
        else:
            business_status = BusinessStatus(addr=addr,water_num=water_num, current_process=current_process, user_id=user_id,subject=current_subject,item=current_item, starts=start_time, ends=datetime.now(), result=deal_status, description=description)
        db.session.add_all([business,business_status])
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    # 是否发送短信
    mobile = people.mobile
    if current_process == "发证":
        pass
    elif next_process == "发证":
        try:
            result = current_app.config['MSG_SENDER'].send_with_param(86, mobile, current_app.config['TEMPLATE_LAST'], [3,datetime.now().strftime('%H:%M:%S')],
                                             sign=current_app.config['SMS_SIGN'], extend="",
                                             ext="")  # 签名参数未提供或者为空时，会使用默认签名发送短信
            pass
        except Exception as e:
            current_app.logger.error(e)
            return jsonify(errno=RET.THIRDERR, errmsg="第三方系统错误")
    elif deal_status == "N":
        if current_app.config["MSG"].get(current_process+"未通过") == "Y":
            print(current_process,"------------未通过")
            description_ret = description
            if description:
                description_obj = json.loads(description)
                description_ret = str(description_obj["checks"].append(description_obj["msg"]))
            try:
                result = current_app.config['MSG_SENDER'].send_with_param(86, mobile, current_app.config['TEMPLATE_UNPASS'], [current_process,description_ret,datetime.now().strftime('%H:%M:%S')],
                                                 sign=current_app.config['SMS_SIGN'], extend="",
                                                 ext="")  # 签名参数未提供或者为空时，会使用默认签名发送短信
                pass
            except Exception as e:
                current_app.logger.error(e)
                return jsonify(errno=RET.THIRDERR, errmsg="第三方系统错误")
    elif deal_status == "Y":
        if current_app.config["MSG"].get(current_process+"通过") == "Y":
            print(current_process, "---------------通过")
            try:
                result = current_app.config['MSG_SENDER'].send_with_param(86, mobile, current_app.config['TEMPLATE_PASS'], [current_process,next_process,datetime.now().strftime('%H:%M:%S')],
                                                 sign=current_app.config['SMS_SIGN'], extend="",
                                                 ext="")  # 签名参数未提供或者为空时，会使用默认签名发送短信
                pass
            except Exception as e:
                current_app.logger.error(e)
                return jsonify(errno=RET.THIRDERR, errmsg="第三方系统错误")
    if current_process == "接件":
        try:
            # 修改用户头顶屏幕显示
            redis_store.rpush('usershead', json.dumps({"lingpai":lingpai,"length":redis_store.llen(addr + business.subject),"show":"false"}))
            # 修改用户对面屏幕显示
            redis_store.rpush('itemreviews', json.dumps({"lingpai":lingpai,"show":"false"}))
        except Exception as e:
            current_app.logger.error(e)
            return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route("/start", methods=['GET'])
@login_required
def start():
    """获取待处理"""
    # 获取数据
    addr = request.args.get('work_addr')
    user_id = request.args.get("user_id")
    print("++++获取待处理++++",addr,user_id)
    # 校验数据
    param_keys = ["user_id","work_addr"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,request.args.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    page = request.args.get("page")
    page_size = 1
    offset = (int(page)-1)*page_size if page else 0
    try:
        current_user = User.query.filter_by(id=user_id).first()
        department_obj = Department.query.filter_by(department=current_user.department).first()
        subject = department_obj.subjects if department_obj else ''
        if not subject:
            return jsonify(errno=RET.OK, errmsg="成功",data={})
        if current_user.role.name == "大厅":
            business = Business.query.filter(and_(Business.addr==addr,Business.current_process=="经办人",
                                              Business.in_deal==0,
                                              Business.subject==subject)).all()
            print("进入角色大厅判断")
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
            print("进入踏勘中心判断-------------------------------")
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
    in_deal_list_ret = in_deal_list[offset:offset+page_size]
    start_offset = offset-len(in_deal_list_ret) if offset-len(in_deal_list_ret)>=0 else 0
    if len(in_deal_list_ret)==0:
        start_offset = offset-len(in_deal_list)
    print("start_ofset+++++++++++++++++++",start_offset)
    wait_deal_list_ret = wait_deal_list[start_offset:start_offset+page_size-len(in_deal_list_ret)]
    return jsonify(errno=RET.OK, errmsg="成功",data={"in_deal":in_deal_list_ret,
                                                     "wait_deal":wait_deal_list_ret,
                                                     "total":len(in_deal_list)+len(wait_deal_list),
                                                     "size":page_size, 
                                                     "pages":math.ceil((len(in_deal_list)+len(wait_deal_list))/page_size)})


@api.route("/begin", methods=["POST"])
@login_required
def begin():
    """激活待处理"""
    req_dict = request.get_json()
    water_num = req_dict.get('water_num','')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get("work_addr",'')
    print("++++激活++++",req_dict)
    # 校验数据
    param_keys = ["water_num","user_id","work_addr"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    #user_id = g.user_id
    try:
        business = Business.query.filter_by(water_num=water_num).first()
        if business.in_deal==1:
            return jsonify(errno=RET.DATAEXIST, errmsg="该数据有人在操作")
        else:
            business.in_deal = 1
            business.current_user = user_id
            db.session.add(business)
            db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    return jsonify(errno=RET.OK, errmsg="成功")

@api.route("/current_call", methods=["POST"])
#@login_required
def current_call():
    """当前叫号情况"""
    req_dict = request.get_json()
    addr = req_dict.get("work_addr",'')
    print("++++当前叫号情况++++",req_dict)
    # 校验数据
    param_keys = ["work_addr"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    current_call_objs = CurrentCall.query.filter_by(status=0).all()
    current_call_list= list()
    for i,v in enumerate(current_call_objs,start=1):
        current_call_list.append({'order':i,'number':v.number,'window':v.win})
    return jsonify(errno=RET.OK, errmsg="成功",data=current_call_list[:14] if current_call_list else [])

@api.route("/s_stop", methods=["POST"])
@login_required
def s_stop():
    """暂停"""
    req_dict = request.get_json()
    lingpai = req_dict.get("lingpai",'')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get("work_addr",'')
    print("++++暂停++++",req_dict)
    # 校验数据
    param_keys = ["lingpai","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 修改用户当前状态
    lingpai_obj = LingPai.query.filter_by(user_id=user_id).first()
    if not lingpai_obj:
        return jsonify(errno=RET.DBERR,errmsg="未登录")
    lingpai_obj.status="暂停"
    db.session.add(lingpai_obj)
    db.session.commit()
    # 修改用户头顶屏幕显示
    redis_store.rpush('usershead', json.dumps({"lingpai":lingpai,"show":"stop"}))
    # 修改用户对面屏幕显示
    redis_store.rpush('itemreviews', json.dumps({"lingpai":lingpai,"show":"stop"}))
    return jsonify(errno=RET.OK, errmsg="成功")

@api.route("/c_stop", methods=["POST"])
@login_required
def c_stop():
    """取消暂停"""
    req_dict = request.get_json()
    lingpai = req_dict.get("lingpai",'')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get("work_addr",'')
    print("++++取消暂停++++",req_dict)
    # 校验数据
    param_keys = ["lingpai","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 修改用户当前状态
    lingpai_obj = LingPai.query.filter_by(user_id=user_id).first()
    if not lingpai_obj:
        return jsonify(errno=RET.DBERR,errmsg="未登录")
    lingpai_obj.status="空闲"
    db.session.add(lingpai_obj)
    db.session.commit()
    # 修改用户头顶屏幕显示
    redis_store.rpush('usershead', json.dumps({"lingpai":lingpai,"show":"start"}))
    # 修改用户对面屏幕显示
    redis_store.rpush('itemreviews', json.dumps({"lingpai":lingpai,"show":"start"}))
    return jsonify(errno=RET.OK, errmsg="成功")

@api.route("/recall", methods=["POST"])
@login_required
def recall():
    """重呼"""
    req_dict = request.get_json()
    water_num = req_dict.get("water_num",'')
    lingpai = req_dict.get("lingpai",'')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get("work_addr",'')
    print("++++重呼++++",req_dict)
    # 校验数据
    param_keys = ["water_num","lingpai","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    number = Business.query.filter_by(water_num=water_num).first().number
    window = LingPai.query.filter_by(lingpai=lingpai).first().win
    redis_store.rpush(addr+"voice", json.dumps({"number":number,"window":window}))
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route("/review_click", methods=["POST"])
@login_required
def review_click():
    """用户屏幕要素互动"""
    req_dict = request.get_json()
    itemreviews = req_dict.get("itemreviews",'')
    current_click = req_dict.get("current_click",'')
    reviewsclick = req_dict.get("reviewsclick",'')
    lingpai = req_dict.get("lingpai",'')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get("work_addr",'')
    print("++++屏幕要素互动++++",req_dict)
    # 校验数据
    param_keys = ["itemreviews","lingpai",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    redis_store.rpush("itemreviews",json.dumps({"lingpai":lingpai,"itemreviews":itemreviews,"reviewsclick":reviewsclick,"current_click":current_click,"show":"true"}))
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route("/people_info", methods=["POST"])
@login_required
def people_info():
    """用户填写信息互动显示"""
    req_dict = request.get_json()
    p_name = req_dict.get("p_name")
    p_project = req_dict.get("p_project")
    lingpai = req_dict.get("lingpai")
    addr = req_dict.get("work_addr",'')
    print("++++用户信息互动++++",req_dict)
    # 校验数据
    param_keys = ["p_name","p_project","lingpai",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    redis_store.rpush("itemreviews",json.dumps({"lingpai":lingpai,"p_name":p_name,"p_project":p_project,"show":"info"}))
    return jsonify(errno=RET.OK,errmsg="成功")
    

@api.route("/cancel", methods=["POST"])
@login_required
def cancel():
    """取消激活"""
    req_dict = request.get_json()
    water_num = req_dict.get('water_num')
    user_id = req_dict.get("user_id")
    addr = req_dict.get("work_addr",'')
    print("++++取消激活++++",req_dict)
    # 校验数据
    param_keys = ["water_num","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    #user_id = g.user_id
    try:
        business = Business.query.filter_by(water_num=water_num).first()
        if business.in_deal==1:
            business.in_deal = 0
            db.session.add(business)
            db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route("/history", methods=["POST"])
@login_required
def history():
    """获取历史详情"""
    req_dict = request.get_json()
    water_num = req_dict.get('water_num')
    user_id = req_dict.get("user_id")
    addr = req_dict.get("work_addr",'')
    print("++++历史详情++++",req_dict)
    # 校验数据
    param_keys = ["water_num","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        business_status = BusinessStatus.query.filter_by(water_num=water_num).order_by(BusinessStatus.modify_time).all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    if business_status:
        return jsonify(errno=RET.OK, errmsg="成功", data=[bs.to_dict() for bs in business_status])
    return jsonify(errno=RET.NODATA, errmsg="无数据")


@api.route("/move", methods=['POST'])
@login_required
def move():
    """转移"""
    req_dict = request.get_json()
    lingpai = req_dict.get('lingpai','')
    subject = req_dict.get('subject','')  # 主题
    item = req_dict.get('item','')  # 事项
    water_num = req_dict.get('water_num','')
    user_id = req_dict.get("user_id",'')
    addr = req_dict.get("work_addr",'')
    print("转移-------", req_dict)
    # 校验数据
    param_keys = ["lingpai","subject","item","water_num","user_id",'work_addr']
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 修改当前叫号情况
    current_call_obj = CurrentCall.query.filter_by(water_num=water_num).first()
    if current_call_obj:
        current_call_obj.status=1
        db.session.add(current_call_obj)
        db.session.commit()
    # 修改用户当前状态
    lingpai_obj = LingPai.query.filter_by(user_id=user_id).first()
    if not lingpai_obj:
        return jsonify(errno=RET.DBERR,errmsg="未登录")
    lingpai_obj.status="空闲"
    db.session.add(lingpai_obj)
    db.session.commit()
    # 修改数据
    try:
        business = Business.query.filter_by(water_num=water_num).first()
        old_subject = business.subject
        business.subject = subject
        business.item = item
        business.move_times += 1
        db.session.add(business)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    # 根据排队时间将数据放入相应队列
    try:
        time_list = redis_store.lrange(addr + subject + "time", 0, -1)
        if time_list:
            for j in range(len(time_list)):
                if business.create_time.strftime('%H%M%S').encode() < time_list[j]:
                    redis_store.linsert(addr + subject, 'before', redis_store.lindex(addr + subject, j),
                                        water_num)
                    redis_store.linsert(addr + subject + "time", 'before',
                                        redis_store.lindex(addr + subject + "time", j),
                                        business.create_time.strftime('%H%M%S'))
            else:
                print("enter else branch")
                redis_store.rpush(addr + subject, water_num)
                redis_store.rpush(addr + subject + "time", business.create_time.strftime('%H%M%S'))
        else:
            print("enter no branch")
            redis_store.lpush(addr + subject, water_num)
            redis_store.lpush(addr + subject + "time", business.create_time.strftime('%H%M%S'))
        # 修改用户头顶屏幕显示
        redis_store.rpush('usershead', json.dumps({"lingpai":lingpai,"length":redis_store.llen(addr + old_subject),"show":"false"}))
        # 修改用户对面屏幕显示
        redis_store.rpush('itemreviews', json.dumps({"lingpai":lingpai,"show":"false"}))
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/codes', methods=['GET', 'POST'])
def code():
    """验证码"""
    infor = Code().creat_code()
    code_id = str(request.args.get('code_id') or '')
    redis_store.set(code_id, infor['code'])
    redis_store.expire(code_id, 30)
    image_path = infor["image_path"]
    #print(infor, code_id)
    with open(image_path, 'rb') as f:
        image_content = f.read()
        f.close()
    os.remove(image_path)
    return Response(image_content, mimetype='jpeg')


@api.route('/iscaptcha', methods=['GET', 'POST'])
def isCaptcha():
    captcha = request.get_json(force=True)
    inputCode = str(captcha['captcha']).replace(' ', '')
    code_id = str(captcha['code_id'])
    code = redis_store.get(code_id)
    if code:
        code = code.decode('utf8')
        if captcha:
            if code.upper() == inputCode.upper():
                return jsonify({'succeed': True, 'msg': '通过'})
            else:
                return jsonify({'succeed': False, 'msg': '验证码错误'})
    else:
        return jsonify({'succeed':True,'msg':'验证码过期'})

@api.route("/search_phone",methods=["GET"])
def search_phone():
    """自动填写电话号码"""
    req_dict = request.get_json()
    idno = request.args.get("idno")
    print("++++自动填写电话号码++++",idno)
    if not idno:
        return jsonify(errno=RET.PARAMERR,errmsg="缺少身份证")
    people = People.query.filter_by(idno=idno).first()
    return jsonify(errno=RET.OK,errmsg="成功",data=people.mobile if people else "")

@api.route("/evaluation", methods=["POST"])
def evaluation():
    req_dict = request.get_json()
    water_num = req_dict.get('water_num')
    current_process = req_dict.get('current_process')
    evaluation = req_dict.get('evaluation')
    print("++++评价++++",req_dict)
    # 校验数据
    param_keys = ["water_num","current_process","evaluation"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,request.args.get(i))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    business_status = BusinessStatus.query.filter_by(water_num=water_num,current_process=current_process).first()
    if business_status:
        business_status.evaluation=evaluation
    else:
        business_status = BusinessStatus(water_num=water_num, current_process=current_process, evaluation=evaluation)
        db.session.add(business_status)
        db.session.commit()
    return jsonify(errno=RET.OK,errmsg="成功") 
