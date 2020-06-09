"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalInfo = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PersonalInfo = function PersonalInfo(props) {
  return _react.default.createElement(_eui.EuiDescribedFormGroup, {
    fullWidth: true,
    title: _react.default.createElement("h2", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.account.usernameGroupTitle",
      defaultMessage: "Username and email"
    })),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.account.usernameGroupDescription",
      defaultMessage: "You can't change this information."
    })
  }, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("dl", null, _react.default.createElement("dt", {
    title: "username",
    "data-test-subj": "username"
  }, props.user.username), _react.default.createElement("dd", {
    title: "email",
    "data-test-subj": "email"
  }, props.user.email || _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.account.noEmailMessage",
    defaultMessage: "no email address"
  }))))));
};

exports.PersonalInfo = PersonalInfo;