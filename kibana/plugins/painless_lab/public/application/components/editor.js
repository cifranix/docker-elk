"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = Editor;

var _react = _interopRequireDefault(require("react"));

var _public = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function Editor(_ref) {
  var code = _ref.code,
      onChange = _ref.onChange;
  return _react.default.createElement(_public.CodeEditor, {
    languageId: "painless" // 99% width allows the editor to resize horizontally. 100% prevents it from resizing.
    ,
    width: "99%",
    height: "100%",
    value: code,
    onChange: onChange,
    options: {
      fontSize: 12,
      minimap: {
        enabled: false
      },
      scrollBeyondLastLine: false,
      wordWrap: 'on',
      wrappingIndent: 'indent',
      automaticLayout: true
    }
  });
}