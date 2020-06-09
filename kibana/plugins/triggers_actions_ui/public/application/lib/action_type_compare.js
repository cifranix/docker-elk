"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.actionTypeCompare = actionTypeCompare;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function actionTypeCompare(a, b) {
  if (a.enabled === true && b.enabled === false) {
    return -1;
  }

  if (a.enabled === false && b.enabled === true) {
    return 1;
  }

  return a.name.localeCompare(b.name);
}