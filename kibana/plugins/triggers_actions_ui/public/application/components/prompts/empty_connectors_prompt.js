"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyConnectorsPrompt = void 0;

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

require("./empty_connectors_prompt.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyConnectorsPrompt = function EmptyConnectorsPrompt(_ref) {
  var onCTAClicked = _ref.onCTAClicked;
  return _react2.default.createElement(_eui.EuiEmptyPrompt, {
    "data-test-subj": "createFirstConnectorEmptyPrompt",
    title: _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiIcon, {
      type: "logoSlack",
      size: "xl",
      className: "actEmptyConnectorsPrompt__logo"
    }), _react2.default.createElement(_eui.EuiIcon, {
      type: "logoGmail",
      size: "xl",
      className: "actEmptyConnectorsPrompt__logo"
    }), _react2.default.createElement(_eui.EuiIcon, {
      type: "logoWebhook",
      size: "xl",
      className: "actEmptyConnectorsPrompt__logo"
    }), _react2.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react2.default.createElement(_eui.EuiTitle, {
      size: "m"
    }, _react2.default.createElement("h2", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.emptyConnectorsPrompt.addActionEmptyTitle",
      defaultMessage: "Create your first connector"
    })))),
    body: _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.emptyConnectorsPrompt.addActionEmptyBody",
      defaultMessage: "Configure email, Slack, Elasticsearch, and third-party services that Kibana can trigger."
    })),
    actions: _react2.default.createElement(_eui.EuiButton, {
      "data-test-subj": "createFirstActionButton",
      key: "create-action",
      fill: true,
      iconType: "plusInCircle",
      iconSide: "left",
      onClick: onCTAClicked
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.triggersActionsUI.components.emptyConnectorsPrompt.addActionButtonLabel",
      defaultMessage: "Create connector"
    }))
  });
};

exports.EmptyConnectorsPrompt = EmptyConnectorsPrompt;