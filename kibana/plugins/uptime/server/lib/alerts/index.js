"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uptimeAlertTypeFactories = void 0;

var _status_check = require("./status_check");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const uptimeAlertTypeFactories = [_status_check.statusCheckAlertFactory];
exports.uptimeAlertTypeFactories = uptimeAlertTypeFactories;