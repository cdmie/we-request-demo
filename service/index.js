import Request from '../utils/weReq.min';
import {
  BASE_URL,
  TIME_OUT
} from './config';
export const weReq = Request.init({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //开启全局弹窗
  loading: true,
  autoLoginConfig: {
    reTokenConfig: {
      url: "/refresh_token",
      method: 'POST',
      data: {},
      success: (res) => {
        // 根据自己服务器返回数据实现自己的业务
        if (res.data.data.token) {
          wx.setStorageSync('token', res.data.data.token);
        }
      },
    },
    // 服务器判断token过期的状态码，这个根据自己业务代码返回来判断,我这边的mock的状态码为-220为过期，则会自动刷新token,注意这个res受拦截器responseSuccessFn返回的数据影响
    isTokenExpiredFn: (res) => {
      return res.code === -220;
    },
    // 重新登录次数（默认3）
    // reLoginLimit: 3
  },
  interceptors: {
    requestSuccessFn: (config) => {
      console.log(`requset:${config.url}`, config);
      const key = wx.getStorageSync('token');
      config.header = {}
      config.header.Authorization = `Bearer ${key}`
      config.data = {
        ...config.data,
      }
      return config;
    },
    requestFailFn: (err) => {
      console.log(err);
    },
    responseSuccessFn: async (res) => {
      // console.log('respose', res);
      return res.data;
    },
    responseFailFn: (err) => {
      console.log(err);
    },
  },
});
// 全局自定义加载框
export const weReq2 = Request.init({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  loading: false,
  interceptors: {
    requestSuccessFn: (config) => {
      wx.showLoading({
        title: '我是全局自定义加载',
      })
      return config;
    },
    requestFailFn: (err) => {
      wx.hideLoading()
    },
    responseSuccessFn: async (res) => {
      wx.hideLoading()
      console.log('respose', res);
      return res.data;
    },
    responseFailFn: (err) => {
      wx.hideLoading()
    },
  },
});
