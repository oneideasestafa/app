
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

window.app = {pedidos:[],gpsintervalo:10,url:'',cache:true,flash:false,comandos:[],
animacionInicio:'',animacionFin:'',
animacionInicioFLH:'',animacionFinFLH:''};

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
window.app = {
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
if(payload!=undefined&&payload.split(",").length>1){
  var datos=payload.split(",");



  
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
//window.app.animacionActual=0;
//window.app.lanzarElDia(new Date(yyyy+'-'+mm+'-'+dd+' '+datos[1]), window.app.tarea);


if(datos[0]=='FLH'){
window.app.animacionFLH=datos[1];
window.app.animacionInicioFLH=datos[2];
window.app.animacionFinFLH=datos[3];
window.app.lanzarElDia(new Date(yyyy+'-'+mm+'-'+dd+' '+window.app.animacionInicioFLH), window.app.tareaFLH);

}
if(datos[0]=='COL'){
window.app.animacion=datos[1].split("+");
window.app.animacionActual=0;
window.app.animacionInicio=datos[2];
window.app.animacionFin=datos[3];
window.app.lanzarElDia(new Date(yyyy+'-'+mm+'-'+dd+' '+window.app.animacionInicio), window.app.tareaCOL);

}
//window.app.comandos=
}
 
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
    },
    tareaCOL: function(x) {
          console.log('acá va la tarea', new Date());
          var animacion=window.app.animacion;
          var i = window.app.animacionActual;
          if(window.app.animacion==undefined||window.app.animacion==''){
            return false;
          }
          if(i>=window.app.animacion.length){
            return false;
          }
          var today = new Date();
            var fin=window.app.animacionFin.split(':');
            if(today.getHours()>=parseInt(fin[0])&&today.getMinutes()>=parseInt(fin[1])&&today.getSeconds()>=parseInt(fin[0])){
              return false;
            }
            var efecto=animacion[i].split(".");
            console.log(efecto);
            
            document.body.style.backgroundColor = efecto[0];
            document.querySelector('.navbar-toggler-icon').style.color =  efecto[0];
            document.body.style.backgroundImage = "none";
            
            if(i+1>=window.app.animacion.length){
              window.app.animacionActual=0;
              setTimeout(window.app.tareaCOL,efecto[1]*1000);
            }else{
              window.app.animacionActual=i+1;
              setTimeout(window.app.tareaCOL,efecto[1]*1000);
            }

    },
    tareaFLH: function() {
       console.log('acá va la tarea', new Date());

       if(window.app.animacionFLH==1){
        if(window.app.flash==undefined||window.app.flash==false){//flash encender
              window.plugins.flashlight.toggle(
                function() {window.app.flash=true;}, // optional success callback
                function() {}, // optional error callback
                {intensity: 1} // optional as well, used on iOS when switching on
              );
            }
       }
        if(window.app.animacionFLH==0){
            if(window.app.flash==true){//flash apagar
              window.plugins.flashlight.toggle(
                function() {window.app.flash=false;}, // optional success callback
                function() {}, // optional error callback
                {intensity: 1} // optional as well, used on iOS when switching on
              );
            }
        }
    },
    lanzarElDia: function(momento, tarea){
          console.log('lanzado',new Date());
          console.log('para ser ejecutado en',momento);
          setTimeout(tarea, momento.getTime()-(new Date()).getTime());
      }

};

app.initialize({});