from app.api import api
from app import db
from app.models import Location,Subject
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_


@api.route('/get_locations', methods=["GET"])
def get_location():
    print("++++获取区域++++")
    try:
        locations = Location.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.UNKOWNERR, errmsg="数据库错误")
    if locations:
        return jsonify(errno=RET.OK, errmsg="成功", data=[location.to_dict() for location in locations])
    return jsonify(errno=RET.NODATA, errmsg="无数据")


@api.route('/add_location', methods=['POST'])
@login_required
def add_location():
    """添加区域"""
    req_dict = request.get_json()
    addr = req_dict.get('addr')
    location = req_dict.get('location')
    subject_id = req_dict.get("subject_id")
    print("++++添加区域++++",req_dict)
    # 校验数据
    param_keys = ["addr","location","subject_id"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        subject_obj = Subject.query.filter_by(id=subject_id).first()
        subject_name = subject_obj.name
        exist = Location.query.filter_by(addr=addr,subject=subject_name,location=location).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        obj = Location(addr=addr,location=location,subject=subject_name)
        db.session.add(obj)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.UNKOWNERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/update_location', methods=['POST'])
@login_required
def update_location():
    """修改主题."""
    req_dict = request.get_json()
    id = req_dict.get('id')
    addr = req_dict.get('addr')
    location = req_dict.get('location')
    subject_id = req_dict.get("subject_id")
    print("++++更新窗口++++",req_dict)
    # 校验数据
    param_keys = ["id","addr","location","subject_id"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        subject_obj = Subject.query.filter_by(id=subject_id).first()
        subject_name = subject_obj.name
        obj = Location.query.filter_by(id=id).first()
        if obj.addr != addr or obj.subject != subject_name:
            exist = Location.query.filter_by(addr=addr,subject=subject_name,location=location).all()
            if exist:
                return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        obj.addr = addr
        obj.location = location
        obj.subject = subject_name
        db.session.add(obj)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_location', methods=['POST'])
@login_required
def delete_location():
    """删除主题."""
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    print("++++删除窗口++++",req_dict)
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
            obj = Location.query.filter_by(id=id).first()
            db.session.delete(obj)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
