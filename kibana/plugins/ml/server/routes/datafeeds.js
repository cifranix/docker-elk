"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataFeedRoutes = dataFeedRoutes;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _datafeeds_schema = require("./schemas/datafeeds_schema");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Routes for datafeed service
 */
function dataFeedRoutes({
  router,
  mlLicense
}) {
  /**
   * @apiGroup DatafeedService
   *
   * @api {get} /api/ml/datafeeds Get all datafeeds
   * @apiName GetDatafeeds
   * @apiDescription Retrieves configuration information for datafeeds
   */
  router.get({
    path: '/api/ml/datafeeds',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.datafeeds');
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {get} /api/ml/datafeeds/:datafeedId Get datafeed for given datafeed id
   * @apiName GetDatafeed
   * @apiDescription Retrieves configuration information for datafeed
   */

  router.get({
    path: '/api/ml/datafeeds/{datafeedId}',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const datafeedId = request.params.datafeedId;
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.datafeeds', {
        datafeedId
      });
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {get} /api/ml/datafeeds/_stats Get stats for all datafeeds
   * @apiName GetDatafeedsStats
   * @apiDescription Retrieves usage information for datafeeds
   */

  router.get({
    path: '/api/ml/datafeeds/_stats',
    validate: false
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.datafeedStats');
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {get} /api/ml/datafeeds/:datafeedId/_stats Get datafeed stats for given datafeed id
   * @apiName GetDatafeedStats
   * @apiDescription Retrieves usage information for datafeed
   */

  router.get({
    path: '/api/ml/datafeeds/{datafeedId}/_stats',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const datafeedId = request.params.datafeedId;
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.datafeedStats', {
        datafeedId
      });
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {put} /api/ml/datafeeds/:datafeedId Creates datafeed
   * @apiName CreateDatafeed
   * @apiDescription Instantiates a datafeed
   */

  router.put({
    path: '/api/ml/datafeeds/{datafeedId}',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      }),
      body: _datafeeds_schema.datafeedConfigSchema
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const datafeedId = request.params.datafeedId;
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.addDatafeed', {
        datafeedId,
        body: request.body
      });
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {post} /api/ml/datafeeds/:datafeedId/_update Updates datafeed for given datafeed id
   * @apiName UpdateDatafeed
   * @apiDescription Updates certain properties of a datafeed
   */

  router.post({
    path: '/api/ml/datafeeds/{datafeedId}/_update',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      }),
      body: _datafeeds_schema.datafeedConfigSchema
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const datafeedId = request.params.datafeedId;
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.updateDatafeed', {
        datafeedId,
        body: request.body
      });
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {delete} /api/ml/datafeeds/:datafeedId Deletes datafeed
   * @apiName DeleteDatafeed
   * @apiDescription Deletes an existing datafeed
   */

  router.delete({
    path: '/api/ml/datafeeds/{datafeedId}',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      }),
      query: _configSchema.schema.maybe(_configSchema.schema.object({
        force: _configSchema.schema.maybe(_configSchema.schema.any())
      }))
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const options = {
        datafeedId: request.params.jobId
      };
      const force = request.query.force;

      if (force !== undefined) {
        options.force = force;
      }

      const resp = await context.ml.mlClient.callAsCurrentUser('ml.deleteDatafeed', options);
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {post} /api/ml/datafeeds/:datafeedId/_start Starts datafeed for given datafeed id(s)
   * @apiName StartDatafeed
   * @apiDescription Starts one or more datafeeds
   */

  router.post({
    path: '/api/ml/datafeeds/{datafeedId}/_start',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      }),
      body: _datafeeds_schema.startDatafeedSchema
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const datafeedId = request.params.datafeedId;
      const {
        start,
        end
      } = request.body;
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.startDatafeed', {
        datafeedId,
        start,
        end
      });
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {post} /api/ml/datafeeds/:datafeedId/_stop Stops datafeed for given datafeed id(s)
   * @apiName StopDatafeed
   * @apiDescription Stops one or more datafeeds
   */

  router.post({
    path: '/api/ml/datafeeds/{datafeedId}/_stop',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const datafeedId = request.params.datafeedId;
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.stopDatafeed', {
        datafeedId
      });
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DatafeedService
   *
   * @api {get} /api/ml/datafeeds/:datafeedId/_preview Preview datafeed for given datafeed id
   * @apiName PreviewDatafeed
   * @apiDescription Previews a datafeed
   */

  router.get({
    path: '/api/ml/datafeeds/{datafeedId}/_preview',
    validate: {
      params: _configSchema.schema.object({
        datafeedId: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const datafeedId = request.params.datafeedId;
      const resp = await context.ml.mlClient.callAsCurrentUser('ml.datafeedPreview', {
        datafeedId
      });
      return response.ok({
        body: resp
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}