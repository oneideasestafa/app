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

Route::middleware(['guest'])->group(function () {
  Route::get('/sandbox/gettime', 'GeneralAppController@getClientTimeOffset');
    
  // Ruta de entrada principal a la aplicación
  Route::fallback('IndexController@index')->name('index');
});
?>
