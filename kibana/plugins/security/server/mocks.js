"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.securityMock = void 0;

var _index = require("./authentication/index.mock");

var _index2 = require("./authorization/index.mock");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createSetupMock() {
  const mockAuthz = _index2.authorizationMock.create();

  return {
    authc: _index.authenticationMock.create(),
    authz: {
      actions: mockAuthz.actions,
      checkPrivilegesWithRequest: mockAuthz.checkPrivilegesWithRequest,
      mode: mockAuthz.mode
    },
    registerSpacesService: jest.fn(),
    __legacyCompat: {}
  };
}

const securityMock = {
  createSetup: createSetupMock
};
exports.securityMock = securityMock;