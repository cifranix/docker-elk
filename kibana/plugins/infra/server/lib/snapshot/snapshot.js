"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraSnapshot = void 0;

var _constants = require("./constants");

var _query_helpers = require("./query_helpers");

var _response_helpers = require("./response_helpers");

var _get_all_composite_data = require("../../utils/get_all_composite_data");

var _create_afterkey_handler = require("../../utils/create_afterkey_handler");

var _inventory_models = require("../../../common/inventory_models");

var _create_timerange_with_interval = require("./create_timerange_with_interval");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
class InfraSnapshot {
  constructor(libs) {
    this.libs = libs;
  }

  async getNodes(requestContext, options) {
    // Both requestGroupedNodes and requestNodeMetrics may send several requests to elasticsearch
    // in order to page through the results of their respective composite aggregations.
    // Both chains of requests are supposed to run in parallel, and their results be merged
    // when they have both been completed.
    const timeRangeWithIntervalApplied = await (0, _create_timerange_with_interval.createTimeRangeWithInterval)(this.libs.framework, requestContext, options);
    const optionsWithTimerange = { ...options,
      timerange: timeRangeWithIntervalApplied
    };
    const groupedNodesPromise = requestGroupedNodes(requestContext, optionsWithTimerange, this.libs.framework);
    const nodeMetricsPromise = requestNodeMetrics(requestContext, optionsWithTimerange, this.libs.framework);
    const groupedNodeBuckets = await groupedNodesPromise;
    const nodeMetricBuckets = await nodeMetricsPromise;
    return {
      nodes: mergeNodeBuckets(groupedNodeBuckets, nodeMetricBuckets, options),
      interval: timeRangeWithIntervalApplied.interval
    };
  }

}

exports.InfraSnapshot = InfraSnapshot;

const bucketSelector = response => response.aggregations && response.aggregations.nodes.buckets || [];

const handleAfterKey = (0, _create_afterkey_handler.createAfterKeyHandler)('body.aggregations.nodes.composite.after', input => {
  var _input$aggregations, _input$aggregations$n;

  return input === null || input === void 0 ? void 0 : (_input$aggregations = input.aggregations) === null || _input$aggregations === void 0 ? void 0 : (_input$aggregations$n = _input$aggregations.nodes) === null || _input$aggregations$n === void 0 ? void 0 : _input$aggregations$n.after_key;
});

const callClusterFactory = (framework, requestContext) => opts => framework.callWithRequest(requestContext, 'search', opts);

const requestGroupedNodes = async (requestContext, options, framework) => {
  const inventoryModel = (0, _inventory_models.findInventoryModel)(options.nodeType);
  const query = {
    allowNoIndices: true,
    index: `${options.sourceConfiguration.logAlias},${options.sourceConfiguration.metricAlias}`,
    ignoreUnavailable: true,
    body: {
      query: {
        bool: {
          filter: buildFilters(options)
        }
      },
      size: 0,
      aggregations: {
        nodes: {
          composite: {
            size: _constants.SNAPSHOT_COMPOSITE_REQUEST_SIZE,
            sources: (0, _query_helpers.getGroupedNodesSources)(options)
          },
          aggs: {
            ip: {
              top_hits: {
                sort: [{
                  [options.sourceConfiguration.fields.timestamp]: {
                    order: 'desc'
                  }
                }],
                _source: {
                  includes: inventoryModel.fields.ip ? [inventoryModel.fields.ip] : []
                },
                size: 1
              }
            }
          }
        }
      }
    }
  };
  return await (0, _get_all_composite_data.getAllCompositeData)(callClusterFactory(framework, requestContext), query, bucketSelector, handleAfterKey);
};

const requestNodeMetrics = async (requestContext, options, framework) => {
  const index = options.metric.type === 'logRate' ? `${options.sourceConfiguration.logAlias}` : `${options.sourceConfiguration.metricAlias}`;
  const query = {
    allowNoIndices: true,
    index,
    ignoreUnavailable: true,
    body: {
      query: {
        bool: {
          filter: buildFilters(options, false)
        }
      },
      size: 0,
      aggregations: {
        nodes: {
          composite: {
            size: _constants.SNAPSHOT_COMPOSITE_REQUEST_SIZE,
            sources: (0, _query_helpers.getMetricsSources)(options)
          },
          aggregations: {
            histogram: {
              date_histogram: {
                field: options.sourceConfiguration.fields.timestamp,
                interval: options.timerange.interval || '1m',
                offset: (0, _query_helpers.getDateHistogramOffset)(options.timerange.from, options.timerange.interval),
                extended_bounds: {
                  min: options.timerange.from,
                  max: options.timerange.to
                }
              },
              aggregations: (0, _query_helpers.getMetricsAggregations)(options)
            }
          }
        }
      }
    }
  };
  return await (0, _get_all_composite_data.getAllCompositeData)(callClusterFactory(framework, requestContext), query, bucketSelector, handleAfterKey);
}; // buckets can be InfraSnapshotNodeGroupByBucket[] or InfraSnapshotNodeMetricsBucket[]
// but typing this in a way that makes TypeScript happy is unreadable (if possible at all)


const mergeNodeBuckets = (nodeGroupByBuckets, nodeMetricsBuckets, options) => {
  const nodeMetricsForLookup = (0, _response_helpers.getNodeMetricsForLookup)(nodeMetricsBuckets);
  return nodeGroupByBuckets.map(node => {
    return {
      path: (0, _response_helpers.getNodePath)(node, options),
      metric: (0, _response_helpers.getNodeMetrics)(nodeMetricsForLookup[node.key.id], options)
    };
  });
};

const createQueryFilterClauses = filterQuery => filterQuery ? [filterQuery] : [];

const buildFilters = (options, withQuery = true) => {
  let filters = [{
    range: {
      [options.sourceConfiguration.fields.timestamp]: {
        gte: options.timerange.from,
        lte: options.timerange.to,
        format: 'epoch_millis'
      }
    }
  }];

  if (withQuery) {
    filters = [...createQueryFilterClauses(options.filterQuery), ...filters];
  }

  if (options.accountId) {
    filters.push({
      term: {
        'cloud.account.id': options.accountId
      }
    });
  }

  if (options.region) {
    filters.push({
      term: {
        'cloud.region': options.region
      }
    });
  }

  return filters;
};