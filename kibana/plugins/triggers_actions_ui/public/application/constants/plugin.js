"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLUGIN = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PLUGIN = {
  ID: 'triggers_actions_ui',
  getI18nName: function getI18nName(i18n) {
    return i18n.translate('xpack.triggersActionsUI.appName', {
      defaultMessage: 'Alerts and Actions'
    });
  }
};
exports.PLUGIN = PLUGIN;