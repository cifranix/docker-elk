"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupAuthorization = setupAuthorization;
Object.defineProperty(exports, "Actions", {
  enumerable: true,
  get: function () {
    return _actions.Actions;
  }
});
Object.defineProperty(exports, "CheckSavedObjectsPrivileges", {
  enumerable: true,
  get: function () {
    return _check_saved_objects_privileges.CheckSavedObjectsPrivileges;
  }
});
Object.defineProperty(exports, "featurePrivilegeIterator", {
  enumerable: true,
  get: function () {
    return _privileges.featurePrivilegeIterator;
  }
});

var _actions = require("./actions");

var _check_privileges = require("./check_privileges");

var _check_privileges_dynamically = require("./check_privileges_dynamically");

var _check_saved_objects_privileges = require("./check_saved_objects_privileges");

var _mode = require("./mode");

var _privileges = require("./privileges");

var _app_authorization = require("./app_authorization");

var _api_authorization = require("./api_authorization");

var _disable_ui_capabilities = require("./disable_ui_capabilities");

var _validate_feature_privileges = require("./validate_feature_privileges");

var _register_privileges_with_cluster = require("./register_privileges_with_cluster");

var _constants = require("../../common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function setupAuthorization({
  http,
  packageVersion,
  clusterClient,
  license,
  loggers,
  featuresService,
  kibanaIndexName,
  getSpacesService
}) {
  const actions = new _actions.Actions(packageVersion);
  const mode = (0, _mode.authorizationModeFactory)(license);
  const applicationName = `${_constants.APPLICATION_PREFIX}${kibanaIndexName}`;
  const checkPrivilegesWithRequest = (0, _check_privileges.checkPrivilegesWithRequestFactory)(actions, clusterClient, applicationName);
  const privileges = (0, _privileges.privilegesFactory)(actions, featuresService, license);
  const logger = loggers.get('authorization');
  const authz = {
    actions,
    applicationName,
    checkPrivilegesWithRequest,
    checkPrivilegesDynamicallyWithRequest: (0, _check_privileges_dynamically.checkPrivilegesDynamicallyWithRequestFactory)(checkPrivilegesWithRequest, getSpacesService),
    checkSavedObjectsPrivilegesWithRequest: (0, _check_saved_objects_privileges.checkSavedObjectsPrivilegesWithRequestFactory)(checkPrivilegesWithRequest, getSpacesService),
    mode,
    privileges,

    async disableUnauthorizedCapabilities(request, capabilities) {
      // If we have a license which doesn't enable security, or we're a legacy user we shouldn't
      // disable any ui capabilities
      if (!mode.useRbacForRequest(request)) {
        return capabilities;
      }

      const disableUICapabilities = (0, _disable_ui_capabilities.disableUICapabilitiesFactory)(request, featuresService.getFeatures(), logger, authz);

      if (!request.auth.isAuthenticated) {
        return disableUICapabilities.all(capabilities);
      }

      return await disableUICapabilities.usingPrivileges(capabilities);
    },

    registerPrivilegesWithCluster: async () => {
      (0, _validate_feature_privileges.validateFeaturePrivileges)(featuresService.getFeatures());
      await (0, _register_privileges_with_cluster.registerPrivilegesWithCluster)(logger, privileges, applicationName, clusterClient);
    }
  };
  (0, _api_authorization.initAPIAuthorization)(http, authz, loggers.get('api-authorization'));
  (0, _app_authorization.initAppAuthorization)(http, authz, loggers.get('app-authorization'), featuresService);
  return authz;
}