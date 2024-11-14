
/* 
  配置网络请求的参数
*/
let envVersion = wx.getAccountInfoSync().miniProgram.envVersion
let BASE_URL = ''
// 生产环境/正式版
if (envVersion === 'release') {
  BASE_URL = "https://wx.mock.com"
}
// 体验版/还未上线，手机浏览时候的环境
else if (envVersion === 'trial') {
  BASE_URL = "https://wx.mock.com"
}
// 开发版
else {
  BASE_URL = "https://wx.mock.com"
}
const TIME_OUT = 10000
export {
  BASE_URL,
  TIME_OUT
}
