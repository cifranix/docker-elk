"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingOverlayWrapper = void 0;

var _eui = require("@elastic/eui");

var _polished = require("polished");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  align-items: center;\n  background-color: ", ";\n  display: flex;\n  height: 100%;\n  justify-content: center;\n  left: 0;\n  position: absolute;\n  top: 0;\n  width: 100%;\n  z-index: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var LoadingOverlayWrapper = function LoadingOverlayWrapper(_ref) {
  var children = _ref.children,
      isLoading = _ref.isLoading,
      loadingChildren = _ref.loadingChildren,
      rest = _objectWithoutProperties(_ref, ["children", "isLoading", "loadingChildren"]);

  return _react.default.createElement(RelativeDiv, rest, children, isLoading ? _react.default.createElement(Overlay, null, loadingChildren) : null);
};

exports.LoadingOverlayWrapper = LoadingOverlayWrapper;

var Overlay = function Overlay(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement(OverlayDiv, null, children ? children : _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }));
};

var RelativeDiv = _public.euiStyled.div(_templateObject());

var OverlayDiv = _public.euiStyled.div(_templateObject2(), function (props) {
  return (0, _polished.transparentize)(0.3, props.theme.eui.euiColorEmptyShade);
}, function (props) {
  return props.theme.eui.euiZLevel1;
});