"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregations = exports.mlOnlyAggregations = void 0;

var _fields = require("../../../../common/types/fields");

var _aggregation_types = require("../../../../common/constants/aggregation_types");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// aggregation object missing id, title and fields and has null for kibana and dsl aggregation names.
// this is used as the basis for the ML only aggregations
function getBasicMlOnlyAggregation() {
  return {
    kibanaName: null,
    dslName: null,
    type: _fields.METRIC_AGG_TYPE,
    mlModelPlotAgg: {
      max: _aggregation_types.KIBANA_AGGREGATION.MAX,
      min: _aggregation_types.KIBANA_AGGREGATION.MIN
    }
  };
} // list of aggregations only support by ML and which don't have an equivalent ES aggregation
// note, not all aggs have a field list. Some aggs cannot be used with a field.


const mlOnlyAggregations = [{
  id: _aggregation_types.ML_JOB_AGGREGATION.NON_ZERO_COUNT,
  title: 'Non zero count',
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_NON_ZERO_COUNT,
  title: 'High non zero count',
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_NON_ZERO_COUNT,
  title: 'Low non zero count',
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_DISTINCT_COUNT,
  title: 'High distinct count',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_DISTINCT_COUNT,
  title: 'Low distinct count',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.METRIC,
  title: 'Metric',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.VARP,
  title: 'varp',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_VARP,
  title: 'High varp',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_VARP,
  title: 'Low varp',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.NON_NULL_SUM,
  title: 'Non null sum',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_NON_NULL_SUM,
  title: 'High non null sum',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_NON_NULL_SUM,
  title: 'Low non null sum',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.RARE,
  title: 'Rare',
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.FREQ_RARE,
  title: 'Freq rare',
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.INFO_CONTENT,
  title: 'Info content',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_INFO_CONTENT,
  title: 'High info content',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_INFO_CONTENT,
  title: 'Low info content',
  fields: [],
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.TIME_OF_DAY,
  title: 'Time of day',
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.TIME_OF_WEEK,
  title: 'Time of week',
  ...getBasicMlOnlyAggregation()
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LAT_LONG,
  title: 'Lat long',
  fields: [],
  ...getBasicMlOnlyAggregation()
}];
exports.mlOnlyAggregations = mlOnlyAggregations;
const aggregations = [{
  id: _aggregation_types.ML_JOB_AGGREGATION.COUNT,
  title: 'Count',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.COUNT,
  dslName: _aggregation_types.ES_AGGREGATION.COUNT,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  }
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_COUNT,
  title: 'High count',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.COUNT,
  dslName: _aggregation_types.ES_AGGREGATION.COUNT,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  }
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_COUNT,
  title: 'Low count',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.COUNT,
  dslName: _aggregation_types.ES_AGGREGATION.COUNT,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  }
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.MEAN,
  title: 'Mean',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.AVG,
  dslName: _aggregation_types.ES_AGGREGATION.AVG,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.AVG,
    min: _aggregation_types.KIBANA_AGGREGATION.AVG
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_MEAN,
  title: 'High mean',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.AVG,
  dslName: _aggregation_types.ES_AGGREGATION.AVG,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.AVG,
    min: _aggregation_types.KIBANA_AGGREGATION.AVG
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_MEAN,
  title: 'Low mean',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.AVG,
  dslName: _aggregation_types.ES_AGGREGATION.AVG,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.AVG,
    min: _aggregation_types.KIBANA_AGGREGATION.AVG
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.SUM,
  title: 'Sum',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.SUM,
  dslName: _aggregation_types.ES_AGGREGATION.SUM,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.SUM,
    min: _aggregation_types.KIBANA_AGGREGATION.SUM
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_SUM,
  title: 'High sum',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.SUM,
  dslName: _aggregation_types.ES_AGGREGATION.SUM,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.SUM,
    min: _aggregation_types.KIBANA_AGGREGATION.SUM
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_SUM,
  title: 'Low sum',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.SUM,
  dslName: _aggregation_types.ES_AGGREGATION.SUM,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.SUM,
    min: _aggregation_types.KIBANA_AGGREGATION.SUM
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.MEDIAN,
  title: 'Median',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.MEDIAN,
  dslName: _aggregation_types.ES_AGGREGATION.PERCENTILES,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.HIGH_MEDIAN,
  title: 'High median',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.MEDIAN,
  dslName: _aggregation_types.ES_AGGREGATION.PERCENTILES,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.LOW_MEDIAN,
  title: 'Low median',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.MEDIAN,
  dslName: _aggregation_types.ES_AGGREGATION.PERCENTILES,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.MIN,
  title: 'Min',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.MIN,
  dslName: _aggregation_types.ES_AGGREGATION.MIN,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MIN,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.MAX,
  title: 'Max',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.MAX,
  dslName: _aggregation_types.ES_AGGREGATION.MAX,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MAX
  },
  fields: []
}, {
  id: _aggregation_types.ML_JOB_AGGREGATION.DISTINCT_COUNT,
  title: 'Distinct count',
  kibanaName: _aggregation_types.KIBANA_AGGREGATION.CARDINALITY,
  dslName: _aggregation_types.ES_AGGREGATION.CARDINALITY,
  type: _fields.METRIC_AGG_TYPE,
  mlModelPlotAgg: {
    max: _aggregation_types.KIBANA_AGGREGATION.MAX,
    min: _aggregation_types.KIBANA_AGGREGATION.MIN
  },
  fields: []
}];
exports.aggregations = aggregations;