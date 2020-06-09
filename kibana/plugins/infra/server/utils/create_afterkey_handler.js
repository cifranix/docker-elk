"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAfterKeyHandler = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createAfterKeyHandler = (optionsAfterKeyPath, afterKeySelector) => (options, response) => {
  if (!response.aggregations) {
    return options;
  }

  const newOptions = { ...options
  };
  const afterKey = afterKeySelector(response);
  (0, _lodash.set)(newOptions, optionsAfterKeyPath, afterKey);
  return newOptions;
};

exports.createAfterKeyHandler = createAfterKeyHandler;