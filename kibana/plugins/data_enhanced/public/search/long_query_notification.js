"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLongQueryNotification = getLongQueryNotification;
exports.LongQueryNotification = LongQueryNotification;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _public = require("../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getLongQueryNotification(props) {
  return (0, _public.toMountPoint)(_react2.default.createElement(LongQueryNotification, {
    cancel: props.cancel,
    runBeyondTimeout: props.runBeyondTimeout
  }));
}

function LongQueryNotification(props) {
  return _react2.default.createElement("div", null, _react2.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react2.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "flexEnd",
    gutterSize: "s"
  }, _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    onClick: props.cancel
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.data.query.queryBar.cancelLongQuery",
    defaultMessage: "Cancel"
  }))), _react2.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react2.default.createElement(_eui.EuiButton, {
    size: "s",
    fill: true,
    onClick: props.runBeyondTimeout
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.data.query.queryBar.runBeyond",
    defaultMessage: "Run beyond timeout"
  })))));
}