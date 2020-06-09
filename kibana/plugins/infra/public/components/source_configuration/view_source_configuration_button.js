"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewSourceConfigurationButton = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

var _use_link_props = require("../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ViewSourceConfigurationButton = function ViewSourceConfigurationButton(_ref) {
  var dataTestSubj = _ref['data-test-subj'],
      app = _ref.app,
      children = _ref.children;
  var linkProps = (0, _use_link_props.useLinkProps)({
    app: app,
    pathname: '/settings'
  });
  return _react.default.createElement(_eui.EuiButton, _extends({
    "data-test-subj": dataTestSubj,
    color: "primary"
  }, linkProps), children);
};

exports.ViewSourceConfigurationButton = ViewSourceConfigurationButton;