"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyticsAuditMessagesProvider = analyticsAuditMessagesProvider;

var _index_patterns = require("../../../common/constants/index_patterns");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const SIZE = 50;

function analyticsAuditMessagesProvider(callWithRequest) {
  // search for audit messages,
  // analyticsId is optional. without it, all analytics will be listed.
  async function getAnalyticsAuditMessages(analyticsId) {
    const query = {
      bool: {
        filter: [{
          bool: {
            must_not: {
              term: {
                level: 'activity'
              }
            },
            must: {
              term: {
                job_type: 'data_frame_analytics'
              }
            }
          }
        }]
      }
    }; // if no analyticsId specified, load all of the messages

    if (analyticsId !== undefined) {
      query.bool.filter.push({
        bool: {
          should: [{
            term: {
              job_id: '' // catch system messages

            }
          }, {
            term: {
              job_id: analyticsId // messages for specified analyticsId

            }
          }]
        }
      });
    }

    try {
      const resp = await callWithRequest('search', {
        index: _index_patterns.ML_NOTIFICATION_INDEX_PATTERN,
        ignore_unavailable: true,
        rest_total_hits_as_int: true,
        size: SIZE,
        body: {
          sort: [{
            timestamp: {
              order: 'desc'
            }
          }, {
            job_id: {
              order: 'asc'
            }
          }],
          query
        }
      });
      let messages = [];

      if (resp.hits.total !== 0) {
        messages = resp.hits.hits.map(hit => hit._source);
        messages.reverse();
      }

      return messages;
    } catch (e) {
      throw e;
    }
  }

  return {
    getAnalyticsAuditMessages
  };
}