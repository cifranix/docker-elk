"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPodNodeName = void 0;

var _lodash = require("lodash");

var _inventory_models = require("../../../../common/inventory_models");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getPodNodeName = async (framework, requestContext, sourceConfiguration, nodeId, nodeType) => {
  const fields = (0, _inventory_models.findInventoryFields)(nodeType, sourceConfiguration.fields);
  const params = {
    allowNoIndices: true,
    ignoreUnavailable: true,
    terminateAfter: 1,
    index: sourceConfiguration.metricAlias,
    body: {
      size: 1,
      _source: ['kubernetes.node.name'],
      query: {
        bool: {
          filter: [{
            match: {
              [fields.id]: nodeId
            }
          }, {
            exists: {
              field: `kubernetes.node.name`
            }
          }]
        }
      }
    }
  };
  const response = await framework.callWithRequest(requestContext, 'search', params);
  const firstHit = (0, _lodash.first)(response.hits.hits);

  if (firstHit) {
    return (0, _lodash.get)(firstHit, '_source.kubernetes.node.name');
  }
};

exports.getPodNodeName = getPodNodeName;