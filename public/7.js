webpackJsonp([7],{

/***/ 133:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(135);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ 135:
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(711);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(134)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./Game.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./Game.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 707:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _axios = __webpack_require__(36);

var _axios2 = _interopRequireDefault(_axios);

var _Home = __webpack_require__(708);

var _Home2 = _interopRequireDefault(_Home);

var _Game = __webpack_require__(709);

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Asked = function (_Component) {
    _inherits(Asked, _Component);

    function Asked(props) {
        _classCallCheck(this, Asked);

        var _this = _possibleConstructorReturn(this, (Asked.__proto__ || Object.getPrototypeOf(Asked)).call(this, props));

        _this.state = {
            homeGame: true,
            questionAnswers: false,
            questionWithAnswers: []
        };

        _this.onChangeHomeGame = _this.onChangeHomeGame.bind(_this);
        return _this;
    }

    _createClass(Asked, [{
        key: 'onChangeHomeGame',


        /**
         * Cambia de pantalla del home al juego de preguntados
         */
        value: function onChangeHomeGame() {
            this.setState({
                homeGame: false,
                questionAnswers: true
            });
        }
    }, {
        key: 'componentDidMount',


        /**
         * Carga las preguntas y respuetas que se usaran en el juego
         */
        value: function componentDidMount() {
            var _this2 = this;

            _axios2.default.get("/api/preguntados/pregutas-respuestas").then(function (res) {
                _this2.setState({
                    questionWithAnswers: res.data.preguntas
                });
                console.log(1000, res);
            }).catch(function (error) {
                console.log(2000, error);
            });

            // this.setState({
            //     questionWithAnswers: [
            //         {
            //             "_id": "5d8d42e24d93140b608843ff",
            //             "idQuestion": 1,
            //             "idCategory": 1,
            //             "question": "¿QUIÉN ES MÁS GRANDE CAROLINA “PAMPITA” ARDOHAIN O NICOLE NEUMANN?",
            //             "answer": "CAROLINA \"PAMPITA\"",
            //             "optionOne": "NICOLE NEUMANN",
            //             "optionTwo": "",
            //             "optionThree": "",
            //             "optionFour": "",
            //             "__v": 0
            //         },
            //         {
            //             "_id": "5d8d43304d93140b60884400",
            //             "idQuestion": 2,
            //             "idCategory": 1,
            //             "question": "ADEMÁS DEL ACEITE ¿CUÁL ES EL INGREDIENTE FUNDAMENTAL DEL ALIOLI?",
            //             "answer": "AJO",
            //             "optionOne": "KETCHUP",
            //             "optionTwo": "PIMIENTA",
            //             "optionThree": "LIMON",
            //             "optionFour": "OREGANO",
            //             "__v": 0
            //         },
            //         {
            //             "_id": "5d8d435e4d93140b60884401",
            //             "idQuestion": 3,
            //             "idCategory": 1,
            //             "question": "¿CON QUÉ PRÍNCIPE BRITÁNICO ESTÁ CASADA MEGHAN MARKLE?",
            //             "answer": "PRINCIPE HARRY",
            //             "optionOne": "GUILLERMO",
            //             "optionTwo": "CARLOS",
            //             "optionThree": "",
            //             "optionFour": "",
            //             "__v": 0
            //         }
            //     ]
            // });
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'container' },
                this.state.homeGame && _react2.default.createElement(_Home2.default, {
                    nextPage: this.onChangeHomeGame
                }),
                this.state.questionAnswers && _react2.default.createElement(_Game2.default, {
                    questionWithAnswers: this.state.questionWithAnswers,
                    questionCurrent: 1
                })
            );
        }
    }]);

    return Asked;
}(_react.Component);

exports.default = Asked;

/***/ }),

/***/ 708:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home(props) {
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
            "div",
            { className: "row mt-5 pt-5" },
            _react2.default.createElement("div", { className: "col-12 mt-5 pt-5" })
        ),
        _react2.default.createElement(
            "div",
            { className: "row mt-5 pt-5" },
            _react2.default.createElement(
                "div",
                { className: "col-12 col-lg-5 offset-lg-3" },
                _react2.default.createElement(
                    "button",
                    { type: "submit", className: "btn btn-negro btn-box-index", onClick: props.nextPage },
                    "Unirse al juego"
                )
            )
        )
    );
};

exports.default = Home;

/***/ }),

/***/ 709:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _sweetalert = __webpack_require__(172);

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _Hexagon = __webpack_require__(710);

var _Hexagon2 = _interopRequireDefault(_Hexagon);

