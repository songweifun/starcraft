import { Config } from 'Config.js';
import { Token } from 'Token.js';
class Base{
  constructor(){
    //"use strict";
    this.BaseRequestUrl = Config.restUrl
    //console.log(Config.restUrl)
  }
  /**封装的请求方法 */
  //http 请求类, 当noRefech为true时，不做未授权重试机制
  request(params, noRefetch) {
    var that = this;
    var url = this.BaseRequestUrl+params.url;
    if(!params.type){
      params.type='GET';
    }
    //console.log(url)
    wx.request({
      url: url,
      data:params.data,
      method:params.type,
      header:{
        "content-type":"application/json",
        "token":wx.getStorageSync('token')
        //先获得code 然后再获得token存入缓存

      },
      success:function(res){
        // 判断以2（2xx)开头的状态码为正确
        // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
        var code = res.statusCode.toString();
        var startChar = code.charAt(0);
        if (startChar == '2') {
          params.sCallback && params.sCallback(res.data);
        } else {
          if (code == '401') {
            //未授权重试机制
            if (!noRefetch) {
              that._refetch(params);
            }
          }

          that._processError(res);
        
          if(noRefetch){
            params.eCallback && params.eCallback(res.data);
          }
          
        }
        //params.sCallback && params.sCallback(res.data);
      },
      fail:function(err){
        that._processError(err);
      }
    });
  }

  _processError(err) {
    console.log(err);
  }
//未授权重试
  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this.request(param, true);
    });
  }


  /*获得元素上的绑定的值*/
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }
  //
}
export {Base};