"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LocaleParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _edit_field = require("../fields/edit_field");

var _shared_imports = require("../../../shared_imports");

var _lib = require("../../../lib");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LocaleParameter = function LocaleParameter(_ref) {
  var defaultToggleValue = _ref.defaultToggleValue;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.date.localeFieldTitle', {
      defaultMessage: 'Set locale'
    }),
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.dateType.localeFieldDescription",
      defaultMessage: "The locale to use when parsing dates. This is useful because months might not have the same name or abbreviation in all languages. Defaults to the {root} locale.",
      values: {
        root: _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationService.getRootLocaleLink(),
          target: "_blank"
        }, "ROOT")
      }
    }),
    defaultToggleValue: defaultToggleValue
  }, _react.default.createElement(_shared_imports.UseField, {
    path: "locale",
    config: (0, _lib.getFieldConfig)('locale'),
    component: _shared_imports.Field
  }));
};

exports.LocaleParameter = LocaleParameter;