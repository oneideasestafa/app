webpackJsonp([12],{

/***/ 699:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _sweetalert = __webpack_require__(164);

var _sweetalert2 = _interopRequireDefault(_sweetalert);

var _reactRedux = __webpack_require__(6);

var _axios = __webpack_require__(101);

var _auth = __webpack_require__(99);

var _navigation = __webpack_require__(190);

var _reactFontawesome = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RSS = function (_React$Component) {
  _inherits(RSS, _React$Component);

  function RSS(props) {
    _classCallCheck(this, RSS);

    var _this = _possibleConstructorReturn(this, (RSS.__proto__ || Object.getPrototypeOf(RSS)).call(this, props));

    _this.state = {
      image: '',
      success: false,
      errors: null,
      description: '',
      imagenCodificada: null
    };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.chooseImageSource = _this.chooseImageSource.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleSuccessfulUpload = _this.handleSuccessfulUpload.bind(_this);
    _this.handleErrorOnUpload = _this.handleErrorOnUpload.bind(_this);

    _this.registrarPublicacion = _this.registrarPublicacion.bind(_this);
    _this.volverALaPaginaDelShow = _this.volverALaPaginaDelShow.bind(_this);
    _this.revelarImagen = _this.revelarImagen.bind(_this);

    _this.transferId = 1;
    return _this;
  }

  _createClass(RSS, [{
    key: 'handleChange',
    value: function handleChange(e) {
      this.setState(_defineProperty({}, e.target.name, e.target.value));
    }
  }, {
    key: 'chooseImageSource',
    value: function chooseImageSource(e) {
      var _this2 = this;

      Cordova.exec(function (buttonIndex) {
        if (buttonIndex === 0) return;

        var source = buttonIndex === 2 ? navigator.camera.PictureSourceType.PHOTOLIBRARY : navigator.camera.PictureSourceType.CAMERA;

        navigator.camera.getPicture(function (imageData) {
          window.resolveLocalFileSystemURL(imageData, function (fileEntry) {
            _this2.setState({
              image: fileEntry.toInternalURL()
            });
          }, console.log);
        }, console.log, {
          sourceType: source,
          allowEdit: true,
          madiaType: navigator.camera.MediaType.PICTURE,
          saveToPhotoAlbum: true
        });
      }, null, 'Notification', 'confirm', ['¿De donde desea tomar la imagen?', 'Buscar Foto', ['Tomar Foto', 'Galería']]);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this3 = this;

      e.preventDefault();

      var _state = this.state,
          image = _state.image,
          description = _state.description;
      var _props = this.props,
          eventId = _props.eventId,
          accessToken = _props.accessToken;


      this.setState({
        success: false,
        errors: null
      });

      this.props.appStartedLoading();

      if (image !== '') {
        /**
         * I use this syntax because of a bug where the
         * FileTransfer constructor is undefined
         */
        Cordova.exec(this.handleSuccessfulUpload, this.handleErrorOnUpload, 'FileTransfer', 'upload', [image, // filePath
        "http://192.168.1.5:8001" + '/api/event/' + eventId + '/rss', // Server
        'image', // fileKey
        image.substr(image.lastIndexOf('/') + 1), // fileName
        '', // mimeType
        { description: description }, // params
        false, // trustAllHost
        false, // chunckedMode
        {
          Authorization: 'Bearer ' + accessToken,
          'X-Requested-With': 'XMLHttpRequest'
        }, // headers
        this.transferId, // _id
        'POST'] // httpMethod
        );
      } else {

        _axios.request.post('/api/event/' + eventId + '/rss', { description: description }, {
          headers: {
            Authorization: 'Bearer ' + accessToken
          }
        }).then(function (res) {
          return _this3.handleSuccessfulUpload({
            response: JSON.stringify(res.data),
            responseCode: res.status
          });
        }).catch(function (e) {
          return _this3.handleErrorOnUpload({
            http_status: e.response.status,
            body: JSON.stringify(e.response.data)
          });
        });
      }
    }
  }, {
    key: 'handleSuccessfulUpload',
    value: function handleSuccessfulUpload(res) {
      var _this4 = this;

      console.log('res', res);
      if (res.responseCode) {

        this.setState({
          description: '',
          image: '',
          success: true,
          errors: null
        }, function () {
          return _this4.props.appFinishLoading();
        });

        this.transferId += 1;
      }
    }
  }, {
    key: 'handleErrorOnUpload',
    value: function handleErrorOnUpload(err) {
      console.log('err', err);
      if (err.http_status === 422) {
        var body = JSON.parse(err.body);
        var errors = [];

        Object.keys(body.errors).forEach(function (key) {
          errors = errors.concat(body.errors[key]);
        });

        this.setState({
          success: false,
          errors: errors
        });
      } else {
        this.setState({
          success: false,
          errors: 'Algo ha ocurrido, intentalo nuevamente.'
        });
      }

      this.props.appFinishLoading();
    }

    /**
     * Mostrar la imagen capturada por la camara
     * 
     * @param {string} imagenCodificada
     * @return {void}
     */

  }, {
    key: 'revelarImagen',
    value: function revelarImagen(imagenCodificada) {
      this.setState({ imagenCodificada: imagenCodificada }, function () {
        return document.getElementById('imagenCapturada').src = 'data:image/png;base64,' + imagenCodificada;
      });
    }

    /**
     * Registrar publicacion RSS
     * 
     * @return {void}
     */

  }, {
    key: 'registrarPublicacion',
    value: function registrarPublicacion() {
      var _this5 = this;

      if (!document.getElementById("descripcion").value) {
        (0, _sweetalert2.default)('Sin información', 'Ingresa un estado a compartir', 'warning', 'sweet');

        return;
      }

      this.setState({ estaCargando: true });

      var datosDelFormulario = new FormData();
      datosDelFormulario.append("eventoId", this.props.eventId);
      datosDelFormulario.append("descripcion", document.getElementById("descripcion").value);
      datosDelFormulario.append("rutaDeImagen", this.state.imagenCodificada ? this.state.imagenCodificada : null);

      _axios.request.post('api/event/RSS', datosDelFormulario, {
        headers: {
          Authorization: 'Bearer ' + this.props.accessToken
        }
      }).then(function () {
        (0, _sweetalert2.default)('Éxito', 'Publicación enviada', 'success', 'sweet');

        _this5.volverALaPaginaDelShow();
      });
    }

    /**
     * Regresar a la seccion del Show
     * 
     * @return {void}
     */

  }, {
    key: 'volverALaPaginaDelShow',
    value: function volverALaPaginaDelShow() {
      this.props.setCurrentPage('Show');
      this.props.history.push('/show');
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container-fluid' },
        this.state.image !== '' && _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col' },
            _react2.default.createElement('img', { src: this.state.image, className: 'img-fluid' })
          )
        ),
        this.state.success && _react2.default.createElement(
          'div',
          { className: 'alert alert-success' },
          'Publicaci\xF3n realizada correctamente'
        ),
        this.state.errors !== null && _react2.default.createElement(
          'div',
          { className: 'alert alert-danger' },
          typeof this.state.errors === 'string' ? this.state.errors : _react2.default.createElement(
            'ul',
            { style: { margin: 0, paddingInlineStart: '20px' } },
            this.state.errors.map(function (err, i) {
              return _react2.default.createElement(
                'li',
                { key: i },
                err
              );
            })
          )
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col' },
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement('textarea', {
                  rows: '3',
                  name: 'description',
                  className: 'form-control',
                  onChange: this.handleChange,
                  value: this.state.description,
                  placeholder: '\xBFQu\xE9 estas pensando?',
                  style: {
                    marginTop: '0.5rem',
                    color: '#000 !important',
                    backgroundColor: '#fff !important'
                  }
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-1' },
              _react2.default.createElement(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-rojo btn-box-index',
                  onClick: this.chooseImageSource
                },
                _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: 'camera', size: 'lg' })
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-6 offset-3' },
              _react2.default.createElement(
                'button',
                {
                  type: 'button',
                  className: 'btn btn-rojo btn-box-index',
                  onClick: this.handleSubmit
                },
                'Publicar'
              )
            )
          )
        )
      );
    }
  }]);

  return RSS;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    current: state.navigation.current,
    eventId: state.events.current._id,
    accessToken: state.auth.accessToken
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setCurrentPage: function setCurrentPage(page) {
      return dispatch((0, _navigation.setCurrentPage)(page));
    },
    appStartedLoading: function appStartedLoading() {
      return dispatch((0, _auth.appStartedLoading)());
    },
    appFinishLoading: function appFinishLoading() {
      return dispatch((0, _auth.appFinishLoading)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RSS);

/***/ })

});