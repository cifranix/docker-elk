"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initGetLogEntryCategoryDatasetsRoute = void 0;

var _configSchema = require("@kbn/config-schema");

var _boom = _interopRequireDefault(require("boom"));

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var _log_analysis = require("../../../../common/http_api/log_analysis");

var _runtime_types = require("../../../../common/runtime_types");

var _log_analysis2 = require("../../../lib/log_analysis");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const anyObject = _configSchema.schema.object({}, {
  unknowns: 'allow'
});

const initGetLogEntryCategoryDatasetsRoute = ({
  framework,
  logEntryCategoriesAnalysis
}) => {
  framework.registerRoute({
    method: 'post',
    path: _log_analysis.LOG_ANALYSIS_GET_LOG_ENTRY_CATEGORY_DATASETS_PATH,
    validate: {
      // short-circuit forced @kbn/config-schema validation so we can do io-ts validation
      body: anyObject
    }
  }, async (requestContext, request, response) => {
    const {
      data: {
        sourceId,
        timeRange: {
          startTime,
          endTime
        }
      }
    } = (0, _pipeable.pipe)(_log_analysis.getLogEntryCategoryDatasetsRequestPayloadRT.decode(request.body), (0, _Either.fold)((0, _runtime_types.throwErrors)(_boom.default.badRequest), _function.identity));

    try {
      const {
        data: logEntryCategoryDatasets,
        timing
      } = await logEntryCategoriesAnalysis.getLogEntryCategoryDatasets(requestContext, request, sourceId, startTime, endTime);
      return response.ok({
        body: _log_analysis.getLogEntryCategoryDatasetsSuccessReponsePayloadRT.encode({
          data: {
            datasets: logEntryCategoryDatasets
          },
          timing
        })
      });
    } catch (e) {
      const {
        statusCode = 500,
        message = 'Unknown error occurred'
      } = e;

      if (e instanceof _log_analysis2.NoLogAnalysisResultsIndexError) {
        return response.notFound({
          body: {
            message
          }
        });
      }

      return response.customError({
        statusCode,
        body: {
          message
        }
      });
    }
  });
};

exports.initGetLogEntryCategoryDatasetsRoute = initGetLogEntryCategoryDatasetsRoute;