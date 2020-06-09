"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMlContext = void 0;

var _react = require("react");

var _ml_context = require("./ml_context");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useMlContext = function useMlContext() {
  var context = (0, _react.useContext)(_ml_context.MlContext);

  if (context.combinedQuery === undefined || context.currentIndexPattern === undefined || context.currentSavedSearch === undefined || context.indexPatterns === undefined || context.kibanaConfig === undefined) {
    throw new Error('required attribute is undefined');
  }

  return context;
};

exports.useMlContext = useMlContext;