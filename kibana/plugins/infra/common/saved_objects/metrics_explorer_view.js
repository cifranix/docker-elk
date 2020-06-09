"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metricsExplorerViewSavedObjectMappings = exports.metricsExplorerViewSavedObjectType = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const metricsExplorerViewSavedObjectType = 'metrics-explorer-view';
exports.metricsExplorerViewSavedObjectType = metricsExplorerViewSavedObjectType;
const metricsExplorerViewSavedObjectMappings = {
  [metricsExplorerViewSavedObjectType]: {
    properties: {
      name: {
        type: 'keyword'
      },
      options: {
        properties: {
          metrics: {
            type: 'nested',
            properties: {
              aggregation: {
                type: 'keyword'
              },
              field: {
                type: 'keyword'
              },
              color: {
                type: 'keyword'
              },
              label: {
                type: 'keyword'
              }
            }
          },
          limit: {
            type: 'integer'
          },
          groupBy: {
            type: 'keyword'
          },
          filterQuery: {
            type: 'keyword'
          },
          aggregation: {
            type: 'keyword'
          }
        }
      },
      chartOptions: {
        properties: {
          type: {
            type: 'keyword'
          },
          yAxisMode: {
            type: 'keyword'
          },
          stack: {
            type: 'boolean'
          }
        }
      },
      currentTimerange: {
        properties: {
          from: {
            type: 'keyword'
          },
          to: {
            type: 'keyword'
          },
          interval: {
            type: 'keyword'
          }
        }
      }
    }
  }
};
exports.metricsExplorerViewSavedObjectMappings = metricsExplorerViewSavedObjectMappings;