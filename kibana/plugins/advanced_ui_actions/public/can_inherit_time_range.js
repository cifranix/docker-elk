"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.canInheritTimeRange = canInheritTimeRange;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function canInheritTimeRange(embeddable) {
  if (!embeddable.parent) {
    return false;
  }

  var parent = embeddable.parent;
  return parent.getInput().timeRange !== undefined;
}