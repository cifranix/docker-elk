"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SecureSpaceMessage = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _react2 = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SecureSpaceMessage = function SecureSpaceMessage() {
  var rolesLinkTextAriaLabel = _i18n.i18n.translate('xpack.spaces.management.secureSpaceMessage.rolesLinkTextAriaLabel', {
    defaultMessage: 'Roles management page'
  });

  return _react2.default.createElement(_react2.Fragment, null, _react2.default.createElement(_eui.EuiHorizontalRule, null), _react2.default.createElement(_eui.EuiText, {
    className: "eui-textCenter"
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.spaces.management.secureSpaceMessage.howToAssignRoleToSpaceDescription",
    defaultMessage: "Want to assign a role to a space? Go to {rolesLink}.",
    values: {
      rolesLink: _react2.default.createElement(_eui.EuiLink, {
        href: "#/management/security/roles",
        "aria-label": rolesLinkTextAriaLabel
      }, _react2.default.createElement(_react.FormattedMessage, {
        id: "xpack.spaces.management.secureSpaceMessage.rolesLinkText",
        defaultMessage: "Roles"
      }))
    }
  }))));
};

exports.SecureSpaceMessage = SecureSpaceMessage;