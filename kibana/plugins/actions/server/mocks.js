"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "actionsClientMock", {
  enumerable: true,
  get: function () {
    return _actions_client.actionsClientMock;
  }
});
exports.actionsMock = void 0;

var _actions_client = require("./actions_client.mock");

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
    execute: jest.fn(),
    isActionTypeEnabled: jest.fn(),
    getActionsClientWithRequest: jest.fn().mockResolvedValue(_actions_client.actionsClientMock.create())
  };
  return mock;
};

const actionsMock = {
  createSetup: createSetupMock,
  createStart: createStartMock
};
exports.actionsMock = actionsMock;