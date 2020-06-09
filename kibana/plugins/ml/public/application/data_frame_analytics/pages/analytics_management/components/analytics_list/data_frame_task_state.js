"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DATA_FRAME_TASK_STATE = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// DATA_FRAME_TASK_STATE is used by x-pack functional test setup/config
// and that config cannot import from './common.ts' because it has imports dependant on a browser-environment
var DATA_FRAME_TASK_STATE;
exports.DATA_FRAME_TASK_STATE = DATA_FRAME_TASK_STATE;

(function (DATA_FRAME_TASK_STATE) {
  DATA_FRAME_TASK_STATE["ANALYZING"] = "analyzing";
  DATA_FRAME_TASK_STATE["FAILED"] = "failed";
  DATA_FRAME_TASK_STATE["REINDEXING"] = "reindexing";
  DATA_FRAME_TASK_STATE["STARTED"] = "started";
  DATA_FRAME_TASK_STATE["STARTING"] = "starting";
  DATA_FRAME_TASK_STATE["STOPPED"] = "stopped";
})(DATA_FRAME_TASK_STATE || (exports.DATA_FRAME_TASK_STATE = DATA_FRAME_TASK_STATE = {}));