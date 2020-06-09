"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkToHome = linkToHome;

var _constants = require("../../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function linkToHome() {
  return "#".concat(_constants.CLIENT_BASE_PATH);
}