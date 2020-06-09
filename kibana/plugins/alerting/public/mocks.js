"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alertingPluginMock = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createSetupContract = function createSetupContract() {
  return {
    registerNavigation: jest.fn(),
    registerDefaultNavigation: jest.fn()
  };
};

var createStartContract = function createStartContract() {
  return {
    getNavigation: jest.fn()
  };
};

var alertingPluginMock = {
  createSetupContract: createSetupContract,
  createStartContract: createStartContract
};
exports.alertingPluginMock = alertingPluginMock;