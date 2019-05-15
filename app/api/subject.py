from app.api import api
from app import db, redis_store
from app.models import Subject
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import sort_subject_by_click
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_,or_


@api.route("/subjects", methods=['GET'])
def subjects():
    addr = request.args.get("work_addr")
    print("++++获取主题++++",addr)
    if not addr:
        return jsonify(errno=RET.PARAMERR,errmsg="缺少地址")
    try:
        subjects = Subject.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    if subjects:
        subjects_dict_list = [subject.to_dict() for subject in subjects]
        try:
            for i in subjects_dict_list:
                i.__setitem__("wait",redis_store.llen(addr + i["name"]))
        except Exception as e:
            current_app.logger.error(e)
            return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
        return jsonify(errno=RET.OK, errmsg="成功", data={"subjects": subjects_dict_list})
    return jsonify(errno=RET.NODATA, errmsg="无数据")

@api.route('/add_subject', methods=['POST'])
@login_required
def add_subject():
    """添加主题."""
    req_dict = request.get_json()
    name = req_dict.get('name')
    seq = req_dict.get("seq")
    area = req_dict.get('area')
    print("++++添加主题++++",req_dict)
    # 校验数据
    param_keys = ["name","seq","area"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Subject.query.filter(or_(Subject.name==name,Subject.seq==seq)).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        subject = Subject(name=name,seq=seq,area=area)
        db.session.add(subject)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.UNKOWNERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/update_subject', methods=['POST'])
@login_required
def update_subject():
    """修改主题."""
    req_dict = request.get_json()
    id = req_dict.get('id')
    name = req_dict.get('name')
    seq = req_dict.get("seq")
    area = req_dict.get('area')
    print("++++修改主题++++",req_dict)
    # 校验数据
    param_keys = ["id","name","seq","area"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Subject.query.filter(or_(Subject.name==name,Subject.seq==seq)).all()
        if len(exist)>1:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        subject = Subject.query.filter_by(id=id).first()
        subject.name = name
        subject.seq = seq
        subject.area = area
        db.session.add(subject)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_subject', methods=['POST'])
@login_required
def delete_subject():
    """删除主题."""
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    print("++++删除主题++++",req_dict)
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
            subject = Subject.query.filter_by(id=id).first()
            db.session.delete(subject)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
