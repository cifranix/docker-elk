"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSourceIndexDevConsoleStatement = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getSourceIndexDevConsoleStatement = function getSourceIndexDevConsoleStatement(query, indexPatternTitle) {
  return "GET ".concat(indexPatternTitle, "/_search\n").concat(JSON.stringify({
    query: query
  }, null, 2), "\n");
};

exports.getSourceIndexDevConsoleStatement = getSourceIndexDevConsoleStatement;