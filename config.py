import redis
import os
import sys
from qcloudsms_py import SmsSingleSender


class Config(object):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://xinjin:Xinjin123!@127.0.0.1:3306/dev?charset=utf8'
    SQLALCHEMY_BINDS = {
        'admin': 'mysql+pymysql://xinjin:Xinjin123!@127.0.0.1:3306/xinjin?charset=utf8'
    }
    SQLALCHEMY_TRACK_MODIFICATIONS = True
    SECRET_KEY = 'hard to get string'
    # 各流程发送短信配置
    MSG = dict()
    # 发送短信配置
    APPID = 1400190371
    APPKEY = "413d00f456430816a2f1b5a9e7ba81ca"
    TEMPLATE_NUMBER = 296109
    TEMPLATE_CALL = 296100	
    TEMPLATE_START = 287136
    TEMPLATE_PASS = 296103	
    TEMPLATE_UNPASS = 296104
    TEMPLATE_LAST = 296107
    SMS_SIGN = '新津政务中心欢迎您'
    MSG_SENDER = SmsSingleSender(APPID, APPKEY)
    # redis
    REDIS_HOST = "127.0.0.1"
    REDIS_PORT = 6379
    REDIS_DB = 1
    # session配置
    SESSION_TYPE = 'redis'
    SESSION_REDIS = redis.StrictRedis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DB)
    SESSION_USE_SIGNER = True  # 对session_id进行隐藏
    PERMANENT_SESSION_LIFETIME = 86400
    # 支持json中文显示
    JSON_AS_ASCII = False


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    pass


config_map = {
    "develop": DevelopmentConfig,
    "product": ProductionConfig
}

PROJECTPATH = os.path.dirname(__file__)
STATICPATH = os.path.join(PROJECTPATH, 'app/static')
sys.path.append(PROJECTPATH)
