"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemRoutes = systemRoutes;

var _configSchema = require("@kbn/config-schema");

var _error_wrapper = require("../client/error_wrapper");

var _log = require("../client/log");

var _check_privileges = require("../lib/check_privileges");

var _spaces_utils = require("../lib/spaces_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * System routes
 */
function systemRoutes({
  router,
  mlLicense
}, {
  spaces,
  cloud
}) {
  async function getNodeCount(context) {
    const filterPath = 'nodes.*.attributes';
    const resp = await context.ml.mlClient.callAsInternalUser('nodes.info', {
      filterPath
    });
    let count = 0;

    if (typeof resp.nodes === 'object') {
      Object.keys(resp.nodes).forEach(k => {
        if (resp.nodes[k].attributes !== undefined) {
          const maxOpenJobs = resp.nodes[k].attributes['ml.max_open_jobs'];

          if (maxOpenJobs !== null && maxOpenJobs > 0) {
            count++;
          }
        }
      });
    }

    return {
      count
    };
  }
  /**
   * @apiGroup SystemRoutes
   *
   * @api {post} /api/ml/_has_privileges Check privileges
   * @apiName HasPrivileges
   * @apiDescription Checks if the user has required privileges
   */


  router.post({
    path: '/api/ml/_has_privileges',
    validate: {
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      let upgradeInProgress = false;

      try {
        const info = await context.ml.mlClient.callAsCurrentUser('ml.info'); // if ml indices are currently being migrated, upgrade_mode will be set to true
        // pass this back with the privileges to allow for the disabling of UI controls.

        upgradeInProgress = info.upgrade_mode === true;
      } catch (error) {
        // if the ml.info check fails, it could be due to the user having insufficient privileges
        // most likely they do not have the ml_user role and therefore will be blocked from using
        // ML at all. However, we need to catch this error so the privilege check doesn't fail.
        if (error.status === 403) {
          _log.mlLog.info('Unable to determine whether upgrade is being performed due to insufficient user privileges');
        } else {
          _log.mlLog.warn('Unable to determine whether upgrade is being performed');
        }
      }

      if (mlLicense.isSecurityEnabled() === false) {
        // if xpack.security.enabled has been explicitly set to false
        // return that security is disabled and don't call the privilegeCheck endpoint
        return response.ok({
          body: {
            securityDisabled: true,
            upgradeInProgress
          }
        });
      } else {
        const body = request.body;
        const resp = await context.ml.mlClient.callAsCurrentUser('ml.privilegeCheck', {
          body
        });
        resp.upgradeInProgress = upgradeInProgress;
        return response.ok({
          body: resp
        });
      }
    } catch (error) {
      return response.customError((0, _error_wrapper.wrapError)(error));
    }
  }));
  /**
   * @apiGroup SystemRoutes
   *
   * @api {get} /api/ml/ml_capabilities Check ML capabilities
   * @apiName MlCapabilities
   * @apiDescription Checks ML capabilities
   */

  router.get({
    path: '/api/ml/ml_capabilities',
    validate: {
      query: _configSchema.schema.object({
        ignoreSpaces: _configSchema.schema.maybe(_configSchema.schema.string())
      })
    }
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      const ignoreSpaces = request.query && request.query.ignoreSpaces === 'true'; // if spaces is disabled force isMlEnabledInSpace to be true

      const {
        isMlEnabledInSpace
      } = spaces !== undefined ? (0, _spaces_utils.spacesUtilsProvider)(spaces, request) : {
        isMlEnabledInSpace: async () => true
      };
      const {
        getPrivileges
      } = (0, _check_privileges.privilegesProvider)(context.ml.mlClient.callAsCurrentUser, mlLicense, isMlEnabledInSpace, ignoreSpaces);
      return response.ok({
        body: await getPrivileges()
      });
    } catch (error) {
      return response.customError((0, _error_wrapper.wrapError)(error));
    }
  }));
  /**
   * @apiGroup SystemRoutes
   *
   * @api {get} /api/ml/ml_node_count Get the amount of ML nodes
   * @apiName MlNodeCount
   * @apiDescription Returns the amount of ML nodes.
   */

  router.get({
    path: '/api/ml/ml_node_count',
    validate: false
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      // check for basic license first for consistency with other
      // security disabled checks
      if (mlLicense.isSecurityEnabled() === false) {
        return response.ok({
          body: await getNodeCount(context)
        });
      } else {
        // if security is enabled, check that the user has permission to
        // view jobs before calling getNodeCount.
        // getNodeCount calls the _nodes endpoint as the internal user
        // and so could give the user access to more information than
        // they are entitled to.
        const requiredPrivileges = ['cluster:monitor/xpack/ml/job/get', 'cluster:monitor/xpack/ml/job/stats/get', 'cluster:monitor/xpack/ml/datafeeds/get', 'cluster:monitor/xpack/ml/datafeeds/stats/get'];
        const body = {
          cluster: requiredPrivileges
        };
        const resp = await context.ml.mlClient.callAsCurrentUser('ml.privilegeCheck', {
          body
        });

        if (resp.has_all_requested) {
          return response.ok({
            body: await getNodeCount(context)
          });
        } else {
          // if the user doesn't have permission to create jobs
          // return a 403
          return response.forbidden();
        }
      }
    } catch (e) {
      return response.customError((0, _error_wrapper.wrapError)(e));
    }
  }));
  /**
   * @apiGroup SystemRoutes
   *
   * @api {get} /api/ml/info Get ML info
   * @apiName MlInfo
   * @apiDescription Returns defaults and limits used by machine learning.
   */

  router.get({
    path: '/api/ml/info',
    validate: false
  }, mlLicense.basicLicenseAPIGuard(async (context, request, response) => {
    try {
      const info = await context.ml.mlClient.callAsCurrentUser('ml.info');
      const cloudId = cloud && cloud.cloudId;
      return response.ok({
        body: { ...info,
          cloudId
        }
      });
    } catch (error) {
      return response.customError((0, _error_wrapper.wrapError)(error));
    }
  }));
  /**
   * @apiGroup SystemRoutes
   *
   * @apiDeprecated
   *
   * @api {post} /api/ml/es_search ES Search wrapper
   * @apiName MlEsSearch
   */

  router.post({
    path: '/api/ml/es_search',
    validate: {
      body: _configSchema.schema.maybe(_configSchema.schema.any())
    }
  }, mlLicense.fullLicenseAPIGuard(async (context, request, response) => {
    try {
      return response.ok({
        body: await context.ml.mlClient.callAsCurrentUser('search', request.body)
      });
    } catch (error) {
      return response.customError((0, _error_wrapper.wrapError)(error));
    }
  }));
}