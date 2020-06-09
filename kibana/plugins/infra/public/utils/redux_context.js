"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxStateContextProvider = exports.ReduxStateContext = void 0;

var _reactRedux = require("react-redux");

var _react = _interopRequireWildcard(require("react"));

var _store = require("../store");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ReduxStateContext = (0, _react.createContext)(_store.initialState);
exports.ReduxStateContext = ReduxStateContext;

var ReduxStateContextProvider = function ReduxStateContextProvider(_ref) {
  var children = _ref.children;
  var state = (0, _reactRedux.useSelector)(function (store) {
    return store;
  });
  return _react.default.createElement(ReduxStateContext.Provider, {
    value: state
  }, children);
};

exports.ReduxStateContextProvider = ReduxStateContextProvider;