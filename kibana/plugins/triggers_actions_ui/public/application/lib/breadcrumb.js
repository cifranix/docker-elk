"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentBreadcrumb = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getCurrentBreadcrumb = function getCurrentBreadcrumb(type) {
  // Home and sections
  switch (type) {
    case 'connectors':
      return {
        text: _i18n.i18n.translate('xpack.triggersActionsUI.connectors.breadcrumbTitle', {
          defaultMessage: 'Connectors'
        }),
        href: "#".concat(_constants.routeToConnectors)
      };

    case 'alerts':
      return {
        text: _i18n.i18n.translate('xpack.triggersActionsUI.alerts.breadcrumbTitle', {
          defaultMessage: 'Alerts'
        }),
        href: "#".concat(_constants.routeToAlerts)
      };

    default:
      return {
        text: _i18n.i18n.translate('xpack.triggersActionsUI.home.breadcrumbTitle', {
          defaultMessage: 'Alerts and Actions'
        }),
        href: "#".concat(_constants.routeToHome)
      };
  }
};

exports.getCurrentBreadcrumb = getCurrentBreadcrumb;