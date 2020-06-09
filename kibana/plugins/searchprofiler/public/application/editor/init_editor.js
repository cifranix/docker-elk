"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeEditor = initializeEditor;

var _brace = _interopRequireDefault(require("brace"));

var _console_lang = require("../../../../es_ui_shared/console_lang");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function initializeEditor(_ref) {
  var el = _ref.el,
      licenseEnabled = _ref.licenseEnabled;

  var editor = _brace.default.acequire('ace/ace').edit(el);

  (0, _console_lang.installXJsonMode)(editor);
  editor.$blockScrolling = Infinity;

  if (!licenseEnabled) {
    editor.setReadOnly(true);
    editor.container.style.pointerEvents = 'none';
    editor.container.style.opacity = '0.5';
    var textArea = editor.container.querySelector('textarea');

    if (textArea) {
      textArea.setAttribute('tabindex', '-1');
    }

    editor.renderer.setStyle('disabled');
    editor.blur();
  }

  return editor;
}