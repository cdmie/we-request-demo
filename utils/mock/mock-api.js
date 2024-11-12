const Mock = require('./mock.mp.js') // 引入better-mock
Mock.mock('https://wx.mock.com/request1', 'post', {
  "code": '1', "msg": "请求成功",
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL'
  }]
})
Mock.mock('https://wx.mock.com/request2', 'post', {
  "code": '1', "msg": "请求成功",
  'list|1-10': [{
    'id|+1': 1,
    'email': '@EMAIL'
  }]
})
Mock.mock('https://wx.mock.com/request3', 'post', function (options) {
  let obj = {}
  let key = options.headers.Authorization.split(' ')
  if (key[1]) {
    obj =
      { "code": '1', "msg": "请求成功" }
  }
  else {
    obj =
      { "code": -220, "msg": "token过期" }
  }
  return obj
})
Mock.mock('https://wx.mock.com/refresh_token', 'post',
  function (options) {
    // console.log('options', options);
    return {
      code: 1,
      data: {
        "token": "woshikey"
      },
      msg: "获取token成功"
    }
  }


)