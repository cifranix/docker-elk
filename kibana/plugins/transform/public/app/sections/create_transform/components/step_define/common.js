"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPivotDropdownOptions = getPivotDropdownOptions;

var _lodash = require("lodash");

var _common = require("../../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getDefaultGroupByConfig(aggName, dropDownName, fieldName, groupByAgg) {
  switch (groupByAgg) {
    case _common.PIVOT_SUPPORTED_GROUP_BY_AGGS.TERMS:
      return {
        agg: groupByAgg,
        aggName: aggName,
        dropDownName: dropDownName,
        field: fieldName
      };

    case _common.PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM:
      return {
        agg: groupByAgg,
        aggName: aggName,
        dropDownName: dropDownName,
        field: fieldName,
        interval: '10'
      };

    case _common.PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM:
      return {
        agg: groupByAgg,
        aggName: aggName,
        dropDownName: dropDownName,
        field: fieldName,
        calendar_interval: '1m'
      };
  }
}

function getDefaultAggregationConfig(aggName, dropDownName, fieldName, agg) {
  switch (agg) {
    case _common.PIVOT_SUPPORTED_AGGS.PERCENTILES:
      return {
        agg: agg,
        aggName: aggName,
        dropDownName: dropDownName,
        field: fieldName,
        percents: _common.PERCENTILES_AGG_DEFAULT_PERCENTS
      };

    default:
      return {
        agg: agg,
        aggName: aggName,
        dropDownName: dropDownName,
        field: fieldName
      };
  }
}

var illegalEsAggNameChars = /[[\]>]/g;

function getPivotDropdownOptions(indexPattern) {
  // The available group by options
  var groupByOptions = [];
  var groupByOptionsData = {}; // The available aggregations

  var aggOptions = [];
  var aggOptionsData = {};
  var ignoreFieldNames = ['_id', '_index', '_type'];
  var fields = indexPattern.fields.filter(function (field) {
    return field.aggregatable === true && !ignoreFieldNames.includes(field.name);
  }).map(function (field) {
    return {
      name: field.name,
      type: field.type
    };
  });
  fields.forEach(function (field) {
    // Group by
    var availableGroupByAggs = (0, _lodash.get)(_common.pivotGroupByFieldSupport, field.type);

    if (availableGroupByAggs !== undefined) {
      availableGroupByAggs.forEach(function (groupByAgg) {
        // Aggregation name for the group-by is the plain field name. Illegal characters will be removed.
        var aggName = field.name.replace(illegalEsAggNameChars, '').trim(); // Option name in the dropdown for the group-by is in the form of `sum(fieldname)`.

        var dropDownName = "".concat(groupByAgg, "(").concat(field.name, ")");
        var groupByOption = {
          label: dropDownName
        };
        groupByOptions.push(groupByOption);
        groupByOptionsData[dropDownName] = getDefaultGroupByConfig(aggName, dropDownName, field.name, groupByAgg);
      });
    } // Aggregations


    var aggOption = {
      label: field.name,
      options: []
    };
    var availableAggs = (0, _lodash.get)(_common.pivotAggsFieldSupport, field.type);

    if (availableAggs !== undefined) {
      availableAggs.forEach(function (agg) {
        // Aggregation name is formatted like `fieldname.sum`. Illegal characters will be removed.
        var aggName = "".concat(field.name.replace(illegalEsAggNameChars, '').trim(), ".").concat(agg); // Option name in the dropdown for the aggregation is in the form of `sum(fieldname)`.

        var dropDownName = "".concat(agg, "(").concat(field.name, ")");
        aggOption.options.push({
          label: dropDownName
        });
        aggOptionsData[dropDownName] = getDefaultAggregationConfig(aggName, dropDownName, field.name, agg);
      });
    }

    aggOptions.push(aggOption);
  });
  return {
    groupByOptions: groupByOptions,
    groupByOptionsData: groupByOptionsData,
    aggOptions: aggOptions,
    aggOptionsData: aggOptionsData
  };
}