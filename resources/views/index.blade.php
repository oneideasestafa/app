<!doctype html>
<html class="no-js" lang="{{ app()->getLocale() }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>{{ Config::get('app.title') }}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:regular,bold,italic,bolditalic">
  <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:regular,bold,italic,bolditalic" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="{{ asset('css/vendor.css') }}">
  <meta http-equiv="Content-Security-Policy" content="* * 'self' default-src * data: blob: 'unsafe-inline' 'unsafe-eval' ws: wss: cdvfile: file: ;">
</head>
<body class="roboto-condensed" style="background: rgb(49, 49, 49) !important">
  <div id="app" data-googleplay="{{ config('app.url-google-play') }}" data-applestore="{{ config('app.url-app-store') }}" >
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

    if (isCordovaIos()) {
      var script = document.createElement( "script" );
      script.type = "text/javascript";
      script.src = window.location.protocol + '//' + window.location.host + '/cordovaios/cordova.js';
      document.getElementsByTagName('head')[0].appendChild(script);

    } else if (isCordovaAndroid()) {
      var script = document.createElement( "script" );
      script.type = "text/javascript";
      script.src = window.location.protocol + '//' + window.location.host + '/cordova-android/cordova.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  </script>
  <script class="jscache" src="{{ asset('js/app.js') }}"></script>
  <script src="{{ asset('js/CanvasRecorder.js') }}"></script>    
</body>
</html>
