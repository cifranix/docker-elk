"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRoleMappingButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _management_urls = require("../../../management_urls");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateRoleMappingButton = function CreateRoleMappingButton() {
  return _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "createRoleMappingButton",
    href: (0, _management_urls.getCreateRoleMappingHref)(),
    fill: true
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.roleMappings.createRoleMappingButton",
    defaultMessage: "Create role mapping"
  }));
};

exports.CreateRoleMappingButton = CreateRoleMappingButton;