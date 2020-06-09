"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddRoleTemplateButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AddRoleTemplateButton = function AddRoleTemplateButton(props) {
  if (!props.canUseStoredScripts && !props.canUseInlineScripts) {
    return _react.default.createElement(_eui.EuiCallOut, {
      iconType: "alert",
      color: "danger",
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.security.management.editRoleMapping.roleTemplatesUnavailableTitle",
        defaultMessage: "Role templates unavailable"
      })
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.editRoleMapping.roleTemplatesUnavailable",
      defaultMessage: "Role templates cannot be used when scripts are disabled in Elasticsearch."
    })));
  }

  var addRoleTemplate = _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.security.management.editRoleMapping.addRoleTemplate",
    defaultMessage: "Add template"
  });

  if (props.canUseInlineScripts) {
    return _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "plusInCircle",
      onClick: function onClick() {
        return props.onClick('inline');
      },
      "data-test-subj": "addRoleTemplateButton"
    }, addRoleTemplate);
  }

  return _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "plusInCircle",
    onClick: function onClick() {
      return props.onClick('stored');
    },
    "data-test-subj": "addRoleTemplateButton"
  }, addRoleTemplate);
};

exports.AddRoleTemplateButton = AddRoleTemplateButton;