"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLUGIN = void 0;

var _constants = require("../../../../legacy/common/constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PLUGIN = {
  ID: 'watcher',
  MINIMUM_LICENSE_REQUIRED: _constants.LICENSE_TYPE_GOLD,
  getI18nName: i18n => {
    return i18n.translate('xpack.watcher.appName', {
      defaultMessage: 'Watcher'
    });
  }
};
exports.PLUGIN = PLUGIN;