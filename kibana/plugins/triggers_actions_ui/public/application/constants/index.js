"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BASE_ALERT_API_PATH", {
  enumerable: true,
  get: function get() {
    return _common.BASE_ALERT_API_PATH;
  }
});
Object.defineProperty(exports, "BASE_ACTION_API_PATH", {
  enumerable: true,
  get: function get() {
    return _common2.BASE_ACTION_API_PATH;
  }
});
Object.defineProperty(exports, "TIME_UNITS", {
  enumerable: true,
  get: function get() {
    return _time_units.TIME_UNITS;
  }
});
exports.DEFAULT_SEARCH_PAGE_SIZE = exports.SORT_ORDERS = exports.routeToAlertDetails = exports.routeToAlerts = exports.routeToConnectors = exports.routeToHome = exports.BASE_PATH = void 0;

var _common = require("../../../../alerting/common");

var _common2 = require("../../../../actions/common");

var _time_units = require("./time_units");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var BASE_PATH = '/management/kibana/triggersActions';
exports.BASE_PATH = BASE_PATH;
var routeToHome = "".concat(BASE_PATH);
exports.routeToHome = routeToHome;
var routeToConnectors = "".concat(BASE_PATH, "/connectors");
exports.routeToConnectors = routeToConnectors;
var routeToAlerts = "".concat(BASE_PATH, "/alerts");
exports.routeToAlerts = routeToAlerts;
var routeToAlertDetails = "".concat(BASE_PATH, "/alert/:alertId");
exports.routeToAlertDetails = routeToAlertDetails;
var SORT_ORDERS;
exports.SORT_ORDERS = SORT_ORDERS;

(function (SORT_ORDERS) {
  SORT_ORDERS["ASCENDING"] = "asc";
  SORT_ORDERS["DESCENDING"] = "desc";
})(SORT_ORDERS || (exports.SORT_ORDERS = SORT_ORDERS = {}));

var DEFAULT_SEARCH_PAGE_SIZE = 10;
exports.DEFAULT_SEARCH_PAGE_SIZE = DEFAULT_SEARCH_PAGE_SIZE;