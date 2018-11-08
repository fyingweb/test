Mock.mock('http://getcode.com', {
    "msg_code": 0,
    "msg_tip": "成功",
    "yzm|1000-9999": 1000,
    "csrf|1-1000000000": 1
});

Mock.mock('http://logine.com', {
    "msg_code": 0,
    "msg_tip": "成功",
});