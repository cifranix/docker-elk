"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withMetricPageProviders = void 0;

var _react = _interopRequireDefault(require("react"));

var _with_metrics_time = require("./containers/with_metrics_time");

var _source = require("../../containers/source");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var withMetricPageProviders = function withMetricPageProviders(Component) {
  return function (props) {
    return _react.default.createElement(_source.Source.Provider, {
      sourceId: "default"
    }, _react.default.createElement(_with_metrics_time.MetricsTimeContainer.Provider, null, _react.default.createElement(Component, props)));
  };
};

exports.withMetricPageProviders = withMetricPageProviders;