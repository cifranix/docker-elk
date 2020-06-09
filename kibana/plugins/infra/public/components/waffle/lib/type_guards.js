"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInfraWaffleMapStepLegend = isInfraWaffleMapStepLegend;
exports.isInfraWaffleMapGradientLegend = isInfraWaffleMapGradientLegend;

var _lib = require("../../../lib/lib");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isInfraWaffleMapStepLegend(subject) {
  return subject.type && subject.type === _lib.InfraWaffleMapLegendMode.step;
}

function isInfraWaffleMapGradientLegend(subject) {
  return subject.type && subject.type === _lib.InfraWaffleMapLegendMode.gradient;
}