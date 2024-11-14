import { weReq, weReq2 } from "../../service/index"

Page({
  /* 
   async/await方法请求
  */
  async makeRequest1() {
    try {
      const res = await weReq.post({
        url: "/request1",
        data: {
          name: "我是夜咩"
        },
      });
      console.log('请求成功', res);
    } catch (error) {
      console.log('error', error);
      console.log('请求失败');
    }
  },
  /* 
   then方法请求 
  */
  makeRequest2() {
    weReq.post({
      url: "/request1",
      data: {
        name: "我是夜咩"
      },
    }).then(res => {
      console.log('请求成功', res);
    }).catch(err => {
      console.log(err);
    })
  },
  /* 
   无痕刷新token 
  */
  async makeRequest3() {
    // 这里清空token为了测试传空的时候会重新获取token
    wx.setStorageSync('token', '');
    this.makeRequestCheckToken()

  },
  // 需要传token的网络请求
  async makeRequestCheckToken() {
    try {
      const res = await weReq.post({
        url: "/request3",
        data: {
          name: "我是夜咩"
        },
      });
      console.log('请求成功', res);
    } catch (error) {
      console.log('请求失败', error);
    }
  },
  async makeRequest4() {
    try {
      const res = await weReq.post({
        url: "/request1",
        loading: "东望！",
        data: {
          name: "我是夜咩"
        },
      });
      console.log('请求成功', res);
    } catch (error) {
      console.log('error', error);
      console.log('请求失败');
    }
  },
  async makeRequest5() {
    try {
      const res = await weReq.post({
        url: "/request1",
        loading: false,
        data: {
          name: "我是夜咩"
        },
      });
      console.log('请求成功', res);
    } catch (error) {
      console.log('请求失败');
    }
  },
  makeRequest6() {
    this.makeRequest2()
    this.makeRequest2()
    this.makeRequest2()
    this.makeRequest2()
    this.makeRequest2()
    this.makeRequest2()
  },
  async makeRequest7() {
    try {
      wx.showLoading({
        title: '单个自定义加载',
      })
      const res = await weReq.post({
        url: "/request1",
        loading: false,//关闭默认的加载框
        data: {
          name: "我是夜咩"
        },
      });
      console.log('请求成功', res);
    } catch (error) {
    } finally {
      wx.hideLoading()
    }

    //// 用单个请求函数的拦截器方法
    // try {
    //   const res = await weReq.post({
    //     url: "/request1",
    //     loading: false,//关闭默认的加载框
    //     interceptors: {
    //       requestSuccessFn: (config) => {
    //         wx.showLoading({
    //           title: '我是自定义加载',
    //         })
    //       },
    //       requestFailFn: (err) => {
    //         wx.hideLoading()
    //       },
    //       responseSuccessFn: async (res) => {
    //         wx.hideLoading()
    //       },
    //       responseFailFn: (err) => {
    //         wx.hideLoading()
    //       },
    //     },
    //     data: {
    //       name: "我是夜咩"
    //     },
    //   });
    //   console.log('请求成功', res);
    // } catch (error) {
    //   console.log('请求失败');
    // }
  },

  async makeRequest8() {
    try {
      const res = await weReq2.post({
        url: "/request1",
        data: {
          name: "我是夜咩"
        },
      });
      console.log('请求成功', res);
    } catch (error) {
      console.log('error', error);
      console.log('请求失败');
    }
  }
})