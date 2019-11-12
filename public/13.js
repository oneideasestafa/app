webpackJsonp([13],{

/***/ 720:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(11);

var _index = __webpack_require__(37);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Eli4 = function (_Component) {
  _inherits(Eli4, _Component);

  function Eli4(props) {
    _classCallCheck(this, Eli4);

    var _this = _possibleConstructorReturn(this, (Eli4.__proto__ || Object.getPrototypeOf(Eli4)).call(this, props));

    _this.state = {
      typeCamera: _index2.default.getState().chroma.camera,
      background: _index2.default.getState().chroma.background,
      effect: _index2.default.getState().chroma.effect
    };

    _this.Video = _this.Video.bind(_this);
    _this.Image = _this.Image.bind(_this);
    _this.Download = _this.Download.bind(_this);
    return _this;
  }

  _createClass(Eli4, [{
    key: "computeframe",
    value: function computeframe() {
      this.ctx1.drawImage(this.capture, 0, 0, this.width, this.height);
      if (this.state.effect) {
        this.ctx1.drawImage(document.getElementById('effect'), 0, 0, this.width, this.height);
      }
      var frame = this.ctx1.getImageData(0, 0, this.width, this.height);
      var l = frame.data.length / 4;

      for (var i = 0; i < l; i++) {

        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];

        if (g > r && g > b) {
          if (g > 80 && g > r + 6 && g > b + 6) {
            frame.data[i * 4 + 3] = 0;
          }
        }
      }
      this.ctx2.putImageData(frame, 0, 0);
      this.ctx2.globalCompositeOperation = "destination-over";
      this.ctx2.drawImage(document.getElementById('background'), 0, 0, this.width, this.height);
    }
  }, {
    key: "Download",
    value: function Download() {
      window.canvas2ImagePlugin.saveImageDataToLibrary(function (msg) {
        console.log(msg);
      }, function (err) {
        console.log(err);
      }, this.c2);
    }
  }, {
    key: "timerCallback",
    value: function timerCallback() {
      if (this.capture.ended) {
        this.recoder.stop;
      }

      this.computeframe();
      var self = this;
      setTimeout(function () {
        self.timerCallback();
      }, 0);
    }
  }, {
    key: "Effect",
    value: function Effect() {
      var effect = "images/chroma/effect/" + _index2.default.getState().chroma.effect + ".png";
      return _react2.default.createElement("img", {
        id: "effect",
        src: effect,
        width: "100px",
        height: "100px",
        style: {
          display: 'none'
        }
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.state.typeCamera == "video") {
        this.c3 = document.getElementById('c3');
        var options = {
          cameraFacing: 'front',
          use: 'data'
        };
        window.plugin.CanvasCamera.initialize(this.c3);
        window.plugin.CanvasCamera.start(options, function (error) {
          console.log('[CanvasCamera start]', 'error', error);
        }, function (data) {
          document.getElementById('background').src = 'data:image/png;base64,' + data.image.src;
        });
      } else {
        var opcionesDeCamara = {
          quality: 50,
          destinationType: Camera.DestinationType.DATA_URL,
          sourceType: Camera.PictureSourceType.CAMERA,
          encodingType: Camera.EncodingType.JPG,
          mediaType: Camera.MediaType.PICTURE,
          correctOrientation: true
        };
        navigator.camera.getPicture(function (imagenCodificada) {
          _this2.Image(imagenCodificada);
        }, function (error) {
          alert(error);
        }, opcionesDeCamara);
      }
    }
  }, {
    key: "Video",
    value: function Video(mediaFiles) {
      var _this3 = this;

      this.capture = this.refs.capture;
      var url = mediaFiles[0].localURL;
      this.capture.src = mediaFiles[0].localURL;
      this.capture.play();
      this.c1 = this.refs.c1;
      this.ctx1 = this.c1.getContext("2d");
      this.ctx2 = this.c2.getContext("2d");

      this.capture.addEventListener('loadedmetadata', function (e) {
        console.log(e);
        _this3.width = _this3.capture.videoWidth;
        _this3.height = _this3.capture.videoHeight;
        _this3.recorder = new CanvasRecorder(_this3.c2);
        _this3.recorder.start();
        _this3.timerCallback();
      });
    }
  }, {
    key: "Image",
    value: function Image(imagenCodificada) {
      this.capture = document.getElementById('capture');
      document.getElementById('capture').src = 'data:image/png;base64,' + imagenCodificada;
      this.c1 = this.refs.c1;
      this.ctx1 = this.c1.getContext("2d");
      this.c2 = this.refs.c2;
      this.c3 = document.getElementById('effect');
      this.ctx2 = this.c2.getContext("2d");
      this.width = document.getElementById('capture').width;
      this.height = document.getElementById('capture').height;

      this.timerCallback();
    }
  }, {
    key: "render",
    value: function render() {
      var background = "images/chroma/background/" + _index2.default.getState().chroma.background + ".jpg";
      return _react2.default.createElement(
        "div",
        { className: "abs-center row" },
        _react2.default.createElement(
          "div",
          { className: "container md-3" },
          _react2.default.createElement("canvas", {
            ref: "c1",
            style: {
              backgroundSize: "",
              backgroundRepeat: "no-repeat",
              width: '100%',
              height: '200px',
              display: 'none'
            }
          }),
          _react2.default.createElement("canvas", {
            ref: "c2",
            onClick: this.Video,
            style: {
              backgroundSize: "",
              backgroundRepeat: "no-repeat",
              width: '100%',
              height: '300px'
            }
          }),
          _react2.default.createElement("img", {
            id: "background",
            src: background,
            width: "100px",
            height: "100px",
            style: {
              display: 'none'
            }
          }),
          this.state.typeCamera == 'video' ? _react2.default.createElement("canvas", {
            id: "c3",
            onClick: this.Video,
            style: {
              backgroundSize: "",
              backgroundRepeat: "no-repeat",
              width: '100%',
              height: '300px'
            }
          }) : _react2.default.createElement("img", {
            crossOrigin: "Anonymous",
            id: "capture",

            style: {
              width: '100%',
              height: '200px',
              visibility: 'hidden'
            }
          }),
          this.state.effect ? _react2.default.createElement(this.Effect, null) : '',
          _react2.default.createElement(
            "div",
            { className: "container text-center" },
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: "/green-step-3" },
              _react2.default.createElement(
                "button",
                {
                  type: "button",
                  className: "btn btn-gris"
                },
                "Volver"
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "container text-center" },
            _react2.default.createElement(
              "button",
              {
                type: "button",
                onClick: this.Download,
                className: "btn btn-rojo"
              },
              "Descargar"
            )
          )
        )
      );
    }
  }]);

  return Eli4;
}(_react.Component);

exports.default = Eli4;

/***/ })

});