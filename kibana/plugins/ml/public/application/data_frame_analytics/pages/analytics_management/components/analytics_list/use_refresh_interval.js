"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefreshInterval = void 0;

var _react = require("react");

var _kibana = require("../../../../../contexts/kibana");

var _jobs_list = require("../../../../../../../common/constants/jobs_list");

var _common = require("../../../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var useRefreshInterval = function useRefreshInterval(setBlockRefresh) {
  var _useMlKibana = (0, _kibana.useMlKibana)(),
      services = _useMlKibana.services;

  var timefilter = services.data.query.timefilter.timefilter;

  var _useRefreshAnalyticsL = (0, _common.useRefreshAnalyticsList)(),
      refresh = _useRefreshAnalyticsL.refresh;

  (0, _react.useEffect)(function () {
    var analyticsRefreshInterval = null;
    var refreshIntervalSubscription = timefilter.getRefreshIntervalUpdate$().subscribe(setAutoRefresh);
    timefilter.disableTimeRangeSelector();
    timefilter.enableAutoRefreshSelector();
    initAutoRefresh();

    function initAutoRefresh() {
      var _timefilter$getRefres = timefilter.getRefreshInterval(),
          value = _timefilter$getRefres.value;

      if (value === 0) {
        // the auto refresher starts in an off state
        // so switch it on and set the interval to 30s
        timefilter.setRefreshInterval({
          pause: false,
          value: _jobs_list.DEFAULT_REFRESH_INTERVAL_MS
        });
      }

      setAutoRefresh();
    }

    function setAutoRefresh() {
      var _timefilter$getRefres2 = timefilter.getRefreshInterval(),
          value = _timefilter$getRefres2.value,
          pause = _timefilter$getRefres2.pause;

      if (pause) {
        clearRefreshInterval();
      } else {
        setRefreshInterval(value);
      }

      refresh();
    }

    function setRefreshInterval(interval) {
      clearRefreshInterval();

      if (interval >= _jobs_list.MINIMUM_REFRESH_INTERVAL_MS) {
        setBlockRefresh(false);
        var intervalId = window.setInterval(function () {
          refresh();
        }, interval);
        analyticsRefreshInterval = intervalId;
      }
    }

    function clearRefreshInterval() {
      setBlockRefresh(true);

      if (analyticsRefreshInterval !== null) {
        window.clearInterval(analyticsRefreshInterval);
      }
    } // useEffect cleanup


    return function () {
      refreshIntervalSubscription.unsubscribe();
      clearRefreshInterval();
    };
  }, []); // [] as comparator makes sure this only runs once
};

exports.useRefreshInterval = useRefreshInterval;