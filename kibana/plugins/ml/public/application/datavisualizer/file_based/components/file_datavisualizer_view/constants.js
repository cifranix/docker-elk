"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MODE = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 *  File data visualizer modes.
 */
var MODE;
exports.MODE = MODE;

(function (MODE) {
  MODE[MODE["READ"] = 0] = "READ";
  MODE[MODE["IMPORT"] = 1] = "IMPORT";
})(MODE || (exports.MODE = MODE = {}));