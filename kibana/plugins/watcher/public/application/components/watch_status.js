"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchStatus = WatchStatus;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _constants = require("../../../common/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function StatusIcon(_ref) {
  var status = _ref.status;

  switch (status) {
    case _constants.WATCH_STATES.FIRING:
    case _constants.ACTION_STATES.FIRING:
      return _react.default.createElement(_eui.EuiIcon, {
        type: "play",
        color: "primary"
      });

    case _constants.WATCH_STATES.OK:
    case _constants.ACTION_STATES.OK:
    case _constants.ACTION_STATES.ACKNOWLEDGED:
      return _react.default.createElement(_eui.EuiIcon, {
        type: "check",
        color: "secondary"
      });

    case _constants.ACTION_STATES.THROTTLED:
      return _react.default.createElement(_eui.EuiIcon, {
        type: "clock",
        color: "warning"
      });

    case _constants.WATCH_STATES.DISABLED:
      return _react.default.createElement(_eui.EuiIcon, {
        type: "minusInCircleFilled",
        color: "subdued"
      });

    case _constants.WATCH_STATES.CONFIG_ERROR:
    case _constants.WATCH_STATES.ERROR:
    case _constants.ACTION_STATES.UNKNOWN:
      return _react.default.createElement(_eui.EuiIcon, {
        type: "cross",
        color: "subdued"
      });

    case _constants.ACTION_STATES.CONFIG_ERROR:
    case _constants.ACTION_STATES.ERROR:
      return _react.default.createElement(_eui.EuiIcon, {
        type: "crossInACircleFilled",
        color: "danger"
      });
  }

  return null;
}

function WatchStatus(_ref2) {
  var status = _ref2.status,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 's' : _ref2$size;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(StatusIcon, {
    status: status
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: size
  }, status)));
}