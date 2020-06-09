"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyPrompt = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _create_role_mapping_button = require("../create_role_mapping_button");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EmptyPrompt = function EmptyPrompt() {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    iconType: "managementApp",
    title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.roleMappings.emptyPromptTitle",
      defaultMessage: "Create your first role mapping"
    })),
    body: _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.roleMappings.emptyPromptDescription",
      defaultMessage: "Role mappings control which roles are assigned to your users."
    }))),
    actions: _react.default.createElement(_create_role_mapping_button.CreateRoleMappingButton, null),
    "data-test-subj": "roleMappingsEmptyPrompt"
  });
};

exports.EmptyPrompt = EmptyPrompt;