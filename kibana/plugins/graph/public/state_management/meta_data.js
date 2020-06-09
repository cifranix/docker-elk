"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncBreadcrumbSaga = exports.metaDataSelector = exports.metaDataReducer = exports.updateMetaData = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

var _typescriptFsaReducers = require("typescript-fsa-reducers");

var _effects = require("redux-saga/effects");

var _i18n = require("@kbn/i18n");

var _global = require("./global");

var _url = require("../services/url");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actionCreator = (0, _typescriptFsa.default)('x-pack/graph/metaData');
var updateMetaData = actionCreator('UPDATE_META_DATA');
exports.updateMetaData = updateMetaData;
var initialMetaData = {
  title: _i18n.i18n.translate('xpack.graph.newGraphTitle', {
    defaultMessage: 'Unsaved graph'
  }),
  description: ''
};
var metaDataReducer = (0, _typescriptFsaReducers.reducerWithInitialState)(initialMetaData).case(_global.reset, function () {
  return initialMetaData;
}).case(updateMetaData, function (oldMetaData, newMetaData) {
  return _objectSpread({}, oldMetaData, {}, newMetaData);
}).build();
exports.metaDataReducer = metaDataReducer;

var metaDataSelector = function metaDataSelector(state) {
  return state.metaData;
};
/**
 * Saga updating the breadcrumb when the shown workspace changes.
 */


exports.metaDataSelector = metaDataSelector;

var syncBreadcrumbSaga = function syncBreadcrumbSaga(_ref) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(syncBreadcrumb);

  var chrome = _ref.chrome,
      changeUrl = _ref.changeUrl;

  function syncBreadcrumb() {
    var metaData;
    return regeneratorRuntime.wrap(function syncBreadcrumb$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = metaDataSelector;
            _context.next = 3;
            return (0, _effects.select)();

          case 3:
            _context.t1 = _context.sent;
            metaData = (0, _context.t0)(_context.t1);
            (0, _url.setBreadcrumbs)({
              chrome: chrome,
              metaData: metaData,
              navigateTo: function navigateTo(path) {
                // TODO this should be wrapped into canWipeWorkspace,
                // but the check is too simple right now. Change this
                // once actual state-diffing is in place.
                changeUrl(path);
              }
            });

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _marked);
  }

  return (
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _effects.call)(syncBreadcrumb);

            case 2:
              _context2.next = 4;
              return (0, _effects.takeLatest)(updateMetaData.match, syncBreadcrumb);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    })
  );
};

exports.syncBreadcrumbSaga = syncBreadcrumbSaga;