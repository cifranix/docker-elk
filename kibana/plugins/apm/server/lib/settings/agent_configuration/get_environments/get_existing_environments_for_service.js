"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExistingEnvironmentsForService = getExistingEnvironmentsForService;

var _elasticsearch_fieldnames = require("../../../../../common/elasticsearch_fieldnames");

var _all_option = require("../../../../../common/agent_configuration/all_option");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getExistingEnvironmentsForService({
  serviceName,
  setup
}) {
  var _resp$aggregations;

  const {
    internalClient,
    indices
  } = setup;
  const bool = serviceName ? {
    filter: [{
      term: {
        [_elasticsearch_fieldnames.SERVICE_NAME]: serviceName
      }
    }]
  } : {
    must_not: [{
      exists: {
        field: _elasticsearch_fieldnames.SERVICE_NAME
      }
    }]
  };
  const params = {
    index: indices.apmAgentConfigurationIndex,
    body: {
      size: 0,
      query: {
        bool
      },
      aggs: {
        environments: {
          terms: {
            field: _elasticsearch_fieldnames.SERVICE_ENVIRONMENT,
            missing: _all_option.ALL_OPTION_VALUE,
            size: 50
          }
        }
      }
    }
  };
  const resp = await internalClient.search(params);
  const existingEnvironments = ((_resp$aggregations = resp.aggregations) === null || _resp$aggregations === void 0 ? void 0 : _resp$aggregations.environments.buckets.map(bucket => bucket.key)) || [];
  return existingEnvironments;
}