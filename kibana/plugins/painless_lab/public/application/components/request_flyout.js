"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestFlyout = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RequestFlyout = function RequestFlyout(_ref) {
  var onClose = _ref.onClose,
      requestBody = _ref.requestBody,
      response = _ref.response,
      links = _ref.links;
  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    maxWidth: 640
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    alignItems: "flexEnd"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.painlessLab.flyoutTitle', {
    defaultMessage: 'API request'
  }))))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "s",
    flush: "right",
    href: links.painlessExecuteAPI,
    target: "_blank",
    iconType: "help"
  }, _i18n.i18n.translate('xpack.painlessLab.flyoutDocLink', {
    defaultMessage: 'API documentation'
  }))))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiTabbedContent, {
    size: "s",
    tabs: [{
      id: 'request',
      name: 'Request',
      content: _react.default.createElement(_eui.EuiCodeBlock, {
        language: "json",
        paddingSize: "s",
        isCopyable: true
      }, 'POST _scripts/painless/_execute\n', requestBody)
    }, {
      id: 'response',
      name: 'Response',
      content: _react.default.createElement(_eui.EuiCodeBlock, {
        language: "json",
        paddingSize: "s",
        isCopyable: true
      }, response)
    }]
  }), _react.default.createElement("div", {
    className: "painlessLabBottomBarPlaceholder"
  })));
};

exports.RequestFlyout = RequestFlyout;