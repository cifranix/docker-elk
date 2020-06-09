"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountExpiredBanner = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ExpiredBanner = function ExpiredBanner(props) {
  return _react.default.createElement(_eui.EuiCallOut, {
    iconType: "help",
    color: "warning",
    "data-test-subj": "licenseExpiredBanner",
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.licensing.welcomeBanner.licenseIsExpiredTitle",
      defaultMessage: "Your {licenseType} license is expired",
      values: {
        licenseType: props.type
      }
    })
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.licensing.welcomeBanner.licenseIsExpiredDescription",
    defaultMessage: "Contact your administrator or {updateYourLicenseLinkText} directly.",
    values: {
      updateYourLicenseLinkText: _react.default.createElement("a", {
        href: props.uploadUrl
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.licensing.welcomeBanner.licenseIsExpiredDescription.updateYourLicenseLinkText",
        defaultMessage: "update your license"
      }))
    }
  }));
};

var mountExpiredBanner = function mountExpiredBanner(props) {
  return (0, _public.toMountPoint)(_react.default.createElement(ExpiredBanner, {
    type: props.type,
    uploadUrl: props.uploadUrl
  }));
};

exports.mountExpiredBanner = mountExpiredBanner;