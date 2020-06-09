"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inventoryViewSavedObjectMappings = exports.inventoryViewSavedObjectType = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const inventoryViewSavedObjectType = 'inventory-view'; // eslint-disable-next-line @kbn/eslint/no-restricted-paths

exports.inventoryViewSavedObjectType = inventoryViewSavedObjectType;
const inventoryViewSavedObjectMappings = {
  [inventoryViewSavedObjectType]: {
    properties: {
      name: {
        type: 'keyword'
      },
      metric: {
        properties: {
          type: {
            type: 'keyword'
          },
          field: {
            type: 'keyword'
          },
          aggregation: {
            type: 'keyword'
          },
          id: {
            type: 'keyword'
          },
          label: {
            type: 'keyword'
          }
        }
      },
      groupBy: {
        type: 'nested',
        properties: {
          label: {
            type: 'keyword'
          },
          field: {
            type: 'keyword'
          }
        }
      },
      nodeType: {
        type: 'keyword'
      },
      view: {
        type: 'keyword'
      },
      customOptions: {
        type: 'nested',
        properties: {
          text: {
            type: 'keyword'
          },
          field: {
            type: 'keyword'
          }
        }
      },
      customMetrics: {
        type: 'nested',
        properties: {
          type: {
            type: 'keyword'
          },
          field: {
            type: 'keyword'
          },
          aggregation: {
            type: 'keyword'
          },
          id: {
            type: 'keyword'
          },
          label: {
            type: 'keyword'
          }
        }
      },
      boundsOverride: {
        properties: {
          max: {
            type: 'integer'
          },
          min: {
            type: 'integer'
          }
        }
      },
      autoBounds: {
        type: 'boolean'
      },
      time: {
        type: 'integer'
      },
      autoReload: {
        type: 'boolean'
      },
      filterQuery: {
        properties: {
          kind: {
            type: 'keyword'
          },
          expression: {
            type: 'keyword'
          }
        }
      }
    }
  }
};
exports.inventoryViewSavedObjectMappings = inventoryViewSavedObjectMappings;