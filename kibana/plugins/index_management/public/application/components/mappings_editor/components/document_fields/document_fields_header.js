"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentFieldsHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _documentation = require("../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DocumentFieldsHeader = _react.default.memo(function (_ref) {
  var searchValue = _ref.searchValue,
      onSearchChange = _ref.onSearchChange;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.mappingsEditor.documentFieldsDescription",
    defaultMessage: "Define the fields for your indexed documents. {docsLink}",
    values: {
      docsLink: _react.default.createElement(_eui.EuiLink, {
        href: _documentation.documentationService.getMappingTypesLink(),
        target: "_blank"
      }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.documentFieldsDocumentationLink', {
        defaultMessage: 'Learn more.'
      }))
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFieldSearch, {
    style: {
      minWidth: '350px'
    },
    placeholder: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.documentFields.searchFieldsPlaceholder', {
      defaultMessage: 'Search fields'
    }),
    value: searchValue,
    onChange: function onChange(e) {
      // Temporary fix until EUI fixes the contract
      // See my comment https://github.com/elastic/eui/pull/2723/files#r366725059
      if (typeof e === 'string') {
        onSearchChange(e);
      } else {
        onSearchChange(e.target.value);
      }
    },
    "aria-label": _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.documentFields.searchFieldsAriaLabel', {
      defaultMessage: 'Search mapped fields'
    })
  })));
});

exports.DocumentFieldsHeader = DocumentFieldsHeader;