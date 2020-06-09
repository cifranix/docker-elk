"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TabSummary = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _navigation = require("../../../../../services/navigation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var NoneDescriptionText = function NoneDescriptionText() {
  return _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateDetails.summaryTab.noneDescriptionText",
    defaultMessage: "None"
  });
};

var TabSummary = function TabSummary(_ref) {
  var templateDetails = _ref.templateDetails;
  var version = templateDetails.version,
      order = templateDetails.order,
      _templateDetails$inde = templateDetails.indexPatterns,
      indexPatterns = _templateDetails$inde === void 0 ? [] : _templateDetails$inde,
      ilmPolicy = templateDetails.ilmPolicy;
  var numIndexPatterns = indexPatterns.length;
  return _react.default.createElement(_eui.EuiDescriptionList, {
    textStyle: "reverse",
    "data-test-subj": "summaryTab"
  }, _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateDetails.summaryTab.indexPatternsDescriptionListTitle",
    defaultMessage: "Index {numIndexPatterns, plural, one {pattern} other {patterns}}",
    values: {
      numIndexPatterns: numIndexPatterns
    }
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, numIndexPatterns > 1 ? _react.default.createElement(_eui.EuiText, null, _react.default.createElement("ul", null, indexPatterns.map(function (indexName, i) {
    return _react.default.createElement("li", {
      key: "".concat(indexName, "-").concat(i)
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "xs"
    }, _react.default.createElement("span", null, indexName)));
  }))) : indexPatterns.toString()), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateDetails.summaryTab.ilmPolicyDescriptionListTitle",
    defaultMessage: "ILM policy"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, ilmPolicy && ilmPolicy.name ? _react.default.createElement(_eui.EuiLink, {
    href: (0, _navigation.getILMPolicyPath)(ilmPolicy.name)
  }, ilmPolicy.name) : _react.default.createElement(NoneDescriptionText, null)), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateDetails.summaryTab.orderDescriptionListTitle",
    defaultMessage: "Order"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, order || order === 0 ? order : _react.default.createElement(NoneDescriptionText, null)), _react.default.createElement(_eui.EuiDescriptionListTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.idxMgmt.templateDetails.summaryTab.versionDescriptionListTitle",
    defaultMessage: "Version"
  })), _react.default.createElement(_eui.EuiDescriptionListDescription, null, version || version === 0 ? version : _react.default.createElement(NoneDescriptionText, null)));
};

exports.TabSummary = TabSummary;