"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSavedObjectsPrivilegesWithRequestFactory = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const checkSavedObjectsPrivilegesWithRequestFactory = (checkPrivilegesWithRequest, getSpacesService) => {
  return function checkSavedObjectsPrivilegesWithRequest(request) {
    return async function checkSavedObjectsPrivileges(actions, namespace) {
      const spacesService = getSpacesService();
      return spacesService ? await checkPrivilegesWithRequest(request).atSpace(spacesService.namespaceToSpaceId(namespace), actions) : await checkPrivilegesWithRequest(request).globally(actions);
    };
  };
};

exports.checkSavedObjectsPrivilegesWithRequestFactory = checkSavedObjectsPrivilegesWithRequestFactory;