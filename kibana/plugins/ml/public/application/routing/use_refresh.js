"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRefresh = void 0;

var _reactUse = require("react-use");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _annotations_service = require("../services/annotations_service");

var _timefilter_refresh_service = require("../services/timefilter_refresh_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var refresh$ = (0, _rxjs.merge)(_timefilter_refresh_service.mlTimefilterRefresh$, _timefilter_refresh_service.mlTimefilterTimeChange$, _annotations_service.annotationsRefresh$.pipe((0, _operators.map)(function (d) {
  return {
    lastRefresh: d
  };
})));

var useRefresh = function useRefresh() {
  return (0, _reactUse.useObservable)(refresh$);
};

exports.useRefresh = useRefresh;