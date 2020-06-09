"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkLicense = checkLicense;

var _i18n = require("@kbn/i18n");

var _utils = require("../../../../src/core/utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function checkLicense(license) {
  if (!license || !license.isAvailable) {
    return {
      showAppLink: true,
      enableAppLink: false,
      message: _i18n.i18n.translate('xpack.graph.serverSideErrors.unavailableLicenseInformationErrorMessage', {
        defaultMessage: 'Graph is unavailable - license information is not available at this time.'
      })
    };
  }

  const graphFeature = license.getFeature('graph');

  if (!graphFeature.isEnabled) {
    return {
      showAppLink: false,
      enableAppLink: false,
      message: _i18n.i18n.translate('xpack.graph.serverSideErrors.unavailableGraphErrorMessage', {
        defaultMessage: 'Graph is unavailable'
      })
    };
  }

  const check = license.check('graph', 'platinum');

  switch (check.state) {
    case 'expired':
      return {
        showAppLink: true,
        enableAppLink: false,
        message: check.message || ''
      };

    case 'invalid':
    case 'unavailable':
      return {
        showAppLink: false,
        enableAppLink: false,
        message: check.message || ''
      };

    case 'valid':
      return {
        showAppLink: true,
        enableAppLink: true,
        message: ''
      };

    default:
      return (0, _utils.assertNever)(check.state);
  }
}