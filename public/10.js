webpackJsonp([10],{152:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.chromaTypeCamera=function(e){return{type:a.CHROMA_CAMERA,payload:{camera:e}}},t.chromaBackground=function(e){return{type:a.CHROMA_BACKGROUND,payload:{background:e}}},t.chromaEffect=function(e){return{type:a.CHROMA_EFFECT,payload:{effect:e}}};var a=n(29)},685:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),r=n(0),o=p(r),c=(p(n(27)),n(6)),i=n(152),l=n(9),u=(n(14),n(8),n(31),p(n(686))),d=p(n(687)),f=p(n(688)),s=p(n(689));function p(e){return e&&e.__esModule?e:{default:e}}var m=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var n=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={background:""},n.handleClick=n.handleClick.bind(n),n}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,r.Component),a(t,[{key:"handleClick",value:function(e){this.props.chromaBackground(e.target.name),this.props.history.push("green-step-3")}},{key:"render",value:function(){return o.default.createElement("div",{className:"abs-center row"},o.default.createElement("div",{className:"container text-center"},o.default.createElement("h3",null,"Seleccione Fondo")),o.default.createElement("div",{className:"container"},o.default.createElement("div",{className:"row"},o.default.createElement("div",{className:"mx-auto mb-2",style:{paddingLeft:"25px"}},o.default.createElement("img",{className:"fa fa-video redBorder",src:u.default,name:"canvas",width:"150px",height:"120px",style:{padding:"5px"},onClick:this.handleClick}),o.default.createElement("img",{className:"fa fa-video redBorder",src:f.default,width:"150px",height:"120px",name:"moon",style:{padding:"5px"},onClick:this.handleClick}),o.default.createElement("img",{className:"fa fa-video redBorder",src:d.default,width:"150px",height:"120px",name:"ocean",style:{padding:"5px"},onClick:this.handleClick}),o.default.createElement("img",{className:"fa fa-video redBorder",src:s.default,width:"150px",height:"120px",name:"desert",style:{padding:"5px"},onClick:this.handleClick})))),o.default.createElement("div",{className:"container text-center"},o.default.createElement(l.Link,{to:"/green-step-1"},o.default.createElement("button",{type:"button",className:"btn btn-gris"},"Volver"))))}}]),t}();t.default=(0,c.connect)(null,function(e){return{chromaBackground:function(t){return e((0,i.chromaBackground)(t))}}})(m)},686:function(e,t){e.exports="/images/canvas.jpg?da4f3a40dbfa1101cd65573427786e42"},687:function(e,t){e.exports="/images/ocean.jpg?c32310e9f29795a66b3f2ce0ef2ce49b"},688:function(e,t){e.exports="/images/moon.jpg?2f8a638d6e779f08064af3d2918393ac"},689:function(e,t){e.exports="/images/desert.jpg?061632b2acdc5294a30679bb6e72e578"}});