"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrableFormRow = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ErrableFormRow = function ErrableFormRow(_ref) {
  var errorKey = _ref.errorKey,
      isShowingErrors = _ref.isShowingErrors,
      errors = _ref.errors,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["errorKey", "isShowingErrors", "errors", "children"]);

  return _react.default.createElement(_eui.EuiFormRow, _extends({
    isInvalid: isShowingErrors && errors[errorKey].length > 0,
    error: errors[errorKey]
  }, rest), _react.default.createElement(_react.Fragment, null, _react.Children.map(children, function (child) {
    return (0, _react.cloneElement)(child);
  })));
};

exports.ErrableFormRow = ErrableFormRow;