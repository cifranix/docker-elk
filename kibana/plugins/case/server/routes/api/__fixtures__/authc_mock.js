"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationMock = void 0;

var _mocks = require("../../../../../security/server/mocks");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createAuthenticationMock({
  currentUser
} = {}) {
  const {
    authc
  } = _mocks.securityMock.createSetup();

  authc.getCurrentUser.mockReturnValue(currentUser !== undefined ? currentUser : {
    email: 'd00d@awesome.com',
    username: 'awesome',
    full_name: 'Awesome D00d'
  });
  return authc;
}

const authenticationMock = {
  create: () => createAuthenticationMock(),
  createInvalid: () => createAuthenticationMock({
    currentUser: null
  })
};
exports.authenticationMock = authenticationMock;