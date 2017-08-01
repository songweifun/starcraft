<?php

namespace app\api\model;

use think\Model;

class BannerItem extends BaseModel
{
    protected $hidden=['id','img_id','update_time','delete_time','banner_id'];
    //
    public function img(){
        return $this->belongsTo('Image','img_id','id');
    }
}
