"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastNotifications = exports.useAppDependencies = void 0;

var _public = require("../../../../../src/plugins/kibana_react/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useAppDependencies = function useAppDependencies() {
  return (0, _public.useKibana)().services;
};

exports.useAppDependencies = useAppDependencies;

var useToastNotifications = function useToastNotifications() {
  var _useAppDependencies = useAppDependencies(),
      toastNotifications = _useAppDependencies.notifications.toasts;

  return toastNotifications;
};

exports.useToastNotifications = useToastNotifications;