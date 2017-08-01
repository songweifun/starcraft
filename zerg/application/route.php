<?php
// +----------------------------------------------------------------------
// | ThinkPHP [ WE CAN DO IT JUST THINK ]
// +----------------------------------------------------------------------
// | Copyright (c) 2006~2016 http://thinkphp.cn All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
// +----------------------------------------------------------------------
// | Author: liu21st <liu21st@gmail.com>
// +----------------------------------------------------------------------

//return [
//    '__pattern__' => [
//        'name' => '\w+',
//    ],
//    '[hello]'     => [
//        ':id'   => ['index/hello', ['method' => 'get'], ['id' => '\d+']],
//        ':name' => ['index/hello', ['method' => 'post']],
//    ],
//
//];

use think\Route;
//Route::rule('api/v1/banner/:id','api/v1.Banner/getBanner');
Route::get('api/:version/banner/:id','api/:version.Banner/getBanner');

Route::get('api/:version/theme','api/:version.Theme/getSimpleList');
Route::get('api/:version/theme/:id','api/:version.Theme/getComplexOne');

Route::get('api/:version/product/by_category','api/:version.Product/getAllIncategory');
Route::get('api/:version/product/:id','api/:version.Product/getOne',[],['id'=>'\d+']);
Route::get('api/:version/product/recent','api/:version.Product/getRecent');

//Route::group('api/:version/product',function (){
//    Route::get('/by_category','api/:version.Product/getAllIncategory');
//    Route::get('/:id','api/:version.Product/getOne',[],['id'=>'\d+']);
//    Route::get('/recent','api/:version.Product/getRecent');
//
//});


Route::get('api/:version/category/all','api/:version.Category/getAllcategories');


//token
Route::post('api/:version/token/user','api/:version.Token/getToken');
Route::post('api/:version/token/verify', 'api/:version.Token/verifyToken');


//address
Route::post('api/:version/address','api/:version.Address/createOrUpdateAddress');
Route::get('api/:version/address', 'api/:version.Address/getUserAddress');



Route::post('api/:version/order','api/:version.Order/placeOrder');


Route::post('api/:version/pay/pre_order','api/:version.Pay/getPreOrder');
