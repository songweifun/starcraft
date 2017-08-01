// theme.js
import { Theme } from 'theme-model.js';
var theme = new Theme(); //实例化  主题列表对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.name = options.name;
    this.data.id = options.id;
    
    this._loadData();
  
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.name
    });
  },

  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    /*获取单品列表信息*/
    theme.getProductorData(this.data.id, (data) => {
      that.setData({
        themeInfo: data,
        loadingHidden: true
      });
      callback && callback();
    });
  }



})