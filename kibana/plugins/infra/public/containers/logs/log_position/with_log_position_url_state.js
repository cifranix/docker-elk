"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceLogPositionInQueryString = exports.WithLogPositionUrlState = void 0;

var _react = _interopRequireWildcard(require("react"));

var _time = require("../../../../common/time");

var _url_state = require("../../../utils/url_state");

var _log_position_state = require("./log_position_state");

var _datemath = require("../../../utils/datemath");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ONE_HOUR = 3600000;

var WithLogPositionUrlState = function WithLogPositionUrlState() {
  var _useContext = (0, _react.useContext)(_log_position_state.LogPositionState.Context),
      visibleMidpoint = _useContext.visibleMidpoint,
      isStreaming = _useContext.isStreaming,
      jumpToTargetPosition = _useContext.jumpToTargetPosition,
      startLiveStreaming = _useContext.startLiveStreaming,
      stopLiveStreaming = _useContext.stopLiveStreaming,
      startDateExpression = _useContext.startDateExpression,
      endDateExpression = _useContext.endDateExpression,
      updateDateRange = _useContext.updateDateRange,
      initialize = _useContext.initialize;

  var urlState = (0, _react.useMemo)(function () {
    return {
      position: visibleMidpoint ? (0, _time.pickTimeKey)(visibleMidpoint) : null,
      streamLive: isStreaming,
      start: startDateExpression,
      end: endDateExpression
    };
  }, [visibleMidpoint, isStreaming, startDateExpression, endDateExpression]);
  return _react.default.createElement(_url_state.UrlStateContainer, {
    urlState: urlState,
    urlStateKey: "logPosition",
    mapToUrlState: mapToUrlState,
    onChange: function onChange(newUrlState) {
      if (!newUrlState) {
        return;
      }

      if (newUrlState.start || newUrlState.end) {
        updateDateRange({
          startDateExpression: newUrlState.start,
          endDateExpression: newUrlState.end
        });
      }

      if (newUrlState.position) {
        jumpToTargetPosition(newUrlState.position);
      }

      if (newUrlState.streamLive) {
        startLiveStreaming();
      } else if (typeof newUrlState.streamLive !== 'undefined' && !newUrlState.streamLive) {
        stopLiveStreaming();
      }
    },
    onInitialize: function onInitialize(initialUrlState) {
      if (initialUrlState) {
        var initialPosition = initialUrlState.position;
        var initialStartDateExpression = initialUrlState.start;
        var initialEndDateExpression = initialUrlState.end;

        if (!initialPosition) {
          initialStartDateExpression = initialStartDateExpression || 'now-1d';
          initialEndDateExpression = initialEndDateExpression || 'now';
        } else {
          var initialStartTimestamp = initialStartDateExpression ? (0, _datemath.datemathToEpochMillis)(initialStartDateExpression) : undefined;
          var initialEndTimestamp = initialEndDateExpression ? (0, _datemath.datemathToEpochMillis)(initialEndDateExpression, 'up') : undefined; // Adjust the start-end range if the target position falls outside or if it's not set.

          if (!initialStartTimestamp || initialStartTimestamp > initialPosition.time) {
            initialStartDateExpression = new Date(initialPosition.time - ONE_HOUR).toISOString();
          }

          if (!initialEndTimestamp || initialEndTimestamp < initialPosition.time) {
            initialEndDateExpression = new Date(initialPosition.time + ONE_HOUR).toISOString();
          }

          jumpToTargetPosition(initialPosition);
        }

        if (initialStartDateExpression || initialEndDateExpression) {
          updateDateRange({
            startDateExpression: initialStartDateExpression,
            endDateExpression: initialEndDateExpression
          });
        }

        if (initialUrlState.streamLive) {
          startLiveStreaming();
        }
      }

      initialize();
    }
  });
};

exports.WithLogPositionUrlState = WithLogPositionUrlState;

var mapToUrlState = function mapToUrlState(value) {
  return value ? {
    position: mapToPositionUrlState(value.position),
    streamLive: mapToStreamLiveUrlState(value.streamLive),
    start: mapToDate(value.start),
    end: mapToDate(value.end)
  } : undefined;
};

var mapToPositionUrlState = function mapToPositionUrlState(value) {
  return value && typeof value.time === 'number' && typeof value.tiebreaker === 'number' ? (0, _time.pickTimeKey)(value) : undefined;
};

var mapToStreamLiveUrlState = function mapToStreamLiveUrlState(value) {
  return typeof value === 'boolean' ? value : false;
};

var mapToDate = function mapToDate(value) {
  return (0, _datemath.isValidDatemath)(value) ? value : undefined;
};

var replaceLogPositionInQueryString = function replaceLogPositionInQueryString(time) {
  return Number.isNaN(time) ? function (value) {
    return value;
  } : (0, _url_state.replaceStateKeyInQueryString)('logPosition', {
    position: {
      time: time,
      tiebreaker: 0
    },
    streamLive: false
  });
};

exports.replaceLogPositionInQueryString = replaceLogPositionInQueryString;