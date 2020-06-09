"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingErrorBanner = void 0;

var _lodash = require("lodash");

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LoadingErrorBanner = function LoadingErrorBanner(_ref) {
  var loadingError = _ref.loadingError;

  if ((0, _lodash.get)(loadingError, 'response.status') === 403) {
    return _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.forbiddenErrorCallout.calloutTitle",
        defaultMessage: "You do not have sufficient privileges to view this page."
      }),
      color: "danger",
      iconType: "cross"
    });
  }

  return _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.genericErrorCallout.calloutTitle",
      defaultMessage: "An error occurred while retrieving the checkup results."
    }),
    color: "danger",
    iconType: "cross"
  }, loadingError ? loadingError.message : null);
};

exports.LoadingErrorBanner = LoadingErrorBanner;