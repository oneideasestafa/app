webpackJsonp([11],{665:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=i(n(0)),l=i(n(666)),a=i(n(669)),o=n(145),u=n(5);function i(e){return e&&e.__esModule?e:{default:e}}t.default=(0,u.connect)(function(e){return{event:e.events.current,files:e.download}},function(e){return{getFilesFromEvent:function(t){return e((0,o.getFilesFromEvent)(t))}}})(function(e){var t=e.files,n=t.current?[t.current].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(t.download)):t.download;return r.default.createElement("div",null,r.default.createElement(l.default,{files:n}),r.default.createElement(a.default,{files:e.files.existing}))})},666:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(0)),l=a(n(667));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.files.map(function(e){return r.default.createElement(l.default,{key:e.id,file:e})});return console.log("files length",t.length),0===t.length?r.default.createElement("div",{className:"m-5"},r.default.createElement("h4",{className:"text-center hint"},"No hay archivos pendientes por descargar en este momento")):r.default.createElement("div",{className:"m-3"},t)}},667:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,l=!1,a=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){l=!0,a=e}finally{try{!r&&u.return&&u.return()}finally{if(l)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=n(0),a=c(l),o=c(n(668)),u=n(145),i=n(5);function c(e){return e&&e.__esModule?e:{default:e}}t.default=(0,i.connect)(function(e){return{event:e.events.current,progress:e.download.progress,currentId:e.download.current.id}},function(e){return{fileFinishedDownloading:function(t){return e((0,u.fileFinishedDownloading)(t))}}})(function(e){var t=(0,l.useState)(!1),n=r(t,2),u=n[0],i=n[1],c=e.file,d=c.id,s=c.magnetURI,f=c.size,m=c.name,v=e.progress;return(0,l.useEffect)(function(){e.currentId===d&&s&&(console.log("download",m),i(!0))},[e.currentId]),a.default.createElement("div",{className:"download-box mb-2"},a.default.createElement("div",{className:"download-info"},a.default.createElement("div",{className:"info-header"},a.default.createElement("label",null,m),!s&&a.default.createElement("p",null,"El archivo aún no está disponible para descargar, intentelo de nuevo más tarde"),u&&v&&a.default.createElement("p",null,v.downloadSpeed+"Kb/s - "+v.downloaded+"Kb de "+f)),u&&v&&a.default.createElement("div",{className:"info-progress"},a.default.createElement(o.default,{color:"success",progress:v.progress}))))})},668:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(0)),l=a(n(85));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.progress,n=e.color,a=void 0===n?"success":n,o=(0,l.default)("progress-bar","bg-"+a);return r.default.createElement("div",{className:"progress"},r.default.createElement("div",{className:o,role:"progressbar",style:{width:t+"%"},"aria-valuenow":""+t,"aria-valuemin":"0","aria-valuemax":"100"}))}},669:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(n(0)),l=a(n(670));function a(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.files.map(function(e){return console.log("file",e.id),r.default.createElement(l.default,{key:e.id,file:e})});return 0===t.length?null:r.default.createElement("div",{className:"m-3"},r.default.createElement("h5",{style:{fontFamily:"Roboto",fontWeight:500}},"Archivos descargados"),r.default.createElement("div",null,t))}},670:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,l=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var n=[],r=!0,l=!1,a=void 0;try{for(var o,u=e[Symbol.iterator]();!(r=(o=u.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){l=!0,a=e}finally{try{!r&&u.return&&u.return()}finally{if(l)throw a}}return n}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),a=n(0),o=(r=a)&&r.__esModule?r:{default:r},u=n(5),i=n(7),c=n(145);t.default=(0,u.connect)(null,function(e){return{deleteFile:function(t){return e((0,c.deleteFile)(t))}}})(function(e){var t=(0,a.useState)(!1),n=l(t,2),r=n[0],u=n[1];return o.default.createElement("div",{className:"download-box complete mb-2"},o.default.createElement("div",{className:"download-info"},o.default.createElement("div",{className:"info-header"},o.default.createElement(i.FontAwesomeIcon,{icon:"check",color:"#4caf50",className:"mx-2"}),o.default.createElement("label",null,e.file.name))),o.default.createElement("div",{className:"download-actions"},r?o.default.createElement(i.FontAwesomeIcon,{icon:"sync-alt",size:"lg",spin:!0}):o.default.createElement(i.FontAwesomeIcon,{icon:"trash-alt",size:"lg",onClick:function(t){u(!0),e.deleteFile(e.file.name).catch(function(e){u(!1),console.log("Something happend",e)})}})))})}});