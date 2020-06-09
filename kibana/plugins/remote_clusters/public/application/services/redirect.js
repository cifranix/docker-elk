"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;
exports.redirect = redirect;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var navigateToApp;

function init(_navigateToApp) {
  navigateToApp = _navigateToApp;
}

function redirect(path) {
  navigateToApp('kibana', {
    path: "#".concat(path)
  });
}