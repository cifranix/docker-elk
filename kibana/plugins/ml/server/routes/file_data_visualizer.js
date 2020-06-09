"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileDataVisualizerRoutes = fileDataVisualizerRoutes;

var _configSchema = require("@kbn/config-schema");

var _file_datavisualizer = require("../../common/constants/file_datavisualizer");

var _error_wrapper = require("../client/error_wrapper");

var _file_data_visualizer = require("../models/file_data_visualizer");

var _telemetry = require("../lib/telemetry");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function analyzeFiles(context, data, overrides) {
  const {
    analyzeFile
  } = (0, _file_data_visualizer.fileDataVisualizerProvider)(context.ml.mlClient.callAsCurrentUser);
  return analyzeFile(data, overrides);
}

function importData(context, id, index, settings, mappings, ingestPipeline, data) {
  const {
    importData: importDataFunc
  } = (0, _file_data_visualizer.importDataProvider)(context.ml.mlClient.callAsCurrentUser);
  return importDataFunc(id, index, settings, mappings, ingestPipeline, data);
}
/**
 * Routes for the file data visualizer.
 */


function fileDataVisualizerRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup FileDataVisualizer
   *
   * @api {post} /api/ml/file_data_visualizer/analyze_file Analyze file data
   * @apiName AnalyzeFile
   * @apiDescription Performs analysis of the file data.
   */
  router.post({
    path: '/api/ml/file_data_visualizer/analyze_file',
    validate: {
      body: _configSchema.schema.any(),
      query: _configSchema.schema.maybe(_configSchema.schema.object({
        charset: _configSchema.schema.maybe(_configSchema.schema.string()),
        column_names: _configSchema.schema.maybe(_configSchema.schema.string()),
        delimiter: _configSchema.schema.maybe(_configSchema.schema.string()),
        explain: _configSchema.schema.maybe(_configSchema.schema.string()),
        format: _configSchema.schema.maybe(_configSchema.schema.string()),
        grok_pattern: _configSchema.schema.maybe(_configSchema.schema.string()),
        has_header_row: _configSchema.schema.maybe(_configSchema.schema.string()),
        line_merge_size_limit: _configSchema.schema.maybe(_configSchema.schema.string()),
        lines_to_sample: _configSchema.schema.maybe(_configSchema.schema.string()),
        quote: _configSchema.schema.maybe(_configSchema.schema.string()),
        should_trim_fields: _configSchema.schema.maybe(_configSchema.schema.string()),
        timeout: _configSchema.schema.maybe(_configSchema.schema.string()),
        timestamp_field: _configSchema.schema.maybe(_configSchema.schema.string()),
        timestamp_format: _configSchema.schema.maybe(_configSchema.schema.string())
      }))
    },
    options: {
      body: {
        accepts: ['text/*', 'application/json'],
        maxBytes: _file_datavisualizer.MAX_BYTES
      }
    }
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      const result = await analyzeFiles(context, request.body, request.query);
      return response.ok({
        body: result
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup FileDataVisualizer
   *
   * @api {post} /api/ml/file_data_visualizer/import Import file data
   * @apiName ImportFile
   * @apiDescription Imports file data into elasticsearch index.
   */

  router.post({
    path: '/api/ml/file_data_visualizer/import',
    validate: {
      query: _configSchema.schema.object({
        id: _configSchema.schema.maybe(_configSchema.schema.string())
      }),
      body: _configSchema.schema.object({
        index: _configSchema.schema.maybe(_configSchema.schema.string()),
        data: _configSchema.schema.arrayOf(_configSchema.schema.any()),
        settings: _configSchema.schema.maybe(_configSchema.schema.any()),
        mappings: _configSchema.schema.any(),
        ingestPipeline: _configSchema.schema.object({
          id: _configSchema.schema.maybe(_configSchema.schema.string()),
          pipeline: _configSchema.schema.maybe(_configSchema.schema.any())
        })
      })
    },
    options: {
      body: {
        accepts: ['application/json'],
        maxBytes: _file_datavisualizer.MAX_BYTES
      }
    }
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        id
      } = request.query;
      const {
        index,
        data,
        settings,
        mappings,
        ingestPipeline
      } = request.body; // `id` being `undefined` tells us that this is a new import due to create a new index.
      // follow-up import calls to just add additional data will include the `id` of the created
      // index, we'll ignore those and don't increment the counter.

      if (id === undefined) {
        await (0, _telemetry.updateTelemetry)();
      }

      const result = await importData(context, id, index, settings, mappings, ingestPipeline, data);
      return response.ok({
        body: result
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}