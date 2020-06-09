"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMetricMetadata = void 0;

var _lodash = require("lodash");

var _inventory_models = require("../../../../common/inventory_models");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getMetricMetadata = async (framework, requestContext, sourceConfiguration, nodeId, nodeType) => {
  const fields = (0, _inventory_models.findInventoryFields)(nodeType, sourceConfiguration.fields);
  const metricQuery = {
    allowNoIndices: true,
    ignoreUnavailable: true,
    index: sourceConfiguration.metricAlias,
    body: {
      query: {
        bool: {
          must_not: [{
            match: {
              'event.dataset': 'aws.ec2'
            }
          }],
          filter: [{
            match: {
              [fields.id]: nodeId
            }
          }]
        }
      },
      size: 0,
      aggs: {
        nodeName: {
          terms: {
            field: fields.name,
            size: 1
          }
        },
        metrics: {
          terms: {
            field: 'event.dataset',
            size: 1000
          }
        }
      }
    }
  };
  const response = await framework.callWithRequest(requestContext, 'search', metricQuery);
  const buckets = response.aggregations && response.aggregations.metrics ? response.aggregations.metrics.buckets : [];
  return {
    id: nodeId,
    name: (0, _lodash.get)(response, ['aggregations', 'nodeName', 'buckets', 0, 'key'], nodeId),
    buckets
  };
};

exports.getMetricMetadata = getMetricMetadata;