"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTheme = exports.keyframes = exports.createGlobalStyle = exports.EuiThemeProvider = exports.euiStyled = exports.css = void 0;

var _react = _interopRequireDefault(require("react"));

var styledComponents = _interopRequireWildcard(require("styled-components"));

var _eui_theme_dark = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_dark.json"));

var _eui_theme_light = _interopRequireDefault(require("@elastic/eui/dist/eui_theme_light.json"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EuiThemeProvider = function EuiThemeProvider(_ref) {
  var _ref$darkMode = _ref.darkMode,
      darkMode = _ref$darkMode === void 0 ? false : _ref$darkMode,
      otherProps = _objectWithoutProperties(_ref, ["darkMode"]);

  return _react.default.createElement(styledComponents.ThemeProvider, _extends({}, otherProps, {
    theme: function theme(outerTheme) {
      return _objectSpread({}, outerTheme, {
        eui: darkMode ? _eui_theme_dark.default : _eui_theme_light.default,
        darkMode: darkMode
      });
    }
  }));
};

exports.EuiThemeProvider = EuiThemeProvider;
var _ref2 = styledComponents,
    euiStyled = _ref2.default,
    css = _ref2.css,
    createGlobalStyle = _ref2.createGlobalStyle,
    keyframes = _ref2.keyframes,
    withTheme = _ref2.withTheme;
exports.withTheme = withTheme;
exports.keyframes = keyframes;
exports.createGlobalStyle = createGlobalStyle;
exports.css = css;
exports.euiStyled = euiStyled;