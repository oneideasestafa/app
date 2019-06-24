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

    // Ruta de entrada principal a la aplicación
    Route::get('/', 'IndexController@index')->name('index');

    // Rutas usadas por el pluging oauth autenticacion con Google y Facebook
    Route::get('auth/{provider}', 'SocialAuthController@redirect');
    Route::get('auth/{provider}/callback', 'SocialAuthController@callback');

    /*
    //rutas del recovery password
    Route::get('/recovery-password', 'RecoveryPasswordController@index')->name('recovery-password');
    Route::post('/send-password-reset-token', 'RecoveryPasswordController@sendPasswordResetToken')->name('send-password-reset-token');
    Route::get('/reset-password/{token}', 'RecoveryPasswordController@showPasswordResetForm')->name('show-password-reset-form');
    Route::post('/reset-password/{token}', 'RecoveryPasswordController@resetPassword')->name('reset-password');*/
});
/*
//'prevent-back-history'
Route::middleware(['auth', 'prevent-back-history'])->group(function(){

    //ruta de logout
    Route::get('/logout', 'LoginController@logout')->name('logout');


    Route::middleware(['check-question-event'])->group(function(){

        //ruta cambiar clave
        Route::get('/cliente/cambiar/password', 'CambiarClaveController@index')->name('cambiar-clave');
        Route::post('/ajax-post-cambiar-clave', 'CambiarClaveController@ajaxPostCambiarClave')->name('ajax-post-cambiar-clave');

        //ruta invitacion
        Route::post('/sincronizado', 'PerfilController@ajaxPostSync')->name('sync');

        
        //ruta eventos
        Route::get('/ajax-eventos/{id}','EventoController@getEvento');

    });

    

});*/

?>
