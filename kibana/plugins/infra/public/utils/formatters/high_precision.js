"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatHighPercision = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var formatHighPercision = function formatHighPercision(val) {
  return Number(val).toLocaleString('en', {
    maximumFractionDigits: 5
  });
};

exports.formatHighPercision = formatHighPercision;