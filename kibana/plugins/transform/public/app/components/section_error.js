"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionError = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var SectionError = function SectionError(_ref) {
  var _ref2;

  var title = _ref.title,
      error = _ref.error,
      actions = _ref.actions,
      rest = _objectWithoutProperties(_ref, ["title", "error", "actions"]);

  var errorMessage = (_ref2 = error === null || error === void 0 ? void 0 : error.message) !== null && _ref2 !== void 0 ? _ref2 : JSON.stringify(error, null, 2);
  return _react.default.createElement(_eui.EuiCallOut, _extends({
    title: title,
    color: "danger",
    iconType: "alert"
  }, rest), _react.default.createElement("pre", null, errorMessage), actions ? actions : null);
};

exports.SectionError = SectionError;