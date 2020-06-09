"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyPrompt = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyPrompt = function EmptyPrompt(_ref) {
  var isAdmin = _ref.isAdmin,
      docLinks = _ref.docLinks;
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "managementApp",
    title: _react.default.createElement("h1", {
      "data-test-subj": "noApiKeysHeader"
    }, isAdmin ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.apiKeys.table.emptyPromptAdminTitle",
      defaultMessage: "No API keys"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.apiKeys.table.emptyPromptNonAdminTitle",
      defaultMessage: "You don't have any API keys"
    })),
    body: _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.apiKeys.table.emptyPromptDescription",
      defaultMessage: "You can create an {link} from Console.",
      values: {
        link: _react.default.createElement(_eui.EuiLink, {
          href: "".concat(docLinks.getCreateApiKeyDocUrl()),
          target: "_blank"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.security.management.apiKeys.table.emptyPromptDocsLinkMessage",
          defaultMessage: "API key"
        }))
      }
    }))),
    actions: _react.default.createElement(_eui.EuiButton, {
      type: "primary",
      href: "#/dev_tools",
      "data-test-subj": "goToConsoleButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.apiKeys.table.emptyPromptConsoleButtonMessage",
      defaultMessage: "Go to Console"
    })),
    "data-test-subj": "emptyPrompt"
  });
};

exports.EmptyPrompt = EmptyPrompt;