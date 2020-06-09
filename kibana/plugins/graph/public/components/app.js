"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphApp = GraphApp;

var _eui = require("@elastic/eui");

var _reactRedux = require("react-redux");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _field_manager = require("./field_manager");

var _search_bar = require("./search_bar");

var _guidance_panel = require("./guidance_panel");

var _graph_title = require("./graph_title");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function GraphApp(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      pickerOpen = _useState2[0],
      setPickerOpen = _useState2[1];

  var coreStart = props.coreStart,
      pluginDataStart = props.pluginDataStart,
      storage = props.storage,
      reduxStore = props.reduxStore,
      noIndexPatterns = props.noIndexPatterns,
      searchBarProps = _objectWithoutProperties(props, ["coreStart", "pluginDataStart", "storage", "reduxStore", "noIndexPatterns"]);

  return _react.default.createElement(_react2.I18nProvider, null, _react.default.createElement(_public.KibanaContextProvider, {
    services: _objectSpread({
      appName: 'graph',
      storage: storage,
      data: pluginDataStart
    }, coreStart)
  }, _react.default.createElement(_reactRedux.Provider, {
    store: reduxStore
  }, _react.default.createElement(_react.default.Fragment, null, props.isInitialized && _react.default.createElement(_graph_title.GraphTitle, null), _react.default.createElement("div", {
    className: "gphGraph__bar"
  }, _react.default.createElement(_search_bar.SearchBar, searchBarProps), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_field_manager.FieldManager, {
    pickerOpen: pickerOpen,
    setPickerOpen: setPickerOpen
  })), !props.isInitialized && _react.default.createElement(_guidance_panel.GuidancePanel, {
    noIndexPatterns: noIndexPatterns,
    onOpenFieldPicker: function onOpenFieldPicker() {
      setPickerOpen(true);
    }
  })))));
}