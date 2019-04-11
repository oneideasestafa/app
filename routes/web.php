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

Route::get('/', function () {
    return view('welcome');
});
//Route::get('/login','LoginController@index');
//Route::post('/post-login','LoginController@postLogin');


Route::middleware(['guest'])->group(function(){

    //ruta inicial
    Route::get('/', 'IndexController@index')->name('index1');
    //ruta inicial
    Route::get('/index', 'IndexController@index')->name('index');

    //ruta del login
    Route::get('/login', 'LoginController@index')->name('login');
    //Route::post('/post-login', 'LoginController@postLogin')->name('post-login');
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
    Route::get('/visitante', 'VisitanteController@login')->name('login-visitante');


});

//'prevent-back-history'
Route::middleware(['auth:web,usuarios', 'role:cliente'])->group(function(){

    //ruta de logout
    Route::get('/logout', 'LoginController@logout')->name('logout');
    Route::get('/inicio', 'IndexController@inicio')->name('inicio');
});