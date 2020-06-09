"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReservedRoleBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _model = require("../../../../common/model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ReservedRoleBadge = function ReservedRoleBadge(props) {
  var role = props.role;

  if ((0, _model.isRoleReserved)(role)) {
    return _react.default.createElement(_eui.EuiToolTip, {
      "data-test-subj": "reservedRoleBadgeTooltip",
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRole.reversedRoleBadge.reservedRolesCanNotBeModifiedTooltip",
        defaultMessage: "Reserved roles are built-in and cannot be removed or modified."
      })
    }, _react.default.createElement(_eui.EuiIcon, {
      style: {
        verticalAlign: 'super'
      },
      type: 'lock'
    }));
  }

  return null;
};

exports.ReservedRoleBadge = ReservedRoleBadge;