"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlContext = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// This context provides dependencies which can be injected
// via angularjs only (like services, currentIndexPattern etc.).
// Because we cannot just import these dependencies, the default value
// for the context is just {} and of type `Partial<KibanaContextValue>`
// for the angularjs based dependencies. Therefore, the
// actual dependencies are set like we did previously with KibanaContext
// in the wrapping angularjs directive. In the custom hook we check if
// the dependencies are present with error reporting if they weren't
// added properly. That's why in tests, these custom hooks must not
// be mocked, instead <UiChrome.Provider value="mocked-value">` needs
// to be used. This guarantees that we have both properly set up
// TypeScript support and runtime checks for these dependencies.
// Multiple custom hooks can be created to access subsets of
// the overall context value if necessary too,
// see useCurrentIndexPattern() for example.
var MlContext = _react.default.createContext({});

exports.MlContext = MlContext;