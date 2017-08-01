<?php
/**
 * Created by PhpStorm.
 * User: daivd
 * Date: 2017/7/26
 * Time: 下午10:32
 */

namespace app\api\model;


class Order extends BaseModel
{
    protected $hidden=['user_id','delete_time','update_time'];
    protected $autoWriteTimestamp=true; //自动写入时间戳
    //protected $createTime='';
    //protected $updateTime

}