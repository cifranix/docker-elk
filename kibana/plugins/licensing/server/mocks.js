"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.licensingMock = void 0;

var _rxjs = require("rxjs");

var _licensing = require("../common/licensing.mock");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createSetupMock = () => {
  const license = _licensing.licenseMock.createLicense();

  const mock = {
    license$: new _rxjs.BehaviorSubject(license),
    refresh: jest.fn(),
    createLicensePoller: jest.fn()
  };
  mock.refresh.mockResolvedValue(license);
  mock.createLicensePoller.mockReturnValue({
    license$: mock.license$,
    refresh: mock.refresh
  });
  return mock;
};

const licensingMock = {
  createSetup: createSetupMock,
  ..._licensing.licenseMock
};
exports.licensingMock = licensingMock;