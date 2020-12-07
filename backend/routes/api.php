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

Route::group([
    'prefix' => 'auth'
], function () {
    Route::post('login', 'AuthController@login');
    Route::post('signup', 'AuthController@signup');

    Route::group([
      'middleware' => 'auth:api'
    ], function() {
        Route::get('logout', 'AuthController@logout');
        Route::get('user', 'AuthController@user');
    });
});

Route::group([
    'middleware' => 'auth:api'
  ], function() {
    Route::get('/templates', 'TemplateController@index');
    Route::post('/templates', 'TemplateController@store');
    Route::put('/templates/{id}', 'TemplateController@update');
    Route::delete('/templates/{id}', 'TemplateController@destroy');
    Route::post('/templates/duplicate', 'TemplateController@duplicate');

    Route::get('/users', 'UserController@index');
    Route::put('/users/{id}', 'UserController@update');
    Route::delete('/users/{id}', 'UserController@destroy');

    Route::post('/template-categories', 'TemplateCategoryController@store');
    Route::delete('/template-categories/{id}', 'TemplateCategoryController@destroy');
  });

// Public Routes
Route::get('/templates/download/{id}', 'TemplateController@download');
Route::get('/template-categories', 'TemplateCategoryController@index');
