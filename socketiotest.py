from flask import Flask, render_template,request
from flask_socketio import SocketIO,emit
import random
import time
import json
import redis
from threading import Lock

async_mode = None
app = Flask(__name__)
app.config["SECRET_KEY"] = 'secret!'
socketio = SocketIO(app, async_mode=async_mode)
redis_store = redis.Redis(host='119.23.187.168',port=6379,db=1)
redis_store = redis.Redis(db=1)
thread = None
thread_lock = Lock()

def background_thread():
    while True:
        socketio.sleep(1)
        #t = redis_store.lrange("usershead",0,-1)
        t = redis_store.blpop("usershead",timeout=1)
        if t:
            #t = json.loads(t[0])
            t = json.loads(t[1])
        else:
            t = 'bbb'
        print("-----------------------",t)
        socketio.emit('server_response',{'data':t},namespace='/test_conn',broadcast=True)

@app.route('/')
def index():
    return render_template('queue.html')

@socketio.on("request_for_response", namespace='/test_conn')
def test_connect(msg):
    value = msg.get('param')
    print("param",value)
    global thread
    with thread_lock:
        if thread is None:
            print("线程执行")
            thread = socketio.start_background_task(target=background_thread)
    #emit('server_response',{'data':"aaaaaa"},namespace='/test_conn')
    #t = random_int_list(1,100,10)
    #emit('server_response',{'data':t},namespace='/test_conn')
    #time.sleep(5)
    #emit('server_response',{'data':'hello'},namespace='/test_conn')
    #while True:
    #    socketio.sleep(5)
    #    t = random_int_list(1,100,10)
    #    #t = redis_store.blpop("usershead",timeout=4)
    #    t = redis_store.lrange("usershead",0,-1)
    #    print("return data now",t)
    #    emit('server_response',{'data':"aaaaaa"},namespace='/test_conn')
    #    if not t:
    #        #t = json.loads(t[1])
    #        t = json.loads(t[0])
    #        socketio.emit('server_response',{'data':t},namespace='/test_conn')


if __name__ == "__main__":
    socketio.run(app,debug=True,host='0.0.0.0',port=33333)
    
    #while True:
    #    socketio.sleep(1)
    #    #t = redis_store.lrange("usershead",0,-1)
    #    print("pop")
    #    t = redis_store.blpop("usershead",timeout=1)
    #    print("popdone")
    #    if t:
    #        #t = json.loads(t[0])
    #        t = json.loads(t[1])
    #    else:
    #        t = 'bbb'
    #    print("-----------------------",t)
