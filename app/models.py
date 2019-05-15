from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import json


# 自关联中间表    
children = db.Table('children',
    db.Column('self_id', db.Integer, db.ForeignKey('permission.id')),
    db.Column('child_id', db.Integer, db.ForeignKey('permission.id')),
)


role_permission = db.Table("role_permission",
                     db.Column("role_id", db.Integer, db.ForeignKey("role.id"), primary_key=True),
                     db.Column("permission_id", db.Integer, db.ForeignKey("permission.id"), primary_key=True)
                     )


class Subject(db.Model):
    """主题类."""
    __bind_key__ = 'admin'
    __tablename__ = 'subject'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), unique=True, nullable=False)
    seq = db.Column(db.String(128), unique=True, nullable=False)  # 序号描述
    area = db.Column(db.String(128))  # 服务区名称
    create_time = db.Column(db.DateTime, default=datetime.now, index=True)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "seq": self.seq,
            "area": self.area
        }


class Item(db.Model):
    """事项类."""
    __bind_key__ = 'admin'
    __tablename__ = 'item'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    click = db.Column(db.Integer)  # 点击数
    step = db.Column(db.Integer)  # 步骤数
    process = db.Column(db.String(128))  # 流程
    level = db.Column(db.String(128))  # 行使层级
    cate = db.Column(db.String(128))  # 事项类型
    industry = db.Column(db.String(128))  # 行业
    frequent = db.Column(db.String(128), default="N")  # 是否常办
    timeout = db.Column(db.Integer)  # 事项时限
    subject_id = db.Column(db.Integer, db.ForeignKey('subject.id'))
    subject = db.relationship('Subject', backref=db.backref('items', lazy='dynamic'))
    create_time = db.Column(db.DateTime, default=datetime.now, index=True)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "step": self.step,
            "process": self.process,
            "level": self.level,
            "cate": self.cate,
            "industry": self.industry,
            "frequent": self.frequent,
            "timeout": self.timeout,
            "subject": self.subject.name
        }


class Step(db.Model):
    """事项流程"""
    __bind_key__ = 'admin'
    __tablename__ = 'step'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(128), nullable=False)
    order = db.Column(db.Integer, nullable=False)  # 顺序
    timeout = db.Column(db.Integer)  # 事项时限
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'))
    item = db.relationship('Item', backref=db.backref('steps', lazy='dynamic'))
    create_time = db.Column(db.DateTime, default=datetime.now, index=True)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "order": self.order,
            "timeout": self.timeout,
            "item": self.item.name
        }


class Review(db.Model):
    """审查要素类."""
    __bind_key__ = 'admin'
    __tablename__ = 'review'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5000), nullable=False)
    requ = db.Column(db.String(128))  # 形式检查要求
    need = db.Column(db.String(128), default="N")  # 是否必须
    permit = db.Column(db.String(5000))  # 许可审查
    steps = db.Column(db.String(255))  # 哪些流程可见
    # order = db.Column(db.Integer, nullable=False)  # 顺序
    step_id = db.Column(db.Integer, db.ForeignKey('step.id'))
    step = db.relationship('Step', backref=db.backref('reviews', lazy='dynamic'))
    create_time = db.Column(db.DateTime, default=datetime.now, index=True)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "require": self.requ,
            "need": self.need,
            "permit": self.permit,
            # "order":self.order,
            "step": self.step.name,
            "steps":self.steps.split("-") if self.steps else []
        }


class Business(db.Model):
    """办事表"""
    __tablename__ = "business"
    id = db.Column(db.Integer, primary_key=True)
    water_num = db.Column(db.String(128), unique=True)
    idno = db.Column(db.String(128))  # 身份证
    addr = db.Column(db.String(128))  # 地点
    subject = db.Column(db.String(128))  # 主题
    item = db.Column(db.String(128))  # 事项
    process = db.Column(db.String(128))  # 流程
    current_user = db.Column(db.Integer)  # 当前用户
    current_process = db.Column(db.String(128))  # 接件，经办人，科室负责人，分管领导，主要领导，发证
    status = db.Column(db.String(128))  # 完成，不合格
    number = db.Column(db.String(128))  # 号码
    in_deal = db.Column(db.Integer,default=0)  # 1表示处理中0表示待处理
    is_scene = db.Column(db.Integer,default=0)  # 1表示已经现场踏勘0表示没有
    reviews = db.Column(db.String(128))  # 审查要素点击情况
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    timeout = db.Column(db.Float)
    takan_used_time = db.Column(db.Float)
    current_process_timeout = db.Column(db.Float)
    current_process_start_time = db.Column(db.DateTime)
    p_name = db.Column(db.String(128))  # 办件人姓名
    p_project = db.Column(db.String(128))  # 办件项目名称
    wait_seconds = db.Column(db.Integer)  
    move_times = db.Column(db.Integer)

    def to_dict(self):
        return {
            "water_num": self.water_num,
            "idno": self.idno,
            "addr": self.addr,
            "subject": self.subject,
            "item": self.item,
            "process": self.process,
            "current_user": self.current_user,
            "current_process": self.current_process,
            "status": self.status,
            "number": self.number,
            "in_deal": self.in_deal,
            "is_scene": self.is_scene,
            "reviews": self.reviews,
            "timeout": self.timeout,
            "takan_used_time": self.takan_used_time,
            "totle_used_time": (datetime.now()-self.create_time).seconds/3600+(datetime.now()-self.create_time).days*24-self.takan_used_time,
            "current_process_timeout": self.current_process_timeout,
            "current_process_used_time": (datetime.now()-self.current_process_start_time).seconds/3600+(datetime.now()-self.current_process_start_time).days*24,
            "p_name": self.p_name,
            "p_project": self.p_project,
            "wait_seconds": self.wait_seconds,
            "move_times": self.move_times
        }


