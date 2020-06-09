"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CodeBlock = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CodeBlock = function CodeBlock(_ref) {
  var children = _ref.children,
      _ref$padding = _ref.padding,
      padding = _ref$padding === void 0 ? 'normal' : _ref$padding;
  return _react.default.createElement("div", {
    className: "euiCodeBlock euiCodeBlock--fontSmall euiCodeBlock--paddingLarge"
  }, _react.default.createElement("pre", {
    className: "euiCodeBlock__pre",
    style: {
      padding: padding === 'small' ? '6px 12px' : undefined
    }
  }, _react.default.createElement("code", {
    className: "euiCodeBlock__code"
  }, children)));
};

exports.CodeBlock = CodeBlock;