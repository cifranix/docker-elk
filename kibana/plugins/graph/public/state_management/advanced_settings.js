"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.syncSettingsSaga = exports.settingsSelector = exports.advancedSettingsReducer = exports.updateSettings = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

var _dist = require("typescript-fsa-reducers/dist");

var _effects = require("redux-saga/effects");

var _global = require("./global");

var _datasource = require("./datasource");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var actionCreator = (0, _typescriptFsa.default)('x-pack/graph/advancedSettings');
var updateSettings = actionCreator('UPDATE_SETTINGS');
exports.updateSettings = updateSettings;
var initialSettings = {
  useSignificance: true,
  sampleSize: 2000,
  timeoutMillis: 5000,
  sampleDiversityField: undefined,
  maxValuesPerDoc: 1,
  minDocCount: 3
};
var advancedSettingsReducer = (0, _dist.reducerWithInitialState)(initialSettings).case(_global.reset, function () {
  return initialSettings;
}).cases([_datasource.requestDatasource, _datasource.setDatasource], function (_ref) {
  var sampleDiversityField = _ref.sampleDiversityField,
      restSettings = _objectWithoutProperties(_ref, ["sampleDiversityField"]);

  return _objectSpread({}, restSettings);
}).case(updateSettings, function (_oldSettings, newSettings) {
  return newSettings;
}).build();
exports.advancedSettingsReducer = advancedSettingsReducer;

var settingsSelector = function settingsSelector(state) {
  return state.advancedSettings;
};
/**
 * Saga making sure the advanced settings are always synced up to the workspace instance.
 *
 * Won't be necessary once the workspace is moved to redux
 */


exports.settingsSelector = settingsSelector;

var syncSettingsSaga = function syncSettingsSaga(_ref2) {
  var _marked =
  /*#__PURE__*/
  regeneratorRuntime.mark(syncSettings);

  var getWorkspace = _ref2.getWorkspace,
      notifyAngular = _ref2.notifyAngular;

  function syncSettings(action) {
    var workspace;
    return regeneratorRuntime.wrap(function syncSettings$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            workspace = getWorkspace();

            if (workspace) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return");

          case 3:
            workspace.options.exploreControls = action.payload;
            notifyAngular();

          case 5:
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
              return (0, _effects.takeLatest)(updateSettings.match, syncSettings);

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    })
  );
};

exports.syncSettingsSaga = syncSettingsSaga;