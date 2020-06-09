"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatPercent = void 0;

var _number = require("./number");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var formatPercent = function formatPercent(val) {
  return "".concat((0, _number.formatNumber)(val * 100), "%");
};

exports.formatPercent = formatPercent;