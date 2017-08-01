// 引用使用es6的module引入和定义
// 全局变量以g_开头
// 私有函数以_开头

import { Config } from 'Config.js';

class Token {
  constructor() {
    this.verifyUrl = Config.restUrl + 'token/verify';
    this.tokenUrl = Config.restUrl + 'token/user';
  }

  verify() {
    var token = wx.getStorageSync('token');
    //console.log(token)
    if (!token) {
      this.getTokenFromServer();
    }
    else {
      this._veirfyFromServer(token);
    }
  }

  _veirfyFromServer(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid;
        //console.log(valid)
        if (!valid) {
          that.getTokenFromServer();
        }
      }
    })
  }

  getTokenFromServer(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        //console.log(res.code);
        //console.log(that.tokenUrl);
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            //console.log(res.data.token)
            //console.log(2222222222)
            wx.setStorageSync('token', res.data.token);
            callBack && callBack(res.data.token);
          }
        })
      }
    })
  }
}

export { Token };