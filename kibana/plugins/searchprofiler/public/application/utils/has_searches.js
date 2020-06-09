"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasSearch = hasSearch;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function hasSearch(profileResponse) {
  var aggs = (0, _lodash.get)(profileResponse, '[0].searches', []);
  return aggs.length > 0;
}