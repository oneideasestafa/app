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



Route::group(['prefix' => 'user'], function() {
		Route::post('/login', 'LoginController@ajaxPostLogin');
});

Route::group(['prefix' => 'eventos'], function() {
    Route::get('/', 'EventoController@index');
    Route::get('/id/{id}', 'EventoController@show');
    Route::post('/check_ubicacion', 'QuestionEventController@ajaxEventoCheckUbicacion');
});