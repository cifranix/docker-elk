"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChartTheme = getChartTheme;

var _charts = require("@elastic/charts");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getChartTheme(isDarkMode) {
  return isDarkMode ? _charts.DARK_THEME : _charts.LIGHT_THEME;
}