"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showExpiredLicenseWarning = showExpiredLicenseWarning;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _dependency_cache = require("../util/dependency_cache");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var expiredLicenseBannerId;

function showExpiredLicenseWarning() {
  if (expiredLicenseBannerId === undefined) {
    var message = _i18n.i18n.translate('xpack.ml.checkLicense.licenseHasExpiredMessage', {
      defaultMessage: 'Your Machine Learning license has expired.'
    }); // Only show the banner once with no way to dismiss it


    var overlays = (0, _dependency_cache.getOverlays)();
    expiredLicenseBannerId = overlays.banners.add((0, _public.toMountPoint)(_react.default.createElement(_eui.EuiCallOut, {
      iconType: "iInCircle",
      color: "warning",
      title: message
    })));
  }
}