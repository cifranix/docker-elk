"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleComboBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _model = require("../../../common/model");

var _role_combo_box_option = require("./role_combo_box_option");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RoleComboBox = function RoleComboBox(props) {
  var onRolesChange = function onRolesChange(selectedItems) {
    props.onChange(selectedItems.map(function (item) {
      return item.label;
    }));
  };

  var roleNameToOption = function roleNameToOption(roleName) {
    var _ref;

    var roleDefinition = props.availableRoles.find(function (role) {
      return role.name === roleName;
    });
    var isDeprecated = (_ref = roleDefinition && (0, _model.isRoleDeprecated)(roleDefinition)) !== null && _ref !== void 0 ? _ref : false;
    return {
      color: isDeprecated ? 'warning' : 'default',
      'data-test-subj': "roleOption-".concat(roleName),
      label: roleName,
      value: {
        isDeprecated: isDeprecated
      }
    };
  };

  var options = props.availableRoles.map(function (role) {
    return roleNameToOption(role.name);
  });
  var selectedOptions = props.selectedRoleNames.map(roleNameToOption);
  return _react.default.createElement(_eui.EuiComboBox, {
    "data-test-subj": "rolesDropdown",
    placeholder: props.placeholder || _i18n.i18n.translate('xpack.security.management.users.editUser.addRolesPlaceholder', {
      defaultMessage: 'Add roles'
    }),
    onChange: onRolesChange,
    isLoading: props.isLoading,
    isDisabled: props.isDisabled,
    options: options,
    selectedOptions: selectedOptions,
    renderOption: function renderOption(option) {
      return _react.default.createElement(_role_combo_box_option.RoleComboBoxOption, {
        option: option
      });
    }
  });
};

exports.RoleComboBox = RoleComboBox;