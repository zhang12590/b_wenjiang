from flask import Flask, render_template,request
from flask_socketio import SocketIO,emit
import random
import time
import json
import redis
from threading import Lock
from flask_sqlalchemy import SQLAlchemy
from app.models import BusinessStatus

async_mode = None
app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret!'
app.config["SQLALCHEMY_DATABASE_URI"] = 'mysql+pymysql://xinjin:Xinjin123!@127.0.0.1:3306/xinjin?charset=utf8'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = True
db = SQLAlchemy(app)
socketio = SocketIO(app)
redis_store = redis.Redis(host='119.23.187.168',port=6379,db=1)
redis_store = redis.Redis(db=1)
thread = None
thread_lock = Lock()


@app.route('/')
def index():
    return render_template('faceToface.html')

@socketio.on("request_for_response", namespace='/test_conn1')
def test_connect(msg):
    print("msg--------------",msg)
    #value = msg.get('param')
    # 获取流水号，当前流程，评价，在应用程序上下文中查询数据库，如果存在则修改，否则创建提交
    water_num = msg.get('water_num')
    current_process = msg.get('current_process')
    evaluation = msg.get('evaluation')
    if all([water_num,current_process,evaluation]):
        with app.app_context():
            business_status = BusinessStatus.query.filter_by(water_num=water_num,current_process=current_process).first()
            if business_status:
                business_status.evaluation=evaluation
            else:
                business_status = BusinessStatus(water_num=water_num, current_process=current_process, evaluation=evaluation)
            db.session.add_all([business_status])
            db.session.commit()
    global thread
    with thread_lock:
        if thread is None:
            thread = socketio.start_background_task(target=background_thread)
    #while True:
    #    time.sleep(10)
    #    t = random_int_list(1,100,10)
    #    #t = redis_store.blpop("itemreviews",timeout=4)
    #    #t = redis_store.lrange("itemreviews",0,-1)[0]
    #    print("return data now",t)
    #    emit('server_response',{'data':t},namespace='/test_conn1')
    #    #socketio.emit('server_response',{'data':t},namespace='/test_conn')
    #    if t:
    #        #t = json.loads(t)
    #        print("+"*100)
    #        socketio.emit('server_response',{'data':t},namespace='/test_conn1')
    #        print("+"*100)
    #        time.sleep(2)
    #        socketio.emit('server_response',{'data':t},namespace='/test_conn1')


def background_thread():
    while True:
        socketio.sleep(1)
        t = redis_store.blpop("itemreviews",timeout=1)
        if t:
            #t = json.loads(t[0])
            t = json.loads(t[1])
        else:
            t = 'aaa'
        print("-----------------------",t)
        socketio.emit('server_response',{'data':t},namespace='/test_conn1',broadcast=True)

        
def random_int_list(start,stop,length):
    start,stop = (int(start),int(stop)) if start <= stop else (int(stop),int(start))
    length = int(abs(length) if length else 0)
    random_list = []
    for i in range(length):
        random_list.append(random.randint(start,stop))
    return random_list

if __name__ == "__main__":
    socketio.run(app,debug=True,host='0.0.0.0',port=44444)
