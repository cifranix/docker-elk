"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertDocumentSourceToLogItemFields = void 0;

var _jsonStableStringify = _interopRequireDefault(require("json-stable-stringify"));

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const isJsonObject = subject => {
  return (0, _lodash.isPlainObject)(subject);
};

const serializeValue = value => {
  if ((0, _lodash.isArray)(value) || (0, _lodash.isPlainObject)(value)) {
    return (0, _jsonStableStringify.default)(value);
  }

  return `${value}`;
};

const convertDocumentSourceToLogItemFields = (source, path = [], fields = []) => {
  return Object.keys(source).reduce((acc, key) => {
    const value = source[key];
    const nextPath = [...path, key];

    if (isJsonObject(value)) {
      return convertDocumentSourceToLogItemFields(value, nextPath, acc);
    }

    const field = {
      field: nextPath.join('.'),
      value: serializeValue(value)
    };
    return [...acc, field];
  }, fields);
};

exports.convertDocumentSourceToLogItemFields = convertDocumentSourceToLogItemFields;