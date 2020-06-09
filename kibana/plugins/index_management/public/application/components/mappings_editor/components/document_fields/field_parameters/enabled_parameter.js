"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnabledParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../../services/documentation");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EnabledParameter = function EnabledParameter() {
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.searchableProperties.fieldTitle', {
      defaultMessage: 'Searchable properties'
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.searchableProperties.fieldDescription",
      defaultMessage: "Allow object properties to be searched. The JSON can still be retrieved from the {source} field even after disabling this setting.",
      values: {
        source: _react.default.createElement(_eui.EuiCode, null, "_source")
      }
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.enabledDocLinkText', {
        defaultMessage: 'Enabled documentation'
      }),
      href: _documentation.documentationService.getEnabledLink()
    },
    formFieldPath: "enabled"
  });
};

exports.EnabledParameter = EnabledParameter;