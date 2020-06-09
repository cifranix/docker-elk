"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchEdit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _watch = require("../../../models/watch");

var _constants = require("../../../../../common/constants");

var _components = require("../../../components");

var _api = require("../../../lib/api");

var _breadcrumbs = require("../../../lib/breadcrumbs");

var _json_watch_edit = require("./json_watch_edit");

var _threshold_watch_edit = require("./threshold_watch_edit");

var _monitoring_watch_edit = require("./monitoring_watch_edit");

var _watch_context = require("../watch_context");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getTitle = function getTitle(watch) {
  if (watch.isNew) {
    var typeName = watch.typeName.toLowerCase();
    return _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.titlePanel.createNewTypeOfWatchTitle', {
      defaultMessage: 'Create {typeName}',
      values: {
        typeName: typeName
      }
    });
  } else {
    return _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.titlePanel.editWatchTitle', {
      defaultMessage: 'Edit {watchName}',
      values: {
        watchName: watch.name ? watch.name : watch.id
      }
    });
  }
};

var watchReducer = function watchReducer(state, action) {
  var command = action.command,
      payload = action.payload;
  var watch = state.watch;

  switch (command) {
    case 'setWatch':
      return _objectSpread({}, state, {
        watch: payload
      });

    case 'setProperty':
      var property = payload.property,
          value = payload.value;

      if ((0, _lodash.isEqual)(watch[property], value)) {
        return state;
      } else {
        return _objectSpread({}, state, {
          watch: new (_watch.Watch.getWatchTypes()[watch.type])(_objectSpread({}, watch, _defineProperty({}, property, value)))
        });
      }

    case 'addAction':
      var type = payload.type,
          defaults = payload.defaults;
      var newWatch = new (_watch.Watch.getWatchTypes()[watch.type])(watch);
      newWatch.createAction(type, defaults);
      return _objectSpread({}, state, {
        watch: newWatch
      });

    case 'setError':
      return _objectSpread({}, state, {
        loadError: payload
      });
  }
};

var WatchEdit = function WatchEdit(_ref) {
  var _ref$match$params = _ref.match.params,
      id = _ref$match$params.id,
      type = _ref$match$params.type;

  // hooks
  var _useAppContext = (0, _app_context.useAppContext)(),
      setBreadcrumbs = _useAppContext.setBreadcrumbs;

  var _useReducer = (0, _react.useReducer)(watchReducer, {
    watch: null
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      watch = _useReducer2$.watch,
      loadError = _useReducer2$.loadError,
      dispatch = _useReducer2[1];

  var setWatchProperty = function setWatchProperty(property, value) {
    dispatch({
      command: 'setProperty',
      payload: {
        property: property,
        value: value
      }
    });
  };

  var addAction = function addAction(action) {
    dispatch({
      command: 'addAction',
      payload: action
    });
  };

  (0, _react.useEffect)(function () {
    var getWatch =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var loadedWatch, WatchType;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!id) {
                  _context.next = 13;
                  break;
                }

                _context.prev = 1;
                _context.next = 4;
                return (0, _api.loadWatch)(id);

              case 4:
                loadedWatch = _context.sent;
                dispatch({
                  command: 'setWatch',
                  payload: loadedWatch
                });
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](1);
                dispatch({
                  command: 'setError',
                  payload: _context.t0
                });

              case 11:
                _context.next = 14;
                break;

              case 13:
                if (type) {
                  WatchType = _watch.Watch.getWatchTypes()[type];

                  if (WatchType) {
                    dispatch({
                      command: 'setWatch',
                      payload: new WatchType()
                    });
                  }
                }

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 8]]);
      }));

      return function getWatch() {
        return _ref2.apply(this, arguments);
      };
    }();

    getWatch();
  }, [id, type]);
  (0, _react.useEffect)(function () {
    setBreadcrumbs([_breadcrumbs.listBreadcrumb, id ? _breadcrumbs.editBreadcrumb : _breadcrumbs.createBreadcrumb]);
  }, [id, setBreadcrumbs]);
  var errorCode = (0, _components.getPageErrorCode)(loadError);

  if (errorCode) {
    return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.PageError, {
      errorCode: errorCode,
      id: id
    }));
  }

  if (loadError) {
    return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchEdit.errorTitle",
        defaultMessage: "Error loading watch"
      }),
      error: loadError
    }));
  }

  if (!watch) {
    return _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchEdit.loadingWatchDescription",
      defaultMessage: "Loading watch\u2026"
    }));
  }

  var pageTitle = getTitle(watch);
  var EditComponent = null;

  switch (watch.type) {
    case _constants.WATCH_TYPES.THRESHOLD:
      EditComponent = _threshold_watch_edit.ThresholdWatchEdit;
      break;

    case _constants.WATCH_TYPES.MONITORING:
      EditComponent = _monitoring_watch_edit.MonitoringWatchEdit;
      break;

    case _constants.WATCH_TYPES.JSON:
    default:
      EditComponent = _json_watch_edit.JsonWatchEdit;
  }

  return _react.default.createElement(_watch_context.WatchContext.Provider, {
    value: {
      watch: watch,
      setWatchProperty: setWatchProperty,
      addAction: addAction
    }
  }, _react.default.createElement(EditComponent, {
    pageTitle: pageTitle
  }));
};

exports.WatchEdit = WatchEdit;