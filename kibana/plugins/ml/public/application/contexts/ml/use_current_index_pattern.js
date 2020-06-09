"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCurrentIndexPattern = void 0;

var _react = require("react");

var _ml_context = require("./ml_context");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useCurrentIndexPattern = function useCurrentIndexPattern() {
  var context = (0, _react.useContext)(_ml_context.MlContext);

  if (context.currentIndexPattern === undefined) {
    throw new Error('currentIndexPattern is undefined');
  }

  return context.currentIndexPattern;
};

exports.useCurrentIndexPattern = useCurrentIndexPattern;