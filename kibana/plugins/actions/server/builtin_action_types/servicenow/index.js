"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _lodash = require("lodash");

var _configSchema = require("@kbn/config-schema");

var _lib = require("./lib");

var i18n = _interopRequireWildcard(require("./translations"));

var _constants = require("./constants");

var _schema = require("./schema");

var _helpers = require("./helpers");

var _action_handlers = require("./action_handlers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function validateConfig(configurationUtilities, configObject) {
  try {
    if ((0, _lodash.isEmpty)(configObject.casesConfiguration.mapping)) {
      return i18n.MAPPING_EMPTY;
    }

    configurationUtilities.ensureWhitelistedUri(configObject.apiUrl);
  } catch (whitelistError) {
    return i18n.WHITE_LISTED_ERROR(whitelistError.message);
  }
}

function validateSecrets(configurationUtilities, secrets) {} // action type definition


function getActionType({
  configurationUtilities,
  executor = serviceNowExecutor
}) {
  return {
    id: _constants.ACTION_TYPE_ID,
    name: i18n.NAME,
    minimumLicenseRequired: 'platinum',
    validate: {
      config: _configSchema.schema.object(_schema.ConfigSchemaProps, {
        validate: (0, _lodash.curry)(validateConfig)(configurationUtilities)
      }),
      secrets: _configSchema.schema.object(_schema.SecretsSchemaProps, {
        validate: (0, _lodash.curry)(validateSecrets)(configurationUtilities)
      }),
      params: _schema.ParamsSchema
    },
    executor
  };
} // action executor


async function serviceNowExecutor(execOptions) {
  const actionId = execOptions.actionId;
  const {
    apiUrl,
    casesConfiguration: {
      mapping: configurationMapping
    }
  } = execOptions.config;
  const {
    username,
    password
  } = execOptions.secrets;
  const params = execOptions.params;
  const {
    comments,
    incidentId,
    ...restParams
  } = params;
  const mapping = (0, _helpers.buildMap)(configurationMapping);
  const incident = (0, _helpers.mapParams)(restParams, mapping);
  const serviceNow = new _lib.ServiceNow({
    url: apiUrl,
    username,
    password
  });
  const handlerInput = {
    incidentId,
    serviceNow,
    params: { ...params,
      incident
    },
    comments: comments,
    mapping
  };
  const res = {
    status: 'ok',
    actionId
  };
  const data = await (0, _action_handlers.handleIncident)(handlerInput);
  return { ...res,
    data
  };
}