import time
import redis
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
from app.constants import TIME_STEP_LIST, AGE_STEP_LIST
from app.models import Subject, Item, Addr, DaliyData, DaliyTimeStep, DaliyAgeStep, DaliySubjectClick, DaliyItemClick
from app.utils.commons import get_data_from_redis
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__)

app.config.from_object(Config)
db = SQLAlchemy(app)
redis_store = redis.StrictRedis(host="127.0.0.1", port=6379)

class Subject(db.Model):
    """主题类."""
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


def timedTask():
    """定时将缓存数据持久化，清空容器"""
    # print(datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S.%f")[:-3])
    # 查询所需数据
    try:
        addrs = Addr.query.all()
        subjects = Subject.query.all()
        items = Item.query.all()
    except Exception as e:
        raise e
    # 非空校验
    if not all([addrs, subjects, items]):
        raise Exception("无数据")
    # 添加数据
    for ad in addrs:
        addr = ad.name
        try:
            # 当天取号总量
            total_number = int(get_data_from_redis(redis_store.get(addr + "total_number")).decode())
            # 时间段取号情况
            time_step_list = [
                int(get_data_from_redis(redis_store.get(addr + "time_step" + str(i).rjust(2, '0') + "0000")).decode()) for i
                in TIME_STEP_LIST]
            # 男女比列
            sex = int(get_data_from_redis(redis_store.get(addr + "sex_man_and_woman")).decode())
            # 省内外比列
            province = int(get_data_from_redis(redis_store.get(addr + "province_in_and_out")).decode())
            # 年龄分段情况
            age_step_list = [{"value": int(get_data_from_redis(redis_store.get(addr + "age_step" + str(i)[2:])).decode()),
                              "name": str(i)[2:] + "后"} for i in AGE_STEP_LIST]
            # 叫号总量
            total_call = int(get_data_from_redis(redis_store.get(addr + "total_call")).decode())
            # 等待总时长
            total_wait_minute = int(get_data_from_redis(redis_store.get(addr + "total_wait_minute")).decode())
            # 接待总量
            total_deal = int(get_data_from_redis(redis_store.get(addr + "total_deal")).decode())
            # 接待通过量
            total_pass_deal = int(get_data_from_redis(redis_store.get(addr + "total_pass_deal")).decode())
            # 主题点击量
            subject_click_list = [(int(get_data_from_redis(redis_store.get(addr + subject.name + "click")).decode()),
                                   subject.name, subject.area) for subject in subjects]
            subject_click_list.sort(reverse=True)
            # 事项点击量
            item_click_list = [(int(get_data_from_redis(redis_store.get(addr + item.name + "click")).decode()), item.name)
                               for item in items]
            item_click_list.sort(reverse=True)
            # 转号量
            total_move = int(get_data_from_redis(redis_store.get(addr + "total_move")).decode())
        except Exception as e:
            raise e
        if any([total_number,sex,province,total_call,total_wait_minute,total_deal,total_pass_deal,total_move]):
            daliy_data = DaliyData(date=datetime.now().strftime("%Y-%m-%d"),
                                   addr=addr,
                                   total_number=total_number,
                                   sex=sex,
                                   province=province,
                                   total_call=total_call,
                                   total_wait_minute=total_wait_minute,
                                   total_deal=total_deal,
                                   total_pass_deal=total_pass_deal,
                                   total_move=total_move)
            db.session.add(daliy_data)
        for i in TIME_STEP_LIST:
            number = time_step_list[TIME_STEP_LIST.index(i)]
            if number:
                daliy_time_step = DaliyTimeStep(date=datetime.now().strftime("%Y-%m-%d"),
                                                addr=addr,
                                                time_step=i,
                                                number=number)
                db.session.add(daliy_time_step)
        for i in AGE_STEP_LIST:
            number = age_step_list[AGE_STEP_LIST.index(i)].get("value")
            if number:
                daliy_age_step = DaliyAgeStep(date=datetime.now().strftime("%Y-%m-%d"),
                                              addr=addr,
                                              age_step=i,
                                              number=number)
                db.session.add(daliy_age_step)
        for i,j,k in subject_click_list:
            if i:
                daliy_subject_click = DaliySubjectClick(date=datetime.now().strftime("%Y-%m-%d"),
                                                        addr=addr,
                                                        subject=j,
                                                        click=i)
                db.session.add(daliy_subject_click)
        for i,j in item_click_list:
            if i:
                daliy_item_click = DaliyItemClick(date=datetime.now().strftime("%Y-%m-%d"),
                                                  addr=addr,
                                                  item=j,
                                                  click=i)
                db.session.add(daliy_item_click)
    # 提交数据
    try:
        db.session.commit()
    except Exception as e:
        raise e
    # 清空容器
    try:
        keys = redis_store.keys()
        if keys:
            redis_store.delete(*keys)
    except Exception as e:
        raise e


if __name__ == '__main__':
    # 创建后台执行的 schedulers
    scheduler = BackgroundScheduler()
    # 添加调度任务
    # 调度方法为 timedTask，触发器选择 interval(间隔性)，间隔时长为 2 秒
    # scheduler.add_job(timedTask, 'interval', seconds=2)
    scheduler.add_job(timedTask, 'interval', hours=24, start_date='2019-02-10 23:00:00')
    # 启动调度任务
    scheduler.start()
    #timedTask()

    while True:
        #print(time.time())
        pass
        #with open('a.txt','a') as f:
        #    f.write(str(time.time()))
        time.sleep(1000)
