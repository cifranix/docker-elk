"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopAutoReload = exports.startAutoReload = exports.jumpToTime = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/infra/local/waffle_time');
var jumpToTime = actionCreator('JUMP_TO_TIME');
exports.jumpToTime = jumpToTime;
var startAutoReload = actionCreator('START_AUTO_RELOAD');
exports.startAutoReload = startAutoReload;
var stopAutoReload = actionCreator('STOP_AUTO_RELOAD');
exports.stopAutoReload = stopAutoReload;