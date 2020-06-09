"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataVisualizerRoutes = dataVisualizerRoutes;

var _error_wrapper = require("../client/error_wrapper");

var _data_visualizer = require("../models/data_visualizer");

var _data_visualizer_schema = require("./schemas/data_visualizer_schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getOverallStats(context, indexPatternTitle, query, aggregatableFields, nonAggregatableFields, samplerShardSize, timeFieldName, earliestMs, latestMs) {
  const dv = new _data_visualizer.DataVisualizer(context.ml.mlClient.callAsCurrentUser);
  return dv.getOverallStats(indexPatternTitle, query, aggregatableFields, nonAggregatableFields, samplerShardSize, timeFieldName, earliestMs, latestMs);
}

function getStatsForFields(context, indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs, interval, maxExamples) {
  const dv = new _data_visualizer.DataVisualizer(context.ml.mlClient.callAsCurrentUser);
  return dv.getStatsForFields(indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs, interval, maxExamples);
}
/**
 * Routes for the index data visualizer.
 */


function dataVisualizerRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup DataVisualizer
   *
   * @api {post} /api/ml/data_visualizer/get_field_stats/:indexPatternTitle Get stats for fields
   * @apiName GetStatsForFields
   * @apiDescription Returns fields stats of the index pattern.
   *
   * @apiParam {String} indexPatternTitle Index pattern title.
   */
  router.post({
    path: '/api/ml/data_visualizer/get_field_stats/{indexPatternTitle}',
    validate: _data_visualizer_schema.dataVisualizerFieldStatsSchema
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        params: {
          indexPatternTitle
        },
        body: {
          query,
          fields,
          samplerShardSize,
          timeFieldName,
          earliest,
          latest,
          interval,
          maxExamples
        }
      } = request;
      const results = await getStatsForFields(context, indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliest, latest, interval, maxExamples);
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataVisualizer
   *
   * @api {post} /api/ml/data_visualizer/get_overall_stats/:indexPatternTitle Get overall stats
   * @apiName GetOverallStats
   * @apiDescription Returns overall stats of the index pattern.
   *
   * @apiParam {String} indexPatternTitle Index pattern title.
   */

  router.post({
    path: '/api/ml/data_visualizer/get_overall_stats/{indexPatternTitle}',
    validate: _data_visualizer_schema.dataVisualizerOverallStatsSchema
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        params: {
          indexPatternTitle
        },
        body: {
          query,
          aggregatableFields,
          nonAggregatableFields,
          samplerShardSize,
          timeFieldName,
          earliest,
          latest
        }
      } = request;
      const results = await getOverallStats(context, indexPatternTitle, query, aggregatableFields, nonAggregatableFields, samplerShardSize, timeFieldName, earliest, latest);
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}