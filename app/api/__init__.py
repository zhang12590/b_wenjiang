from flask import Blueprint

api = Blueprint("api", __name__)
from app.api import demo,passport,subject,item,review,addr,user,role_permission,msg,olddata,location,search,lingpai,department
