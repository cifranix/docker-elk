"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatHumanReadableDate = formatHumanReadableDate;
exports.formatHumanReadableDateTime = formatHumanReadableDateTime;
exports.formatHumanReadableDateTimeSeconds = formatHumanReadableDateTimeSeconds;

var _format = require("@elastic/eui/lib/services/format");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// utility functions for handling dates
// @ts-ignore
function formatHumanReadableDate(ts) {
  return (0, _format.formatDate)(ts, 'MMMM Do YYYY');
}

function formatHumanReadableDateTime(ts) {
  return (0, _format.formatDate)(ts, 'MMMM Do YYYY, HH:mm');
}

function formatHumanReadableDateTimeSeconds(ts) {
  return (0, _format.formatDate)(ts, 'MMMM Do YYYY, HH:mm:ss');
}