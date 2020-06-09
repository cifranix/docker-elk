"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.workerModule = void 0;

var _worker = _interopRequireDefault(require("!!raw-loader!./worker.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
const workerModule = {
  id: 'ace/mode/json_worker',
  src: _worker.default
};
exports.workerModule = workerModule;