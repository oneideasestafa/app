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

//defifinir los puntos de entrada para los endpoints de usuarios
Route::group(['prefix' => 'usuarios'], function() {
	Route::post('/login', 'LoginController@ajaxPostLogin');
    //rutas de autenticacion con google y facebook
    Route::get('auth/{provider}', 'SocialAuthController@redirect');
    Route::get('auth/{provider}/callback', 'SocialAuthController@callback');

    //LA IDEA ES TRAERLO POR TOKEN
    Route::get('/id/{id}', 'ClienteController@getCliente');
    Route::post('/clubs-perfil', 'PerfilController@ajaxPostClubs');
    Route::post('/editar/perfil', 'ClienteController@editarCliente');
    Route::post('/editar/cambiar-clave', 'ClienteController@cambiarClave');
});

// Permite difinir los puntos de entrada para los endpoints de eventos
Route::group(['prefix' => 'eventos'], function() {
    Route::get('/', 'EventoController@evento');
    Route::get('/id/{id}','EventoController@getEvento');
    Route::post('/check_ubicacion', 'QuestionEventController@ajaxEventoCheckUbicacion');
    Route::get('/invitacion/{id}','EventoController@getInvitacionEvento');
});

// Permite difinir los puntos de entrada para los endpoints de eventos
Route::group(['prefix' => 'clientes'], function() {
	Route::get('/estado-civil', 'RegistroController@estado_civil');
    Route::post('/registro', 'RegistroController@ajaxPostRegistro');
    Route::post('/club', 'RegistroController@ajaxPostClubs');
});
