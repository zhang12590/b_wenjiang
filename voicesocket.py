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
socketio = SocketIO(app)
redis_store = redis.Redis(host='119.23.187.168',port=6379)
thread = None
thread_lock = Lock()
addr = None


@app.route('/')
def index():
    return render_template('faceToface.html')

@socketio.on("request_for_response", namespace='/voicecall')
def test_connect(msg):
    value = msg.get('param')
    print("value-------------------",value)
    global addr
    addr = value
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
    global addr
    print("thread addr-------------------",addr)
    if not addr:
        socketio.emit('server_response',{'data':"没有选择地址"},namespace='/voicecall',broadcast=True)
    else:
        while True:
            socketio.sleep(2)
            t = redis_store.blpop(addr + "voicecall",timeout=4)
            if t:
                #t = json.loads(t[0])
                t = json.loads(t[1])
            else:
                t = 'ccc'
            print("-----------------------",t)
            socketio.emit('server_response',{'data':t},namespace='/voicecall',broadcast=True)

        
def random_int_list(start,stop,length):
    start,stop = (int(start),int(stop)) if start <= stop else (int(stop),int(start))
    length = int(abs(length) if length else 0)
    random_list = []
    for i in range(length):
        random_list.append(random.randint(start,stop))
    return random_list

if __name__ == "__main__":
    socketio.run(app,debug=True,host='0.0.0.0',port=33333)
