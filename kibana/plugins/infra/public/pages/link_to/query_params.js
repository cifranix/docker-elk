"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFromFromLocation = exports.getToFromLocation = exports.getFilterFromLocation = exports.getTimeFromLocation = void 0;

var _url_state = require("../../utils/url_state");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getTimeFromLocation = function getTimeFromLocation(location) {
  var timeParam = (0, _url_state.getParamFromQueryString)((0, _url_state.getQueryStringFromLocation)(location), 'time');
  return timeParam ? parseFloat(timeParam) : NaN;
};

exports.getTimeFromLocation = getTimeFromLocation;

var getFilterFromLocation = function getFilterFromLocation(location) {
  var param = (0, _url_state.getParamFromQueryString)((0, _url_state.getQueryStringFromLocation)(location), 'filter');
  return param ? param : '';
};

exports.getFilterFromLocation = getFilterFromLocation;

var getToFromLocation = function getToFromLocation(location) {
  var timeParam = (0, _url_state.getParamFromQueryString)((0, _url_state.getQueryStringFromLocation)(location), 'to');
  return timeParam ? parseFloat(timeParam) : NaN;
};

exports.getToFromLocation = getToFromLocation;

var getFromFromLocation = function getFromFromLocation(location) {
  var timeParam = (0, _url_state.getParamFromQueryString)((0, _url_state.getQueryStringFromLocation)(location), 'from');
  return timeParam ? parseFloat(timeParam) : NaN;
};

exports.getFromFromLocation = getFromFromLocation;