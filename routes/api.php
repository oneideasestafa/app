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

// Permite defifinir los puntos de entrada para los endpoints de usuarios
Route::group(['prefix' => 'usuarios'], function() {
	Route::post('/login', 'LoginController@login');
    Route::post('/login-new','Api\AuthController@postLogin');
    Route::post('/registro','Api\AuthController@postRegister');
    Route::post('/logout','Api\AuthController@postLogout');
});

// Permite difinir los puntos de entrada para los endpoints de eventos
Route::group(['prefix' => 'eventos', 'middleware' => 'ApiToken'], function() {
    Route::get('/', 'EventoController@getEventosNoBorradosActivos');
    Route::get('/id/{id}','EventoController@getEvento');
    Route::post('/check-ubicacion', 'EventoController@checkUbicacion');
    Route::get('/invitacion/{id}','EventoController@getInvitacion');
});

// Permite difinir los puntos de entrada para los endpoints de clientes
Route::group(['prefix' => 'clientes','middleware' => 'ApiToken'], function() {
    Route::get('/id/{id}', 'ClienteController@getCliente');
    Route::post('/clubs-perfil', 'ClienteController@getClubsPais');
    Route::post('/editar/perfil', 'ClienteController@editarCliente');
    Route::post('/editar/cambiar-clave', 'ClienteController@cambiarClave');
	Route::get('/estado-civil', 'ClienteController@getEstadoCivil');
    Route::post('/registro', 'ClienteController@crearCliente');
});
