"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryExampleMessagesLoadingIndicator = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CategoryExampleMessagesLoadingIndicator = function CategoryExampleMessagesLoadingIndicator(_ref) {
  var exampleCount = _ref.exampleCount;
  return _react.default.createElement(_react.default.Fragment, null, Array.from(new Array(exampleCount), function (_value, index) {
    return _react.default.createElement(_eui.EuiLoadingContent, {
      key: index,
      lines: 1
    });
  }));
};

exports.CategoryExampleMessagesLoadingIndicator = CategoryExampleMessagesLoadingIndicator;