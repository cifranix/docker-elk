"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error';

var JobIcon = function JobIcon(_ref) {
  var message = _ref.message,
      _ref$showTooltip = _ref.showTooltip,
      showTooltip = _ref$showTooltip === void 0 ? false : _ref$showTooltip;

  if (message === undefined) {
    return _react.default.createElement("span", null);
  }

  var color = 'primary';
  var icon = 'alert';

  if (message.level === INFO) {
    color = 'primary';
  } else if (message.level === WARNING) {
    color = 'warning';
  } else if (message.level === ERROR) {
    color = 'danger';
  }

  if (showTooltip) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "bottom",
      content: message.text
    }, _react.default.createElement(_eui.EuiIcon, {
      type: icon,
      color: color
    }));
  } else {
    return _react.default.createElement(_eui.EuiIcon, {
      type: icon,
      color: color
    });
  }
};

exports.JobIcon = JobIcon;