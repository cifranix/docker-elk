"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTransformsRoutes = registerTransformsRoutes;

var _configSchema = require("@kbn/config-schema");

var _error_wrappers = require("../../../../../legacy/server/lib/create_router/error_wrappers");

var _common = require("../../../common");

var _index = require("../index");

var _error_utils = require("./error_utils");

var _schema = require("./schema");

var _transforms_audit_messages = require("./transforms_audit_messages");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TRANSFORM_ACTIONS;

(function (TRANSFORM_ACTIONS) {
  TRANSFORM_ACTIONS["STOP"] = "stop";
  TRANSFORM_ACTIONS["START"] = "start";
  TRANSFORM_ACTIONS["DELETE"] = "delete";
})(TRANSFORM_ACTIONS || (TRANSFORM_ACTIONS = {}));

function registerTransformsRoutes(routeDependencies) {
  const {
    router,
    license
  } = routeDependencies;
  router.get({
    path: (0, _index.addBasePath)('transforms'),
    validate: false
  }, license.guardApiRoute(async (ctx, req, res) => {
    const options = {};

    try {
      const transforms = await getTransforms(options, ctx.transform.dataClient.callAsCurrentUser);
      return res.ok({
        body: transforms
      });
    } catch (e) {
      return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
    }
  }));
  router.get({
    path: (0, _index.addBasePath)('transforms/{transformId}'),
    validate: _schema.schemaTransformId
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      transformId
    } = req.params;
    const options = { ...(transformId !== undefined ? {
        transformId
      } : {})
    };

    try {
      const transforms = await getTransforms(options, ctx.transform.dataClient.callAsCurrentUser);
      return res.ok({
        body: transforms
      });
    } catch (e) {
      return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
    }
  }));
  router.get({
    path: (0, _index.addBasePath)('transforms/_stats'),
    validate: false
  }, license.guardApiRoute(async (ctx, req, res) => {
    const options = {};

    try {
      const stats = await ctx.transform.dataClient.callAsCurrentUser('transform.getTransformsStats', options);
      return res.ok({
        body: stats
      });
    } catch (e) {
      return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
    }
  }));
  router.get({
    path: (0, _index.addBasePath)('transforms/{transformId}/_stats'),
    validate: _schema.schemaTransformId
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      transformId
    } = req.params;
    const options = { ...(transformId !== undefined ? {
        transformId
      } : {})
    };

    try {
      const stats = await ctx.transform.dataClient.callAsCurrentUser('transform.getTransformsStats', options);
      return res.ok({
        body: stats
      });
    } catch (e) {
      return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
    }
  }));
  (0, _transforms_audit_messages.registerTransformsAuditMessagesRoutes)(routeDependencies);
  router.put({
    path: (0, _index.addBasePath)('transforms/{transformId}'),
    validate: { ..._schema.schemaTransformId,
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    const {
      transformId
    } = req.params;
    const response = {
      transformsCreated: [],
      errors: []
    };
    await ctx.transform.dataClient.callAsCurrentUser('transform.createTransform', {
      body: req.body,
      transformId
    }).then(() => response.transformsCreated.push({
      transform: transformId
    })).catch(e => response.errors.push({
      id: transformId,
      error: (0, _error_wrappers.wrapEsError)(e)
    }));
    return res.ok({
      body: response
    });
  }));
  router.post({
    path: (0, _index.addBasePath)('delete_transforms'),
    validate: {
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    const transformsInfo = req.body;

    try {
      return res.ok({
        body: await deleteTransforms(transformsInfo, ctx.transform.dataClient.callAsCurrentUser)
      });
    } catch (e) {
      return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
    }
  }));
  router.post({
    path: (0, _index.addBasePath)('transforms/_preview'),
    validate: {
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, license.guardApiRoute(previewTransformHandler));
  router.post({
    path: (0, _index.addBasePath)('start_transforms'),
    validate: {
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, license.guardApiRoute(startTransformsHandler));
  router.post({
    path: (0, _index.addBasePath)('stop_transforms'),
    validate: {
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, license.guardApiRoute(stopTransformsHandler));
  router.post({
    path: (0, _index.addBasePath)('es_search'),
    validate: {
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, license.guardApiRoute(async (ctx, req, res) => {
    try {
      return res.ok({
        body: await ctx.transform.dataClient.callAsCurrentUser('search', req.body)
      });
    } catch (e) {
      return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
    }
  }));
}

const getTransforms = async (options, callAsCurrentUser) => {
  return await callAsCurrentUser('transform.getTransforms', options);
};

async function deleteTransforms(transformsInfo, callAsCurrentUser) {
  const results = {};

  for (const transformInfo of transformsInfo) {
    const transformId = transformInfo.id;

    try {
      if (transformInfo.state === _common.TRANSFORM_STATE.FAILED) {
        try {
          await callAsCurrentUser('transform.stopTransform', {
            transformId,
            force: true,
            waitForCompletion: true
          });
        } catch (e) {
          if ((0, _error_utils.isRequestTimeout)(e)) {
            return (0, _error_utils.fillResultsWithTimeouts)({
              results,
              id: transformId,
              items: transformsInfo,
              action: TRANSFORM_ACTIONS.DELETE
            });
          }
        }
      }

      await callAsCurrentUser('transform.deleteTransform', {
        transformId
      });
      results[transformId] = {
        success: true
      };
    } catch (e) {
      if ((0, _error_utils.isRequestTimeout)(e)) {
        return (0, _error_utils.fillResultsWithTimeouts)({
          results,
          id: transformInfo.id,
          items: transformsInfo,
          action: TRANSFORM_ACTIONS.DELETE
        });
      }

      results[transformId] = {
        success: false,
        error: JSON.stringify(e)
      };
    }
  }

  return results;
}

const previewTransformHandler = async (ctx, req, res) => {
  try {
    return res.ok({
      body: await ctx.transform.dataClient.callAsCurrentUser('transform.getTransformsPreview', {
        body: req.body
      })
    });
  } catch (e) {
    return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
  }
};

const startTransformsHandler = async (ctx, req, res) => {
  const transformsInfo = req.body;

  try {
    return res.ok({
      body: await startTransforms(transformsInfo, ctx.transform.dataClient.callAsCurrentUser)
    });
  } catch (e) {
    return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
  }
};

async function startTransforms(transformsInfo, callAsCurrentUser) {
  const results = {};

  for (const transformInfo of transformsInfo) {
    const transformId = transformInfo.id;

    try {
      await callAsCurrentUser('transform.startTransform', {
        transformId
      });
      results[transformId] = {
        success: true
      };
    } catch (e) {
      if ((0, _error_utils.isRequestTimeout)(e)) {
        return (0, _error_utils.fillResultsWithTimeouts)({
          results,
          id: transformId,
          items: transformsInfo,
          action: TRANSFORM_ACTIONS.START
        });
      }

      results[transformId] = {
        success: false,
        error: JSON.stringify(e)
      };
    }
  }

  return results;
}

const stopTransformsHandler = async (ctx, req, res) => {
  const transformsInfo = req.body;

  try {
    return res.ok({
      body: await stopTransforms(transformsInfo, ctx.transform.dataClient.callAsCurrentUser)
    });
  } catch (e) {
    return res.customError((0, _error_utils.wrapError)((0, _error_wrappers.wrapEsError)(e)));
  }
};

async function stopTransforms(transformsInfo, callAsCurrentUser) {
  const results = {};

  for (const transformInfo of transformsInfo) {
    const transformId = transformInfo.id;

    try {
      await callAsCurrentUser('transform.stopTransform', {
        transformId,
        force: transformInfo.state !== undefined ? transformInfo.state === _common.TRANSFORM_STATE.FAILED : false,
        waitForCompletion: true
      });
      results[transformId] = {
        success: true
      };
    } catch (e) {
      if ((0, _error_utils.isRequestTimeout)(e)) {
        return (0, _error_utils.fillResultsWithTimeouts)({
          results,
          id: transformId,
          items: transformsInfo,
          action: TRANSFORM_ACTIONS.STOP
        });
      }

      results[transformId] = {
        success: false,
        error: JSON.stringify(e)
      };
    }
  }

  return results;
}