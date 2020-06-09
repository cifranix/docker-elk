"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataFrameAnalyticsRoutes = dataFrameAnalyticsRoutes;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _analytics_audit_messages = require("../models/data_frame_analytics/analytics_audit_messages");

var _data_analytics_schema = require("./schemas/data_analytics_schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Routes for the data frame analytics
 */
function dataFrameAnalyticsRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {get} /api/ml/data_frame/analytics Get analytics data
   * @apiName GetDataFrameAnalytics
   * @apiDescription Returns the list of data frame analytics jobs.
   *
   * @apiSuccess {Number} count
   * @apiSuccess {Object[]} data_frame_analytics
   */
  router.get({
    path: '/api/ml/data_frame/analytics',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.maybe(_configSchema.schema.string())
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const results = await context.ml.mlClient.callAsCurrentUser('ml.getDataFrameAnalytics');
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {get} /api/ml/data_frame/analytics/:analyticsId Get analytics data by id
   * @apiName GetDataFrameAnalyticsById
   * @apiDescription Returns the data frame analytics job.
   *
   * @apiParam {String} analyticsId Analytics ID.
   */

  router.get({
    path: '/api/ml/data_frame/analytics/{analyticsId}',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        analyticsId
      } = request.params;
      const results = await context.ml.mlClient.callAsCurrentUser('ml.getDataFrameAnalytics', {
        analyticsId
      });
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {get} /api/ml/data_frame/analytics/_stats Get analytics stats
   * @apiName GetDataFrameAnalyticsStats
   * @apiDescription Returns data frame analytics jobs statistics.
   */

  router.get({
    path: '/api/ml/data_frame/analytics/_stats',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const results = await context.ml.mlClient.callAsCurrentUser('ml.getDataFrameAnalyticsStats');
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {get} /api/ml/data_frame/analytics/:analyticsId/_stats Get stats for requested analytics job
   * @apiName GetDataFrameAnalyticsStatsById
   * @apiDescription Returns data frame analytics job statistics.
   *
   * @apiParam {String} analyticsId Analytics ID.
   */

  router.get({
    path: '/api/ml/data_frame/analytics/{analyticsId}/_stats',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        analyticsId
      } = request.params;
      const results = await context.ml.mlClient.callAsCurrentUser('ml.getDataFrameAnalyticsStats', {
        analyticsId
      });
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {put} /api/ml/data_frame/analytics/:analyticsId Instantiate a data frame analytics job
   * @apiName UpdateDataFrameAnalytics
   * @apiDescription This API creates a data frame analytics job that performs an analysis
   *                 on the source index and stores the outcome in a destination index.
   *
   * @apiParam {String} analyticsId Analytics ID.
   */

  router.put({
    path: '/api/ml/data_frame/analytics/{analyticsId}',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.string()
      }),
      body: _configSchema.schema.object(_data_analytics_schema.dataAnalyticsJobConfigSchema)
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        analyticsId
      } = request.params;
      const results = await context.ml.mlClient.callAsCurrentUser('ml.createDataFrameAnalytics', {
        body: request.body,
        analyticsId
      });
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {post} /api/ml/data_frame/_evaluate Evaluate the data frame analytics for an annotated index
   * @apiName EvaluateDataFrameAnalytics
   * @apiDescription Evaluates the data frame analytics for an annotated index.
   */

  router.post({
    path: '/api/ml/data_frame/_evaluate',
    validate: {
      body: _configSchema.schema.object({ ..._data_analytics_schema.dataAnalyticsEvaluateSchema
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const results = await context.ml.mlClient.callAsCurrentUser('ml.evaluateDataFrameAnalytics', {
        body: request.body
      });
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {post} /api/ml/data_frame/_explain Explain a data frame analytics config
   * @apiName ExplainDataFrameAnalytics
   * @apiDescription This API provides explanations for a data frame analytics config
   *                 that either exists already or one that has not been created yet.
   *
   * @apiParam {String} [description]
   * @apiParam {Object} [dest]
   * @apiParam {Object} source
   * @apiParam {String} source.index
   * @apiParam {Object} analysis
   * @apiParam {Object} [analyzed_fields]
   * @apiParam {String} [model_memory_limit]
   */

  router.post({
    path: '/api/ml/data_frame/analytics/_explain',
    validate: {
      body: _configSchema.schema.object({ ..._data_analytics_schema.dataAnalyticsExplainSchema
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const results = await context.ml.mlClient.callAsCurrentUser('ml.explainDataFrameAnalytics', {
        body: request.body
      });
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {delete} /api/ml/data_frame/analytics/:analyticsId Delete specified analytics job
   * @apiName DeleteDataFrameAnalytics
   * @apiDescription Deletes specified data frame analytics job.
   *
   * @apiParam {String} analyticsId Analytics ID.
   */

  router.delete({
    path: '/api/ml/data_frame/analytics/{analyticsId}',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        analyticsId
      } = request.params;
      const results = await context.ml.mlClient.callAsCurrentUser('ml.deleteDataFrameAnalytics', {
        analyticsId
      });
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {post} /api/ml/data_frame/analytics/:analyticsId/_start Start specified analytics job
   * @apiName StartDataFrameAnalyticsJob
   * @apiDescription Starts a data frame analytics job.
   *
   * @apiParam {String} analyticsId Analytics ID.
   */

  router.post({
    path: '/api/ml/data_frame/analytics/{analyticsId}/_start',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        analyticsId
      } = request.params;
      const results = await context.ml.mlClient.callAsCurrentUser('ml.startDataFrameAnalytics', {
        analyticsId
      });
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {post} /api/ml/data_frame/analytics/:analyticsId/_stop Stop specified analytics job
   * @apiName StopsDataFrameAnalyticsJob
   * @apiDescription Stops a data frame analytics job.
   *
   * @apiParam {String} analyticsId Analytics ID.
   */

  router.post({
    path: '/api/ml/data_frame/analytics/{analyticsId}/_stop',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.string(),
        force: _configSchema.schema.maybe(_configSchema.schema.boolean())
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      var _request$url, _request$url$query;

      const options = {
        analyticsId: request.params.analyticsId
      }; // @ts-ignore TODO: update types

      if (((_request$url = request.url) === null || _request$url === void 0 ? void 0 : (_request$url$query = _request$url.query) === null || _request$url$query === void 0 ? void 0 : _request$url$query.force) !== undefined) {
        // @ts-ignore TODO: update types
        options.force = request.url.query.force;
      }

      const results = await context.ml.mlClient.callAsCurrentUser('ml.stopDataFrameAnalytics', options);
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataFrameAnalytics
   *
   * @api {get} /api/ml/data_frame/analytics/:analyticsId/messages Get analytics job messages
   * @apiName GetDataFrameAnalyticsMessages
   * @apiDescription Returns the list of audit messages for data frame analytics jobs.
   *
   * @apiParam {String} analyticsId Analytics ID.
   */

  router.get({
    path: '/api/ml/data_frame/analytics/{analyticsId}/messages',
    validate: {
      params: _configSchema.schema.object({
        analyticsId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        analyticsId
      } = request.params;
      const {
        getAnalyticsAuditMessages
      } = (0, _analytics_audit_messages.analyticsAuditMessagesProvider)(context.ml.mlClient.callAsCurrentUser);
      const results = await getAnalyticsAuditMessages(analyticsId);
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}