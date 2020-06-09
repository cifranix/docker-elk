"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicenseWarningNotice = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LicenseWarningNotice = function LicenseWarningNotice() {
  var registerLicenseLinkLabel = _i18n.i18n.translate('xpack.searchProfiler.registerLicenseLinkLabel', {
    defaultMessage: 'register a license'
  });

  var trialLicense = _i18n.i18n.translate('xpack.searchProfiler.trialLicenseTitle', {
    defaultMessage: 'Trial'
  });

  var basicLicense = _i18n.i18n.translate('xpack.searchProfiler.basicLicenseTitle', {
    defaultMessage: 'Basic'
  });

  var goldLicense = _i18n.i18n.translate('xpack.searchProfiler.goldLicenseTitle', {
    defaultMessage: 'Gold'
  });

  var platinumLicense = _i18n.i18n.translate('xpack.searchProfiler.platinumLicenseTitle', {
    defaultMessage: 'Platinum'
  });

  return _react.default.createElement("div", {
    className: "prfDevTool__licenseWarning__container"
  }, _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.searchProfiler.licenseErrorMessageTitle', {
      defaultMessage: 'License error'
    }),
    color: "danger",
    iconType: "alert",
    style: {
      padding: '16px'
    }
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.searchProfiler.licenseErrorMessageDescription",
    defaultMessage: "The Profiler Visualization requires an active license ({licenseTypeList} or {platinumLicenseType}), but none were found in your cluster.",
    values: {
      licenseTypeList: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCode, null, trialLicense), ", ", _react.default.createElement(_eui.EuiCode, null, basicLicense), ",", ' ', _react.default.createElement(_eui.EuiCode, null, goldLicense)),
      platinumLicenseType: _react.default.createElement(_eui.EuiCode, null, platinumLicense)
    }
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.searchProfiler.registerLicenseDescription",
    defaultMessage: "Please {registerLicenseLink} to continue using the Search Profiler",
    values: {
      registerLicenseLink: _react.default.createElement(_eui.EuiLink, {
        href: "https://www.elastic.co/subscriptions",
        rel: "noopener"
      }, registerLicenseLinkLabel)
    }
  })))));
};

exports.LicenseWarningNotice = LicenseWarningNotice;