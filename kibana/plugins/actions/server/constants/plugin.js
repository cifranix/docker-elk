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
  ID: 'actions',
  MINIMUM_LICENSE_REQUIRED: _constants.LICENSE_TYPE_BASIC,
  // TODO: supposed to be changed up on requirements
  getI18nName: i18n => i18n.translate('xpack.actions.appName', {
    defaultMessage: 'Actions'
  })
};
exports.PLUGIN = PLUGIN;