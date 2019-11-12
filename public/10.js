webpackJsonp([10],{

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.chromaTypeCamera = chromaTypeCamera;
exports.chromaBackground = chromaBackground;
exports.chromaEffect = chromaEffect;

var _types = __webpack_require__(29);

function chromaTypeCamera(camera) {
	return {
		type: _types.CHROMA_CAMERA,
		payload: { camera: camera }
	};
}

function chromaBackground(background) {
	return {
		type: _types.CHROMA_BACKGROUND,
		payload: { background: background }
	};
}

function chromaEffect(effect) {
	return {
		type: _types.CHROMA_EFFECT,
		payload: { effect: effect }
	};
}

/***/ }),

/***/ 706:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(27);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(6);

var _index = __webpack_require__(170);

var _reactRouterDom = __webpack_require__(10);

var _fontawesomeSvgCore = __webpack_require__(16);

var _reactFontawesome = __webpack_require__(9);

var _freeSolidSvgIcons = __webpack_require__(30);

var _canvas = __webpack_require__(707);

var _canvas2 = _interopRequireDefault(_canvas);

var _ocean = __webpack_require__(708);

var _ocean2 = _interopRequireDefault(_ocean);

var _moon = __webpack_require__(709);

var _moon2 = _interopRequireDefault(_moon);

var _desert = __webpack_require__(710);

var _desert2 = _interopRequireDefault(_desert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Eli2 = function (_Component) {
	_inherits(Eli2, _Component);

	function Eli2(props) {
		_classCallCheck(this, Eli2);

		var _this = _possibleConstructorReturn(this, (Eli2.__proto__ || Object.getPrototypeOf(Eli2)).call(this, props));

		_this.state = {
			background: ""
		};

		_this.handleClick = _this.handleClick.bind(_this);
		return _this;
	}

	_createClass(Eli2, [{
		key: "handleClick",
		value: function handleClick(e) {

			this.props.chromaBackground(e.target.name);
			this.props.history.push('green-step-3');
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "abs-center row" },
				_react2.default.createElement(
					"div",
					{ className: "container text-center" },
					_react2.default.createElement(
						"h3",
						null,
						"Seleccione Fondo"
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "container" },
					_react2.default.createElement(
						"div",
						{ className: "row" },
						_react2.default.createElement(
							"div",
							{ className: "mx-auto mb-2", style: { paddingLeft: '25px' } },
							_react2.default.createElement("img", { className: "fa fa-video redBorder",
								src: _canvas2.default,
								name: "canvas",
								width: "150px",
								height: "120px",
								style: { padding: '5px' },
								onClick: this.handleClick

							}),
							_react2.default.createElement("img", { className: "fa fa-video redBorder",
								src: _moon2.default,
								width: "150px",
								height: "120px",
								name: "moon",
								style: { padding: '5px' },
								onClick: this.handleClick
							}),
							_react2.default.createElement("img", { className: "fa fa-video redBorder",
								src: _ocean2.default,
								width: "150px",
								height: "120px",
								name: "ocean",
								style: { padding: '5px' },
								onClick: this.handleClick
							}),
							_react2.default.createElement("img", { className: "fa fa-video redBorder",
								src: _desert2.default,
								width: "150px",
								height: "120px",
								name: "desert",
								style: { padding: '5px' },
								onClick: this.handleClick
							})
						)
					)
				),
				_react2.default.createElement(
					"div",
					{ className: "container text-center" },
					_react2.default.createElement(
						_reactRouterDom.Link,
						{ to: "/green-step-1" },
						_react2.default.createElement(
							"button",
							{
								type: "button",
								className: "btn btn-gris"
							},
							"Volver"
						)
					)
				)
			);
		}
	}]);

	return Eli2;
}(_react.Component);

function mapDispatchToProps(dispatch) {
	return {
		chromaBackground: function chromaBackground(background) {
			return dispatch((0, _index.chromaBackground)(background));
		}
	};
}

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(Eli2);

/***/ }),

/***/ 707:
/***/ (function(module, exports) {

module.exports = "/images/canvas.jpg?da4f3a40dbfa1101cd65573427786e42";

/***/ }),

/***/ 708:
/***/ (function(module, exports) {

module.exports = "/images/ocean.jpg?c32310e9f29795a66b3f2ce0ef2ce49b";

/***/ }),

/***/ 709:
/***/ (function(module, exports) {

module.exports = "/images/moon.jpg?2f8a638d6e779f08064af3d2918393ac";

/***/ }),

/***/ 710:
/***/ (function(module, exports) {

module.exports = "/images/desert.jpg?061632b2acdc5294a30679bb6e72e578";

/***/ })

});