"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.installXJsonMode = installXJsonMode;
Object.defineProperty(exports, "XJsonMode", {
  enumerable: true,
  get: function () {
    return _console_lang.XJsonMode;
  }
});

var _brace = _interopRequireDefault(require("brace"));

var _console_lang = require("../../../../../../../src/plugins/es_ui_shared/console_lang");

var _worker = require("./worker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const {
  WorkerClient
} = _brace.default.acequire('ace/worker/worker_client'); // Then clobber `createWorker` method to install our worker source. Per ace's wiki: https://github.com/ajaxorg/ace/wiki/Syntax-validation


_console_lang.XJsonMode.prototype.createWorker = function (session) {
  const xJsonWorker = new WorkerClient(['ace'], _worker.workerModule, 'JsonWorker');
  xJsonWorker.attachToDocument(session.getDocument());
  xJsonWorker.on('annotate', function (e) {
    session.setAnnotations(e.data);
  });
  xJsonWorker.on('terminate', function () {
    session.clearAnnotations();
  });
  return xJsonWorker;
};

function installXJsonMode(editor) {
  const session = editor.getSession();
  session.setMode(new _console_lang.XJsonMode());
}