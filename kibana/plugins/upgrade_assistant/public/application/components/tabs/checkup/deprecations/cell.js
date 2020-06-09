"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecationCell = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _button = require("./default_fields/button");

var _reindex = require("./reindex");

var _app_context = require("../../../../app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Used to display a deprecation with links to docs, a health indicator, and other descriptive information.
 */
var DeprecationCell = function DeprecationCell(_ref) {
  var headline = _ref.headline,
      healthColor = _ref.healthColor,
      indexName = _ref.indexName,
      reindex = _ref.reindex,
      needsDefaultFields = _ref.needsDefaultFields,
      docUrl = _ref.docUrl,
      _ref$items = _ref.items,
      items = _ref$items === void 0 ? [] : _ref$items,
      children = _ref.children,
      reindexBlocker = _ref.reindexBlocker;
  return _react.default.createElement("div", {
    className: "upgDeprecationCell"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false,
    wrap: true,
    alignItems: "baseline"
  }, healthColor && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "dot",
    color: healthColor
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: true
  }, headline && _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("h2", null, headline)), docUrl && _react.default.createElement("div", null, _react.default.createElement(_eui.EuiLink, {
    href: docUrl,
    target: "_blank"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.deprecations.documentationButtonLabel",
    defaultMessage: "Documentation"
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  })), items.map(function (item) {
    return _react.default.createElement("div", {
      key: item.title || item.body
    }, _react.default.createElement(_eui.EuiText, null, item.title && _react.default.createElement("h6", null, item.title), _react.default.createElement("p", null, item.body)));
  })), reindex && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_app_context.AppContext.Consumer, null, function (_ref2) {
    var http = _ref2.http,
        docLinks = _ref2.docLinks;
    return _react.default.createElement(_reindex.ReindexButton, {
      docLinks: docLinks,
      reindexBlocker: reindexBlocker,
      indexName: indexName,
      http: http
    });
  })), needsDefaultFields && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_app_context.AppContext.Consumer, null, function (_ref3) {
    var http = _ref3.http;
    return _react.default.createElement(_button.FixDefaultFieldsButton, {
      indexName: indexName,
      http: http
    });
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), children);
};

exports.DeprecationCell = DeprecationCell;