"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlTimefilterTimeChange$ = exports.mlTimefilterRefresh$ = void 0;

var _rxjs = require("rxjs");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mlTimefilterRefresh$ = new _rxjs.Subject();
exports.mlTimefilterRefresh$ = mlTimefilterRefresh$;
var mlTimefilterTimeChange$ = new _rxjs.Subject();
exports.mlTimefilterTimeChange$ = mlTimefilterTimeChange$;