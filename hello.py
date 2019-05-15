# coding:utf-8
from datetime import datetime
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from config import Config

app = Flask(__name__)

app.config.from_object(Config)
db = SQLAlchemy(app)




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


@app.route("/")
def get_page():
    subjects = Subject.query.all()
    subject_list = [sub.name for sub in subjects]
    item_dict = dict()
    for i in subjects:
        item_dict.__setitem__(i.name,[j.name for j in i.items.all()])
    return render_template("wechat.html", subject_list=subject_list,item_dict=item_dict)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)
    #addr1 = Addr(name='新津县', seq='a1')
    #addr2 = Addr(name='五津镇', seq='a2')
    #addr3 = Addr(name='花桥镇', seq='a3')
    #addr4 = Addr(name='永商镇', seq='a4')
    #db.session.add_all([addr1, addr2, addr3, addr4])
    #db.session.commit()
    #role1 = Role(name="大厅")
    #role2 = Role(name="科室负责人")
    #role3 = Role(name="踏勘中心")
    #role4 = Role(name="分管领导")
    #role5 = Role(name="主要领导")
    #role6 = Role(name="导办")
    #role7 = Role(name="管理")
    #db.session.add_all([role1, role2, role3, role4, role5, role6, role7])
    #db.session.commit()
    #user1 = User(login_name='zhao1', mobile='15866666621', name='zhao1', email='zhao1@163.com', role_id=role1.id,
    #             subject="投资立项")
    #user2 = User(login_name='zhao2', mobile='15866666622', name='zhao2', email='zhao2@163.com', role_id=role2.id,
    #             subject="投资立项")
    #user3 = User(login_name='zhao3', mobile='15866666623', name='zhao3', email='zhao3@163.com', role_id=role3.id, subject="所有")
    #user4 = User(login_name='zhao4', mobile='15866666624', name='zhao4', email='zhao4@163.com', role_id=role4.id, subject="所有")
    #user5 = User(login_name='zhao5', mobile='15866666625', name='zhao5', email='zhao5@163.com', role_id=role5.id, subject="所有")
    #user6 = User(login_name='zhao6', mobile='15866666626', name='zhao6', email='zhao6@163.com', role_id=role6.id, subject="所有")
    #user7 = User(login_name='zhao7', mobile='15866666627', name='zhao7', email='zhao7@163.com', role_id=role7.id, subject="所有")
    #for i in [user1, user2, user3, user4, user5, user6, user7]:
    #    i.password = "123456"
    #db.session.add_all([user1, user2, user3, user4, user5, user6, user7])
    #db.session.commit()
    #print("====================add data ok==========================")
    #app.run(host='0.0.0.0', port=5000)
    #app.run()
    #from app.constants import step_map
    #print('step_map-------------------',step_map)
    #items = Item.query.all()
    #subjects = Subject.query.all()
    #windows = Window.query.all()
    #id_list = [i.id for i in subjects]
    #print("items",items,"subjects",subjects,"windows",windows)
    #for item in items:
    #   print('item-name+++++++++++++++++++',item.name)
    #   step_list = item.process.split("-",item.step-1)
    #   for i in step_list:
    #       current_step = Step(name=i,order=step_map[i],item_id=item.id)
    #       db.session.add(current_step)
    #db.session.commit()
    #print("====================add step ok==========================")
    #for i in step_map:
    #    msg0 = Msg(step=i,start_msg="Y",pass_msg="Y",unpass_msg="Y")
    #    db.session.add(msg0)
    #db.session.commit()
    #print("====================add msg ok==========================")
    #for i in id_list:
    #    window = Window(addr="新津县",location=str(i)+"区",subject_id=i)
    #    db.session.add(window)
    #db.session.commit()
    #print("====================add window ok==========================")
