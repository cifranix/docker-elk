"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorMessage = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ErrorMessage = function ErrorMessage(_ref) {
  var title = _ref.title,
      body = _ref.body;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "stats",
    title: _react.default.createElement("h3", null, title),
    body: _react.default.createElement("p", null, body)
  });
};

exports.ErrorMessage = ErrorMessage;