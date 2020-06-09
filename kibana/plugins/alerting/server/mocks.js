"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "alertsClientMock", {
  enumerable: true,
  get: function () {
    return _alerts_client.alertsClientMock;
  }
});
exports.alertsMock = void 0;

var _alerts_client = require("./alerts_client.mock");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createSetupMock = () => {
  const mock = {
    registerType: jest.fn()
  };
  return mock;
};

const createStartMock = () => {
  const mock = {
    listTypes: jest.fn(),
    getAlertsClientWithRequest: jest.fn().mockResolvedValue(_alerts_client.alertsClientMock.create())
  };
  return mock;
};

const alertsMock = {
  createSetup: createSetupMock,
  createStart: createStartMock
};
exports.alertsMock = alertsMock;