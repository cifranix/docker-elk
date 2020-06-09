"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTimefilter = void 0;

var _react = require("react");

var _kibana_context = require("./kibana_context");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useTimefilter = function useTimefilter() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      timeRangeSelector = _ref.timeRangeSelector,
      autoRefreshSelector = _ref.autoRefreshSelector;

  var _useMlKibana = (0, _kibana_context.useMlKibana)(),
      services = _useMlKibana.services;

  var timefilter = services.data.query.timefilter.timefilter;
  (0, _react.useEffect)(function () {
    if (timeRangeSelector === true) {
      timefilter.enableTimeRangeSelector();
    } else if (timeRangeSelector === false) {
      timefilter.disableTimeRangeSelector();
    }

    if (autoRefreshSelector === true) {
      timefilter.enableAutoRefreshSelector();
    } else if (autoRefreshSelector === false) {
      timefilter.disableAutoRefreshSelector();
    }
  }, [timeRangeSelector, autoRefreshSelector]);
  return timefilter;
};

exports.useTimefilter = useTimefilter;