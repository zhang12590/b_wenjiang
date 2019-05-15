# 登录错误尝试次数
LOGIN_ERROR_MAX_TIMES = 5

# 登录错误限制的时间， 单位：秒
LOGIN_ERROR_FORBID_TIME = 600


# 权限
class Permission:
    ONE = 0x01
    TWO = 0x02
    THREE = 0x04


# 上班时间
WORK_START_TIME = 9

# 下班时间
WORK_END_TIME = 17

# 时间分段步长 单位（小时）
TIME_STEP = 1

# 时间分段列表
TIME_STEP_LIST = list(range(WORK_START_TIME,WORK_END_TIME+TIME_STEP,TIME_STEP))
# 年龄分段表
AGE_STEP_LIST = [2000,1990,1980,1970]

# 日均分析的分母，单位(周，月，季，半年，年)
DENOMINATOR = "MONTH"

# 常办事项显示数量
ITEM_TOP_NUM = 5
# 常办主题显示数量
SUBJECT_TOP_NUM = 5

# 流程映射
step_map = {
    "接件":1,
    "经办人":2,
    "科室负责人":3,
    "踏勘中心":4,
    "分管领导":5,
    "发证":6
}

# 状态映射
status_map = {
    "待处理":0,
    "处理中":1,
    "完成":2,
    "作废":3
}
