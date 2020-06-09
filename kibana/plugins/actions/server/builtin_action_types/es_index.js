"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActionType = getActionType;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _configSchema = require("@kbn/config-schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ConfigSchema = _configSchema.schema.object({
  index: _configSchema.schema.string(),
  refresh: _configSchema.schema.boolean({
    defaultValue: false
  }),
  executionTimeField: _configSchema.schema.nullable(_configSchema.schema.string())
}); // params definition


// see: https://www.elastic.co/guide/en/elastic-stack-overview/current/actions-index.html
// - timeout not added here, as this seems to be a generic thing we want to do
//   eventually: https://github.com/elastic/kibana/projects/26#card-24087404
const ParamsSchema = _configSchema.schema.object({
  documents: _configSchema.schema.arrayOf(_configSchema.schema.recordOf(_configSchema.schema.string(), _configSchema.schema.any()))
}); // action type definition


function getActionType({
  logger
}) {
  return {
    id: '.index',
    minimumLicenseRequired: 'basic',
    name: _i18n.i18n.translate('xpack.actions.builtin.esIndexTitle', {
      defaultMessage: 'Index'
    }),
    validate: {
      config: ConfigSchema,
      params: ParamsSchema
    },
    executor: (0, _lodash.curry)(executor)({
      logger
    })
  };
} // action executor


async function executor({
  logger
}, execOptions) {
  const actionId = execOptions.actionId;
  const config = execOptions.config;
  const params = execOptions.params;
  const services = execOptions.services;
  const index = config.index;
  const bulkBody = [];

  for (const document of params.documents) {
    const timeField = config.executionTimeField == null ? '' : config.executionTimeField.trim();

    if (timeField !== '') {
      document[timeField] = new Date();
    }

    bulkBody.push({
      index: {}
    });
    bulkBody.push(document);
  }

  const bulkParams = {
    index,
    body: bulkBody
  };
  bulkParams.refresh = config.refresh;
  let result;

  try {
    result = await services.callCluster('bulk', bulkParams);
  } catch (err) {
    const message = _i18n.i18n.translate('xpack.actions.builtin.esIndex.errorIndexingErrorMessage', {
      defaultMessage: 'error indexing documents'
    });

    logger.error(`error indexing documents: ${err.message}`);
    return {
      status: 'error',
      actionId,
      message,
      serviceMessage: err.message
    };
  }

  return {
    status: 'ok',
    data: result,
    actionId
  };
}