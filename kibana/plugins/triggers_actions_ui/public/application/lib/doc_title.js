"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentDocTitle = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getCurrentDocTitle = function getCurrentDocTitle(page) {
  var updatedTitle;

  switch (page) {
    case 'connectors':
      updatedTitle = _i18n.i18n.translate('xpack.triggersActionsUI.connectors.breadcrumbTitle', {
        defaultMessage: 'Connectors'
      });
      break;

    case 'alerts':
      updatedTitle = _i18n.i18n.translate('xpack.triggersActionsUI.alerts.breadcrumbTitle', {
        defaultMessage: 'Alerts'
      });
      break;

    default:
      updatedTitle = _i18n.i18n.translate('xpack.triggersActionsUI.home.breadcrumbTitle', {
        defaultMessage: 'Alerts and Actions'
      });
  }

  return updatedTitle;
};

exports.getCurrentDocTitle = getCurrentDocTitle;