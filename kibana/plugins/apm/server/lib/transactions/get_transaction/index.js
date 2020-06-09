"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransaction = getTransaction;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _range_filter = require("../../helpers/range_filter");

var _processor_event = require("../../../../common/processor_event");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getTransaction({
  transactionId,
  traceId,
  setup
}) {
  var _resp$hits$hits$;

  const {
    start,
    end,
    client,
    indices
  } = setup;
  const params = {
    index: indices['apm_oss.transactionIndices'],
    body: {
      size: 1,
      query: {
        bool: {
          filter: [{
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: _processor_event.ProcessorEvent.transaction
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.TRANSACTION_ID]: transactionId
            }
          }, {
            term: {
              [_elasticsearch_fieldnames.TRACE_ID]: traceId
            }
          }, {
            range: (0, _range_filter.rangeFilter)(start, end)
          }]
        }
      }
    }
  };
  const resp = await client.search(params);
  return (_resp$hits$hits$ = resp.hits.hits[0]) === null || _resp$hits$hits$ === void 0 ? void 0 : _resp$hits$hits$._source;
}