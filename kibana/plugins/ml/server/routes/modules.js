"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataRecognizer = dataRecognizer;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _data_recognizer = require("../models/data_recognizer");

var _modules = require("./schemas/modules");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function recognize(context, indexPatternTitle) {
  const dr = new _data_recognizer.DataRecognizer(context.ml.mlClient.callAsCurrentUser, context.core.savedObjects.client);
  return dr.findMatches(indexPatternTitle);
}

function getModule(context, moduleId) {
  const dr = new _data_recognizer.DataRecognizer(context.ml.mlClient.callAsCurrentUser, context.core.savedObjects.client);

  if (moduleId === undefined) {
    return dr.listModules();
  } else {
    return dr.getModule(moduleId);
  }
}

function saveModuleItems(context, moduleId, prefix, groups, indexPatternName, query, useDedicatedIndex, startDatafeed, start, end, jobOverrides, datafeedOverrides, estimateModelMemory) {
  const dr = new _data_recognizer.DataRecognizer(context.ml.mlClient.callAsCurrentUser, context.core.savedObjects.client);
  return dr.setupModuleItems(moduleId, prefix, groups, indexPatternName, query, useDedicatedIndex, startDatafeed, start, end, jobOverrides, datafeedOverrides, estimateModelMemory);
}

function dataRecognizerJobsExist(context, moduleId) {
  const dr = new _data_recognizer.DataRecognizer(context.ml.mlClient.callAsCurrentUser, context.core.savedObjects.client);
  return dr.dataRecognizerJobsExist(moduleId);
}
/**
 * Recognizer routes.
 */


function dataRecognizer({
  router,
  mlLicense
}) {
  /**
   * @apiGroup DataRecognizer
   *
   * @api {get} /api/ml/modules/recognize/:indexPatternTitle Recognize index pattern
   * @apiName RecognizeIndex
   * @apiDescription Returns the list of modules that matching the index pattern.
   *
   * @apiParam {String} indexPatternTitle Index pattern title.
   */
  router.get({
    path: '/api/ml/modules/recognize/{indexPatternTitle}',
    validate: {
      params: _configSchema.schema.object({
        indexPatternTitle: _configSchema.schema.string()
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        indexPatternTitle
      } = request.params;
      const results = await recognize(context, indexPatternTitle);
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataRecognizer
   *
   * @api {get} /api/ml/modules/get_module/:moduleId Get module
   * @apiName GetModule
   * @apiDescription Returns module by id.
   *
   * @apiParam {String} [moduleId] Module id
   */

  router.get({
    path: '/api/ml/modules/get_module/{moduleId?}',
    validate: {
      params: _configSchema.schema.object({ ...(0, _modules.getModuleIdParamSchema)(true)
      })
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      let {
        moduleId
      } = request.params;

      if (moduleId === '') {
        // if the endpoint is called with a trailing /
        // the moduleId will be an empty string.
        moduleId = undefined;
      }

      const results = await getModule(context, moduleId);
      return response.ok({
        body: results
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataRecognizer
   *
   * @api {post} /api/ml/modules/setup/:moduleId Setup module
   * @apiName SetupModule
   * @apiDescription Created module items.
   *
   * @apiParam {String} moduleId Module id
   */

  router.post({
    path: '/api/ml/modules/setup/{moduleId}',
    validate: {
      params: _configSchema.schema.object((0, _modules.getModuleIdParamSchema)()),
      body: _modules.setupModuleBodySchema
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        moduleId
      } = request.params;
      const {
        prefix,
        groups,
        indexPatternName,
        query,
        useDedicatedIndex,
        startDatafeed,
        start,
        end,
        jobOverrides,
        datafeedOverrides,
        estimateModelMemory
      } = request.body;
      const result = await saveModuleItems(context, moduleId, prefix, groups, indexPatternName, query, useDedicatedIndex, startDatafeed, start, end, jobOverrides, datafeedOverrides, estimateModelMemory);
      return response.ok({
        body: result
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup DataRecognizer
   *
   * @api {post} /api/ml/modules/jobs_exist/:moduleId Check if module jobs exist
   * @apiName CheckExistingModuleJobs
   * @apiDescription Checks if the jobs in the module have been created.
   *
   * @apiParam {String} moduleId Module id
   */

  router.get({
    path: '/api/ml/modules/jobs_exist/{moduleId}',
    validate: {
      params: _configSchema.schema.object((0, _modules.getModuleIdParamSchema)())
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      const {
        moduleId
      } = request.params;
      const result = await dataRecognizerJobsExist(context, moduleId);
      return response.ok({
        body: result
      });
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
}