"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIndexSettings = exports.IndexSettingsProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var IndexSettingsContext = (0, _react.createContext)(undefined);

var IndexSettingsProvider = function IndexSettingsProvider(_ref) {
  var indexSettings = _ref.indexSettings,
      children = _ref.children;
  return _react.default.createElement(IndexSettingsContext.Provider, {
    value: indexSettings
  }, children);
};

exports.IndexSettingsProvider = IndexSettingsProvider;

var useIndexSettings = function useIndexSettings() {
  var ctx = (0, _react.useContext)(IndexSettingsContext);
  return ctx === undefined ? {} : ctx;
};

exports.useIndexSettings = useIndexSettings;