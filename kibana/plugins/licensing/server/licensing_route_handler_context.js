"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRouteHandlerContext = createRouteHandlerContext;

var _operators = require("rxjs/operators");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Create a route handler context for access to Kibana license information.
 * @param license$ An observable of a License instance.
 * @public
 */
function createRouteHandlerContext(license$) {
  return async function licensingRouteHandlerContext() {
    return {
      license: await license$.pipe((0, _operators.take)(1)).toPromise()
    };
  };
}