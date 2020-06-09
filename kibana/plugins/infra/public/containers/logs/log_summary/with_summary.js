"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithSummary = void 0;

var _react = require("react");

var _reactUse = require("react-use");

var _source = require("../../source");

var _log_summary = require("./log_summary");

var _log_filter = require("../log_filter");

var _log_position = require("../log_position");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FETCH_THROTTLE_INTERVAL = 3000;

var WithSummary = function WithSummary(_ref) {
  var children = _ref.children;

  var _useContext = (0, _react.useContext)(_source.Source.Context),
      sourceId = _useContext.sourceId;

  var _useContext2 = (0, _react.useContext)(_log_filter.LogFilterState.Context),
      filterQuery = _useContext2.filterQuery;

  var _useContext3 = (0, _react.useContext)(_log_position.LogPositionState.Context),
      startTimestamp = _useContext3.startTimestamp,
      endTimestamp = _useContext3.endTimestamp; // Keep it reasonably updated for the `now` case, but don't reload all the time when the user scrolls


  var throttledStartTimestamp = (0, _reactUse.useThrottle)(startTimestamp, FETCH_THROTTLE_INTERVAL);
  var throttledEndTimestamp = (0, _reactUse.useThrottle)(endTimestamp, FETCH_THROTTLE_INTERVAL);

  var _useLogSummary = (0, _log_summary.useLogSummary)(sourceId, throttledStartTimestamp, throttledEndTimestamp, filterQuery),
      buckets = _useLogSummary.buckets,
      start = _useLogSummary.start,
      end = _useLogSummary.end;

  return children({
    buckets: buckets,
    start: start,
    end: end
  });
};

exports.WithSummary = WithSummary;