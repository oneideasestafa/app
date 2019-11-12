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
});

// compilar archivos de react
mix.react('resources/js/index.js', 'public/js/app.js');

// compilar los archivos css
mix.styles([
  'node_modules/daemonite-material/css/material.min.css',
  'node_modules/sweetalert2/dist/sweetalert2.min.css',
  'resources/css/main.css',
], 'public/css/vendor.css');

//copiar la carpeta de webfonts de fontawesome 5 de la libreria al directorio public
// mix.copy('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/webfonts');
