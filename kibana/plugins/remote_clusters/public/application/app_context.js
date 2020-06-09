"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppContextProvider = exports.AppContext = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AppContext = (0, _react.createContext)({});
exports.AppContext = AppContext;

var AppContextProvider = function AppContextProvider(_ref) {
  var children = _ref.children,
      context = _ref.context;
  return _react.default.createElement(AppContext.Provider, {
    value: context
  }, children);
};

exports.AppContextProvider = AppContextProvider;