"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProfilerActionContext = exports.useProfilerReadContext = exports.ProfileContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _store = require("../store");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ProfilerReadContext = (0, _react.createContext)(null);
var ProfilerActionContext = (0, _react.createContext)(null);

var ProfileContextProvider = function ProfileContextProvider(_ref) {
  var children = _ref.children;

  var _useStore = (0, _store.useStore)(),
      dispatch = _useStore.dispatch,
      state = _useStore.state;

  return _react.default.createElement(ProfilerReadContext.Provider, {
    value: state
  }, _react.default.createElement(ProfilerActionContext.Provider, {
    value: dispatch
  }, children));
};

exports.ProfileContextProvider = ProfileContextProvider;

var useProfilerReadContext = function useProfilerReadContext() {
  var ctx = (0, _react.useContext)(ProfilerReadContext);

  if (ctx == null) {
    throw new Error("useProfilerReadContext must be called inside ProfilerReadContext");
  }

  return ctx;
};

exports.useProfilerReadContext = useProfilerReadContext;

var useProfilerActionContext = function useProfilerActionContext() {
  var ctx = (0, _react.useContext)(ProfilerActionContext);

  if (ctx == null) {
    throw new Error("useProfilerActionContext must be called inside ProfilerActionContext");
  }

  return ctx;
};

exports.useProfilerActionContext = useProfilerActionContext;