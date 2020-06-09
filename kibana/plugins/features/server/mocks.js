"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.featuresPluginMock = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const createSetup = () => {
  return {
    getFeatures: jest.fn(),
    getFeaturesUICapabilities: jest.fn(),
    registerFeature: jest.fn(),
    registerLegacyAPI: jest.fn()
  };
};

const createStart = () => {
  return {
    getFeatures: jest.fn()
  };
};

const featuresPluginMock = {
  createSetup,
  createStart
};
exports.featuresPluginMock = featuresPluginMock;