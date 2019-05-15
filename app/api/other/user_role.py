# coding=utf-8

from flask import request, current_app
from flask.json import jsonify
from app.models import *
from app.api import api
from app import db
from app.utils.response_code import RET

'''查询用户所拥有角色
    user_id:用户id
'''


@api.route('/role/user/find', methods=['GET'])
def findRoleUser():
    user_id = int(request.args.get('user_id'))
    if not user_id:
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        user = User.query.filter_by(id=user_id).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    if user != None:
        return jsonify(errno=RET.OK, errmsg="成功",
                       data={'rows': [role.to_json() for role in user.rolees.all()], 'total': len(user.rolees.all())})
    else:
        return jsonify(errno=RET.DBERR, errmsg="失败")


# 查询所有角色
@api.route('/role/find', methods=['GET'])
def findRole():
    try:
        roles = Role.query.order_by(Role.createdate.desc()).all()
        total = Role.query.count()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    return jsonify(errno=RET.OK, errmsg="成功", data={'rows': [role.to_json() for role in roles], 'total': total})


'''为用户设定角色
    user_id:用户id
    role_id:角色id
'''


@api.route('/role/save', methods=['POST'])
def saveRole():
    dataJson = request.get_json(force=True)
    user_id = int(dataJson['user_id'])
    role_id = int(dataJson['role_id'])
    if not all([user_id, role_id]):
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        user = User.query.filter_by(id=user_id).first()
        # 一个用户一个角色，若要改成多个角色，需要循环添加
        ro = Role.query.filter_by(id=role_id).first()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    if user and ro:
        userRole = user.rolees.all()
        for urole in userRole:
            user.rolees.remove(urole)
        user.rolees.append(ro)
        try:
            db.session.commit()
        except Exception as e:
            current_app.logger.error(e)
            return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
        return jsonify(errno=RET.OK, errmsg="保存角色成功")
    else:
        return jsonify(errno=RET.DBERR, errmsg="保存角色失败")


'''
删除角色
    参数:role_ids:角色id集合
'''


@api.route('/role/remove', methods=['POST'])
def removeRole():
    dataJson = request.get_json(force=True)
    role_ids = list(dataJson['role_ids'] or [])
    if not role_ids:
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    for role_id in role_ids:
        try:
            role = Role.query.filter_by(id=role_id).first()
        except Exception as e:
            current_app.logger.error(e)
            return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
        if not role:
            return jsonify(errno=RET.DBERR, errmsg="删除失败")
        else:
            if not role.user.all():
                # 循环角色删除所属权限
                rolePermission = role.permissiones.all()
                for prole in rolePermission:
                    role.permissiones.remove(prole)
                db.session.delete(role)
                try:
                    db.session.commit()
                except Exception as e:
                    current_app.logger.error(e)
                    return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
                return jsonify(errno=RET.OK, errmsg="删除成功")
            else:
                return jsonify(errno=RET.DBERR, errmsg="请先处理绑定该角色的用户，删除失败")
