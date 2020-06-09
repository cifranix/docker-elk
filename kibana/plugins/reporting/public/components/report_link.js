"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ReportLink = function ReportLink(_ref) {
  var getUrl = _ref.getUrl;
  return _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.reporting.publicNotifier.reportLink.pickItUpFromPathDescription",
    defaultMessage: "Pick it up from {path}.",
    values: {
      path: _react.default.createElement("a", {
        href: getUrl()
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.reporting.publicNotifier.reportLink.reportingSectionUrlLinkLabel",
        defaultMessage: "Management > Kibana > Reporting"
      }))
    }
  });
};

exports.ReportLink = ReportLink;