# coding=utf-8
from flask import jsonify, request, current_app
from app.models import User
from app.api import api
from app import db
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_,or_


@api.route("/users", methods=["GET"])
def get_user():
    department = request.args.get('department')
    if not department:
        return jsonify(errno=RET.PARAMERR, errmsg='缺少部门参数')
    print("++++获取用户++++",department)
    try:
        users = User.query.filter_by(enabled='1',department=department).all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    if users:
        users_dict_list = [user.to_dict() for user in users]
        return jsonify(errno=RET.OK, errmsg="成功", data=users_dict_list)
    return jsonify(errno=RET.OK, errmsg="无数据", data=[])
'''
分页查询
参数
    pageNumber:当前页
    pageSize:显示条目
    查询条件(为空查询所有):
            uname:用户名称
            uphone:电话号码
'''


@api.route("/user/find", methods=['POST'])
def findUser():
    req_dict = request.get_json()
    pageNumber = req_dict.get('pageNumber',1)
    pageSize = 10
    name = req_dict.get("name")
    mobile = req_dict.get('mobile')
    # 校验数据
    param_keys = ["name","mobile"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        users = User.query.filter(User.name.ilike('%' + name + '%'),
                             User.mobile.ilike('%' + mobile + '%'), User.enabled == '1').all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    start = (pageNumber - 1) * pageSize
    end = start + pageSize
    if users:
        row = users[start:end]
        users_dict_list = [user.to_dict() for user in row]
        return jsonify(errno=RET.OK, errmsg="成功", data=users_dict_list)
    return jsonify(errno=RET.NODATA, errmsg="无数据")


'''
新增用户
参数
    login_name:登陆名
    user_name:用户名称
    email:电子邮箱
    mobile:电话号码
    area_name:服务区
    
'''


@api.route("/user/add", methods=['POST'])
@login_required
def adduser():
    req_dict = request.get_json()
    login_name = req_dict.get('login_name')
    mobile = req_dict.get('mobile')
    name = req_dict.get('name')
    email = req_dict.get('email')
    role_id = req_dict.get('role_id')
    department = req_dict.get('department')
    print('添加用户-------------',req_dict)
    # 校验数据
    param_keys = ["login_name","mobile","name","email","role_id","department"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 前端传入的对象
    user = User(login_name=login_name, mobile=mobile, name=name, email=email, role_id=role_id,department=department)
    user.password = "123456"
    try:
        exist = User.query.filter(or_(User.login_name==login_name,User.mobile==mobile,User.email==email)).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="账号或电话或邮箱重复")
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="账号、电话、邮箱不能重复")
    return jsonify(errno=RET.OK, errmsg="成功")



'''
修改用户信息
参数 
    id:用户id
    user_name:用户名称
    email:电子邮箱
    mobile:电话号码
'''


@api.route("/user/modify", methods=['POST'])
@login_required
def modifyuser():
    # 前端传入的对象
    req_dict = request.get_json()
    id = req_dict.get("id")
    mobile = req_dict.get("mobile")
    name = req_dict.get("name")
    email = req_dict.get("email")
    role_id = req_dict.get("role_id")
    department = req_dict.get('department')
    print('修改用户-------------',req_dict)
    # 校验数据
    param_keys = ["id","mobile","name","email","role_id","department"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        user = User.query.filter_by(id=id).first()
        if user.mobile != mobile or user.email != email:
            exist = User.query.filter(or_(User.mobile==mobile,User.email==email)).all()
            if exist is not None and exist[0].id != id:
                return jsonify(errno=RET.DBERR,errmsg="电话或邮箱重复")
        user.mobile = mobile
        user.name = name
        user.email = email
        user.role_id = role_id
        user.department = department
        db.session.add(user)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="账号、电话、邮箱不能重复")
    return jsonify(errno=RET.OK, errmsg="成功")


'''
修改密码
参数
    id：用户id
    oldpwd:旧密码
    newpwd:新密码
'''


@api.route("/modifyPwd", methods=['POST'])
@login_required
def modifyPwdif():
    req_dict = request.get_json()
    login_name = req_dict.get("login_name")
    oldpwd = req_dict.get("oldpwd")
    newpwd = req_dict.get("newpwd")
    print('修改密码-------------',req_dict)
    # 校验数据
    param_keys = ["login_name","oldpwd","newpwd"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        user = User.query.filter_by(login_name=login_name).first()
        if user:
            if user.check_password(oldpwd):
                user.password = newpwd
                db.session.add(user)
                db.session.commit()
                return jsonify(errno=RET.OK, errmsg="成功")
            else:
                return jsonify(errno=RET.PWDERR, errmsg="旧密码错误")
        else:
            return jsonify(errno=RET.USERERR, errmsg="用户不存在")
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")

'''
删除用户(假删除，修改用户状态)
参数
    id:用户id
'''


@api.route('/user/remove', methods=['POST'])
@login_required
def removeuser():
    req_dict = request.get_json(force=True)
    id_list = req_dict.get("id_list")
    print('删除用户-------------',req_dict)
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
            user = User.query.filter_by(id=id).first()
            if user:
                #user.enabled = '0'
                db.session.delete(user)
                db.session.commit()
        return jsonify(errno=RET.OK, errmsg="删除成功")
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
