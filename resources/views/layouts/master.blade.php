<!doctype html>
<html class="no-js" lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="api-base-url" content="{{ url('/') }}" />
    <link rel="manifest" href="{{ url('/manifest.json') }}">
    <meta name="theme-color" content="#FFFFFF"/>

    {{-- checks for service worker support.if you have the push manager package then use this line
    if ('serviceWorker' in navigator && 'PushManager' in window) instead of
    if ('serviceWorker' in navigator ) --}}

    
    @include('layouts.data-laravel-echo')

    <script>
        if ('serviceWorker' in navigator ) {
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/service-worker.js').then(function(reg) {

                    if (reg.installing) {
                        console.log('ServiceWorker instalando...');
                    } else if (reg.waiting) {
                        console.log('ServiceWorker instalado');
                    } else if (reg.active) {
                        console.log('ServiceWorker activo');
                    }

                    // Registration was successful
                    console.log('ServiceWorker registrado exitosamente con el scope: ', reg.scope);
                }, function(err) {
                    // registration failed :(
                    console.log('ServiceWorker fallo al registrar: ', err);
                });
            });
        }
    </script>

    <title>{{ Config::get('app.title')  }}</title>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,bolditalic">
    <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:regular,bold,italic,bolditalic" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
    <link rel="stylesheet" href="{{ asset('css/vendor.css') }}">
    <script src="https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js"></script>

</head>

<body class="roboto-condensed">

    @include('layouts.header-menu')

    <div class="container-fluid">
        @yield('content')
    </div>
    <script type="text/javascript">
            /** detectar movil **/
        function isCordova() {
            return navigator.userAgent.match(/(Cordova)/);
        }
        function isCordovaIos() {
            return navigator.userAgent.match(/(Ios)/);
        }
        if(isCordova()){
            if(isCordovaIos()){
                var script = document.createElement( "script" );
                script.type = "text/javascript";
                //script.src = '/ONEShow/public/cordova/cordova.js';
                script.src = window.location.protocol+'//'+window.location.host+'/cordovaios/cordova.js';
                document.getElementsByTagName('head')[0].appendChild(script)
            }else{
                var script = document.createElement( "script" );
                script.type = "text/javascript";
                //script.src = '/ONEShow/public/cordova/cordova.js';
                script.src = window.location.protocol+'//'+window.location.host+'/cordova/cordova.js';
                document.getElementsByTagName('head')[0].appendChild(script)
            }
        }
    </script>
    <script class="jscache" src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/vendor.js') }}"></script>

    @yield('javascript')

</body>
</html>
