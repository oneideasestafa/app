webpackJsonp([7],{107:function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var o=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),i=r.sources.map(function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"});return[n].concat(i).concat([o]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},o=0;o<this.length;o++){var i=this[o][0];"number"==typeof i&&(r[i]=!0)}for(o=0;o<e.length;o++){var a=e[o];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},108:function(e,t,n){var r,o,i={},a=(r=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===o&&(o=r.apply(this,arguments)),o}),s=function(e){var t={};return function(e){return void 0===t[e]&&(t[e]=function(e){return document.querySelector(e)}.call(this,e)),t[e]}}(),u=null,l=0,c=[],f=n(109);function p(e,t){for(var n=0;n<e.length;n++){var r=e[n],o=i[r.id];if(o){o.refs++;for(var a=0;a<o.parts.length;a++)o.parts[a](r.parts[a]);for(;a<r.parts.length;a++)o.parts.push(v(r.parts[a],t))}else{var s=[];for(a=0;a<r.parts.length;a++)s.push(v(r.parts[a],t));i[r.id]={id:r.id,refs:1,parts:s}}}}function d(e,t){for(var n=[],r={},o=0;o<e.length;o++){var i=e[o],a=t.base?i[0]+t.base:i[0],s={css:i[1],media:i[2],sourceMap:i[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}function h(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var r=c[c.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),c.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function m(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=c.indexOf(e);t>=0&&c.splice(t,1)}function g(e){var t=document.createElement("style");return e.attrs.type="text/css",b(t,e.attrs),h(e,t),t}function b(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function v(e,t){var n,r,o,i;if(t.transform&&e.css){if(!(i=t.transform(e.css)))return function(){};e.css=i}if(t.singleton){var a=l++;n=u||(u=g(t)),r=x.bind(null,n,a,!1),o=x.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return e.attrs.type="text/css",e.attrs.rel="stylesheet",b(t,e.attrs),h(e,t),t}(t),r=function(e,t,n){var r=n.css,o=n.sourceMap,i=void 0===t.convertToAbsoluteUrls&&o;(t.convertToAbsoluteUrls||i)&&(r=f(r));o&&(r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */");var a=new Blob([r],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),o=function(){m(n),n.href&&URL.revokeObjectURL(n.href)}):(n=g(t),r=function(e,t){var n=t.css,r=t.media;r&&e.setAttribute("media",r);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),o=function(){m(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else o()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=d(e,t);return p(n,t),function(e){for(var r=[],o=0;o<n.length;o++){var a=n[o];(s=i[a.id]).refs--,r.push(s)}e&&p(d(e,t),t);for(o=0;o<r.length;o++){var s;if(0===(s=r[o]).refs){for(var u=0;u<s.parts.length;u++)s.parts[u]();delete i[s.id]}}}};var y,w=(y=[],function(e,t){return y[e]=t,y.filter(Boolean).join("\n")});function x(e,t,n,r){var o=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,o);else{var i=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}},109:function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,r=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var o,i=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(i)?e:(o=0===i.indexOf("//")?i:0===i.indexOf("/")?n+i:r+i.replace(/^\.\//,""),"url("+JSON.stringify(o)+")")})}},428:function(e,t,n){var r=n(683);"string"==typeof r&&(r=[[e.i,r,""]]);var o={transform:void 0};n(108)(r,o);r.locals&&(e.exports=r.locals)},679:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=l(o),a=l(n(25)),s=l(n(680)),u=l(n(681));function l(e){return e&&e.__esModule?e:{default:e}}var c=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={homeGame:!0,questionAnswers:!1,questionWithAnswers:[]},n.onChangeHomeGame=n.onChangeHomeGame.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"onChangeHomeGame",value:function(){this.setState({homeGame:!1,questionAnswers:!0})}},{key:"componentDidMount",value:function(){var e=this;a.default.get("/api/preguntados/pregutas-respuestas").then(function(t){e.setState({questionWithAnswers:t.data.preguntas}),console.log(1e3,t)}).catch(function(e){console.log(2e3,e)})}},{key:"render",value:function(){return i.default.createElement("div",{className:"container"},this.state.homeGame&&i.default.createElement(s.default,{nextPage:this.onChangeHomeGame}),this.state.questionAnswers&&i.default.createElement(u.default,{questionWithAnswers:this.state.questionWithAnswers,questionCurrent:1}))}}]),t}();t.default=c},680:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(0),i=(r=o)&&r.__esModule?r:{default:r};t.default=function(e){return i.default.createElement(i.default.Fragment,null,i.default.createElement("div",{className:"row mt-5 pt-5"},i.default.createElement("div",{className:"col-12 mt-5 pt-5"})),i.default.createElement("div",{className:"row mt-5 pt-5"},i.default.createElement("div",{className:"col-12 col-lg-5 offset-lg-3"},i.default.createElement("button",{type:"submit",className:"btn btn-negro btn-box-index",onClick:e.nextPage},"Unirse al juego"))))}},681:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=n(0),i=u(o),a=u(n(146)),s=u(n(682));function u(e){return e&&e.__esModule?e:{default:e}}n(428);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={questionCurrent:n.props.questionCurrent,totalQuestion:n.props.questionWithAnswers.length,questionWithAnswers:n.props.questionWithAnswers,currentQuestionWithAnswers:null},n.getCurrentQuestionWithAnswers=n.getCurrentQuestionWithAnswers.bind(n),n.getAnswerUser=n.getAnswerUser.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,o.Component),r(t,[{key:"getAnswerUser",value:function(e){var t=this;this.state.currentQuestionWithAnswers.answer===e?a.default.fire({title:'<i class="fa fa-check-circle"></i>',text:"Respuesta correcta",confirmButtonColor:"#343a40",confirmButtonText:"Ok"}).then(function(){t.state.questionCurrent<t.state.totalQuestion?t.setState({questionCurrent:t.state.questionCurrent+1}):a.default.fire({title:'<i class="fas fa-info-circle"></i>',text:"Juego finalizado",confirmButtonColor:"#343a40",confirmButtonText:"Ok"}).then(function(){location.reload()})}):a.default.fire({title:'<i class="fas fa-exclamation-circle"></i>',text:"Respuesta incorrecta",confirmButtonColor:"#343a40",confirmButtonText:"Ok"}).then(function(){t.state.questionCurrent<t.state.totalQuestion?t.setState({questionCurrent:t.state.questionCurrent+1}):a.default.fire({title:'<i class="fas fa-info-circle"></i>',text:"Juego finalizado",confirmButtonColor:"#343a40",confirmButtonText:"Ok"}).then(function(){location.reload()})})}},{key:"getCurrentQuestionWithAnswers",value:function(){var e=this,t=[],n=this.state.questionWithAnswers.map(function(t,n){return e.state.questionCurrent===n+1?[i.default.createElement(s.default,{key:n,typeQuestion:!0,text:t.question}),i.default.createElement(s.default,{key:n+1,typeQuestion:!1,text:t.answer,getAnswerUser:e.getAnswerUser}),i.default.createElement(s.default,{key:n+2,typeQuestion:!1,text:t.optionOne,getAnswerUser:e.getAnswerUser}),""!==t.optionTwo?i.default.createElement(s.default,{key:n+3,typeQuestion:!1,text:t.optionTwo,getAnswerUser:e.getAnswerUser}):null,""!==t.optionThree?i.default.createElement(s.default,{key:n+4,typeQuestion:!1,text:t.optionThree,getAnswerUser:e.getAnswerUser}):null,""!==t.optionFour?i.default.createElement(s.default,{key:n+5,typeQuestion:!1,text:t.optionFour,getAnswerUser:e.getAnswerUser}):null]:null});return null!==n&&void 0!==(n=n.filter(Boolean))[0]&&(n=n[0].filter(Boolean),t.push(n[0]),n.shift(),n.sort(function(){return Math.random()-.5}),n.map(function(e,n){t.push(e)})),t}},{key:"componentDidMount",value:function(){this.setState({currentQuestionWithAnswers:this.state.questionWithAnswers[this.state.questionCurrent-1]})}},{key:"componentDidUpdate",value:function(e,t){this.props.questionCurrent===e.questionCurrent&&this.state.questionCurrent===t.questionCurrent||(console.log("Entre"),this.setState({currentQuestionWithAnswers:this.state.questionWithAnswers[this.state.questionCurrent-1]}))}},{key:"render",value:function(){return console.log(this.state.currentQuestionWithAnswers),i.default.createElement(i.default.Fragment,null,this.getCurrentQuestionWithAnswers(),i.default.createElement("div",{className:"row mt-5 pt-5 justify-content-end"},i.default.createElement("div",{className:"col-4"},i.default.createElement("p",null,this.state.questionCurrent,"/",this.state.totalQuestion))))}}]),t}();t.default=l},682:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,o=n(0),i=(r=o)&&r.__esModule?r:{default:r};n(428);t.default=function(e){return i.default.createElement(i.default.Fragment,null,e.typeQuestion&&i.default.createElement("div",{className:"row mt-2 pt-2 mb-4 pb-4"},i.default.createElement("div",{className:"col-12"},i.default.createElement("div",{className:"hex gradient-bg-question"},i.default.createElement("span",{className:"span-text"},e.text)))),!e.typeQuestion&&i.default.createElement("div",{className:"row mt-2 pt-2"},i.default.createElement("div",{className:"col-12"},i.default.createElement("div",{className:"hex gradient-bg",onClick:function(t){e.getAnswerUser(e.text)}},i.default.createElement("span",{className:"span-text"},e.text)))))}},683:function(e,t,n){(e.exports=n(107)(!1)).push([e.i,'.hex{position:relative;float:left;height:100px;min-width:320px;padding:12px;margin:4px;font-weight:700;text-align:center;background:linear-gradient(90deg,#000,#fff)}.hex.gradient-bg{color:#fff}.hex.gradient-border{color:#c62828}.hex:before{position:absolute;content:"";height:calc(100% - 14px);width:calc(100% - 14px);left:7px;top:7px;z-index:-1}.hex.gradient-bg:before{background:linear-gradient(90deg,#c62828,#c62828)}.hex.gradient-bg-question:before{background:linear-gradient(90deg,#000,#000)}.hex.gradient-border:before{background:#f5f6f8}.span-text{display:block;margin-top:40px;padding:8px;transform:translateY(-50%)}',""])}});