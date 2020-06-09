"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyPrompt = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyPrompt = function EmptyPrompt(_ref) {
  var onCTAClicked = _ref.onCTAClicked;
  return _react2.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "watchesApp",
    "data-test-subj": "createFirstAlertEmptyPrompt",
    title: _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.emptyPrompt.emptyTitle",
      defaultMessage: "Create your first alert"
    })),
    body: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.emptyPrompt.emptyDesc",
      defaultMessage: "Receive an alert through email, Slack, or another connector when a trigger is hit."
    })),
    actions: _react2.default.createElement(_eui.EuiButton, {
      "data-test-subj": "createFirstAlertButton",
      key: "create-action",
      fill: true,
      iconType: "plusInCircle",
      iconSide: "left",
      onClick: onCTAClicked
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.emptyPrompt.emptyButton",
      defaultMessage: "Create alert"
    }))
  });
};

exports.EmptyPrompt = EmptyPrompt;