class BusinessStatus(db.Model):
    """事情状态"""
    __tablename__ = "business_status"
    id = db.Column(db.Integer, primary_key=True)
    water_num = db.Column(db.String(128))
    addr = db.Column(db.String(128))
    current_process = db.Column(db.String(128))  # 接件，经办人，科室负责人，分管领导，主要领导，制证，发证
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user = db.relationship('User', backref=db.backref('business_status', lazy='dynamic'))
    subject = db.Column(db.String(255))
    item = db.Column(db.String(255))
    starts = db.Column(db.DateTime, default=datetime.now)
    ends = db.Column(db.DateTime)
    result = db.Column(db.String(128))  # 本流程处理结果，N表示未通过Y表示通过
    description = db.Column(db.String(255))  # 备注
    evaluation = db.Column(db.String(255))  # 备注
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "addr": self.addr,
            "water_num": self.water_num,
            "current_process": self.current_process,
            "user": self.user.name,
            "subject": self.subject,
            "item": self.item,
            "starts": self.starts.strftime("%Y-%m-%d %H:%M:%S"),
            "ends": self.ends.strftime("%Y-%m-%d %H:%M:%S"),
            "result": self.result,
            "discription": self.description,
            "evaluation": self.evaluation
        }


class People(db.Model):
    """顾客"""
    __tablename__ = 'people'
    id = db.Column(db.Integer, primary_key=True)
    idno = db.Column(db.String(128), nullable=False)
    mobile = db.Column(db.String(128))
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)


class Addr(db.Model):
    """办公地点"""
    __tablename__ = "addr"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    seq = db.Column(db.String(128), nullable=False)  # 序号描述
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "seq": self.seq
        }

#class Process(db.Model):
#    """工作流程表"""
#    __tablename__="process"
#    id = db.Column(db.Integer, primary_key=True)
#    name = db.Column(db.String(128), nullable=False)
#    create_time = db.Column(db.DateTime, default=datetime.now)
#    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
#
#    def to_dict(self):
#        return {
#            "id": self.id,
#            "name": self.name,
#        }
    

class User(db.Model):
    """工作人员"""
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    login_name = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=True)
    mobile = db.Column(db.String(11), unique=True, nullable=False)
    enabled = db.Column(db.CHAR(1), default="1")
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), unique=True, nullable=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship('Role', backref=db.backref('users', lazy='dynamic'))
    department = db.Column(db.String(128))  # 部门
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    # steps = db.relationship("Step", secondary=user_step, backref=db.backref("users", lazy='dynamic'), lazy='dynamic')
    def to_dict(self):
        return {
            "id": self.id,
            "login_name": self.login_name,
            "mobile": self.mobile,
            "enabled": self.enabled,
            "name": self.name,
            "email": self.email,
            "role": self.role.name,
            "department": self.department,
            "permissions": self.role.get_permissions()
        }

    # 加上property装饰器后，会把函数变为属性，属性名即为函数名
    @property
    def password(self):
        """读取属性的函数行为"""
        raise AttributeError("这个属性只能设置，不能读取")

    # 使用这个装饰器, 对应设置属性操作
    @password.setter
    def password(self, value):
        """
        设置属性  user.passord = "xxxxx"
        :param value: 设置属性时的数据 value就是"xxxxx", 原始的明文密码
        :return:
        """
        self.password_hash = generate_password_hash(value)

    def check_password(self, password):
        """
        检验密码的正确性
        :param passwd:  用户登录时填写的原始密码
        :return: 如果正确，返回True， 否则返回False
        """
        return check_password_hash(self.password_hash, password)


