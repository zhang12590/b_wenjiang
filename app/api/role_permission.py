# coding=utf-8

from flask import request, current_app, jsonify
from app.models import Role,Permission
from app.api import api
from app import db
from app.utils.response_code import RET
from app.utils.commons import login_required, add_time_step_to_business
from app.utils.commons import login_required

#''' 
#查询用户权限与角色
#    参数：User_id:用户id
#'''
#
#
#@api.route('/permission/by/user', methods=['GET'])
#def findPermissionByUser():
#    user_id = int(request.args.get('user_id'))
#    if not user_id:
#        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
#    try:
#        user = User.query.filter_by(id=user_id).first()
#    except Exception as e:
#        current_app.logger.error(e)
#        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
#    # 用户所属角色
#    urole = [role.to_json() for role in user.rolees.all()]
#    # 用户所属权限 #todo
#    up_user = []
#    for role in user.rolees.all():
#        up_user = [permission.to_json() for permission in role.permissiones.all()]
#    return jsonify(errno=RET.OK, errmsg="成功",
#                   data={'role': urole, 'permission': up_user})
#
#
## 查询角色权限
#@api.route('/permission/by/role', methods=['GET'])
#def findByPermission():
#    role_id = int(request.args.get('role_id'))
#    if not role_id:
#        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
#    try:
#        roles = Role.query.filter_by(id=role_id).first()
#    except Exception as e:
#        current_app.logger.error(e)
#        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
#    if not roles:
#        return jsonify(errno=RET.DBERR, errmsg="失败")
#    role_permission = roles.permissiones.all()
#    return jsonify(errno=RET.OK, errmsg="成功",
#                   data={'rows': [permission.to_json() for permission in role_permission],
#                         'total': len(role_permission)})
#
#
#'''
#新增角色
#参数:name:角色名称
#    permission_id:权限id集合
#'''
#
#
#@api.route('/role/permission/add', methods=['POST'])
#def addRole():
#    dataJson = request.get_json(force=True)
#    name = str(dataJson['name'] or '')
#    permission_id = list(dataJson['permission_id'] or [])
#    if not all([name, permission_id]):
#        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
#    role = Role(name=name)
#    for pid in permission_id:
#        per = Permission.query.filter_by(id=pid).first()
#        role.permissiones.append(per)
#    try:
#        db.session.add(role)
#        db.session.commit()
#    except Exception as e:
#        current_app.logger.error(e)
#        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
#    return jsonify(errno=RET.OK, errmsg="保存成功")
#
#
#'''
#修改角色
#参数:role_id:角色id
#    name:角色名称
#    permission_id:权限id集合
#'''
#
#
#@api.route('/role/modify', methods=['POST'])
#def modifyRole():
#    dataJson = request.get_json(force=True)
#    role_id = int(dataJson['role_id'])
#    name = str(dataJson['name'] or '')
#    permission_id = list(dataJson['permission_id'] or [])
#    if not all([role_id, name, permission_id]):
#        return jsonify(errno=RET.PARAMERR, errmsg="数据不完整")
#    try:
#        role = Role.query.filter_by(id=role_id).first()
#    except Exception as e:
#        current_app.logger.error(e)
#        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
#    role.name = name
#    rolePermission = role.permissiones.all()
#    # 循环删除权限，循环增加新权限
#    for prole in rolePermission:
#        role.permissiones.remove(prole)
#    for pid in permission_id:
#        try:
#            per = Permission.query.filter_by(id=pid).first()
#        except Exception as e:
#            current_app.logger.error(e)
#            return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
#        role.permissiones.append(per)
#    db.session.add(role)
#    try:
#        db.session.commit()
#    except Exception as e:
#        current_app.logger.error(e)
#        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
#    return jsonify(errno=RET.OK, errmsg="成功")
#
#
#'''
#查询所有权限(树形结构)
#    参数:permission_code:当前权限code
#'''
#
#
#@api.route('/permission/tree', methods=['POST'])
#def test_find():
#    dataJson = request.get_json()
#    f_code = str(dataJson['permission_code'] or '')
#    treelist = []
#    try:
#        permissions = Permission.query.filter_by(father_permission_code=f_code).all()
#    except Exception as e:
#        current_app.logger.error(e)
#        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
#    if permissions:
#        chlist = {}
#        chlist['id'] = permissions[0].id
#        chlist['name'] = permissions[0].permission_name
#        chlist['code'] = permissions[0].permission_code
#        # 递归生成child
#
#        chlist['child'] = createChild(permissions[0].permission_code)
#        if chlist:
#            treelist.append(chlist)
#        return jsonify(errno=RET.OK, errmsg="成功", data={"treelist": treelist})
#    else:
#        return jsonify(errno=RET.DBERR, errmsg="未设置顶级权限，查询出错")
#
#
## 回调方法
#def createChild(pid):
#    # 父code查询该父节点下的所有子节点
#    permissions = Permission.query.filter_by(father_permission_code=pid).all()
#    chilList = []
#    if permissions:
#        for per in permissions:
#            chilmap = {}
#            if pid == per.father_permission_code:
#                chilmap['id'] = per.id
#                chilmap['name'] = per.permission_name
#                chilmap['code'] = per.permission_code
#                chilmap['child'] = createChild(per.permission_code)
#            if chilmap:
#                chilList.append(chilmap)
#    return chilList


