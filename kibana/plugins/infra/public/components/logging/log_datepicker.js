"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogDatepicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogDatepicker = function LogDatepicker(_ref) {
  var startDateExpression = _ref.startDateExpression,
      endDateExpression = _ref.endDateExpression,
      isStreaming = _ref.isStreaming,
      onUpdateDateRange = _ref.onUpdateDateRange,
      onStartStreaming = _ref.onStartStreaming,
      onStopStreaming = _ref.onStopStreaming;
  var handleTimeChange = (0, _react.useCallback)(function (_ref2) {
    var start = _ref2.start,
        end = _ref2.end,
        isInvalid = _ref2.isInvalid;

    if (onUpdateDateRange && !isInvalid) {
      onUpdateDateRange({
        startDateExpression: start,
        endDateExpression: end
      });
    }
  }, [onUpdateDateRange]);
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSuperDatePicker, {
    start: startDateExpression,
    end: endDateExpression,
    onTimeChange: handleTimeChange,
    showUpdateButton: false // @ts-ignore: EuiSuperDatePicker doesn't expose the `isDisabled` prop, although it exists.
    ,
    isDisabled: isStreaming
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, isStreaming ? _react.default.createElement(_eui.EuiButtonEmpty, {
    color: "primary",
    iconType: "pause",
    iconSide: "left",
    onClick: onStopStreaming
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.logs.stopStreamingButtonLabel",
    defaultMessage: "Stop streaming"
  })) : _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "play",
    iconSide: "left",
    onClick: onStartStreaming
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.infra.logs.startStreamingButtonLabel",
    defaultMessage: "Stream live"
  }))));
};

exports.LogDatepicker = LogDatepicker;