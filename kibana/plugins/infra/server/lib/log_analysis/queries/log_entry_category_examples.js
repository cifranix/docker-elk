"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntryCategoryExamplesResponseRT = exports.logEntryCategoryExampleHitRT = exports.createLogEntryCategoryExamplesQuery = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _elasticsearch_runtime_types = require("../../../utils/elasticsearch_runtime_types");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createLogEntryCategoryExamplesQuery = (indices, timestampField, startTime, endTime, categoryQuery, exampleCount) => ({ ..._common.defaultRequestParameters,
  body: {
    query: {
      bool: {
        filter: [{
          range: {
            [timestampField]: {
              gte: startTime,
              lte: endTime
            }
          }
        }, {
          match: {
            message: {
              query: categoryQuery,
              operator: 'AND'
            }
          }
        }]
      }
    },
    sort: [{
      [timestampField]: {
        order: 'asc'
      }
    }]
  },
  _source: ['event.dataset', 'message'],
  index: indices,
  size: exampleCount
});

exports.createLogEntryCategoryExamplesQuery = createLogEntryCategoryExamplesQuery;
const logEntryCategoryExampleHitRT = rt.type({
  _source: rt.partial({
    event: rt.partial({
      dataset: rt.string
    }),
    message: rt.string
  }),
  sort: rt.tuple([rt.number])
});
exports.logEntryCategoryExampleHitRT = logEntryCategoryExampleHitRT;
const logEntryCategoryExamplesResponseRT = rt.intersection([_elasticsearch_runtime_types.commonSearchSuccessResponseFieldsRT, rt.type({
  hits: rt.type({
    hits: rt.array(logEntryCategoryExampleHitRT)
  })
})]);
exports.logEntryCategoryExamplesResponseRT = logEntryCategoryExamplesResponseRT;