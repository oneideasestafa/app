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
        //EL METODO DE ABAJO ES SOLO UNA PRUEBA PARA TRAER EL CLIENTE
        //LA IDEA ES TRAERLO POR TOKEN
        Route::get('/id/{id}', 'ClienteController@getCliente');

        Route::post('/clubs-perfil', 'PerfilController@ajaxPostClubs');
        Route::post('/editar/perfil', 'ClienteController@editarCliente');
});

Route::group(['prefix' => 'eventos'], function() {
    Route::get('/', 'EventoController@index');
    Route::get('/id/{id}', 'EventoController@show');
    Route::post('/check_ubicacion', 'QuestionEventController@ajaxEventoCheckUbicacion');
});
