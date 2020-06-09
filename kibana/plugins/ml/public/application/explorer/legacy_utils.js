"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChartContainerWidth = getChartContainerWidth;
exports.getSwimlaneContainerWidth = getSwimlaneContainerWidth;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// This file includes utils which should eventuelly become obsolete once Anomaly Explorer
// is fully migrated to React. Their purpose is to retain functionality while we migrate step by step.
function getChartContainerWidth() {
  var chartContainer = document.querySelector('.explorer-charts');
  return Math.floor(chartContainer && chartContainer.clientWidth || 0);
}

function getSwimlaneContainerWidth() {
  var explorerContainer = document.querySelector('.ml-explorer');
  return explorerContainer && explorerContainer.clientWidth || 0;
}