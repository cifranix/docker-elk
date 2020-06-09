"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setUpgradeInProgress = setUpgradeInProgress;
exports.isUpgradeInProgress = isUpgradeInProgress;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var upgradeInProgress = false;

function setUpgradeInProgress(show) {
  upgradeInProgress = show;
}

function isUpgradeInProgress() {
  return upgradeInProgress;
}