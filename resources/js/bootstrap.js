
window._ = require('lodash');

/**
 * We'll load jQuery and the Bootstrap jQuery plugin which provides support
 * for JavaScript based Bootstrap features such as modals and tabs. This
 * code may be modified to fit the specific needs of your application.
 */

try {
    window.Popper = require('popper.js').default;
    window.$ = window.jQuery = require('jquery');

    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Next we will register the CSRF Token as a common header with Axios so that
 * all outgoing HTTP requests automatically have it attached. This is just
 * a simple convenience so we don't have to attach every token manually.
 */

let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
} else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     encrypted: true
// });

window.app = {pedidos:[],gpsintervalo:10,url:'',cache:true};

if(localStorage&&localStorage.getItem('cache')){
  window.app.cache=localStorage.getItem('cache') == 'false' ? false : true;
}else{
  window.app.cache=localStorage.setItem('cache','false');
}
window.app.isCordovaIos = function () {
            return (navigator.userAgent.match(/(Ios)/)&&navigator.userAgent.match(/(Cordova)/));
        };
window.app.isCordova = function () {
            return (navigator.userAgent.match(/(Cordova)/));
        };
var app = {
    datos:{},
    servicio:false,
    preguntasGPS:0,
    // Application Constructor
    initialize: function(datos) {
        this.datos=datos;
      //  console.log('iniciar');
       // console.log(this.datos);
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        console.log('ready');
    var routerObject={};  
cordova.plugins.CordovaMqTTPlugin.connect({
    url:"tcp://node69345-mqttone.mircloud.host", //a public broker used for testing purposes only. Try using a self hosted broker for production.
    port:11273,
    clientId:window.Laravel.cliente,
    connectionTimeout:3000,
    willTopicConfig:{
        qos:0, //default is 0
        retain:true, //default is true
        topic:"sampletopic",
        payload:"test1"
    },
    username:null,
    password:null,
    keepAlive:60,
    isBinaryPayload: false, //setting this 'true' will make plugin treat all data as binary and emit ArrayBuffer instead of string on events
    success:function(s){
    	console.log(s);
        console.log("connect success");
        //Simple subscribe
cordova.plugins.CordovaMqTTPlugin.subscribe({
   topic:"sampletopic",
   qos:0,
  success:function(s){
 console.log(s);
  },
  error:function(e){
 console.log(s);
  }
});


cordova.plugins.CordovaMqTTPlugin.listen("sampletopic",function(payload,params){
	console.log("testxd2");
  //Callback:- (If the user has published to /topic/room/hall)
  //payload : contains payload data
  //params : {singlewc:room,multiwc:hall}
  window.plugins.flashlight.toggle(
  function() {}, // optional success callback
  function() {}, // optional error callback
  {intensity: 0.3} // optional as well, used on iOS when switching on
);
   console.log(payload);
  console.log(params);
});


    },
    error:function(e){
        console.log(e);
        console.log("connect error");
    },
    onConnectionLost:function (e){
    	console.log(e);
        console.log("disconnect");
    },
    routerConfig:{
        publishMethod:"emit", //refer your custom router documentation to get the emitter/publishing function name. The parameter should be a string and not a function.
        useDefaultRouter:true //Set false to use your own topic router implementation. Set true to use the stock topic router implemented in the plugin.
    }
});
/*
document.addEventListener("connected",function(e){
 console.log(e.type)
},false)




*/

/*
cordova.plugins.CordovaMqTTPlugin.publish({
   topic:"sampletopic",
   payload:"hello from the plugin",
   qos:0,
   retain:false,
   success:function(s){
 console.log(s);
   },
   error:function(e){
 console.log(s);
   }
})
//Declare this function in any scope to access the router function "on" to receive the payload for certain topic
*/
/*
 //Deprecated
 document.addEventListener("sampletopic",function(e){
  console.log(e.payload)
 },false);

 //New way to listen to topics
 cordova.plugins.CordovaMqTTPlugin.listen("/topic/+singlewc/#multiwc",function(payload,params){
  //Callback:- (If the user has published to /topic/room/hall)
  //payload : contains payload data
  //params : {singlewc:room,multiwc:hall}
   console.log(payload);
  console.log(params);
})*/
///later, to stop
//bgLocationServices.stop();
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
      /*  var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');*/

        //console.log('Received Event: ' + id);
    }
};

app.initialize({});