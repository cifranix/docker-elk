"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastNotifications = exports.useAppDependencies = void 0;

var _mocks = require("../../../../../../src/core/public/mocks");

var _mocks2 = require("../../../../../../src/plugins/data/public/mocks");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var coreSetup = _mocks.coreMock.createSetup();

var coreStart = _mocks.coreMock.createStart();

var dataStart = _mocks2.dataPluginMock.createStartContract();

var appDependencies = {
  chrome: coreStart.chrome,
  data: dataStart,
  docLinks: coreStart.docLinks,
  i18n: coreStart.i18n,
  notifications: coreSetup.notifications,
  uiSettings: coreStart.uiSettings,
  savedObjects: coreStart.savedObjects,
  storage: {
    get: jest.fn()
  },
  overlays: coreStart.overlays,
  http: coreSetup.http
};

var useAppDependencies = function useAppDependencies() {
  return appDependencies;
};

exports.useAppDependencies = useAppDependencies;

var useToastNotifications = function useToastNotifications() {
  return coreSetup.notifications;
};

exports.useToastNotifications = useToastNotifications;