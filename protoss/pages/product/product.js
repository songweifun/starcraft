// product.js
import { Product } from 'product-model.js';
import { Cart } from '../cart/cart-model.js';

var product = new Product();  //实例化 商品详情 对象
var cart = new Cart();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //picker默认数组
    productCounts: 1, //默认的商品数量
    currentTabsIndex: 0,//默认的tab
    cartTotalCounts: 0,//购物车小图标数量
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.data.id = id;
    this._loadData();
  
  },
  /*加载所有数据*/
  _loadData: function (callback) {
    var that = this;
    product.getDetailInfo(this.data.id, (data) => {
      that.setData({
        product: data,
        cartTotalCounts: cart.getCartTotalCounts().counts1,
        loadingHidden: true
      });
      callback && callback();
    });
  },

  //选择购买数目
  bindPickerChange: function (event) {
    this.setData({
      productCounts: this.data.countsArray[event.detail.value],
    })
  },
  //切换详情面板
  onTabsItemTap: function (event) {
    var index = product.getDataSet(event, 'index');
    this.setData({
      currentTabsIndex: index
    });
  },

  /*添加到购物车*/
  onAddingToCartTap: function (events) {
    //防止快速点击
    if (this.data.isFly) {
      return;
    }
    this._flyToCartEffect(events);
    this.addToCart();
  },

  /*将商品数据添加到内存中*/
  addToCart: function () {
    var tempObj = {};
    var  keys = ['id', 'name', 'main_img_url', 'price'];//组装tempobj
    for (var key in this.data.product) {
            //33行绑定
      if (keys.indexOf(key) >= 0) {
        tempObj[key] = this.data.product[key];
      }
    }

    cart.add(tempObj, this.data.productCounts);
  },
  /*加入购物车动效*/
  _flyToCartEffect: function (events) {
    //获得当前点击的位置，距离可视区域左上角
    var touches = events.touches[0];
    var diff = {
      x: '25px',
      y: 25 - touches.clientY + 'px'
    },
      style = 'display: block;-webkit-transform:translate(' + diff.x + ',' + diff.y + ') rotate(350deg) scale(0)';  //移动距离
    this.setData({
      isFly: true,
      translateStyle: style
    });
    var that = this;
    setTimeout(() => {
      that.setData({
        isFly: false,
        translateStyle: '-webkit-transform: none;',  //恢复到最初状态
        isShake: true,
      });
      setTimeout(() => {
        //实时显示数量
        var counts = that.data.cartTotalCounts + that.data.productCounts;
        that.setData({
          isShake: false,
          cartTotalCounts: counts
        });
      }, 200);
    }, 1000);
  },

  /*跳转到购物车*/
  onCartTap: function () {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },

  /*下拉刷新页面*/
  onPullDownRefresh: function () {
    this._loadData(() => {
      wx.stopPullDownRefresh()
    });
  },

  //分享效果
  onShareAppMessage: function () {
    return {
      title: '零食商贩 Pretty Vendor',
      path: 'pages/product/product?id=' + this.data.id
    }
  }

  
})