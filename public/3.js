webpackJsonp([3],{

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

var _fontawesomeSvgCore = __webpack_require__(19);

var _freeSolidSvgIcons = __webpack_require__(42);

var _GoogleAuthButton = __webpack_require__(188);

var _GoogleAuthButton2 = _interopRequireDefault(_GoogleAuthButton);

var _FacebookAuthButton = __webpack_require__(189);

var _FacebookAuthButton2 = _interopRequireDefault(_FacebookAuthButton);

var _logoOne = __webpack_require__(139);

var _logoOne2 = _interopRequireDefault(_logoOne);

__webpack_require__(455);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**Importando estilos de la aplicacion */


_fontawesomeSvgCore.library.add(_freeSolidSvgIcons.faSync);

var Ingreso = function (_Component) {
  _inherits(Ingreso, _Component);

  function Ingreso(props) {
    _classCallCheck(this, Ingreso);

    var _this = _possibleConstructorReturn(this, (Ingreso.__proto__ || Object.getPrototypeOf(Ingreso)).call(this, props));

    _this.state = {
      url: props.url,
      error: '',
      print: '',
      urlGooglePlay: props.googleplay,
      urlAppleStore: props.applestore
    };
    return _this;
  }

  _createClass(Ingreso, [{
    key: "isCordova",
    value: function isCordova() {
      return navigator.userAgent.match(/(Cordova)/);
    }
  }, {
    key: "getOS",
    value: function getOS() {
      var userAgent = window.navigator.userAgent,
          platform = window.navigator.platform,
          macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"],
          windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"],
          iosPlatforms = ["iPhone", "iPad", "iPod"],
          os = null;

      if (macosPlatforms.indexOf(platform) !== -1) {
        os = "Mac OS";
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = "iOS";
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = "Windows";
      } else if (/Android/.test(userAgent)) {
        os = "Android";
      } else if (!os && /Linux/.test(platform)) {
        os = "Linux";
      }

      return os;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        "div",
        { className: "abs-center roboto-condensed" },
        _react2.default.createElement(
          "div",
          { className: "box" },
          _react2.default.createElement(
            "div",
            { className: "" },
            _react2.default.createElement("img", {
              src: _logoOne2.default,
              className: "img-fluid logo-box-index"
            })
          ),
          _react2.default.createElement(
            "div",
            { className: "text-center" },
            this.state.error !== '' && _react2.default.createElement(
              "div",
              { className: "alert alert-danger" },
              this.state.error
            ),
            this.state.print !== '' && _react2.default.createElement(
              "div",
              { className: "alert alert-info" },
              this.state.print
            ),
            _react2.default.createElement(
              _reactRouterDom.Link,
              {
                to: {
                  pathname: "/login",
                  state: { url: "/" }
                }
              },
              _react2.default.createElement(
                "div",
                { className: "btn btn-negro btn-box-index" },
                "Ingresar"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "text-center mb-5" },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: "/registro" },
              _react2.default.createElement(
                "div",
                { className: "btn btn-rojo btn-box-index" },
                "Registrar"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "text-center roboto-condensed text-can-login-social" },
            _react2.default.createElement(
              "p",
              { style: { color: "rgb(146, 143, 143)" } },
              "o puedes ingresar con"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "text-center mb-5" },
            _react2.default.createElement(_FacebookAuthButton2.default, {
              block: true,
              className: "mb-2",
              onStart: function onStart() {
                return _this2.setState({
                  error: ''
                });
              },
              onError: function onError() {
                return _this2.setState({
                  error: 'El correo que utilizó ya está en uso'
                });
              }
            }),
            _react2.default.createElement(_GoogleAuthButton2.default, {
              block: true,
              className: "mb-2",
              onStart: function onStart() {
                return _this2.setState({
                  error: ''
                });
              },
              onError: function onError() {
                return _this2.setState({
                  error: 'El correo que utilizó ya está en uso'
                });
              }
            })
          )
        )
      );
    }
  }]);

  return Ingreso;
}(_react.Component);

exports.default = Ingreso;

/***/ }),

/***/ 131:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticate = authenticate;
exports.socialAuthentication = socialAuthentication;
exports.fetchUser = fetchUser;
exports.login = login;
exports.logout = logout;
exports.refreshUserData = refreshUserData;
exports.refreshUserTokens = refreshUserTokens;
exports.appStartedLoading = appStartedLoading;
exports.appFinishLoading = appFinishLoading;

