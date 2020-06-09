"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COLOR_MAP = exports.REVERSE_LEVEL_MAP = exports.LEVEL_MAP = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LEVEL_MAP = {
  warning: 0,
  critical: 1
};
exports.LEVEL_MAP = LEVEL_MAP;
var REVERSE_LEVEL_MAP = (0, _lodash.invert)(LEVEL_MAP);
exports.REVERSE_LEVEL_MAP = REVERSE_LEVEL_MAP;
var COLOR_MAP = {
  warning: 'default',
  critical: 'danger'
};
exports.COLOR_MAP = COLOR_MAP;