"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.securityMock = void 0;

var _index = require("./authentication/index.mock");

var _session_timeout = require("./session/session_timeout.mock");

var _index2 = require("../common/licensing/index.mock");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createSetupMock() {
  return {
    authc: _index.authenticationMock.createSetup(),
    sessionTimeout: (0, _session_timeout.createSessionTimeoutMock)(),
    license: _index2.licenseMock.create()
  };
}

var securityMock = {
  createSetup: createSetupMock
};
exports.securityMock = securityMock;