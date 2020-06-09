"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingWrapper = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LoadingWrapper = function LoadingWrapper(_ref) {
  var hasData = _ref.hasData,
      _ref$loading = _ref.loading,
      loading = _ref$loading === void 0 ? false : _ref$loading,
      height = _ref.height,
      children = _ref.children;
  var opacity = loading === true ? hasData === true ? 0.3 : 0 : 1;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    style: {
      height: '100%',
      opacity: opacity,
      transition: 'opacity 0.2s'
    }
  }, children), loading === true && _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    alignItems: "center",
    style: height !== undefined ? {
      height: height,
      marginTop: "-".concat(height)
    } : {}
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "xl"
  }))));
};

exports.LoadingWrapper = LoadingWrapper;