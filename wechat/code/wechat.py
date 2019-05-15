from flask import Flask, request, abort, render_template, jsonify
import hashlib
import xmltodict
import time
import urllib
import json

app = Flask(__name__)
# 常量 微信的token令牌
WECHAT_TOKEN = "wanhao"
WECHAT_APPID = "wx69b330a22a371e28"
WECHAT_APPSECRET = "ecc6356f7b8fbd5f29a800477eec7bcd"


@app.route("/wechat9000", methods=["GET", "POST"])
def wechat():
    # 接受微信服务器发送的参数
    signature = request.args.get("signature")
    timestamp = request.args.get("timestamp")
    nonce = request.args.get("nonce")

    # 校验参数
    if not all([signature, timestamp, nonce]):
        abort(400)

    # 按照微信的流程进行计算签名
    li = [WECHAT_TOKEN, timestamp, nonce]
    li.sort()
    # 拼接字符串
    tmp_str = "".join(li)
    # 进行sha1加密, 得到正确的签名
    sign = hashlib.sha1(tmp_str.encode("utf-8")).hexdigest()

    # 将自己计算的签名和请求的进行对比，如果相同则证明请求来自微信服务器
    if signature != sign:
        # 表示请求不是微信发的
        abort(403)
    else:
        # 表示三微信发送的请求
        if request.method == "GET":
            # 表示三第一次接入微信服务器验证
            echostr = request.args.get("echostr")
            if not echostr:
                abort(400)
            return echostr
        elif request.method == "POST":
            # 表示微信服务器转发消息过来
            xml_str = request.data
            if not xml_str:
                abort(400)
            # 对xml字符串进行解析
            xml_dict = xmltodict.parse(xml_str)
            xml_dict = xml_dict["xml"]
            # 提取消息类型
            msg_type = xml_dict.get("MsgType")
            if msg_type == "text":
                # 文本消息
                # 构造返回值
                resp_dict = {
                    "xml": {
                        "ToUserName": xml_dict.get("FromUserName"),
                        "FromUserName": xml_dict.get("ToUserName"),
                        "CreateTime": int(time.time()),
                        "MsgType": "text",
                        "Content": xml_dict.get("Content")
                    }
                }

            else:
                resp_dict = {
                    "xml": {
                        "ToUserName": xml_dict.get("FromUserName"),
                        "FromUserName": xml_dict.get("ToUserName"),
                        "CreateTime": int(time.time()),
                        "MsgType": "text",
                        "Content": "i love u"
                    }
                }
            # 将字典转换为xml字符串
            resp_xml_str = xmltodict.unparse(resp_dict)
            # 返回消息数据给微信服务器
            return resp_xml_str

@app.route("/wechat9000/index")
def index():
    """让用户通过微信访问的微信页面"""
    # 从微信服务器中拿去用户的资料数据
    # 1.拿去code参数
    code = request.args.get("code")
    if not code:
        return "缺失code参数"
    # 2.向微信服务器发送http请求获取access_token
    url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code" % (WECHAT_APPID, WECHAT_APPSECRET, code)
    # 使用urllib的urlopen方法发送请求
    response = urllib.request.urlopen(url)
    # 获取响应体数据
    json_str = response.read()
    resp_dict = json.loads(json_str)
    # 提取access_token
    if "errcode" in resp_dict:
        return "获取access_token失败"
    access_token = resp_dict.get("access_token")
    open_id = resp_dict.get("openid")
    # 向微信服务器发送http请求获取用户资料
    url = "https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=zh_CN" % (access_token, open_id)
    response = urllib.request.urlopen(url)
    # 读取微信传回的json数据
    user_json_str = response.read()
    user_dict_data = json.loads(user_json_str)
    if "errcode" in user_dict_data:
        return "获取用户信息失败"
    else:
        # 将用户的资料数据填充到页面中
        return render_template("wechat.html", user=user_dict_data)

@app.route("/wechat9000/register")
def register():
    phone = request.args.get("phone")
    idcard = request.args.get("idcard")
    print(phone,idcard)
    return jsonify(msg="true")
@app.route("/wechat9000/success")
def success():
    return render_template("success.html")
@app.route("/")
def get_page():
    return render_template("wechat.html")


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9000, debug=True)
