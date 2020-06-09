"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkPrivilegesDynamicallyWithRequestFactory = checkPrivilegesDynamicallyWithRequestFactory;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function checkPrivilegesDynamicallyWithRequestFactory(checkPrivilegesWithRequest, getSpacesService) {
  return function checkPrivilegesDynamicallyWithRequest(request) {
    const checkPrivileges = checkPrivilegesWithRequest(request);
    return async function checkPrivilegesDynamically(privilegeOrPrivileges) {
      const spacesService = getSpacesService();
      return spacesService ? await checkPrivileges.atSpace(spacesService.getSpaceId(request), privilegeOrPrivileges) : await checkPrivileges.globally(privilegeOrPrivileges);
    };
  };
}