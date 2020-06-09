"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogEntryCategoryExamplesResponsePayloadRT = exports.getLogEntryCategoryExamplesSuccessReponsePayloadRT = exports.getLogEntryCategoryExamplesRequestPayloadRT = exports.LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_EXAMPLES_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _shared = require("../../shared");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_EXAMPLES_PATH = '/api/infra/log_analysis/results/log_entry_category_examples';
/**
 * request
 */

exports.LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_EXAMPLES_PATH = LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_EXAMPLES_PATH;
const getLogEntryCategoryExamplesRequestPayloadRT = rt.type({
  data: rt.type({
    // the category to fetch the examples for
    categoryId: rt.number,
    // the number of examples to fetch
    exampleCount: rt.number,
    // the id of the source configuration
    sourceId: rt.string,
    // the time range to fetch the category examples from
    timeRange: _shared.timeRangeRT
  })
});
exports.getLogEntryCategoryExamplesRequestPayloadRT = getLogEntryCategoryExamplesRequestPayloadRT;

/**
 * response
 */
const logEntryCategoryExampleRT = rt.type({
  dataset: rt.string,
  message: rt.string,
  timestamp: rt.number
});
const getLogEntryCategoryExamplesSuccessReponsePayloadRT = rt.intersection([rt.type({
  data: rt.type({
    examples: rt.array(logEntryCategoryExampleRT)
  })
}), rt.partial({
  timing: _shared.routeTimingMetadataRT
})]);
exports.getLogEntryCategoryExamplesSuccessReponsePayloadRT = getLogEntryCategoryExamplesSuccessReponsePayloadRT;
const getLogEntryCategoryExamplesResponsePayloadRT = rt.union([getLogEntryCategoryExamplesSuccessReponsePayloadRT, _shared.badRequestErrorRT, _shared.forbiddenErrorRT]);
exports.getLogEntryCategoryExamplesResponsePayloadRT = getLogEntryCategoryExamplesResponsePayloadRT;