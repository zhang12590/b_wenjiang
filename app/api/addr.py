from app.api import api
from app import db
from app.models import Addr
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_,or_

@api.route("/addr", methods=['GET', 'POST'])
def get_addr():
    """获取地点 选择地点"""
    try:
        addrs = Addr.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    if not addrs:
        return jsonify(errno=RET.NODATA, errmsg="无数据")
    if request.method == "GET":
        print("++++获取地点++++")
        addrs_dict_list = [addr.to_dict() for addr in addrs]
        return jsonify(errno=RET.OK, errmsg="成功", data={"addrs": addrs_dict_list})
    if request.method == "POST":
        req_dict = request.get_json()
        addr = req_dict.get("work_addr","")
        print("++++选择地点++++", req_dict)
        if not addr:
            return jsonify(errno=RET.PARAMERR, errmsg="缺少地址")
        resp = jsonify(errno=RET.OK, errmsg="成功")
        #resp.set_cookie("addr", addr, max_age=30*24*60*60)
        return resp

@api.route('/add_addr', methods=['POST'])
@login_required
def add_addr():
    """添加地点"""
    req_dict = request.get_json()
    name = req_dict.get('name')
    seq = req_dict.get("seq")
    print("++++添加地点++++", req_dict)
    # 校验数据
    param_keys = ["name","seq"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Addr.query.filter(or_(Addr.name==name,Addr.seq==seq)).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        addr = Addr(name=name,seq=seq)
        db.session.add(addr)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.UNKOWNERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/update_addr', methods=['POST'])
@login_required
def update_addr():
    """修改地点"""
    req_dict = request.get_json()
    id = req_dict.get('id')
    name = req_dict.get('name')
    seq = req_dict.get("seq")
    print("++++修改地点++++", req_dict)
    # 校验数据
    param_keys = ["id","name","seq"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Addr.query.filter(or_(Addr.name==name,Addr.seq==seq)).all()
        if len(exist)>1:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        addr = Addr.query.filter_by(id=id).first()
        addr.name = name
        addr.seq = seq
        db.session.add(addr)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_addr', methods=['POST'])
@login_required
def delete_addr():
    """删除地点"""
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    print("++++删除地点++++", req_dict)
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
            addr = Addr.query.filter_by(id=id).first()
            db.session.delete(addr)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
