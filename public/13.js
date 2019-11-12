webpackJsonp([13],{692:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),i=a(0),r=s(i),c=a(9),o=s(a(26));function s(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var a=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={typeCamera:o.default.getState().chroma.camera,background:o.default.getState().chroma.background,effect:o.default.getState().chroma.effect},a.Video=a.Video.bind(a),a.Image=a.Image.bind(a),a.Download=a.Download.bind(a),a}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.Component),n(t,[{key:"computeframe",value:function(){this.ctx1.drawImage(this.capture,0,0,this.width,this.height),this.state.effect&&this.ctx1.drawImage(document.getElementById("effect"),0,0,this.width,this.height);for(var e=this.ctx1.getImageData(0,0,this.width,this.height),t=e.data.length/4,a=0;a<t;a++){var n=e.data[4*a+0],i=e.data[4*a+1],r=e.data[4*a+2];i>n&&i>r&&i>80&&i>n+6&&i>r+6&&(e.data[4*a+3]=0)}this.ctx2.putImageData(e,0,0),this.ctx2.globalCompositeOperation="destination-over",this.ctx2.drawImage(document.getElementById("background"),0,0,this.width,this.height)}},{key:"Download",value:function(){window.canvas2ImagePlugin.saveImageDataToLibrary(function(e){console.log(e)},function(e){console.log(e)},this.c2)}},{key:"timerCallback",value:function(){this.capture.ended&&this.recoder.stop,this.computeframe();var e=this;setTimeout(function(){e.timerCallback()},0)}},{key:"Effect",value:function(){var e="images/chroma/effect/"+o.default.getState().chroma.effect+".png";return r.default.createElement("img",{id:"effect",src:e,width:"100px",height:"100px",style:{display:"none"}})}},{key:"componentDidMount",value:function(){var e=this;if("video"==this.state.typeCamera){this.c3=document.getElementById("c3");window.plugin.CanvasCamera.initialize(this.c3),window.plugin.CanvasCamera.start({cameraFacing:"front",use:"data"},function(e){console.log("[CanvasCamera start]","error",e)},function(e){document.getElementById("background").src="data:image/png;base64,"+e.image.src})}else{var t={quality:50,destinationType:Camera.DestinationType.DATA_URL,sourceType:Camera.PictureSourceType.CAMERA,encodingType:Camera.EncodingType.JPG,mediaType:Camera.MediaType.PICTURE,correctOrientation:!0};navigator.camera.getPicture(function(t){e.Image(t)},function(e){alert(e)},t)}}},{key:"Video",value:function(e){var t=this;this.capture=this.refs.capture;e[0].localURL;this.capture.src=e[0].localURL,this.capture.play(),this.c1=this.refs.c1,this.ctx1=this.c1.getContext("2d"),this.ctx2=this.c2.getContext("2d"),this.capture.addEventListener("loadedmetadata",function(e){console.log(e),t.width=t.capture.videoWidth,t.height=t.capture.videoHeight,t.recorder=new CanvasRecorder(t.c2),t.recorder.start(),t.timerCallback()})}},{key:"Image",value:function(e){this.capture=document.getElementById("capture"),document.getElementById("capture").src="data:image/png;base64,"+e,this.c1=this.refs.c1,this.ctx1=this.c1.getContext("2d"),this.c2=this.refs.c2,this.c3=document.getElementById("effect"),this.ctx2=this.c2.getContext("2d"),this.width=document.getElementById("capture").width,this.height=document.getElementById("capture").height,this.timerCallback()}},{key:"render",value:function(){var e="images/chroma/background/"+o.default.getState().chroma.background+".jpg";return r.default.createElement("div",{className:"abs-center row"},r.default.createElement("div",{className:"container md-3"},r.default.createElement("canvas",{ref:"c1",style:{backgroundSize:"",backgroundRepeat:"no-repeat",width:"100%",height:"200px",display:"none"}}),r.default.createElement("canvas",{ref:"c2",onClick:this.Video,style:{backgroundSize:"",backgroundRepeat:"no-repeat",width:"100%",height:"300px"}}),r.default.createElement("img",{id:"background",src:e,width:"100px",height:"100px",style:{display:"none"}}),"video"==this.state.typeCamera?r.default.createElement("canvas",{id:"c3",onClick:this.Video,style:{backgroundSize:"",backgroundRepeat:"no-repeat",width:"100%",height:"300px"}}):r.default.createElement("img",{crossOrigin:"Anonymous",id:"capture",style:{width:"100%",height:"200px",visibility:"hidden"}}),this.state.effect?r.default.createElement(this.Effect,null):"",r.default.createElement("div",{className:"container text-center"},r.default.createElement(c.Link,{to:"/green-step-3"},r.default.createElement("button",{type:"button",className:"btn btn-gris"},"Volver"))),r.default.createElement("div",{className:"container text-center"},r.default.createElement("button",{type:"button",onClick:this.Download,className:"btn btn-rojo"},"Descargar"))))}}]),t}();t.default=u}});