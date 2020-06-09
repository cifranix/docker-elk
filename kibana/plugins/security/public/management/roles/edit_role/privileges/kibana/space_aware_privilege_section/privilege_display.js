"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrivilegeDisplay = void 0;

var _eui = require("@elastic/eui");

var _lodash = _interopRequireDefault(require("lodash"));

var _react = _interopRequireDefault(require("react"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var PrivilegeDisplay = function PrivilegeDisplay(props) {
  return _react.default.createElement(SimplePrivilegeDisplay, props);
};

exports.PrivilegeDisplay = PrivilegeDisplay;

var SimplePrivilegeDisplay = function SimplePrivilegeDisplay(props) {
  var privilege = props.privilege,
      rest = _objectWithoutProperties(props, ["privilege"]);

  var text = _react.default.createElement(_eui.EuiText, rest, getDisplayValue(privilege));

  return text;
};

PrivilegeDisplay.defaultProps = {
  privilege: []
};

function getDisplayValue(privilege) {
  var privileges = coerceToArray(privilege);
  var displayValue;
  var isPrivilegeMissing = privileges.length === 0 || privileges.length === 1 && privileges.includes(_constants.NO_PRIVILEGE_VALUE);

  if (isPrivilegeMissing) {
    displayValue = _react.default.createElement(_eui.EuiIcon, {
      color: "subdued",
      type: 'minusInCircle'
    });
  } else {
    displayValue = privileges.map(function (p) {
      return _lodash.default.capitalize(p);
    }).join(', ');
  }

  return displayValue;
}

function coerceToArray(privilege) {
  if (privilege === undefined) {
    return [];
  }

  if (Array.isArray(privilege)) {
    return privilege;
  }

  return [privilege];
}