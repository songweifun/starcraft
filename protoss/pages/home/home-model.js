import {Base} from '../../utils/Base.js';
class Home extends Base{
  constructor(){
    super();
  }
  //获得banner
  getBannerData(id,callback){
    
    var params={
      'url':'banner/'+id,
      'sCallback':function(res){
        callback && callback(res.items);
      }
    }

    this.request(params);
  }
  //获得主题
  getThemeData(callback){
    var params={
      'url':'theme?ids=1,2,3',
      'sCallback':function(res){
        callback && callback(res);
      }
    }

    this.request(params);
  }
  //最近新品
  getProductorData(callback) {
    var params = {
      'url': 'product/recent',
      'sCallback': function (res) {
        callback && callback(res);
      }
    }

    this.request(params);
  }
}
export {Home};