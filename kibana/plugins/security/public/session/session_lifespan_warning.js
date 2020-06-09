"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createToast = exports.SessionLifespanWarning = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SessionLifespanWarning = function SessionLifespanWarning(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "danger",
    position: "absolute"
  }), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.components.sessionLifespanWarning.message",
    defaultMessage: "Your session will reach the maximum time limit {timeout}. You will need to log in again.",
    values: {
      timeout: _react.default.createElement(_react2.FormattedRelative, {
        value: props.timeout,
        units: "second",
        updateInterval: 1000
      })
    }
  })));
};

exports.SessionLifespanWarning = SessionLifespanWarning;

var createToast = function createToast(toastLifeTimeMs) {
  var timeout = toastLifeTimeMs + Date.now();
  return {
    color: 'danger',
    text: (0, _public.toMountPoint)(_react.default.createElement(SessionLifespanWarning, {
      timeout: timeout
    })),
    title: _i18n.i18n.translate('xpack.security.components.sessionLifespanWarning.title', {
      defaultMessage: 'Warning'
    }),
    iconType: 'alert',
    toastLifeTimeMs: toastLifeTimeMs
  };
};

exports.createToast = createToast;