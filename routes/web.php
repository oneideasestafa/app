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


Route::middleware(['guest'])->group(function(){

    //ruta inicial
    Route::get('/', 'IndexController@index')->name('index1');
    //ruta inicial
    Route::get('/index', 'IndexController@index')->name('index');

    //ruta del login
    Route::get('/login', 'LoginController@index')->name('login');
    Route::post('/ajax-post-login', 'LoginController@ajaxPostLogin');

    //ruta de registro
    Route::get('/registro', 'RegistroController@index')->name('registro');
    Route::post('/ajax-post-registro', 'RegistroController@ajaxPostRegistro')->name('ajax-post-registro');
    Route::post('/ajax-post-clubs', 'RegistroController@ajaxPostClubs')->name('ajax-post-clubs');

    //rutas de autenticacion con google y facebook
    Route::get('auth/{provider}', 'SocialAuthController@redirect');
    Route::get('auth/{provider}/callback', 'SocialAuthController@callback');

    //rutas del recovery password
    Route::get('/recovery-password', 'RecoveryPasswordController@index')->name('recovery-password');
    Route::post('/send-password-reset-token', 'RecoveryPasswordController@sendPasswordResetToken')->name('send-password-reset-token');
    Route::get('/reset-password/{token}', 'RecoveryPasswordController@showPasswordResetForm')->name('show-password-reset-form');
    Route::post('/reset-password/{token}', 'RecoveryPasswordController@resetPassword')->name('reset-password');

    //ruta visitante
    Route::get('/demo', 'DemoController@login')->name('login-demo');

});

//'prevent-back-history'
Route::middleware(['auth', 'prevent-back-history'])->group(function(){

    //ruta de logout
    Route::get('/logout', 'LoginController@logout')->name('logout');

    Route::get('/question-event', 'QuestionEventController@index')->name('question-event');
    Route::post('/ajax-continuar', 'QuestionEventController@ajaxContinuar')->name('ajax-continuar');
    Route::post('/ajax-post-check-ubicacion-evento', 'QuestionEventController@ajaxEventoCheckUbicacion');


    Route::middleware(['check-question-event'])->group(function(){

        Route::get('/inicio', 'IndexController@inicio')->name('inicio');

        //ruta perfil
        Route::get('/cliente/perfil', 'PerfilController@index')->name('perfil');
        Route::post('/ajax-get-perfil', 'PerfilController@ajaxGetPerfil')->name('ajax-get-perfil');
        Route::post('/ajax-post-perfil', 'PerfilController@ajaxPostPerfil')->name('ajax-post-perfil');
        Route::post('/ajax-post-clubs-perfil', 'PerfilController@ajaxPostClubs')->name('ajax-post-clubs-perfil');

        //ruta cambiar clave
        Route::get('/cliente/cambiar/password', 'CambiarClaveController@index')->name('cambiar-clave');
        Route::post('/ajax-post-cambiar-clave', 'CambiarClaveController@ajaxPostCambiarClave')->name('ajax-post-cambiar-clave');

        //ruta invitacion
        Route::get('/invitacion', 'InvitacionController@index')->name('invitacion');

        //ruta invitacion
        Route::post('/sincronizado', 'PerfilController@ajaxPostSync')->name('sync');

        
        //ruta eventos
        Route::get('/ajax-eventos/{id}','EventoController@getEvento');

    });

    

});

?>
