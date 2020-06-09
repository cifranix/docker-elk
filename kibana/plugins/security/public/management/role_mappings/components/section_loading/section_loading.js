"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SectionLoading = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SectionLoading = function SectionLoading(props) {
  return _react.default.createElement(_eui.EuiEmptyPrompt, {
    title: _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "xl"
    }),
    body: _react.default.createElement(_eui.EuiText, {
      color: "subdued"
    }, props.children || _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.security.management.editRoleMapping.loadingRoleMappingDescription",
      defaultMessage: "Loading\u2026"
    })),
    "data-test-subj": "sectionLoading"
  });
};

exports.SectionLoading = SectionLoading;