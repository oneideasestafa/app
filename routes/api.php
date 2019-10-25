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

Route::get('auth/{provider}', 'SocialAuthController@redirectToProvider');
Route::get('auth/{provider}/callback', 'SocialAuthController@handleProviderCallback');

Route::group(['prefix' => 'user'], function () {
  Route::post('/', 'ClienteController@create');
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {
  Route::get('/', 'ClienteController@read');
  Route::post('/{id}', 'ClienteController@update');
  // Route::post('/', 'ClienteController@create'); CREATE
  Route::get('/id/{id}', 'ClienteController@getCliente');
});


// Permite defifinir los puntos de entrada para los endpoints de usuarios
Route::group(['prefix' => 'usuarios'], function() {
	Route::post('/login', 'LoginController@login');
  Route::post('/login-new','Api\AuthController@postLogin');
  // Route::post('/registro','Api\AuthController@postRegister');
  Route::get('/estado-civil', 'ClienteController@getEstadoCivil');
  // Route::post('/registro', 'ClienteController@create');
  Route::post('/clubs-perfil', 'ClienteController@getClubsPais');
  Route::post('/logout','LoginController@logout');
  Route::get('/social/oauth', 'ClienteController@socialAuthenticate');
});

Route::group(['prefix' => 'events', 'middleware' => 'auth:api'], function () {
  Route::get('/', 'EventoController@get');
});

Route::group(['prefix' => 'event', 'middleware' => 'auth:api'], function () {
  Route::get('/{event_id}/jobs/{current_time}', 'EventoController@getLatestJobs');
  Route::get('/{id}/files', 'EventoController@getFilesFromEvent');
});

// Permite difinir los puntos de entrada para los endpoints de eventos
Route::group(['prefix' => 'eventos', 'middleware' => 'ApiToken'], function() {
    Route::get('/', 'EventoController@get');
    Route::get('/id/{id}','EventoController@getEvento');
    Route::post('/check-ubicacion', 'EventoController@checkUbicacion');
    Route::get('/invitacion/{id}','EventoController@getInvitacion');

    Route::get('/redes-sociales/consultar','EventoController@consultarHashtagsDelEvento');
    
    Route::post('/RSS','EventoController@registrarPublicacionRSS');
});
  
// Permite difinir los puntos de entrada para los endpoints de clientes
Route::group(['prefix' => 'clientes','middleware' => 'ApiToken'], function() {    
    Route::post('/editar/cambiar-clave', 'ClienteController@cambiarClave');
    Route::get('/estado-civil', 'ClienteController@getEstadoCivil');    
});

// Permite defifinir los puntos de entrada para los endpoints de preguntados
Route::group(['prefix' => 'preguntados'], function() {
	Route::get('/pregutas-respuestas', 'PreguntadosController@getPreguntas');
});
