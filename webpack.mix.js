const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  target: 'web',
  node: {
    fs: 'empty'
  }
})

//compilar archivos de react
mix.react('resources/js/app.js', 'public/js/app.js');

//compilar los archivos css
mix.styles([
    'node_modules/daemonite-material/css/material.min.css',
    //'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
    'node_modules/sweetalert2/dist/sweetalert2.min.css',
    'resources/css/main.css',
], 'public/css/vendor.css');


//compilar los archivos js
// mix.babel([
//     'node_modules/jquery/dist/jquery.min.js',
//     'node_modules/popper.js/dist/umd/popper.js',
//     'node_modules/bootstrap/dist/js/bootstrap.min.js',
//     'node_modules/daemonite-material/js/material.min.js',
//     'node_modules/axios/dist/axios.min.js',
//     'node_modules/sweetalert2/dist/sweetalert2.min.js',
//     'node_modules/location-picker/dist/location-picker.min.js',
//     'node_modules/rangetouch/dist/rangetouch.js',
//     //'node_modules/inputmask/dist/min/jquery.inputmask.bundle.min.js',
//     //'node_modules/moment/min/moment.min.js',
//     //'node_modules/moment/min/moment-with-locales.min.js',
//     'node_modules/howler/dist/howler.min.js',
//     'resources/js/main.js'
// ], 'public/js/vendor.js');

//copiar la carpeta de webfonts de fontawesome 5 de la libreria al directorio public
mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');