class Role(db.Model):
    """角色"""
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    permission_check = db.Column(db.String(5000))
    permission_half_check = db.Column(db.String(5000))
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    permissions=db.relationship('Permission',secondary=role_permission,backref=db.backref('role',lazy='dynamic'),lazy='dynamic')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "permission_check": self.permission_check,
            "permission_half_check": self.permission_half_check,
            "permissions": self.get_permissions()
        }
    def get_permissions(self):
        #def get_children(obj):
        #    """recursively getting the obj children"""
        #    ret = obj.to_dict()
        #    if obj.children.all():
        #        ret.__setitem__('children',[get_children(j) for j in obj.children.all()])
        #    return ret
        #parent_permissions = self.permissions.filter_by(pid=None).all()
        #data_list = list()
        #for p_per in parent_permissions:
        #    data_list.append(get_children(p_per))
        return [p.to_dict() for p in self.permissions.all()]


class Permission(db.Model):
    """permission"""
    __tablename__ = "permission"
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(255))
    discripe = db.Column(db.String(255))
    all_discripe = db.Column(db.String(255))
    pid = db.Column(db.Integer)
    is_function = db.Column(db.String(255))
    routing = db.Column(db.String(255))
    children = db.relationship("Permission",
                               secondary=children,
                               primaryjoin=(children.c.self_id==id),
                               secondaryjoin=(children.c.child_id==id),
                               backref=db.backref('parent', lazy='dynamic'),
                               lazy='dynamic'
    )

    def to_dict(self):
        return {
            "id":self.id,
            "label":self.label,
            "discripe": self.discripe,
            "all_discripe": self.all_discripe,
            "pid":self.pid,
            "is_function":self.is_function,
            "routing":self.routing,
        }

    def has_child(self,permission):
        """check if there are children permission"""
        return self.children.filter(children.c.child_id==permission.id).count()>0

    def add_child(self,permission):
        """add child permission"""
        if not self.has_child(permission):
            self.children.append(permission)

    def remove_child(self,permission):
        """remove child permission"""
        if self.has_child(permission):
            self.children.remove(permission)

class Msg(db.Model):
    """发送短信配置"""
    __tablename__ = 'msg'
    id = db.Column(db.Integer, primary_key=True)
    step = db.Column(db.String(128))
    start_msg = db.Column(db.String(128))
    pass_msg = db.Column(db.String(128))
    unpass_msg = db.Column(db.String(128))
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "step": self.step,
            "start_msg": self.start_msg,
            "pass_msg": self.pass_msg,
            "unpass_msg": self.unpass_msg,
        }

class Department(db.Model):
    """事项对应窗口"""
    __tablename__ = 'department'
    id = db.Column(db.Integer, primary_key=True)
    addr = db.Column(db.String(128))
    department = db.Column(db.String(128))
    subjects = db.Column(db.String(128))
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "addr": self.addr,
            "department": self.department,
            "subjects": self.subjects,
        }

class Location(db.Model):
    """事项对应窗口"""
    __tablename__ = 'location'
    id = db.Column(db.Integer, primary_key=True)
    addr = db.Column(db.String(128))
    subject = db.Column(db.String(128))
    location = db.Column(db.String(128))
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    def to_dict(self):
        return {
            "id": self.id,
            "addr": self.addr,
            "subject": self.subject,
            "location": self.location
        }

class CurrentCall(db.Model):
    """当前叫号情况"""
    __tablename__ = "current_call"
    id = db.Column(db.Integer, primary_key=True)
    addr = db.Column(db.String(128))
    water_num = db.Column(db.String(128))
    number = db.Column(db.String(128))
    win = db.Column(db.String(128))
    status = db.Column(db.Integer)  # 0表示在办理，1表示完成
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    def to_dict(self):
        return {
            "id":self.id,
            "addr":self.addr,
            "water_num":self.water_num,
            "number":self.number,
            "win":self.win,
            "status":self.status
        }

class LingPai(db.Model):
    """用户令牌"""
    __tablename__ = "lingpai"
    id = db.Column(db.Integer, primary_key=True)
    lingpai = db.Column(db.String(128))
    user_id = db.Column(db.Integer)
    win = db.Column(db.String(255))
    user_name = db.Column(db.String(255))
    status = db.Column(db.String(255))
    department = db.Column(db.String(255))
    create_time = db.Column(db.DateTime, default=datetime.now)
    modify_time = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)
    
    def to_dict(self):
        return {
            "id":self.id,
            "lingpai":self.lingpai,
            "user_id":self.user_id,
            "win":self.win,
            "user_name":self.user_name,
            "status":self.status,
            "department":self.department,
        }
