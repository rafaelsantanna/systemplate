<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

header('Access-Control-Allow-Origin:  *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');

Route::view('/{path?}', 'app'); // Redirect to React APP


// API Calls
Route::get('/api/templates', 'TemplateController@index');
Route::post('/api/templates', 'TemplateController@store');
Route::delete('/api/templates/{id}', 'TemplateController@destroy');
Route::put('/api/templates/{id}', 'TemplateController@update');

Route::post('/api/templates/duplicate/{id}', 'TemplateController@duplicate');