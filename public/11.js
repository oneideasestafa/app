webpackJsonp([11],{

/***/ 700:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _DownloadList = __webpack_require__(701);

var _DownloadList2 = _interopRequireDefault(_DownloadList);

var _SeedingList = __webpack_require__(704);

var _SeedingList2 = _interopRequireDefault(_SeedingList);

var _download = __webpack_require__(179);

var _reactRedux = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function Downloads(props) {
  var files = props.files;

  var download = files.current ? [files.current].concat(_toConsumableArray(files.download)) : files.download;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_DownloadList2.default, { files: download }),
    _react2.default.createElement(_SeedingList2.default, { files: props.files.existing })
  );
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    event: state.events.current,
    files: state.download
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getFilesFromEvent: function getFilesFromEvent(eventId) {
      return dispatch((0, _download.getFilesFromEvent)(eventId));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Downloads);

/***/ }),

/***/ 701:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _FileDownload = __webpack_require__(702);

var _FileDownload2 = _interopRequireDefault(_FileDownload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DownloadList(props) {
  var files = props.files.map(function (file) {
    return _react2.default.createElement(_FileDownload2.default, { key: file.id, file: file });
  });

  console.log('files length', files.length);

  if (files.length === 0) return _react2.default.createElement(
    'div',
    { className: 'm-5' },
    _react2.default.createElement(
      'h4',
      { className: 'text-center hint' },
      'No hay archivos pendientes por descargar en este momento'
    )
  );

  return _react2.default.createElement(
    'div',
    { className: 'm-3' },
    files
  );
}

exports.default = DownloadList;

/***/ }),

/***/ 702:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _Progress = __webpack_require__(703);

var _Progress2 = _interopRequireDefault(_Progress);

var _download = __webpack_require__(179);

var _reactRedux = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FileDownload(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isDownloading = _useState2[0],
      setDownloading = _useState2[1];

  var _props$file = props.file,
      id = _props$file.id,
      magnetURI = _props$file.magnetURI,
      size = _props$file.size,
      name = _props$file.name;
  var progress = props.progress;


  (0, _react.useEffect)(function () {
    if (props.currentId === id && magnetURI) {
      console.log('download', name);
      setDownloading(true);
    }
  }, [props.currentId]);

  var color = 'success';

  return _react2.default.createElement(
    'div',
    { className: 'download-box mb-2' },
    _react2.default.createElement(
      'div',
      { className: 'download-info' },
      _react2.default.createElement(
        'div',
        { className: 'info-header' },
        _react2.default.createElement(
          'label',
          null,
          name
        ),
        !magnetURI && _react2.default.createElement(
          'p',
          null,
          'El archivo a\xFAn no est\xE1 disponible para descargar, intentelo de nuevo m\xE1s tarde'
        ),
        isDownloading && progress && _react2.default.createElement(
          'p',
          null,
          progress.downloadSpeed + 'Kb/s - ' + progress.downloaded + 'Kb de ' + size
        )
      ),
      isDownloading && progress && _react2.default.createElement(
        'div',
        { className: 'info-progress' },
        _react2.default.createElement(_Progress2.default, {
          color: color,
          progress: progress.progress
        })
      )
    )
  );
}

var mapStateToProps = function mapStateToProps(state) {
  return {
    event: state.events.current,
    progress: state.download.progress,
    currentId: state.download.current.id
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    fileFinishedDownloading: function fileFinishedDownloading(id) {
      return dispatch((0, _download.fileFinishedDownloading)(id));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FileDownload);

/***/ }),

/***/ 703:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(137);

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Progress(_ref) {
  var progress = _ref.progress,
      _ref$color = _ref.color,
      color = _ref$color === undefined ? 'success' : _ref$color;

  var classNames = (0, _classnames2.default)('progress-bar', 'bg-' + color);

  return _react2.default.createElement(
    'div',
    { className: 'progress' },
    _react2.default.createElement('div', {
      className: classNames,
      role: 'progressbar',
      style: { width: progress + '%' },
      'aria-valuenow': '' + progress,
      'aria-valuemin': '0',
      'aria-valuemax': '100' })
  );
}

exports.default = Progress;

/***/ }),

/***/ 704:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _FileSeeding = __webpack_require__(705);

var _FileSeeding2 = _interopRequireDefault(_FileSeeding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SeedingList(props) {
  var files = props.files.map(function (file) {
    console.log('file', file.id);
    return _react2.default.createElement(_FileSeeding2.default, { key: file.id, file: file });
  });

  if (files.length === 0) return null;

  return _react2.default.createElement(
    'div',
    { className: 'm-3' },
    _react2.default.createElement(
      'h5',
      { style: { fontFamily: 'Roboto', fontWeight: 500 } },
      'Archivos descargados'
    ),
    _react2.default.createElement(
      'div',
      null,
      files
    )
  );
}

exports.default = SeedingList;

/***/ }),

/***/ 705:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(7);

var _reactFontawesome = __webpack_require__(10);

var _download = __webpack_require__(179);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FileSeeding(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setLoading = _useState2[1];

  function deleteFile(e) {
    setLoading(true);

    props.deleteFile(props.file.name).catch(function (e) {
      setLoading(false);
      console.log('Something happend', e);
    });
  }

  return _react2.default.createElement(
    'div',
    { className: 'download-box complete mb-2' },
    _react2.default.createElement(
      'div',
      { className: 'download-info' },
      _react2.default.createElement(
        'div',
        { className: 'info-header' },
        _react2.default.createElement('i', { className: 'fas fa-check fa-lg text-success mx-2' }),
        _react2.default.createElement(
          'label',
          null,
          props.file.name
        )
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'download-actions' },
      !isLoading ? _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: 'trash-alt', size: 'lg', onClick: deleteFile }) : _react2.default.createElement(_reactFontawesome.FontAwesomeIcon, { icon: 'sync-alt', size: 'lg', spin: true })
    )
  );
}

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    deleteFile: function deleteFile(name) {
      return dispatch((0, _download.deleteFile)(name));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(FileSeeding);

/***/ })

});