var _types = __webpack_require__(39);

var _axios = __webpack_require__(132);

var _axios2 = __webpack_require__(36);

var _axios3 = _interopRequireDefault(_axios2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function authenticate(email, password) {
  return function (dispatch) {
    var auth = { accessToken: '', refreshToken: '' };
    var requestToken = null;

    if (true) {
      requestToken = _axios3.default.post('/oauth/token', {
        grant_type: 'password',
        client_id: "5db1f87dfd969840cc007484",
        client_secret: "9BesM3U65OZPxk6XH5iLAB3Yp26Le88RDl90UXOp",
        username: email,
        password: password
      });
    } else {
      requestToken = _axios3.default.post('/oauth/token', {
        username: email,
        password: password
      }, {
        baseURL: process.env.MIX_APP_AUTH_PROXY
      });
    }

    return requestToken.then(function (res) {
      var _res$data = res.data,
          access_token = _res$data.access_token,
          refresh_token = _res$data.refresh_token;

      auth.accessToken = access_token;
      auth.refreshToken = refresh_token;

      return _axios3.default.get('/api/user', {
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      });
    }).then(function (res) {
      var user = res.data;

      dispatch(login(user, auth.accessToken, auth.refreshToken));
    });
  };
}

function socialAuthentication(provider, provAccessToken) {
  return function (dispatch) {
    var auth = { accessToken: '', refreshToken: '' };
    var requestToken = null;

    dispatch(appStartedLoading());

    if (true) {

      requestToken = _axios3.default.post('/oauth/token', {
        grant_type: 'social',
        client_id: "5db1f87dfd969840cc007484",
        client_secret: "9BesM3U65OZPxk6XH5iLAB3Yp26Le88RDl90UXOp",
        access_token: provAccessToken,
        provider: provider
      });
    } else {

      requestToken = _axios3.default.post('/oauth/' + provider + '/token', {
        access_token: provAccessToken
      }, {
        baseURL: process.env.MIX_APP_AUTH_PROXY
      });
    }

    return requestToken.then(function (res) {
      var _res$data2 = res.data,
          access_token = _res$data2.access_token,
          refresh_token = _res$data2.refresh_token;

      auth.accessToken = access_token;
      auth.refreshToken = refresh_token;

      return _axios.request.get('/api/user', {
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      });
    }).then(function (res) {
      var user = res.data;

      dispatch(login(user, auth.accessToken, auth.refreshToken));
    }, function (err) {
      dispatch(appFinishLoading());

      return Promise.reject(err);
    }).then(function () {
      return dispatch(appFinishLoading());
    });
  };
}

function fetchUser() {
  return function (dispatch, getState) {
    var _getState = getState(),
        accessToken = _getState.auth.accessToken;

    return _axios.request.get('/api/user', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }).then(function (res) {
      var data = res.data;


      dispatch(refreshUserData(data));

      return data;
    });
  };
}

function login(user, accessToken, refreshToken) {
  return {
    type: _types.LOG_USER_IN,
    payload: { user: user, accessToken: accessToken, refreshToken: refreshToken }
  };
}

function logout() {
  return {
    type: _types.LOG_USER_OUT
  };
}

function refreshUserData(user) {
  return {
    type: _types.REFRESH_USER_DATA,
    payload: { user: user }
  };
}

function refreshUserTokens(accessToken, refreshToken) {
  return {
    type: _types.REFRESH_USER_TOKENS,
    payload: { accessToken: accessToken, refreshToken: refreshToken }
  };
}

function appStartedLoading() {
  return {
    type: _types.APP_START_LOADING
  };
}

function appFinishLoading() {
  return {
    type: _types.APP_FINISH_LOADING
  };
}

/***/ }),

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.request = undefined;

var _axios = __webpack_require__(36);

var _axios2 = _interopRequireDefault(_axios);

var _redux = __webpack_require__(37);

var _redux2 = _interopRequireDefault(_redux);

var _auth = __webpack_require__(131);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = exports.request = _axios2.default.create({
  headers: {
    'Content-Type': 'application/json'
  }
});

