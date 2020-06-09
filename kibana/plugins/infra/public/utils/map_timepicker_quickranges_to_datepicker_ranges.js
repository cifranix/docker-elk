"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapKibanaQuickRangesToDatePickerRanges = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var mapKibanaQuickRangesToDatePickerRanges = function mapKibanaQuickRangesToDatePickerRanges(timepickerQuickRanges) {
  return timepickerQuickRanges ? timepickerQuickRanges.map(function (r) {
    return {
      start: r.from,
      end: r.to,
      label: r.display
    };
  }) : [];
};

exports.mapKibanaQuickRangesToDatePickerRanges = mapKibanaQuickRangesToDatePickerRanges;