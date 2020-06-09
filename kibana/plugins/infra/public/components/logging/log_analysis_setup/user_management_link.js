"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserManagementLink = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _use_link_props = require("../../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var UserManagementLink = function UserManagementLink(props) {
  var linkProps = (0, _use_link_props.useLinkProps)({
    app: 'kibana',
    hash: '/management/security/users'
  });
  return _react2.default.createElement(_eui.EuiButton, _extends({
    color: "primary",
    fill: true
  }, linkProps, props), _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.logs.analysis.userManagementButtonLabel",
    defaultMessage: "Manage users"
  }));
};

exports.UserManagementLink = UserManagementLink;