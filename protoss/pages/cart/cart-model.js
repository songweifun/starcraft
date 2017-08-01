import {Base} from '../../utils/Base.js';
class Cart extends Base{
  constructor(){
    super();
    this._storageKeyName='cart';
  }

  //添加到购物车
  add(item,counts){
    var cartData = this.getCartDataFromLocal();
    if (!cartData) {
      cartData = [];
    }
    var isHadInfo = this._isHasThatOne(item.id, cartData);
    //新商品
    if (isHadInfo.index == -1) {
      item.counts = counts;
      item.selectStatus = true;  //默认在购物车中为选中状态
      cartData.push(item);
    }
    //已有商品
    else {
      //利用定位到的商品下标添加商品的数量
      cartData[isHadInfo.index].counts += counts;
    }
    this.execSetStorageSync(cartData);  //更新本地缓存
    return cartData;


  }
  /*
   * 获取购物车
   * param
   * flag - {bool} 是否过滤掉不下单的商品
   */
  getCartDataFromLocal(flag) {
    var res = wx.getStorageSync(this._storageKeyName);
    if (!res) {
      res = [];
    }
    //在下单的时候过滤不下单的商品，
    if (flag) {
      var newRes = [];
      for (let i = 0; i < res.length; i++) {
        if (res[i].selectStatus) {
          newRes.push(res[i]);
        }
      }
      res = newRes;
    }

    return res;
  };
  //检查item是否已经加入购物车
  _isHasThatOne(id, arr) {
    //arr就是从本地缓存查出的数组
    var result = { index: -1 };//index用于定位本地缓存购物车数组的下标
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id == id) {
        result = {
          index: i,
          data: arr[i]
        };
        break;
      }
    }
    return result;
  }

  /*
    *获得购物车商品总数目,包括分类和不分类
    * param:
    * flag - {bool} 是否区分选中和不选中
    * return
    * counts1 - {int} 不分类
    * counts2 -{int} 分类
    */
  getCartTotalCounts(flag) {
    var data = this.getCartDataFromLocal();
    var counts1 = 0;//商品总数
    var counts2 = 0;//商品种类
    for (let i = 0; i < data.length; i++) {
      if (flag) {
        //flag表示选中状态的数量
        if (data[i].selectStatus) {
          counts1 += data[i].counts;
          counts2++;
        }
      } else {
        counts1 += data[i].counts;
        counts2++;
      }
    }
    return {
      counts1: counts1,
      counts2: counts2
    };
  };

  /*本地缓存 保存／更新*/
  execSetStorageSync(data) {
    wx.setStorageSync(this._storageKeyName, data);
  };
  /*
   * 增加商品数目
   * */
  addCounts(id) {
    this._changeCounts(id, 1);
  };

  /*
  * 购物车减
  * */
  cutCounts(id) {
    this._changeCounts(id, -1);
  };
  /*
   * 修改商品数目
   * params:
   * id - {int} 商品id
   * counts -{int} 数目
   * */
  _changeCounts(id, counts) {
    var cartData = this.getCartDataFromLocal(),
      hasInfo = this._isHasThatOne(id, cartData);
    if (hasInfo.index != -1) {
      if (hasInfo.data.counts > 1) {
        cartData[hasInfo.index].counts += counts;
      }
    }
    this.execSetStorageSync(cartData);  //更新本地缓存
  };
  /*
   * 删除某些商品
   */
  delete(ids) {
    if (!(ids instanceof Array)) {
      ids = [ids];
    }
    var cartData = this.getCartDataFromLocal();
    for (let i = 0; i < ids.length; i++) {
      var hasInfo = this._isHasThatOne(ids[i], cartData);
      if (hasInfo.index != -1) {
        cartData.splice(hasInfo.index, 1);  //删除数组某一项
      }
    }
    this.execSetStorageSync(cartData);
  }

}
export {Cart};