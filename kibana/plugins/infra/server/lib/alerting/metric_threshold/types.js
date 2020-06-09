"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertStates = exports.Comparator = exports.METRIC_THRESHOLD_ALERT_TYPE_ID = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const METRIC_THRESHOLD_ALERT_TYPE_ID = 'metrics.alert.threshold';
exports.METRIC_THRESHOLD_ALERT_TYPE_ID = METRIC_THRESHOLD_ALERT_TYPE_ID;
let Comparator;
exports.Comparator = Comparator;

(function (Comparator) {
  Comparator["GT"] = ">";
  Comparator["LT"] = "<";
  Comparator["GT_OR_EQ"] = ">=";
  Comparator["LT_OR_EQ"] = "<=";
  Comparator["BETWEEN"] = "between";
})(Comparator || (exports.Comparator = Comparator = {}));

let AlertStates;
exports.AlertStates = AlertStates;

(function (AlertStates) {
  AlertStates[AlertStates["OK"] = 0] = "OK";
  AlertStates[AlertStates["ALERT"] = 1] = "ALERT";
  AlertStates[AlertStates["NO_DATA"] = 2] = "NO_DATA";
  AlertStates[AlertStates["ERROR"] = 3] = "ERROR";
})(AlertStates || (exports.AlertStates = AlertStates = {}));