__webpack_require__(454);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Game = function (_Component) {
    _inherits(Game, _Component);

    function Game(props) {
        _classCallCheck(this, Game);

        var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

        _this.state = {
            questionCurrent: _this.props.questionCurrent,
            totalQuestion: _this.props.questionWithAnswers.length,
            questionWithAnswers: _this.props.questionWithAnswers,
            currentQuestionWithAnswers: null
        };

        _this.getCurrentQuestionWithAnswers = _this.getCurrentQuestionWithAnswers.bind(_this);
        _this.getAnswerUser = _this.getAnswerUser.bind(_this);
        return _this;
    }

    _createClass(Game, [{
        key: 'getAnswerUser',


        /**
         * Recibe la respuesta del usuario para comprobar si es valida o no,
         * muestra los diferentes mensajes segun sea el caso
         * @param {string} answer 
         */
        value: function getAnswerUser(answer) {
            var _this2 = this;

            if (this.state.currentQuestionWithAnswers.answer === answer) {
                _sweetalert2.default.fire({
                    title: '<i class="fa fa-check-circle"></i>',
                    text: 'Respuesta correcta',
                    confirmButtonColor: '#343a40',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    if (_this2.state.questionCurrent < _this2.state.totalQuestion) {
                        _this2.setState({
                            questionCurrent: _this2.state.questionCurrent + 1
                        });
                    } else {
                        _sweetalert2.default.fire({
                            title: '<i class="fas fa-info-circle"></i>',
                            text: 'Juego finalizado',
                            confirmButtonColor: '#343a40',
                            confirmButtonText: 'Ok'
                        }).then(function () {
                            location.reload();
                        });
                    }
                });
            } else {
                _sweetalert2.default.fire({
                    title: '<i class="fas fa-exclamation-circle"></i>',
                    text: 'Respuesta incorrecta',
                    confirmButtonColor: '#343a40',
                    confirmButtonText: 'Ok'
                }).then(function () {
                    if (_this2.state.questionCurrent < _this2.state.totalQuestion) {
                        _this2.setState({
                            questionCurrent: _this2.state.questionCurrent + 1
                        });
                    } else {
                        _sweetalert2.default.fire({
                            title: '<i class="fas fa-info-circle"></i>',
                            text: 'Juego finalizado',
                            confirmButtonColor: '#343a40',
                            confirmButtonText: 'Ok'
                        }).then(function () {
                            location.reload();
                        });
                    }
                });
            }
        }
    }, {
        key: 'getCurrentQuestionWithAnswers',


        /**
         * Toma la pregunta actual con sus posibles respuestas.
         * Ademas se encarga de saltear las posibles respuestas para que no queden
         * en la misma posicion. 
         */
        value: function getCurrentQuestionWithAnswers() {
            var _this3 = this;

            var questionWithAnswerShuffle = [];
            var questionWithAnswer = this.state.questionWithAnswers.map(function (questionWithAnswer, index) {
                return _this3.state.questionCurrent === index + 1 ? [_react2.default.createElement(_Hexagon2.default, {
                    key: index,
                    typeQuestion: true,
                    text: questionWithAnswer.question
                }), _react2.default.createElement(_Hexagon2.default, {
                    key: index + 1,
                    typeQuestion: false,
                    text: questionWithAnswer.answer,
                    getAnswerUser: _this3.getAnswerUser
                }), _react2.default.createElement(_Hexagon2.default, {
                    key: index + 2,
                    typeQuestion: false,
                    text: questionWithAnswer.optionOne,
                    getAnswerUser: _this3.getAnswerUser
                }), questionWithAnswer.optionTwo !== "" ? _react2.default.createElement(_Hexagon2.default, {
                    key: index + 3,
                    typeQuestion: false,
                    text: questionWithAnswer.optionTwo,
                    getAnswerUser: _this3.getAnswerUser
                }) : null, questionWithAnswer.optionThree !== "" ? _react2.default.createElement(_Hexagon2.default, {
                    key: index + 4,
                    typeQuestion: false,
                    text: questionWithAnswer.optionThree,
                    getAnswerUser: _this3.getAnswerUser
                }) : null, questionWithAnswer.optionFour !== "" ? _react2.default.createElement(_Hexagon2.default, {
                    key: index + 5,
                    typeQuestion: false,
                    text: questionWithAnswer.optionFour,
                    getAnswerUser: _this3.getAnswerUser
                }) : null] : null;
            });

            if (questionWithAnswer !== null) {
                questionWithAnswer = questionWithAnswer.filter(Boolean);
                if (questionWithAnswer[0] !== undefined) {
                    questionWithAnswer = questionWithAnswer[0].filter(Boolean);
                    questionWithAnswerShuffle.push(questionWithAnswer[0]);
                    questionWithAnswer.shift();
                    questionWithAnswer.sort(function () {
                        return Math.random() - 0.5;
                    });
                    questionWithAnswer.map(function (answer, index) {
                        questionWithAnswerShuffle.push(answer);
                    });
                }
            }

            return questionWithAnswerShuffle;
        }
    }, {
        key: 'componentDidMount',


        /**
         * Toma la pregunta con las respuestas actuales
         */
        value: function componentDidMount() {
            this.setState({
                currentQuestionWithAnswers: this.state.questionWithAnswers[this.state.questionCurrent - 1]
            });
        }
    }, {
        key: 'componentDidUpdate',


        /**
         * Detecta cuando hay un cambio del numero de pregunta y se la asigna
         * a la pregunta y respuesta actual
         */
        value: function componentDidUpdate(prevProps, prevState) {
            if (this.props.questionCurrent !== prevProps.questionCurrent || this.state.questionCurrent !== prevState.questionCurrent) {
                console.log("Entre");
                this.setState({
                    currentQuestionWithAnswers: this.state.questionWithAnswers[this.state.questionCurrent - 1]
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.state.currentQuestionWithAnswers);
            return _react2.default.createElement(
                _react2.default.Fragment,
                null,
                this.getCurrentQuestionWithAnswers(),
                _react2.default.createElement(
                    'div',
                    { className: 'row mt-5 pt-5 justify-content-end' },
                    _react2.default.createElement(
                        'div',
                        { className: 'col-4' },
                        _react2.default.createElement(
                            'p',
                            null,
                            this.state.questionCurrent,
                            '/',
                            this.state.totalQuestion
                        )
                    )
                )
            );
        }
    }]);

    return Game;
}(_react.Component);

exports.default = Game;

/***/ }),

