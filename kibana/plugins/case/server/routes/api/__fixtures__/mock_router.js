"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRoute = void 0;

var _mocks = require("../../../../../../../src/core/server/mocks");

var _services = require("../../../services");

var _fixtures__ = require("../__fixtures__");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createRoute = async (api, method, badAuth = false) => {
  const httpService = _mocks.httpServiceMock.createSetupContract();

  const router = httpService.createRouter('');

  const log = _mocks.loggingServiceMock.create().get('case');

  const caseServicePlugin = new _services.CaseService(log);
  const caseConfigureServicePlugin = new _services.CaseConfigureService(log);
  const caseService = await caseServicePlugin.setup({
    authentication: badAuth ? _fixtures__.authenticationMock.createInvalid() : _fixtures__.authenticationMock.create()
  });
  const caseConfigureService = await caseConfigureServicePlugin.setup();
  api({
    caseConfigureService,
    caseService,
    router,
    userActionService: {
      postUserActions: jest.fn(),
      getUserActions: jest.fn()
    }
  });
  return router[method].mock.calls[0][1];
};

exports.createRoute = createRoute;