"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasAggregations = hasAggregations;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function hasAggregations(profileResponse) {
  var aggs = (0, _lodash.get)(profileResponse, '[0].aggregations', []);
  return aggs.length > 0;
}