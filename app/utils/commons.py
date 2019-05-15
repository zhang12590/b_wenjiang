from werkzeug.routing import BaseConverter
from flask import session, jsonify, g
from app.utils.response_code import RET
import functools


# 定义正则转换器
class ReConverter(BaseConverter):
    """"""

    def __init__(self, url_map, regex):
        # 调用父类的初始化方法
        super(ReConverter, self).__init__(url_map)
        # 保存正则表达式
        self.regex = regex


# 定义的验证登录状态的装饰器
def login_required(view_func):
    @functools.wraps(view_func)
    def warpper(*args, **kwargs):
        return view_func(*args, **kwargs)
        ## 判断用户的登录状态
        #user_id = session.get("user_id")
        #role_id = session.get("role_id")
        ## 如果用户是登录的,执行视图函数
        #if user_id and role_id:
        #    # 将user_id保存到g对象中，在视图函数中可以功过g对象获取保存的数据
        #    g.user_id = user_id
        #    g.role_id = role_id
        #    return view_func(*args, **kwargs)
        #else:
        #    # 如果未登录，返回未等了的信息
        #    return jsonify(errno=RET.SESSIONERR, errmsg="未登录")

    return warpper


def add_time_step_to_business(business):
    """增加事件时间段"""
    business_dict = business.to_dict()
    business_dict.__setitem__("start_time", "")
    business_dict.__setitem__("end_time", "")
    business_dict.__setitem__("deal_status", "")
    business_dict.__setitem__("evaluation", "")
    return business_dict


def get_data_from_redis(ret):
    """格式化缓存数据"""
    return ret if ret else b'0'


def sort_subject_by_click(obj_list, addr):
    """根据点击量排序主题"""
    def sort_by_click(obj):
        from app.models import Business
        click_objs = Business.query.filter_by(subject=obj.name,addr=addr).all()
        return sum(click_objs)
    obj_list.sort(key=sort_by_click, reverse=True)
    return obj_list


def sort_item_by_click(obj_list, addr):
    """根据点击量排序事项"""
    def sort_by_click(obj):
        from app.models import Business
        click_objs = Business.query.filter_by(item=obj.name,addr=addr).all()
        return sum(click_objs)
    obj_list.sort(key=sort_by_click, reverse=True)
    return obj_list
