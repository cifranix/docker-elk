"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayloadFormat = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// TODO: This should be an enumerated list
var PayloadFormat;
exports.PayloadFormat = PayloadFormat;

(function (PayloadFormat) {
  PayloadFormat["UGLY"] = "ugly";
  PayloadFormat["PRETTY"] = "pretty";
})(PayloadFormat || (exports.PayloadFormat = PayloadFormat = {}));