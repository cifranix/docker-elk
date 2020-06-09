"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoIndices = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-self: center;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var NoIndices = function NoIndices(_ref) {
  var actions = _ref.actions,
      message = _ref.message,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, ["actions", "message", "title"]);

  return _react.default.createElement(CenteredEmptyPrompt, _extends({
    title: _react.default.createElement("h2", null, title),
    body: _react.default.createElement("p", null, message),
    actions: actions
  }, rest));
};

exports.NoIndices = NoIndices;
var CenteredEmptyPrompt = (0, _public.euiStyled)(_eui.EuiEmptyPrompt)(_templateObject());