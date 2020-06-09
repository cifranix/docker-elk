"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEsPrivilegeResponse = validateEsPrivilegeResponse;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function validateEsPrivilegeResponse(response, application, actions, resources) {
  const schema = buildValidationSchema(application, actions, resources);
  const {
    error,
    value
  } = schema.validate(response);

  if (error) {
    throw new Error(`Invalid response received from Elasticsearch has_privilege endpoint. ${error}`);
  }

  return value;
}

function buildActionsValidationSchema(actions) {
  return _joi.default.object({ ...actions.reduce((acc, action) => {
      return { ...acc,
        [action]: _joi.default.bool().required()
      };
    }, {})
  }).required();
}

function buildValidationSchema(application, actions, resources) {
  const actionValidationSchema = buildActionsValidationSchema(actions);

  const resourceValidationSchema = _joi.default.object({ ...resources.reduce((acc, resource) => {
      return { ...acc,
        [resource]: actionValidationSchema
      };
    }, {})
  }).required();

  return _joi.default.object({
    username: _joi.default.string().required(),
    has_all_requested: _joi.default.bool(),
    cluster: _joi.default.object(),
    application: _joi.default.object({
      [application]: resourceValidationSchema
    }).required(),
    index: _joi.default.object()
  }).required();
}