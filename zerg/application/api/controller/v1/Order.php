<?php
/**
 * Created by PhpStorm.
 * User: daivd
 * Date: 2017/7/24
 * Time: 下午10:22
 */

namespace app\api\controller\v1;


use app\api\controller\BaseController;
use app\api\service\UserToken;
use app\api\validate\OrderPlace;
use app\api\service\Order as OrderService;

class Order extends BaseController
{

    //客户端调用接口提交订单的详细信息
    //检查库存量 如果有库存则则将订单信息写入表中
    // 如果有库存则告诉用户下单成功 可以支付
    //调用 api 支付接口进行支付
    //再次检查库存量
    //如果有库存 服务器就可以调用微信接口支付
    //支付成功
    //再次检查库存
    //成功 扣除库存
    protected $beforeActionList=[
      'checkExclusiveScope'=>['only','placeOrder']
    ];

    public function placeOrder(){
          //print_r($products = input('post.products/a'));die;
        //echo $products=input('post');die;
        (new OrderPlace())->goCheck();
        $products = input('post.products/a');
        $uid=UserToken::getCurrentUid();
        $orderSevice=new OrderService();
        $status = $orderSevice->place($uid, $products);
        return json($status);

    }

}