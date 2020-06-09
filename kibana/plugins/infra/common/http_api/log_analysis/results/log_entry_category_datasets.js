"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogEntryCategoryDatasetsResponsePayloadRT = exports.getLogEntryCategoryDatasetsSuccessReponsePayloadRT = exports.getLogEntryCategoryDatasetsRequestPayloadRT = exports.LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_DATASETS_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _shared = require("../../shared");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_DATASETS_PATH = '/api/infra/log_analysis/results/log_entry_category_datasets';
/**
 * request
 */

exports.LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_DATASETS_PATH = LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_DATASETS_PATH;
const getLogEntryCategoryDatasetsRequestPayloadRT = rt.type({
  data: rt.type({
    // the id of the source configuration
    sourceId: rt.string,
    // the time range to fetch the category datasets from
    timeRange: _shared.timeRangeRT
  })
});
exports.getLogEntryCategoryDatasetsRequestPayloadRT = getLogEntryCategoryDatasetsRequestPayloadRT;

/**
 * response
 */
const getLogEntryCategoryDatasetsSuccessReponsePayloadRT = rt.intersection([rt.type({
  data: rt.type({
    datasets: rt.array(rt.string)
  })
}), rt.partial({
  timing: _shared.routeTimingMetadataRT
})]);
exports.getLogEntryCategoryDatasetsSuccessReponsePayloadRT = getLogEntryCategoryDatasetsSuccessReponsePayloadRT;
const getLogEntryCategoryDatasetsResponsePayloadRT = rt.union([getLogEntryCategoryDatasetsSuccessReponsePayloadRT, _shared.badRequestErrorRT, _shared.forbiddenErrorRT]);
exports.getLogEntryCategoryDatasetsResponsePayloadRT = getLogEntryCategoryDatasetsResponsePayloadRT;