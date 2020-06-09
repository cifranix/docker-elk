"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidPlatinumLicense = isValidPlatinumLicense;
exports.invalidLicenseMessage = void 0;

var _i18n = require("@kbn/i18n");

var _elasticsearch_fieldnames = require("./elasticsearch_fieldnames");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isValidPlatinumLicense(license) {
  return license.isActive && license.hasAtLeast('platinum');
}

const invalidLicenseMessage = _i18n.i18n.translate('xpack.apm.serviceMap.invalidLicenseMessage', {
  defaultMessage: "In order to access Service Maps, you must be subscribed to an Elastic Platinum license. With it, you'll have the ability to visualize your entire application stack along with your APM data."
});

exports.invalidLicenseMessage = invalidLicenseMessage;