"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goToCreateAdvancedWatch = exports.goToCreateThresholdAlert = exports.goToWatchList = exports.registerRouter = void 0;

var _constants = require("../constants");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var router;

var registerRouter = function registerRouter(aRouter) {
  router = aRouter;
};

exports.registerRouter = registerRouter;

var goToWatchList = function goToWatchList() {
  router.history.push({
    pathname: "".concat(_constants.BASE_PATH, "watches")
  });
};

exports.goToWatchList = goToWatchList;

var goToCreateThresholdAlert = function goToCreateThresholdAlert() {
  router.history.push({
    pathname: "".concat(_constants.BASE_PATH, "watches/new-watch/threshold")
  });
};

exports.goToCreateThresholdAlert = goToCreateThresholdAlert;

var goToCreateAdvancedWatch = function goToCreateAdvancedWatch() {
  router.history.push({
    pathname: "".concat(_constants.BASE_PATH, "watches/new-watch/json")
  });
};

exports.goToCreateAdvancedWatch = goToCreateAdvancedWatch;