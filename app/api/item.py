from app.api import api
from app import db
from app.models import Subject, Item, Step
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import sort_item_by_click
from app.utils.commons import login_required, add_time_step_to_business
from app.constants import step_map
from sqlalchemy import and_,or_


@api.route("/get_item_steps", methods=['GET'])
@login_required
def get_item_steps():
    item = request.args.get('item')
    print("++++获取事项流程++++",item)
    if not item:
        return jsonify(errno=RET.PARAMERR, errmsg='缺失事项')
    try:
        current_item = Item.query.filter_by(name=item).first()
        if not current_item:
            return jsonify(errno=RET.DBERR, errmsg="没有该事项")
        steps = current_item.steps.all()
        ret = [i.to_dict() for i in steps]
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    return jsonify(errno=RET.OK, errmsg="成功", data=ret)


@api.route("/items", methods=['GET'])
def items():
    addr = request.args.get('work_addr')
    subject = request.args.get("subject")
    print("++++获取事项++++",subject,addr)
    # 校验数据
    param_keys = ["subject","work_addr"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,request.args.get(i))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        current_subject = Subject.query.filter_by(name=subject).first()
        items = Item.query.filter(Item.subject_id==current_subject.id).all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
    items_dict_list = list()
    if items:
        for item in items:
            item_dict = item.to_dict()
            item_dict.__setitem__("steps",[step.to_dict() for step in item.steps.all()])
            items_dict_list.append(item_dict)
        return jsonify(errno=RET.OK, errmsg="成功", data={"items": items_dict_list})
    return jsonify(errno=RET.NODATA, errmsg="无数据")

@api.route('/add_item', methods=['POST'])
@login_required
def add_item():
    """添加事项."""
    req_dict = request.get_json()
    subject_id = req_dict.get("subject_id")
    name = req_dict.get("name")
    step = req_dict.get("step")
    process = req_dict.get("process")
    level = req_dict.get("level")
    cate = req_dict.get("cate")
    industry = req_dict.get("industry")
    frequent = req_dict.get("frequent")
    timeout = req_dict.get("timeout")
    print("++++添加事项++++",req_dict)
    # 校验数据
    param_keys = ["subject_id","name","step","process","level","cate","industry","frequent","timeout"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Item.query.filter_by(name=name).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        current_item = Item(name=name,step=step,process=process,level=level,cate=cate,
                            industry=industry,frequent=frequent,timeout=timeout,subject_id=subject_id)
        db.session.add(current_item)
        db.session.commit()
        step_list = process.split("-",step-1)
        for i in step_list:
            current_step = Step(name=i,order=step_map[i],item_id=current_item.id)
            db.session.add(current_step)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/update_item', methods=['POST'])
@login_required
def update_item():
    """修改事项."""
    req_dict = request.get_json()
    id = req_dict.get("id")
    subject_id = req_dict.get('subject_id')
    name = req_dict.get('name')
    step = req_dict.get("step")
    process = req_dict.get("process")
    level = req_dict.get("level")
    cate = req_dict.get("cate")
    industry = req_dict.get("industry")
    frequent = req_dict.get("frequent")
    timeout = req_dict.get("timeout")
    print("++++修改事项++++",req_dict)
    # 校验数据
    param_keys = ["id","subject_id","name","step","process","level","cate","industry","frequent","timeout"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        current_item = Item.query.filter_by(id=id).first()
        if current_item.name != name:
            exist = Item.query.filter_by(name=name).all()
            if exist:
                return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        current_item.name = name
        current_item.step = step
        current_item.process = process
        current_item.level = level
        current_item.cate = cate
        current_item.industry = industry
        current_item.frequent = frequent
        current_item.timeout = timeout
        current_item.subject_id = subject_id
        for i in current_item.steps.all():
            db.session.delete(i)
        db.session.add(current_item)
        db.session.commit()
        step_list = process.split("-", step - 1)
        for i in step_list:
            current_step = Step(name=i, order=step_map[i], item_id=current_item.id)
            db.session.add(current_step)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_item', methods=['POST'])
@login_required
def delete_item():
    """删除事项."""
    req_dict = request.get_json()
    id_list = req_dict.get('id_list')
    print("++++删除事项++++",req_dict)
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
            item = Item.query.filter_by(id=id).first()
            for i in item.steps.all():
                db.session.delete(i)
            db.session.delete(item)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
