// home.js
import {Home} from 'home-model.js'
var home = new Home();
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

    this._loadData();
    
    
  
  },
  _loadData:function(){
      var that=this;
      var id=1;
      //获得首页的banner
      home.getBannerData(id,function(res){
        that.setData({
          bannerArr: res,
        });
      });

      //获得首页主题
      home.getThemeData((res) => {
        console.log(res);

        that.setData({
         themeArr: res,
        });

      });
      /*获取单品信息*/
      home.getProductorData((data) => {
        that.setData({
          productsArr: data
        });
      });
      //
  },
  //跳转到商品详情页
  onProductsItemTap:function(event){
    var id = home.getDataSet(event,'id');
    wx.navigateTo({
      url: '../product/product?id='+id,
    })

  },
  /*跳转到主题列表*/
  onThemesItemTap: function (event) {
    var id = home.getDataSet(event, 'id');
    var name = home.getDataSet(event, 'name');
    wx.navigateTo({
      url: '../theme/theme?id=' + id + '&name=' + name
    })
  }

  

  
})