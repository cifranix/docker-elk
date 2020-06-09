"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetaFieldSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _documentation = require("../../../../../services/documentation");

var _shared_imports = require("../../../shared_imports");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var UseField = (0, _shared_imports.getUseField)({
  component: _shared_imports.Field
});

var MetaFieldSection = function MetaFieldSection() {
  return _react.default.createElement(_shared_imports.FormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.metaFieldTitle', {
      defaultMessage: '_meta field'
    }),
    description: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.metaFieldDescription",
      defaultMessage: "Use the _meta field to store any metadata you want. {docsLink}",
      values: {
        docsLink: _react.default.createElement(_eui.EuiLink, {
          href: _documentation.documentationService.getMetaFieldLink(),
          target: "_blank"
        }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.metaFieldDocumentionLink', {
          defaultMessage: 'Learn more.'
        }))
      }
    }))
  }, _react.default.createElement(UseField, {
    path: "metaField",
    component: _shared_imports.JsonEditorField,
    componentProps: {
      euiCodeEditorProps: {
        height: '400px',
        'aria-label': _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.metaFieldEditorAriaLabel', {
          defaultMessage: '_meta field data editor'
        })
      }
    }
  }));
};

exports.MetaFieldSection = MetaFieldSection;