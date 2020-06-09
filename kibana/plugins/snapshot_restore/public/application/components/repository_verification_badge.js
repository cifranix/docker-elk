"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryVerificationBadge = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RepositoryVerificationBadge = function RepositoryVerificationBadge(_ref) {
  var verificationResults = _ref.verificationResults;

  if (!verificationResults) {
    return _react.default.createElement(_eui.EuiHealth, {
      color: "subdued"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryVerification.verificationUnknownValue",
      defaultMessage: "Unknown"
    }));
  }

  if (verificationResults.valid) {
    return _react.default.createElement(_eui.EuiHealth, {
      color: "success"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryVerification.verificationSuccessfulValue",
      defaultMessage: "Connected"
    }));
  }

  return _react.default.createElement(_eui.EuiHealth, {
    color: "warning"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.repositoryVerification.verificationErrorValue",
    defaultMessage: "Not connected"
  }));
};

exports.RepositoryVerificationBadge = RepositoryVerificationBadge;