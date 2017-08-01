<?php
/**
 * Created by PhpStorm.
 * User: daivd
 * Date: 2017/7/23
 * Time: 上午11:11
 */

namespace app\api\controller\v1;


use app\api\service\UserToken;
use app\api\validate\TokenGet;
use app\lib\exception\ParmeterException;
use app\api\service\Token as TokenService;

class Token
{
    /**
     * 第三方应用获取令牌
     * @url /app_token?
     * @POST ac=:ac se=:secret
     */
    public function getToken($code){
        (new TokenGet())->goCheck();
        $ut=new UserToken($code);
        $token=$ut->get();
        return json([
            'token' => $token
        ]);
    }
    //令牌有效性验证
    public function verifyToken($token=''){
        if(!$token){
            throw new ParmeterException([
                'msg'=>'token不允许为空'
            ]);
        }
        $valid=TokenService::verifyToken($token);
        return json([
            'isValid' => $valid
        ]);

    }

}