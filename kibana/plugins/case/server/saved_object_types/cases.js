"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.caseSavedObjectType = exports.CASE_SAVED_OBJECT = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const CASE_SAVED_OBJECT = 'cases';
exports.CASE_SAVED_OBJECT = CASE_SAVED_OBJECT;
const caseSavedObjectType = {
  name: CASE_SAVED_OBJECT,
  hidden: false,
  namespaceAgnostic: false,
  mappings: {
    properties: {
      closed_at: {
        type: 'date'
      },
      closed_by: {
        properties: {
          username: {
            type: 'keyword'
          },
          full_name: {
            type: 'keyword'
          },
          email: {
            type: 'keyword'
          }
        }
      },
      created_at: {
        type: 'date'
      },
      created_by: {
        properties: {
          username: {
            type: 'keyword'
          },
          full_name: {
            type: 'keyword'
          },
          email: {
            type: 'keyword'
          }
        }
      },
      description: {
        type: 'text'
      },
      external_service: {
        properties: {
          pushed_at: {
            type: 'date'
          },
          pushed_by: {
            properties: {
              username: {
                type: 'keyword'
              },
              full_name: {
                type: 'keyword'
              },
              email: {
                type: 'keyword'
              }
            }
          },
          connector_id: {
            type: 'keyword'
          },
          connector_name: {
            type: 'keyword'
          },
          external_id: {
            type: 'keyword'
          },
          external_title: {
            type: 'text'
          },
          external_url: {
            type: 'text'
          }
        }
      },
      title: {
        type: 'keyword'
      },
      status: {
        type: 'keyword'
      },
      tags: {
        type: 'keyword'
      },
      updated_at: {
        type: 'date'
      },
      updated_by: {
        properties: {
          username: {
            type: 'keyword'
          },
          full_name: {
            type: 'keyword'
          },
          email: {
            type: 'keyword'
          }
        }
      }
    }
  }
};
exports.caseSavedObjectType = caseSavedObjectType;