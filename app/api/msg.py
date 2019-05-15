from app.api import api
from app import db
from app.models import Msg
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_

@api.route("/msgs", methods=["GET"])
def get_msg():
    print("++++获取短信++++")
    try:
        msgs = Msg.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    if msgs:
        return jsonify(errno=RET.OK, errmsg="成功", data={"msgs":[msg.to_dict() for msg in msgs]})
    return jsonify(errno=RET.NODATA, errmsg="无数据")


@api.route("/add_msg", methods=["POST"])
@login_required
def add_msg():
    req_dict = request.get_json()
    step = req_dict.get("step")
    start_msg = req_dict.get("start_msg")
    pass_msg = req_dict.get("pass_msg")
    unpass_msg = req_dict.get("unpass_msg")
    print("++++添加短信++++",req_dict)
    # 校验数据
    param_keys = ["step","start_msg","pass_msg","unpass_msg"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Msg.query.filter_by(step=step).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        msg = Msg(step=step,start_msg=start_msg,pass_msg=pass_msg,unpass_msg=unpass_msg)
        db.session.add(msg)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.UNKOWNERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")

@api.route('/update_msg', methods=['POST'])
@login_required
def update_Msg():
    req_dict = request.get_json()
    id = req_dict.get('id')
    step = req_dict.get('step')
    start_msg = req_dict.get("start_msg")
    pass_msg = req_dict.get("pass_msg")
    unpass_msg = req_dict.get("unpass_msg")
    print("++++修改短信++++",req_dict)
    # 校验数据
    param_keys = ["id","step","start_msg","pass_msg","unpass_msg"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        msg = Msg.query.filter_by(id=id).first()
        if msg.step != step:
            exist = Msg.query.filter_by(step=step).all()
            if exist:
                return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        msg.step=step
        msg.start_msg=start_msg
        msg.pass_msg=pass_msg
        msg.unpass_msg=unpass_msg
        db.session.add(msg)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_msg', methods=['POST'])
@login_required
def delete_msg():
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    print("++++删除短信++++",req_dict)
    # 校验数据
    param_keys = ["id_list"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        for id in id_list:
            msg = Msg.query.filter_by(id=id).first()
            db.session.delete(msg)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
    
