"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupSavedObjects = setupSavedObjects;

var _server = require("../../../../../src/core/server");

var _secure_saved_objects_client_wrapper = require("./secure_saved_objects_client_wrapper");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function setupSavedObjects({
  auditLogger,
  authz,
  savedObjects
}) {
  const getKibanaRequest = request => request instanceof _server.KibanaRequest ? request : _server.KibanaRequest.from(request);

  savedObjects.setClientFactoryProvider(repositoryFactory => ({
    request
  }) => {
    const kibanaRequest = getKibanaRequest(request);
    return new _server.SavedObjectsClient(authz.mode.useRbacForRequest(kibanaRequest) ? repositoryFactory.createInternalRepository() : repositoryFactory.createScopedRepository(kibanaRequest));
  });
  savedObjects.addClientWrapper(Number.MAX_SAFE_INTEGER - 1, 'security', ({
    client,
    request
  }) => {
    const kibanaRequest = getKibanaRequest(request);
    return authz.mode.useRbacForRequest(kibanaRequest) ? new _secure_saved_objects_client_wrapper.SecureSavedObjectsClientWrapper({
      actions: authz.actions,
      auditLogger,
      baseClient: client,
      checkSavedObjectsPrivilegesAsCurrentUser: authz.checkSavedObjectsPrivilegesWithRequest(kibanaRequest),
      errors: _server.SavedObjectsClient.errors
    }) : client;
  });
}