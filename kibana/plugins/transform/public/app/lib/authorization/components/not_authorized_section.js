"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotAuthorizedSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NotAuthorizedSection = function NotAuthorizedSection(_ref) {
  var title = _ref.title,
      message = _ref.message;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "securityApp",
    title: _react.default.createElement("h2", null, title),
    body: _react.default.createElement("p", null, message)
  });
};

exports.NotAuthorizedSection = NotAuthorizedSection;