request.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  var config = error.config,
      response = error.response;

  var refresh = null;

  if (response.status === 401) {
    var _store$getState = _redux2.default.getState(),
        auth = _store$getState.auth;

    if (!auth.refreshToken) return Promise.reject(error);

    if (true) {
      refresh = _axios2.default.post('/oauth/token', {
        grant_type: 'refresh_token',
        refresh_token: auth.refreshToken,
        client_id: "5db1f87dfd969840cc007484",
        client_secret: "9BesM3U65OZPxk6XH5iLAB3Yp26Le88RDl90UXOp",
        scope: ''
      });
    } else {
      refresh = _axios2.default.post(process.env.MIX_APP_PROXY_URL + '/oauth/token', {
        refresh_token: auth.refreshToken
      });
    }

    return refresh.then(function (res) {
      var _res$data = res.data,
          access_token = _res$data.access_token,
          refresh_token = _res$data.refresh_token;


      _redux2.default.dispatch((0, _auth.refreshUserTokens)(access_token, refresh_token));

      config.headers['Authorization'] = 'Bearer ' + access_token;

      return (0, _axios2.default)(config);
    }).catch(function (err) {
      return _redux2.default.dispatch((0, _auth.logout)());
    });
  } else {
    return Promise.reject(error);
  }
});

/***/ }),

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

/***/ 137:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),

/***/ 139:
/***/ (function(module, exports) {

module.exports = "/images/logo-one.png?701531bc52c97a7ebba0d2c5dbb5fafa";

/***/ }),

/***/ 188:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(137);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = __webpack_require__(7);

var _auth = __webpack_require__(131);

var _reactFontawesome = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GoogleAuthButton(props) {
  var classNames = (0, _classnames2.default)('btn', 'text-white', {
    'btn-block': props.block
  });

  function handleGoogleAuth(e) {
    e.preventDefault();

    props.onStart();

    window.plugins.googleplus.login({
      webClientId: "1021603889619-7khildph3n7eev2qsvs1n44e27kvbn0s.apps.googleusercontent.com",
      offline: true
    }, function (success) {
      var accessToken = success.accessToken;


      props.socialAuthentication('google', accessToken).catch(function (e) {
        props.onError();
      });
    }, function (error) {});
  }

  return _react2.default.createElement(
    'button',
    {
      className: classNames + ' ' + props.className,
      style: { backgroundColor: '#db4437' },
      onClick: handleGoogleAuth
    },
    _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: ['fab', 'google'],
      color: '#fff',
      pull: 'left'
    }),
    'Inicia sesi\xF3n con Google'
  );
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    socialAuthentication: function socialAuthentication(provider, accessToken) {
      return dispatch((0, _auth.socialAuthentication)(provider, accessToken));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(GoogleAuthButton);

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(137);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = __webpack_require__(7);

var _auth = __webpack_require__(131);

var _reactFontawesome = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FacebookAuthButton(props) {
  var classNames = (0, _classnames2.default)('btn', 'text-white', {
    'btn-block': props.block
  });

  function handleFacebookAuth(e) {
    e.preventDefault();

    props.onStart();

    facebookConnectPlugin.login(['public_profile'], function (success) {
      var authResponse = success.authResponse;


      props.socialAuthentication('facebook', authResponse.accessToken).catch(function (e) {
        props.onError();
      });
    }, function (error) {});
  }

  return _react2.default.createElement(
    'button',
    {
      className: classNames + ' ' + props.className,
      style: { backgroundColor: '#1877f2' },
      onClick: handleFacebookAuth
    },
    _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, {
      icon: ['fab', 'facebook-f'],
      color: '#fff',
      pull: 'left'
    }),
    'Inicia sesi\xF3n con Facebook'
  );
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    socialAuthentication: function socialAuthentication(provider, accessToken) {
      return dispatch((0, _auth.socialAuthentication)(provider, accessToken));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(FacebookAuthButton);

/***/ }),

/***/ 455:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(456);
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
		module.hot.accept("!!../../../node_modules/css-loader/index.js!./Ingreso.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!./Ingreso.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 456:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(133)(false);
// imports


// module
exports.push([module.i, "/*body {\r\n    background-color: #313131;\r\n    background-image: none;\r\n    background-position: center;\r\n}*/\r\n", ""]);

// exports


/***/ })

});