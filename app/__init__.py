from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_wtf import CSRFProtect
from config import config_map
from logging.handlers import RotatingFileHandler
from app.utils.commons import ReConverter
from flask_cors import CORS

import redis
import logging

db = SQLAlchemy()
redis_store = None
csrf = CSRFProtect()
logging.basicConfig(level=logging.DEBUG)
file_log_handler = RotatingFileHandler("logs/log", maxBytes=1024 * 1024 * 100, backupCount=10)
formatter = logging.Formatter('%(levelname)s %(filename)s:%(lineno)d %(message)s')
file_log_handler.setFormatter(formatter)
logging.getLogger().addHandler(file_log_handler)


def create_app(config_name):
    """"""
    app = Flask(__name__)
    CORS(app, supports_credentials=True)
    # 根据配置模式名字获取类
    config_class = config_map.get(config_name)
    app.config.from_object(config_class)
    db.init_app(app)
    global redis_store
    redis_store = redis.StrictRedis(host=config_class.REDIS_HOST, port=config_class.REDIS_PORT, db=config_class.REDIS_DB)
    Session(app)
    # CSRFProtect(app)
    # 为flask添加自定义的转换器
    app.url_map.converters["re"] = ReConverter
    # 注册蓝图
    from app import api
    app.register_blueprint(api.api)
    # 注册提供静态文件的蓝图
    from app import web_html
    app.register_blueprint(web_html.html)
    return app
