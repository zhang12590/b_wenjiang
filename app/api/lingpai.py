from app.api import api
from app import db
from datetime import datetime, timedelta
from app.models import LingPai, Business, BusinessStatus, User
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_,or_

@api.route("/add_lingpai", methods=['POST'])
@login_required
def add_lingpai():
    """"添加令牌"""
    # 获取参数
    req_dict = request.get_json()
    lingpai = req_dict.get('lingpai')
    win = req_dict.get('win')
    print("++++添加令牌++++", req_dict)
    # 校验数据
    param_keys = ["lingpai","win"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 查询令牌是否存在
    exist_lingpai = LingPai.query.filter_by(lingpai=lingpai).first()
    if exist_lingpai:
        if exist_lingpai.win==win:
            return jsonify(errno=RET.OK, errmsg="成功")
        return jsonify(errno=RET.DBERR,errmsg="该令牌已存在") 
    exist_win = LingPai.query.filter_by(win=win).first()
    if exist_win:
        exist_win.lingpai=lingpai
        db.session.add(exist_win)
        db.session.commit()
        return jsonify(errno=RET.OK, errmsg="成功")
    exist = LingPai(lingpai=lingpai,user_id=0,win=win,user_name='',status="未登录",department='')
    db.session.add(exist)
    db.session.commit()
    return jsonify(errno=RET.OK,errmsg="成功") 

@api.route("/set_lingpai", methods=['POST'])
@login_required
def set_lingpai():
    """"校验令牌"""
    # 获取参数
    req_dict = request.get_json()
    lingpai = req_dict.get('lingpai')
    user_id = int(req_dict.get('user_id'))
    win = req_dict.get('win')
    print("++++校验令牌++++", req_dict)
    # 校验数据
    param_keys = ["lingpai","user_id","win"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    # 查询令牌是否存在
    exist = LingPai.query.filter_by(win=win).first()
    if not exist:
        return jsonify(errno=RET.DBERR,errmsg='窗口不存在')
    elif exist.user_id != user_id and exist.user_id != 0:
        return jsonify(errno=RET.DBERR,errmsg="该令牌有人在使用") 
    elif exist.lingpai != lingpai:
        return jsonify(errno=RET.DBERR,errmsg="令牌不对")
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify(errno=RET.DBERR,errmsg="用户不存在")
    exist.user_name=user.name
    exist.status="空闲"
    exist.user_id=user_id
    exist.department=user.department if user.department else ''
    db.session.add(exist)
    db.session.commit()
    return jsonify(errno=RET.OK,errmsg="成功") 

@api.route("/get_win_info", methods=["GET"])
@login_required
def get_win_info():
    print("++++获取工位++++")
    ret = LingPai.query.all()
    info_dict_list = list()
    for i in ret:
        info_dict_list.append(i.to_dict().__setitem__("login_time",i.modify_time.strftime("%Y-%m-%d %H:%M:%S")) if i.user_id != 0 else i.to_dict())
    return jsonify(errno=RET.OK,errmsg="成功",data=info_dict_list)

@api.route("/delete_win_info", methods=["POST"])
@login_required
def delete_win_info():
    req_dict = request.get_json()
    id = req_dict.get('id')
    print("++++删除工位++++", req_dict)
    # 校验数据
    param_keys = ["id"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    ret = Lingpai.query.filter_by(id=id).first()
    db.session.delete(ret)
    db.session.commit()
    return jsonify(errno=RET.OK,errmsg='成功')


    
