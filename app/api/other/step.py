from app.api import api
from app import db
from app.models import Item, Step
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from sqlalchemy import and_


@api.route("/steps", methods=['GET'])
def get_step():
    # addr = request.cookies.get('addr')
    item = request.args.get("item")
    if not all([item]):
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        current_item = Item.query.filter_by(name=item).first()
        steps = Step.query.filter(Step.item_id == current_item.id).order_by(Step.order).all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.SERVERERR, errmsg="内部错误")
    if steps:
        steps_dict_list = [step.to_dict() for step in steps]
        return jsonify(errno=RET.OK, errmsg="成功", data={"steps": steps_dict_list})
    return jsonify(errno=RET.NODATA, errmsg="无数据")


@api.route("/add_step", methods=["POST"])
def add_step():
    req_dict = request.get_json()
    item_id = req_dict.get('item_id')
    name = req_dict.get('name')
    order = req_dict.get('order')
    if not all([item_id,name,order]):
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        current_step = Step(name=name,order=order,item_id=item_id)
        db.session.add(current_step)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/update_step', methods=['POST'])
def update_step():
    """修改事项."""
    req_dict = request.get_json()
    id = req_dict.get("id")
    item_id = req_dict.get('item_id')
    name = req_dict.get('name')
    order = req_dict.get('order')
    if not all([id,item_id,name,order]):
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        current_step = Item.query.filter_by(id=id).first()
        current_step.name = name
        current_step.order = order
        current_step.item_id = item_id
        db.session.add(current_step)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_step', methods=['POST'])
def delete_step():
    """删除事项."""
    req_dict = request.get_json()
    id_list = req_dict.get('id_list')
    if not id_list:
        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
    try:
        for id in id_list:
            step = Step.query.filter_by(id=id).first()
            db.session.delete(step)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
