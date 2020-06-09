"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LatestMinorBanner = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _version = require("../../../common/version");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LatestMinorBanner = function LatestMinorBanner() {
  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.tabs.incompleteCallout.calloutTitle",
      defaultMessage: "Issues list might be incomplete"
    }),
    color: "warning",
    iconType: "help"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.tabs.incompleteCallout.calloutBody.calloutDetail",
    defaultMessage: "The complete list of {breakingChangesDocButton} in Elasticsearch {nextEsVersion} will be available in the final {currentEsVersion} minor release. When the list is complete, this warning will go away.",
    values: {
      breakingChangesDocButton: _react.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/guide/en/elasticsearch/reference/master/breaking-changes.html",
        target: "_blank"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.tabs.incompleteCallout.calloutBody.breackingChangesDocButtonLabel",
        defaultMessage: "deprecations and breaking changes"
      })),
      nextEsVersion: "".concat(_version.NEXT_MAJOR_VERSION, ".x"),
      currentEsVersion: "".concat(_version.CURRENT_MAJOR_VERSION, ".x")
    }
  })));
};

exports.LatestMinorBanner = LatestMinorBanner;