@api.route('/roles', methods=['GET'])
def findRole():
    """获取角色和权限"""
    print("================获取角色=================")
    try:
        roles = Role.query.all()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    if roles:
        roles_dict_list = [role.to_dict() for role in roles]
        return jsonify(errno=RET.OK, errmsg="成功", data=roles_dict_list)
    return jsonify(errno=RET.NODATA, errmsg="无数据")


'''为用户设定角色
    user_id:用户id
    role_id:角色id
'''


@api.route('/add_role', methods=['POST'])
@login_required
def addRole():
    req_dict = request.get_json()
    name = req_dict.get("name")
    permission_ids = req_dict.get("permission_ids")
    permission_check = req_dict.get("permission_check")
    permission_half_check = req_dict.get("permission_half_check")
    print("================添加角色=================",req_dict)
    # 校验数据
    param_keys = ["name","permission_ids"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Role.query.filter_by(name=name).all()
        if exist:
            return jsonify(errno=RET.OK,errmsg='该角色已经存在')
        role = Role(name=name,permission_check=permission_check,permission_half_check=permission_half_check)
        for pid in permission_ids:
            per = Permission.query.filter_by(id=pid).first()
            role.permissions.append(per)
        db.session.add(role)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    return jsonify(errno=RET.OK, errmsg="保存成功")


@api.route("/update_role", methods=["POST"])
@login_required
def updateRole():
    req_dict = request.get_json()
    id = req_dict.get("id")
    name = req_dict.get("name")
    permission_ids = req_dict.get("permission_ids")
    permission_check = req_dict.get("permission_check")
    permission_half_check = req_dict.get("permission_half_check")
    print("================更新角色=================",req_dict)
    # 校验数据
    param_keys = ["id","name","permission_ids"]
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        role = Role.query.filter_by(id=id).first()
        if role.name != name:
            exist = Role.query.filter_by(name=name).all()
            if exist:
                return jsonify(errno=RET.OK,errmsg='该角色已经存在')
        role.name = name
        role.permission_check = permission_check
        role.permission_half_check = permission_half_check 
        rolePermission = role.permissions.all()
        # 循环删除权限，循环增加新权限
        for prole in rolePermission:
            role.permissions.remove(prole)
        for pid in permission_ids:
            per = Permission.query.filter_by(id=pid).first()
            role.permissions.append(per)
        db.session.add(role)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库操作错误")
    return jsonify(errno=RET.OK, errmsg="成功")


@api.route("/delete_role", methods=["POST"])
@login_required
def deleteRole():
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    print("================删除角色=================",req_dict)
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
            role = Role.query.filter_by(id=id).first()
            if role:
                db.session.delete(role)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")


# '''
# 新增权限
# 参数:father_permission_code:父级权限代码
#     permission_name:权限名称
#     permission_code:权限代码
# '''
@api.route('/add_permission', methods=['GET', 'POST'])
@login_required
def add_permission():
    req_dict = request.get_json()
    label = req_dict.get("label")
    discripe = req_dict.get("discripe",'')
    pid = req_dict.get("pid")
    is_function = req_dict.get("is_function")
    routing = req_dict.get("routing")
    print("================添加权限=================",req_dict)
    # 校验数据
    param_keys = ["label","discripe","is_function"]
    if is_function == "Y":
        param_keys.append("routing")
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        exist = Permission.query.filter_by(label=label,discripe=discripe,pid=pid,is_function=is_function).all()
        if exist:
            return jsonify(errno=RET.OK,errmsg='该权限已存在，保存失败')
        else:
            permission = Permission(label=label,discripe=discripe,pid=pid,is_function=is_function,routing=routing)
            permission.all_discripe=discripe
            if pid:
                parent_permission = Permission.query.filter_by(id=pid).first()
                if not parent_permission:
                    return jsonify(errno=RET.DBERR, errmsg='没有此父级')
                permission.all_discripe = parent_permission.all_discripe+'_'+discripe
                permission.parent.append(parent_permission)
            db.session.add(permission)
            db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    return jsonify(errno=RET.OK,errmsg="成功")


# '''
# 删除多条权限
#     参数:permission_id:权限id集合
# '''
@api.route("/delete_permission", methods=["POST"])
@login_required
def delete_permission():
    req_dict = request.get_json()
    id_list = req_dict.get("id_list")
    print("================删除权限=================",req_dict)
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
            permission = Permission.query.filter_by(id=id).first()
            db.session.delete(permission)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="删除失败")
    return jsonify(errno=RET.OK, errmsg="成功")

