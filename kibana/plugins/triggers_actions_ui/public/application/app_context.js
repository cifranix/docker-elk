"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppDependencies = exports.AppContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AppContext = (0, _react.createContext)(null);

var AppContextProvider = function AppContextProvider(_ref) {
  var children = _ref.children,
      appDeps = _ref.appDeps;
  return appDeps ? _react.default.createElement(AppContext.Provider, {
    value: appDeps
  }, children) : null;
};

exports.AppContextProvider = AppContextProvider;

var useAppDependencies = function useAppDependencies() {
  var ctx = (0, _react.useContext)(AppContext);

  if (!ctx) {
    throw new Error('The app dependencies Context has not been set. Use the "setAppDependencies()" method when bootstrapping the app.');
  }

  return ctx;
};

exports.useAppDependencies = useAppDependencies;