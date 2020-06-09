"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "extensionsServiceMock", {
  enumerable: true,
  get: function get() {
    return _extensions_service.extensionsServiceMock;
  }
});
exports.indexManagementMock = void 0;

var _extensions_service = require("./services/extensions_service.mock");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function createIdxManagementSetupMock() {
  var mock = {
    extensionsService: _extensions_service.extensionsServiceMock
  };
  return mock;
}

var indexManagementMock = {
  createSetup: createIdxManagementSetupMock
};
exports.indexManagementMock = indexManagementMock;