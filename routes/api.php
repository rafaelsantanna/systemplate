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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/templates', 'TemplateController@index');
Route::post('/templates', 'TemplateController@store');
Route::delete('/templates/{id}', 'TemplateController@destroy');
Route::put('/templates/{id}', 'TemplateController@update');

Route::post('/templates/duplicate/{id}', 'TemplateController@duplicate');