"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleComboBoxOption = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RoleComboBoxOption = function RoleComboBoxOption(_ref) {
  var _ref2, _option$value;

  var option = _ref.option;
  var isDeprecated = (_ref2 = (_option$value = option.value) === null || _option$value === void 0 ? void 0 : _option$value.isDeprecated) !== null && _ref2 !== void 0 ? _ref2 : false;

  var deprecatedLabel = _i18n.i18n.translate('xpack.security.management.users.editUser.deprecatedRoleText', {
    defaultMessage: '(deprecated)'
  });

  return _react.default.createElement(_eui.EuiText, {
    color: option.color,
    "data-test-subj": "rolesDropdown-renderOption"
  }, option.label, " ", isDeprecated ? deprecatedLabel : '');
};

exports.RoleComboBoxOption = RoleComboBoxOption;