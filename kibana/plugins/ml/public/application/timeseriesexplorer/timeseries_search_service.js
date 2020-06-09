"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlTimeSeriesSearchService = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _operators = require("rxjs/operators");

var _ml_api_service = require("../services/ml_api_service");

var _job_utils = require("../../../common/util/job_utils");

var _chart_config_builder = require("../util/chart_config_builder");

var _results_service = require("../services/results_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
function getMetricData(job, detectorIndex, entityFields, earliestMs, latestMs, interval) {
  if ((0, _job_utils.isModelPlotEnabled)(job, detectorIndex, entityFields)) {
    // Extract the partition, by, over fields on which to filter.
    var criteriaFields = [];
    var detector = job.analysis_config.detectors[detectorIndex];

    if (_lodash.default.has(detector, 'partition_field_name')) {
      var partitionEntity = _lodash.default.find(entityFields, {
        fieldName: detector.partition_field_name
      });

      if (partitionEntity !== undefined) {
        criteriaFields.push({
          fieldName: 'partition_field_name',
          fieldValue: partitionEntity.fieldName
        }, {
          fieldName: 'partition_field_value',
          fieldValue: partitionEntity.fieldValue
        });
      }
    }

    if (_lodash.default.has(detector, 'over_field_name')) {
      var overEntity = _lodash.default.find(entityFields, {
        fieldName: detector.over_field_name
      });

      if (overEntity !== undefined) {
        criteriaFields.push({
          fieldName: 'over_field_name',
          fieldValue: overEntity.fieldName
        }, {
          fieldName: 'over_field_value',
          fieldValue: overEntity.fieldValue
        });
      }
    }

    if (_lodash.default.has(detector, 'by_field_name')) {
      var byEntity = _lodash.default.find(entityFields, {
        fieldName: detector.by_field_name
      });

      if (byEntity !== undefined) {
        criteriaFields.push({
          fieldName: 'by_field_name',
          fieldValue: byEntity.fieldName
        }, {
          fieldName: 'by_field_value',
          fieldValue: byEntity.fieldValue
        });
      }
    }

    return _results_service.mlResultsService.getModelPlotOutput(job.job_id, detectorIndex, criteriaFields, earliestMs, latestMs, interval);
  } else {
    var obj = {
      success: true,
      results: {}
    };
    var chartConfig = (0, _chart_config_builder.buildConfigFromDetector)(job, detectorIndex);
    return _results_service.mlResultsService.getMetricData(chartConfig.datafeedConfig.indices, entityFields, chartConfig.datafeedConfig.query, chartConfig.metricFunction, chartConfig.metricFieldName, chartConfig.timeField, earliestMs, latestMs, interval).pipe((0, _operators.map)(function (resp) {
      _lodash.default.each(resp.results, function (value, time) {
        // @ts-ignore
        obj.results[time] = {
          actual: value
        };
      });

      return obj;
    }));
  }
} // Builds chart detail information (charting function description and entity counts) used
// in the title area of the time series chart.
// Queries Elasticsearch if necessary to obtain the distinct count of entities
// for which data is being plotted.


function getChartDetails(job, detectorIndex, entityFields, earliestMs, latestMs) {
  return new Promise(function (resolve, reject) {
    var obj = {
      success: true,
      results: {
        functionLabel: '',
        entityData: {
          entities: []
        }
      }
    };
    var chartConfig = (0, _chart_config_builder.buildConfigFromDetector)(job, detectorIndex);
    var functionLabel = chartConfig.metricFunction;

    if (chartConfig.metricFieldName !== undefined) {
      functionLabel += ' ';
      functionLabel += chartConfig.metricFieldName;
    }

    obj.results.functionLabel = functionLabel;

    var blankEntityFields = _lodash.default.filter(entityFields, function (entity) {
      return entity.fieldValue === null;
    }); // Look to see if any of the entity fields have defined values
    // (i.e. blank input), and if so obtain the cardinality.


    if (blankEntityFields.length === 0) {
      obj.results.entityData.count = 1;
      obj.results.entityData.entities = entityFields;
      resolve(obj);
    } else {
      var entityFieldNames = _lodash.default.map(blankEntityFields, 'fieldName');

      _ml_api_service.ml.getCardinalityOfFields({
        index: chartConfig.datafeedConfig.indices,
        fieldNames: entityFieldNames,
        query: chartConfig.datafeedConfig.query,
        timeFieldName: chartConfig.timeField,
        earliestMs: earliestMs,
        latestMs: latestMs
      }).then(function (results) {
        _lodash.default.each(blankEntityFields, function (field) {
          // results will not contain keys for non-aggregatable fields,
          // so store as 0 to indicate over all field values.
          obj.results.entityData.entities.push({
            fieldName: field.fieldName,
            cardinality: _lodash.default.get(results, field.fieldName, 0)
          });
        });

        resolve(obj);
      }).catch(function (resp) {
        reject(resp);
      });
    }
  });
}

var mlTimeSeriesSearchService = {
  getMetricData: getMetricData,
  getChartDetails: getChartDetails
};
exports.mlTimeSeriesSearchService = mlTimeSeriesSearchService;