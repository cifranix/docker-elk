"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParams = validateParams;
exports.validateConfig = validateConfig;
exports.validateSecrets = validateSecrets;

var _boom = _interopRequireDefault(require("boom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function validateParams(actionType, value) {
  return validateWithSchema(actionType, 'params', value);
}

function validateConfig(actionType, value) {
  return validateWithSchema(actionType, 'config', value);
}

function validateSecrets(actionType, value) {
  return validateWithSchema(actionType, 'secrets', value);
}

function validateWithSchema(actionType, key, value) {
  if (actionType.validate == null) return value;
  let name;

  try {
    switch (key) {
      case 'params':
        name = 'action params';
        if (actionType.validate.params == null) return value;
        return actionType.validate.params.validate(value);

      case 'config':
        name = 'action type config';
        if (actionType.validate.config == null) return value;
        return actionType.validate.config.validate(value);

      case 'secrets':
        name = 'action type secrets';
        if (actionType.validate.secrets == null) return value;
        return actionType.validate.secrets.validate(value);
    }
  } catch (err) {
    // we can't really i18n this yet, since the err.message isn't i18n'd itself
    throw _boom.default.badRequest(`error validating ${name}: ${err.message}`);
  } // should never happen, but left here for future-proofing


  throw new Error(`invalid actionType validate key: ${key}`);
}