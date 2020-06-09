"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastNotifications = exports.useConfig = exports.useCore = exports.useServices = exports.useAppContext = exports.AppContextConsumer = exports.AppContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AppContext = (0, _react.createContext)(undefined);

var AppContextProvider = function AppContextProvider(_ref) {
  var children = _ref.children,
      value = _ref.value;
  return _react.default.createElement(AppContext.Provider, {
    value: value
  }, children);
};

exports.AppContextProvider = AppContextProvider;
var AppContextConsumer = AppContext.Consumer;
exports.AppContextConsumer = AppContextConsumer;

var useAppContext = function useAppContext() {
  var ctx = (0, _react.useContext)(AppContext);

  if (!ctx) {
    throw new Error('"useAppContext" can only be called inside of AppContext.Provider!');
  }

  return ctx;
};

exports.useAppContext = useAppContext;

var useServices = function useServices() {
  return useAppContext().services;
};

exports.useServices = useServices;

var useCore = function useCore() {
  return useAppContext().core;
};

exports.useCore = useCore;

var useConfig = function useConfig() {
  return useAppContext().config;
};

exports.useConfig = useConfig;

var useToastNotifications = function useToastNotifications() {
  var _useCore = useCore(),
      toastNotifications = _useCore.notifications.toasts;

  return toastNotifications;
};

exports.useToastNotifications = useToastNotifications;