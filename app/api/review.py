from app.api import api
from app import db
from app.models import Review, Item
from flask import jsonify, request, current_app
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from sqlalchemy import and_


@api.route("/reviews", methods=['POST'])
def get_reviews():
    req_dict = request.get_json()
    item = req_dict.get("item")
    print("++++获取要素++++",req_dict)
    # 校验数据
    param_keys = ["item"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    step_reviews_list = list()
    try:
        current_item = Item.query.filter_by(name=item).first()
        for step in current_item.steps.all():
            review_list = [review.to_dict() for review in step.reviews.all()]
            for i in review_list:
                i.__setitem__("father_order",step.order)
                i.__setitem__("process",current_item.process)
            #step_reviews_list.append({"id":step.id,"name":step.name,"reviews":review_list})
            step_reviews_list.extend(review_list)
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    return jsonify(errno=RET.OK, errmsg="成功", data=step_reviews_list)

@api.route('/add_review', methods=['POST'])
@login_required
def add_review():
    """添加审查要素.
    :return:
    """
    req_dict = request.get_json()
    step_id = req_dict.get('step_id')
    name = req_dict.get('name')
    requ = req_dict.get('requ')
    need = req_dict.get('need')
    permit = req_dict.get('permit')
    print("++++添加要素++++",req_dict)
    # order = req_dict.get('order')
    # 校验数据
    param_keys = ["step_id","name","requ","need","permit"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Review.query.filter_by(name=name,step_id=step_id).all()
        if exist:
            return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        review = Review(name=name,requ=requ,need=need,permit=permit,step_id=step_id)
        db.session.add(review)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="添加失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/update_review', methods=['POST'])
@login_required
def update_review():
    """修改审查要素."""
    req_dict = request.get_json()
    id = req_dict.get('id')
    step_id = req_dict.get('step_id')
    name = req_dict.get('name')
    requ = req_dict.get('requ')
    need = req_dict.get('need')
    permit = req_dict.get('permit')
    print("++++更新要素++++",req_dict)
    # order = req_dict.get('order')
    # 校验数据
    param_keys = ["id","step_id","name","requ","need","permit"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        review = Review.query.filter_by(id=id).first()
        if review.name != name or review.step_id != step_id:
            exist = Review.query.filter_by(name=name,step_id=step_id).all()
            if exist:
                return jsonify(errno=RET.DBERR,errmsg="数据有重复")
        review.name = name
        review.requ = requ
        review.need = need
        review.permit = permit
        # review.order = order
        review.step_id = step_id
        db.session.add(review)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route('/delete_review', methods=['POST'])
@login_required
def delete_review():
    """删除审查要素."""
    req_dict = request.get_json()
    id_list = req_dict.get('id_list')
    print("++++删除要素++++",req_dict)
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
            review = Review.query.filter_by(id=id).first()
            db.session.delete(review)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")
