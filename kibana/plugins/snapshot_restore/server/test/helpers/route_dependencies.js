"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routeDependencies = void 0;

var _services = require("../../services");

var _lib = require("../../lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const license = new _services.License();
license.getStatus = jest.fn().mockReturnValue({
  isValid: true
});
const routeDependencies = {
  license,
  config: {
    isSecurityEnabled: jest.fn().mockReturnValue(true),
    isCloudEnabled: false,
    isSlmEnabled: true
  },
  lib: {
    isEsError: _lib.isEsError,
    wrapEsError: _lib.wrapEsError
  }
};
exports.routeDependencies = routeDependencies;