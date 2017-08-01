<?php
/**
 * 验证层基类
 * Created by PhpStorm.
 * User: daivd
 * Date: 2017/7/19
 * Time: 下午10:32
 */

namespace app\api\validate;


use app\lib\exception\ParmeterException;
use think\Exception;
use think\Request;
use think\Validate;

class BaseValidate extends Validate
{
    //重构的公共校验方法
    public function goCheck(){
        $parms=Request::instance()->param();//拿到所有的参数
        //batch 为批量验证
        if($this->batch()->check($parms)){
            return true;
        }else{
            $e=new ParmeterException([
                'msg'=>$this->error,
            ]);
            //$e->msg=$this->error;
            throw $e;
        }
    }

    /**
     * @param array $arrays 通常传入request.post变量数组
     * @return array 按照规则key过滤后的变量数组
     * @throws ParameterException
     */
    public function getDataByRule($arrays)
    {
        if (array_key_exists('user_id', $arrays) | array_key_exists('uid', $arrays)) {
            // 不允许包含user_id或者uid，防止恶意覆盖user_id外键
            throw new ParameterException([
                'msg' => '参数中包含有非法的参数名user_id或者uid'
            ]);
        }
        $newArray = [];
        foreach ($this->rule as $key => $value) {
            $newArray[$key] = $arrays[$key];
        }
        return $newArray;
    }

    //id必须为正整数
    protected function isPositiveInteger($value,$rule='',$data='',$field=''){
        if(is_numeric($value) && is_int($value+0) &&($value+0)>0){
            return true;
        }else{
            return false;
        }

    }

    //非空
    protected function isNotEmpty($value,$rule='',$data='',$field=''){
        if(empty($value)){
            return false;
        }else{
            return true;
        }

    }

    //手机
    //没有使用TP的正则验证，集中在一处方便以后修改
    //不推荐使用正则，因为复用性太差
    //手机号的验证规则
    protected function isMobile($value)
    {
        $rule = '^1(3|4|5|7|8)[0-9]\d{8}$^';
        $result = preg_match($rule, $value);
        if ($result) {
            return true;
        } else {
            return false;
        }
    }

}