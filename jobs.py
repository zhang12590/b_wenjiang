from flask import Flask
from flask_apscheduler import APScheduler
# from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from flask_sqlalchemy import SQLAlchemy

import redis
from datetime import datetime
from app.constants import TIME_STEP_LIST, AGE_STEP_LIST
from app.utils.commons import get_data_from_redis


db = SQLAlchemy()
redis_store = redis.StrictRedis(host="127.0.0.1", port=6379, db=1)




def show_addr():
        # 清空容器
        try:
            keys = redis_store.keys()
            if keys:
                redis_store.delete(*keys)
        except Exception as e:
            raise e
        print("done")


class Config(object):
    JOBS = [
        {
            'id': 'job1',
            'func': show_addr,
            # 'args': (1, 2),
            'trigger': 'cron',
            # 'trigger': 'interval',
            'hour': 23,
            'minute': 59,
            # 'seconds': 10
        }
    ]
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://xinjin:Xinjin123!@127.0.0.1:3306/xinjin?charset=utf8'
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    # SCHEDULER_JOBSTORES = {
    #     'default': SQLAlchemyJobStore(url='mysql+pymysql://root:123456@127.0.0.1:3306/xinjin?charset=utf8')
    # }

    SCHEDULER_API_ENABLED = True


app = Flask(__name__)
app.config.from_object(Config())
db.app = app
db.init_app(app)

scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()


if __name__ == '__main__':
    #app = Flask(__name__)
    #app.config.from_object(Config())

    #scheduler = APScheduler()
    ## it is also possible to enable the API directly
    ## scheduler.api_enabled = True
    #scheduler.init_app(app)
    #scheduler.start()

    app.run()
    # app.run(debug=True,host='0.0.0.0',port=9999)
