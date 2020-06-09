"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initMetricExplorerRoute = void 0;

var _boom = _interopRequireDefault(require("boom"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _configSchema = require("@kbn/config-schema");

var _get_groupings = require("./lib/get_groupings");

var _populate_series_with_tsvb_data = require("./lib/populate_series_with_tsvb_data");

var _http_api = require("../../../common/http_api");

var _runtime_types = require("../../../common/runtime_types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const escapeHatch = _configSchema.schema.object({}, {
  unknowns: 'allow'
});

const initMetricExplorerRoute = libs => {
  const {
    framework
  } = libs;
  const {
    callWithRequest
  } = framework;
  framework.registerRoute({
    method: 'post',
    path: '/api/infra/metrics_explorer',
    validate: {
      body: escapeHatch
    }
  }, async (requestContext, request, response) => {
    try {
      const payload = (0, _pipeable.pipe)(_http_api.metricsExplorerRequestBodyRT.decode(request.body), (0, _Either.fold)((0, _runtime_types.throwErrors)(_boom.default.badRequest), _function.identity));

      const search = searchOptions => callWithRequest(requestContext, 'search', searchOptions); // First we get the groupings from a composite aggregation


      const groupings = await (0, _get_groupings.getGroupings)(search, payload); // Then we take the results and fill in the data from TSVB with the
      // user's custom metrics

      const seriesWithMetrics = await Promise.all(groupings.series.map((0, _populate_series_with_tsvb_data.populateSeriesWithTSVBData)(request, payload, framework, requestContext)));
      return response.ok({
        body: _http_api.metricsExplorerResponseRT.encode({ ...groupings,
          series: seriesWithMetrics
        })
      });
    } catch (error) {
      return response.internalError({
        body: error.message
      });
    }
  });
};

exports.initMetricExplorerRoute = initMetricExplorerRoute;