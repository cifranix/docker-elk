"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNestedProperty = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// This is similar to lodash's get() except that it's TypeScript aware and is able to infer return types.
// It splits the attribute key string and uses reduce with an idx check to access nested attributes.
const getNestedProperty = (obj, accessor, defaultValue) => {
  const value = accessor.split('.').reduce((o, i) => o === null || o === void 0 ? void 0 : o[i], obj);
  if (value === undefined) return defaultValue;
  return value;
};

exports.getNestedProperty = getNestedProperty;