"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ES_AGGREGATION = exports.KIBANA_AGGREGATION = exports.SPARSE_DATA_AGGREGATIONS = exports.ML_JOB_AGGREGATION = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
let ML_JOB_AGGREGATION;
exports.ML_JOB_AGGREGATION = ML_JOB_AGGREGATION;

(function (ML_JOB_AGGREGATION) {
  ML_JOB_AGGREGATION["COUNT"] = "count";
  ML_JOB_AGGREGATION["HIGH_COUNT"] = "high_count";
  ML_JOB_AGGREGATION["LOW_COUNT"] = "low_count";
  ML_JOB_AGGREGATION["NON_ZERO_COUNT"] = "non_zero_count";
  ML_JOB_AGGREGATION["HIGH_NON_ZERO_COUNT"] = "high_non_zero_count";
  ML_JOB_AGGREGATION["LOW_NON_ZERO_COUNT"] = "low_non_zero_count";
  ML_JOB_AGGREGATION["DISTINCT_COUNT"] = "distinct_count";
  ML_JOB_AGGREGATION["HIGH_DISTINCT_COUNT"] = "high_distinct_count";
  ML_JOB_AGGREGATION["LOW_DISTINCT_COUNT"] = "low_distinct_count";
  ML_JOB_AGGREGATION["MIN"] = "min";
  ML_JOB_AGGREGATION["MAX"] = "max";
  ML_JOB_AGGREGATION["MEDIAN"] = "median";
  ML_JOB_AGGREGATION["LOW_MEDIAN"] = "low_median";
  ML_JOB_AGGREGATION["HIGH_MEAN"] = "high_mean";
  ML_JOB_AGGREGATION["MEAN"] = "mean";
  ML_JOB_AGGREGATION["LOW_MEAN"] = "low_mean";
  ML_JOB_AGGREGATION["HIGH_MEDIAN"] = "high_median";
  ML_JOB_AGGREGATION["METRIC"] = "metric";
  ML_JOB_AGGREGATION["VARP"] = "varp";
  ML_JOB_AGGREGATION["HIGH_VARP"] = "high_varp";
  ML_JOB_AGGREGATION["LOW_VARP"] = "low_varp";
  ML_JOB_AGGREGATION["SUM"] = "sum";
  ML_JOB_AGGREGATION["HIGH_SUM"] = "high_sum";
  ML_JOB_AGGREGATION["LOW_SUM"] = "low_sum";
  ML_JOB_AGGREGATION["NON_NULL_SUM"] = "non_null_sum";
  ML_JOB_AGGREGATION["HIGH_NON_NULL_SUM"] = "high_non_null_sum";
  ML_JOB_AGGREGATION["LOW_NON_NULL_SUM"] = "low_non_null_sum";
  ML_JOB_AGGREGATION["RARE"] = "rare";
  ML_JOB_AGGREGATION["FREQ_RARE"] = "freq_rare";
  ML_JOB_AGGREGATION["INFO_CONTENT"] = "info_content";
  ML_JOB_AGGREGATION["HIGH_INFO_CONTENT"] = "high_info_content";
  ML_JOB_AGGREGATION["LOW_INFO_CONTENT"] = "low_info_content";
  ML_JOB_AGGREGATION["TIME_OF_DAY"] = "time_of_day";
  ML_JOB_AGGREGATION["TIME_OF_WEEK"] = "time_of_week";
  ML_JOB_AGGREGATION["LAT_LONG"] = "lat_long";
})(ML_JOB_AGGREGATION || (exports.ML_JOB_AGGREGATION = ML_JOB_AGGREGATION = {}));

const SPARSE_DATA_AGGREGATIONS = [ML_JOB_AGGREGATION.NON_ZERO_COUNT, ML_JOB_AGGREGATION.HIGH_NON_ZERO_COUNT, ML_JOB_AGGREGATION.LOW_NON_ZERO_COUNT, ML_JOB_AGGREGATION.NON_NULL_SUM, ML_JOB_AGGREGATION.HIGH_NON_NULL_SUM, ML_JOB_AGGREGATION.LOW_NON_NULL_SUM];
exports.SPARSE_DATA_AGGREGATIONS = SPARSE_DATA_AGGREGATIONS;
let KIBANA_AGGREGATION;
exports.KIBANA_AGGREGATION = KIBANA_AGGREGATION;

(function (KIBANA_AGGREGATION) {
  KIBANA_AGGREGATION["COUNT"] = "count";
  KIBANA_AGGREGATION["AVG"] = "avg";
  KIBANA_AGGREGATION["MAX"] = "max";
  KIBANA_AGGREGATION["MIN"] = "min";
  KIBANA_AGGREGATION["SUM"] = "sum";
  KIBANA_AGGREGATION["MEDIAN"] = "median";
  KIBANA_AGGREGATION["CARDINALITY"] = "cardinality";
})(KIBANA_AGGREGATION || (exports.KIBANA_AGGREGATION = KIBANA_AGGREGATION = {}));

let ES_AGGREGATION;
exports.ES_AGGREGATION = ES_AGGREGATION;

(function (ES_AGGREGATION) {
  ES_AGGREGATION["COUNT"] = "count";
  ES_AGGREGATION["AVG"] = "avg";
  ES_AGGREGATION["MAX"] = "max";
  ES_AGGREGATION["MIN"] = "min";
  ES_AGGREGATION["SUM"] = "sum";
  ES_AGGREGATION["PERCENTILES"] = "percentiles";
  ES_AGGREGATION["CARDINALITY"] = "cardinality";
})(ES_AGGREGATION || (exports.ES_AGGREGATION = ES_AGGREGATION = {}));