/***/ 710:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(454);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Hexagon = function Hexagon(props) {
    return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        props.typeQuestion && _react2.default.createElement(
            'div',
            { className: 'row mt-2 pt-2 mb-4 pb-4' },
            _react2.default.createElement(
                'div',
                { className: 'col-12' },
                _react2.default.createElement(
                    'div',
                    { className: 'hex gradient-bg-question' },
                    _react2.default.createElement(
                        'span',
                        { className: 'span-text' },
                        props.text
                    )
                )
            )
        ),
        !props.typeQuestion && _react2.default.createElement(
            'div',
            { className: 'row mt-2 pt-2' },
            _react2.default.createElement(
                'div',
                { className: 'col-12' },
                _react2.default.createElement(
                    'div',
                    { className: 'hex gradient-bg', onClick: function onClick(e) {
                            props.getAnswerUser(props.text);
                        } },
                    _react2.default.createElement(
                        'span',
                        { className: 'span-text' },
                        props.text
                    )
                )
            )
        )
    );
};

exports.default = Hexagon;

/***/ }),

/***/ 711:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(133)(false);
// imports


// module
exports.push([module.i, "/* Estilos de los hexagonos para las preguntas y respuestas */\r\n.hex {\r\n    position: relative;\r\n    float: left;\r\n    height: 100px;\r\n    min-width: 320px;\r\n    padding: 12px;\r\n    margin: 4px;\r\n    font-weight: bold;\r\n    text-align: center;\r\n    background: linear-gradient(to right, rgb(0, 0, 0), rgb(255, 255, 255));\r\n  }\r\n  .hex.gradient-bg {\r\n    color: white;\r\n  }\r\n  .hex.gradient-border {\r\n    color: #C62828;\r\n  }\r\n  .hex:before {\r\n    position: absolute;\r\n    content: '';\r\n    height: calc(100% - 14px);  /* 100% - 2 * border width */\r\n    width: calc(100% - 14px);  /* 100% - 2 * border width */\r\n    left: 7px; /* border width */\r\n    top: 7px; /* border width */\r\n    z-index: -1;\r\n  }\r\n  .hex.gradient-bg:before {\r\n    background: linear-gradient(to right, #C62828, #C62828);\r\n  }\r\n  .hex.gradient-bg-question:before {\r\n    background: linear-gradient(to right, black, black);\r\n  }\r\n  .hex.gradient-border:before {\r\n    background: rgb(245, 246, 248);\r\n  }\r\n\r\n  .span-text {\r\n    display: block;\r\n    margin-top: 40px;\r\n    padding: 8px;\r\n    transform: translateY(-50%);\r\n  }\r\n\r\n  /* Estilos de sweetalert 2 */\r\n\r\n  ", ""]);

// exports


/***/ })

});