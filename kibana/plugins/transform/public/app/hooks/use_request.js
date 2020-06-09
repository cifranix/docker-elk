"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRequest = void 0;

var _shared_imports = require("../../shared_imports");

var _app_dependencies = require("../app_dependencies");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useRequest = function useRequest(config) {
  var _useAppDependencies = (0, _app_dependencies.useAppDependencies)(),
      http = _useAppDependencies.http;

  return (0, _shared_imports.useRequest)(http, config);
};

exports.useRequest = useRequest;