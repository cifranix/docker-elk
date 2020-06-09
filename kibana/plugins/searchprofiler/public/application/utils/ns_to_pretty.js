"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nsToPretty = nsToPretty;

var _ms_to_pretty = require("./ms_to_pretty");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function nsToPretty(ns, precision) {
  if (!precision) {
    precision = 1;
  }

  var units = ['ns', 'µs'];

  for (var _i = 0, _units = units; _i < _units.length; _i++) {
    var unit = _units[_i];

    if (ns < 1000) {
      return ns.toFixed(precision) + unit;
    }

    ns /= 1000;
  }

  return (0, _ms_to_pretty.msToPretty)(ns, precision);
}