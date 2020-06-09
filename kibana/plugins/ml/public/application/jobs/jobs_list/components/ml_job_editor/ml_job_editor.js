"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MLJobEditor = exports.ML_EDITOR_MODE = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _shared_imports = require("../../../../../../shared_imports");

var _custom_hooks = require("../../../../components/custom_hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ML_EDITOR_MODE = {
  TEXT: 'text',
  JSON: 'json',
  XJSON: _custom_hooks.xJsonMode
};
exports.ML_EDITOR_MODE = ML_EDITOR_MODE;

var MLJobEditor = function MLJobEditor(_ref) {
  var value = _ref.value,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? '500px' : _ref$height,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? '100%' : _ref$width,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? ML_EDITOR_MODE.JSON : _ref$mode,
      _ref$readOnly = _ref.readOnly,
      readOnly = _ref$readOnly === void 0 ? false : _ref$readOnly,
      _ref$syntaxChecking = _ref.syntaxChecking,
      syntaxChecking = _ref$syntaxChecking === void 0 ? true : _ref$syntaxChecking,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? 'textmate' : _ref$theme,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? function () {} : _ref$onChange;

  if (mode === ML_EDITOR_MODE.XJSON) {
    value = (0, _shared_imports.expandLiteralStrings)(value);
  }

  return _react.default.createElement(_eui.EuiCodeEditor, {
    value: value,
    width: width,
    height: height,
    mode: mode,
    readOnly: readOnly,
    wrapEnabled: true,
    showPrintMargin: false,
    theme: theme,
    editorProps: {
      $blockScrolling: true
    },
    setOptions: {
      useWorker: syntaxChecking,
      tabSize: 2,
      useSoftTabs: true
    },
    onChange: onChange
  });
};

exports.MLJobEditor = MLJobEditor;