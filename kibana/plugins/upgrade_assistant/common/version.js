"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PREV_MAJOR_VERSION = exports.NEXT_MAJOR_VERSION = exports.CURRENT_MAJOR_VERSION = exports.CURRENT_VERSION = void 0;

var _semver = require("semver");

var _package = _interopRequireDefault(require("../../../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CURRENT_VERSION = new _semver.SemVer(_package.default.version);
exports.CURRENT_VERSION = CURRENT_VERSION;
const CURRENT_MAJOR_VERSION = CURRENT_VERSION.major;
exports.CURRENT_MAJOR_VERSION = CURRENT_MAJOR_VERSION;
const NEXT_MAJOR_VERSION = CURRENT_VERSION.major + 1;
exports.NEXT_MAJOR_VERSION = NEXT_MAJOR_VERSION;
const PREV_MAJOR_VERSION = CURRENT_VERSION.major - 1;
exports.PREV_MAJOR_VERSION = PREV_MAJOR_VERSION;