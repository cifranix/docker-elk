"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToast = exports.SessionIdleTimeoutWarning = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SessionIdleTimeoutWarning = function SessionIdleTimeoutWarning(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "danger",
    position: "absolute"
  }), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.components.sessionIdleTimeoutWarning.message",
    defaultMessage: "You will be logged out {timeout} due to inactivity. Click OK to resume.",
    values: {
      timeout: _react.default.createElement(_react2.FormattedRelative, {
        value: props.timeout,
        units: "second",
        updateInterval: 1000
      })
    }
  })), _react.default.createElement("div", {
    className: "eui-textRight"
  }, _react.default.createElement(_eui.EuiButton, {
    size: "s",
    color: "warning",
    onClick: props.onRefreshSession,
    "data-test-subj": "refreshSessionButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.components.sessionIdleTimeoutWarning.okButtonText",
    defaultMessage: "OK"
  }))));
};

exports.SessionIdleTimeoutWarning = SessionIdleTimeoutWarning;

var createToast = function createToast(toastLifeTimeMs, onRefreshSession) {
  var timeout = toastLifeTimeMs + Date.now();
  return {
    color: 'warning',
    text: (0, _public.toMountPoint)(_react.default.createElement(SessionIdleTimeoutWarning, {
      onRefreshSession: onRefreshSession,
      timeout: timeout
    })),
    title: _i18n.i18n.translate('xpack.security.components.sessionIdleTimeoutWarning.title', {
      defaultMessage: 'Warning'
    }),
    iconType: 'clock',
    toastLifeTimeMs: toastLifeTimeMs
  };
};

exports.createToast = createToast;