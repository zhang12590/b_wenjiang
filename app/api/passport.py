from app.api import api
from flask import request, jsonify, current_app, session
from app import redis_store, constants, db
from app.models import User,LingPai,Department
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy.exc import IntegrityError
import re




@api.route("/sessions", methods=["POST"])
def login():
    """用户登录
    参数： 账号密码
    :return:
    """
    # 获取参数
    req_dict = request.get_json()
    username = req_dict.get("username")
    password = req_dict.get("password")
    # 校验参数
    print("++++登录++++", req_dict)
    # 参数完整校验
    if not all([username, password]):
        return jsonify(errno=RET.PARAMERR, errmsg="参数不完整")
    # 从数据库中根据手机号查询用户的数据对象
    try:
        user = User.query.filter_by(login_name=username).first()
        # step_dict = [{"id":step.id,"item":step.item.name,"order":step.order}for step in user.steps.all()]
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="获取用户信息失败")
    # 用数据库的密码与用户填写的密码进行对比验证
    if user is None or not user.check_password(password):
        return jsonify(errno=RET.DATAERR, errmsg="用户名或密码错误")
    #exist = LingPai.query.filter_by(user_id=user.id).first()
    #if exist:
    #    return jsonify(errno=RET.DBERR,errmsg="已经在其他地方登录")
    # 如果验证相同成功，保存登录状态， 在session中
    session["username"] = user.login_name
    session["user_id"] = user.id
    session["role_id"] = user.role_id

    data = user.to_dict()
    department = data["department"]
    if department != "所有":
        department_obj = Department.query.filter_by(department=department).first()
        subject = department_obj.subjects
        data.__setitem__("subject",subject)
    return jsonify(errno=RET.OK, errmsg="成功", data=data)


@api.route("/session_exist", methods=["GET"])
def check_login():
    """检查登录状态"""
    # 尝试从session中获取用户账号
    username = session.get("username")
    # 如果session中数据userAccount存在，则表示用户已登录，否则未登录
    if username is not None:
        user = User.query.filter_by(login_name=username).first()
        print("验证登录通过")
        return jsonify(errno=RET.OK, errmsg="成功", data=user.to_dict())
    else:
        print("验证登录未通过")
        return jsonify(errno=RET.DBERR, errmsg="未登录")


@api.route("/session", methods=["GET"])
@login_required
def logout():
    """登出"""
    user_id = int(request.args.get("user_id"))
    print("++++退出++++",user_id)
    try:
        assert type(user_id)==int
    except:
        return jsonify(errno=RET.PARAMERR, errmsg="数据类型错误")
    # 清除session数据
    #csrf_token = session.get("csrf_token")
    lingpai_obj = LingPai.query.filter_by(user_id=user_id).first()
    if lingpai_obj:
        lingpai_obj.user_id=0
        lingpai_obj.user_name=""
        lingpai_obj.status="未登录"
        db.session.add(lingpai_obj)
        db.session.commit()
    session.clear()
    #session["csrf_token"] = csrf_token
    return jsonify(errno=RET.OK, errmsg="ok")
