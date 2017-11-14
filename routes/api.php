<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'image'], function()
{

	Route::get('view/{id}', 'ImageController@show');
	Route::get('active', 'ImageController@active');
	Route::get('deleted', 'ImageController@deleted');
	Route::delete('delete/{id}', 'ImageController@delete');
	Route::post('restore', 'ImageController@restore');
	Route::post('upload', 'ImageController@upload');
	Route::post('download', 'ImageController@download');
	Route::post('create', 'ImageController@store');
	// Route::get('blob/{id}', 'ImageController@blob');

});