# '''
# 修改权限
# 参数:permission_id:权限id
#     permission_name:权限名称
#     permission_code:权限代码
# '''
@api.route("/update_permission", methods=["POST"])
@login_required
def update_permission():
    req_dict = request.get_json()
    id = req_dict.get("id")
    label = req_dict.get("label")
    discripe = req_dict.get("discripe")
    pid = req_dict.get("pid")
    is_function = req_dict.get("is_function")
    routing = req_dict.get("routing")
    print("================修改权限=================",req_dict)
    # 校验数据
    param_keys = ["id","label","discripe","is_function"]
    if is_function == "Y":
        param_keys.append("routing")
    param_dict = dict()
    for i in param_keys:
        param_dict.__setitem__(i,req_dict.get(i,''))
    for key,value in param_dict.items():
        if not value:
            return jsonify(errno=RET.PARAMERR, errmsg="数据不完整,缺少%s"%key)
    try:
        permission = Permission.query.filter_by(id=id).first()
        if pid == permission.id:
            return jsonify(errno=RET.PARAMERR, errmsg='父级id不能与自己id相同')
        parent_permission = None
        all_discripe = discripe
        if permission.pid:
            parent_permission = Permission.query.filter_by(id=pid).first()
            if not parent_permission:
                return jsonify(errno=RET.DBERR, errmsg='没有此父级')
            all_discripe = parent_permission.all_discripe+'_'+discripe
        if permission.all_discripe != all_discripe or permission.pid != pid or permission.is_function != is_function:
            exist = Permission.query.filter_by(all_discripe=all_discripe,pid=pid,is_function=is_function).all()
            if exist:
                return jsonify(errno=RET.OK,errmsg='该权限已存在，保存失败')
        # rewirte it value
        permission.label=label
        permission.discripe=discripe
        permission.all_discripe=all_discripe
        permission.pid=pid
        permission.is_function=is_function
        permission.routing=routing
        # del old_parent add new_parent
        old_parent = permission.parent.all()
        for i in old_parent:
            permission.parent.remove(i)
        if pid:
            parent_permission = Permission.query.filter_by(id=pid).first()
            if not parent_permission:
                return jsonify(errno=RET.DBERR, errmsg='没有此父级')
            permission.parent.append(parent_permission)
        db.session.add(permission)
        db.session.commit()
    except Exception as e:
        current_app.logger.error(e)
        db.session.rollback()
        return jsonify(errno=RET.DBERR, errmsg="更新失败")
    return jsonify(errno=RET.OK, errmsg="成功")


# # 查询所有权限
@api.route('/get_permissions', methods=['GET'])
def get_permissions():
    print("================查询所有权限=================")
    def get_children(obj):
        """recursively getting the obj children"""
        ret = obj.to_dict()
        ret.__setitem__("disabled", True)
        if obj.children.all():
            children = [get_children(j) for j in obj.children.all()]
            ret.__setitem__('children',children)
        return ret
    try:
        parent_permissions = Permission.query.filter_by(pid=None).all()
        data_list = list()
        for p_per in parent_permissions:
            data_list.append(get_children(p_per))
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    return jsonify(errno=RET.OK,errmsg='成功',data=data_list)

@api.route("/get_permissions_tree", methods=["GET"])
def get_permission_tree():
    """get permissions tree"""
    def get_children(obj):
        """recursively getting the obj children"""
        ret = obj.to_dict()
        if obj.children.all():
            ret.__setitem__('children',[get_children(j) for j in obj.children.all()])
        return ret
    try:
        parent_permissions = Permission.query.filter_by(pid=None).all()
        data_list = list()
        for p_per in parent_permissions:
            data_list.append(get_children(p_per))
    except Exception as e:
        current_app.logger.error(e)
        return jsonify(errno=RET.DBERR, errmsg="数据库错误")
    return jsonify(errno=RET.OK,errmsg='成功',data=data_list)
