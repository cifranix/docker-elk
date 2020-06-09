"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApmAgentConfigurationIndex = createApmAgentConfigurationIndex;

var _create_or_update_index = require("../../helpers/create_or_update_index");

var _get_apm_indices = require("../apm_indices/get_apm_indices");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function createApmAgentConfigurationIndex({
  esClient,
  config,
  logger
}) {
  const index = (0, _get_apm_indices.getApmIndicesConfig)(config).apmAgentConfigurationIndex;
  return (0, _create_or_update_index.createOrUpdateIndex)({
    index,
    esClient,
    logger,
    mappings
  });
}

const mappings = {
  dynamic: 'strict',
  dynamic_templates: [{
    // force string to keyword (instead of default of text + keyword)
    strings: {
      match_mapping_type: 'string',
      mapping: {
        type: 'keyword',
        ignore_above: 1024
      }
    }
  }],
  properties: {
    '@timestamp': {
      type: 'date'
    },
    service: {
      properties: {
        name: {
          type: 'keyword',
          ignore_above: 1024
        },
        environment: {
          type: 'keyword',
          ignore_above: 1024
        }
      }
    },
    settings: {
      // allowing dynamic fields without specifying anything specific
      dynamic: true,
      properties: {}
    },
    applied_by_agent: {
      type: 'boolean'
    },
    agent_name: {
      type: 'keyword',
      ignore_above: 1024
    },
    etag: {
      type: 'keyword',
      ignore_above: 1024
    }
  }
};