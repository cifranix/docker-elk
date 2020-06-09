"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHistory = exports.HistoryContext = void 0;

var _react = require("react");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var HistoryContext = (0, _react.createContext)(undefined);
exports.HistoryContext = HistoryContext;

var useHistory = function useHistory() {
  return (0, _react.useContext)(HistoryContext);
};

exports.useHistory = useHistory;