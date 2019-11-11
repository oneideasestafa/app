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

    <script type="text/javascript">
    window.Laravel = {!! json_encode([
        'cliente' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->_id : null,
        'telefono' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->Telefono : null,
        'evento' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->Evento_id : null,
        'gtm' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->GTM : null,
        'empresa' => auth()->guard('web')->check() ? (string)auth()->guard('web')->user()->Empresa_id : null,
        'archivos' => auth()->guard('web')->check() ? auth()->guard('web')->user()->Archivos : null,
        'sincronizado' => auth()->guard('web')->check() ? auth()->guard('web')->user()->Sincronizado : null
    ]) !!};
</script>

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
    <meta http-equiv="Content-Security-Policy" content="* * 'self' default-src * data: blob: 'unsafe-inline' 'unsafe-eval' ws: wss: cdvfile: file: ;">
</head>

<body class="roboto-condensed" style="background: rgb(49, 49, 49) !important">

 
<div id="app" data-url="{{ url('/') }}" data-googleplay="{{ config('app.url-google-play') }}" data-applestore="{{ config('app.url-app-store') }}" >
</div>
    <script type="text/javascript">
        /** detectar movil **/      
        function isCordova () {
          return navigator.userAgent.match(/(Cordova)/);
        }
        
        function isCordovaIos () {
          return navigator.userAgent.match(/(Ios)/);
        }

        function isCordovaAndroid () {
          return navigator.userAgent.match(/(Android)/);
        }

        if(isCordovaIos()){
            var script = document.createElement( "script" );
            script.type = "text/javascript";
            script.src = window.location.protocol+'//'+window.location.host+'/cordovaios/cordova.js';
            document.getElementsByTagName('head')[0].appendChild(script)
        }else if (isCordovaAndroid()){
            var script = document.createElement( "script" );
            script.type = "text/javascript";
            script.src = window.location.protocol+'//'+window.location.host+'/cordova-android/cordova.js';
            document.getElementsByTagName('head')[0].appendChild(script)
        }
    </script>
    <script class="jscache" src="{{ asset('js/app.js') }}"></script>
    <script src="{{ asset('js/CanvasRecorder.js') }}"></script>
    <!-- <script src="{{ asset('js/vendor.js') }}"></script> -->

<script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
    <script src="https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
    <script src="https://cdn.plyr.io/3.5.3/plyr.polyfilled.js"></script>
    @yield('javascript')
    
</body>
</html>
