# coding=utf-8
from flask import jsonify, request, current_app
from app.models import Role
from app.api import api
from app import db
from app.utils.response_code import RET

@api.route('/role/users', methods=['POST'])
def findUsers():
    req_dict = request.get_json()
    id = req_dict.get("id")
    if not id:
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        role = Role.query.filter_by(id=id).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    if role:
        users_dict_list = [user.to_dict() for user in role.users.all() if user.enabled=="1"]
        return jsonify(errno=RET.OK, errmsg="成功", data=users_dict_list)
    return jsonify(errno=RET.NODATA, errmsg="无数据")


@api.route('/roles', methods=['GET'])
def findRole():
    try:
        roles = Role.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    if roles:
        roles_dict_list = [role.to_dict() for role in roles]
        return jsonify(errno=RET.OK, errmsg="成功", data=roles_dict_list)
    return jsonify(errno=RET.NODATA, errmsg="无数据")


'''为用户设定角色
    user_id:用户id
    role_id:角色id
'''


@api.route('/add_role', methods=['POST'])
def addRole():
    req_dict = request.get_json(force=True)
    name = req_dict.get("name")
    if not name:
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        role = Role(name=name)
        db.session.add(role)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")

@api.route("/update_role", methods=["POST"])
def updateRole():
    req_dict = request.get_json()
    id = req_dict.get("id")
    name = req_dict.get("name")
    if not all([id,name]):
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        role = Role.query.filter_by(id=id).first()
        role.name = name
        db.session.add(role)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route("/delete_role", methods=["POST"])
def deleteRole():
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    if not id_list:
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        for id in id_list:
            addr = Role.query.filter_by(id=id).first()
            db.session.delete(addr)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/role/remove', methods=['POST'])
def removeRole():
    req_dict = request.get_json()
    id = req_dict.get("id")
    if not id:
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        role = Role.query.filter_by(id=id).first()
        db.session.delete(role)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="删除成功")


