"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAlertsContext = exports.AlertsContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AlertsContext = (0, _react.createContext)(null);

var AlertsContextProvider = function AlertsContextProvider(_ref) {
  var children = _ref.children,
      value = _ref.value;
  return _react.default.createElement(AlertsContext.Provider, {
    value: value
  }, children);
};

exports.AlertsContextProvider = AlertsContextProvider;

var useAlertsContext = function useAlertsContext() {
  var ctx = (0, _react.useContext)(AlertsContext);

  if (!ctx) {
    throw new Error('ActionsConnectorsContext has not been set.');
  }

  return ctx;
};

exports.useAlertsContext = useAlertsContext;