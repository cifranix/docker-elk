"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bfetchPluginMock = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var createSetupContract = function createSetupContract() {
  var setupContract = {
    registerDrilldown: jest.fn()
  };
  return setupContract;
};

var createStartContract = function createStartContract() {
  var startContract = {};
  return startContract;
};

var bfetchPluginMock = {
  createSetupContract: createSetupContract,
  createStartContract: createStartContract
};
exports.bfetchPluginMock = bfetchPluginMock;