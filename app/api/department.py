from app.api import api
from app import db
from app.models import Department
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_


@api.route('/get_departments', methods=["GET"])
def get_department():
    print("++++获取部门++++")
    try:
        departments = Department.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.UNKOWNERR, errmsg="数据库错误")
    if departments:
        return jsonify(errno=RET.OK, errmsg="成功", data=[department.to_dict() for department in departments])
    return jsonify(errno=RET.NODATA, errmsg="无数据")


@api.route('/add_department', methods=['POST'])
@login_required
def add_department():
    """添加"""
    req_dict = request.get_json()
    addr = req_dict.get('addr')
    department = req_dict.get('department')
    subjects = req_dict.get('subjects')
    print("++++添加部门++++",req_dict)
    # 校验数据
    param_keys = ["addr","department","subjects"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Department.query.filter_by(addr=addr,department=department).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        obj = Department(addr=addr,department=department,subjects=subjects)
        db.session.add(obj)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.UNKOWNERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/update_department', methods=['POST'])
@login_required
def update_department():
    """修改"""
    req_dict = request.get_json()
    id = req_dict.get('id')
    addr = req_dict.get('addr')
    department = req_dict.get('department')
    subjects = req_dict.get('subjects')
    print("++++更新部门++++",req_dict)
    # 校验数据
    param_keys = ["id","addr","department","subjects"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        obj = Department.query.filter_by(id=id).first()
        if obj.addr != addr or obj.department != department:
            exist = Department.query.filter_by(addr=addr,department=department).all()
            if exist:
                return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        obj.addr = addr
        obj.department = department
        obj.subjects = subjects
        db.session.add(obj)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_department', methods=['POST'])
@login_required
def delete_department():
    """删除"""
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    print("++++删除部门++++",req_dict)
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
            obj = Department.query.filter_by(id=id).first()
            db.session.delete(obj)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
