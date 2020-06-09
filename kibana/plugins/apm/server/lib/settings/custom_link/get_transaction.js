"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTransaction = getTransaction;

var _elasticsearch_fieldnames = require("../../../../common/elasticsearch_fieldnames");

var _processor_event = require("../../../../common/processor_event");

var _helper = require("./helper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
async function getTransaction({
  setup,
  filters = {}
}) {
  var _resp$hits$hits$;

  const {
    client,
    indices
  } = setup;
  const esFilters = Object.entries(filters) // loops through the filters splitting the value by comma and removing white spaces
  .map(([key, value]) => {
    if (value) {
      return {
        terms: {
          [key]: (0, _helper.splitFilterValueByComma)(value)
        }
      };
    }
  }) // removes filters without value
  .filter(value => value);
  const params = {
    terminateAfter: 1,
    index: indices['apm_oss.transactionIndices'],
    size: 1,
    body: {
      query: {
        bool: {
          filter: [{
            term: {
              [_elasticsearch_fieldnames.PROCESSOR_EVENT]: _processor_event.ProcessorEvent.transaction
            }
          }, ...esFilters]
        }
      }
    }
  };
  const resp = await client.search(params);
  return (_resp$hits$hits$ = resp.hits.hits[0]) === null || _resp$hits$hits$ === void 0 ? void 0 : _resp$hits$hits$._source;
}