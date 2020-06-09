"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWaffleMapGroupWithNodes = isWaffleMapGroupWithNodes;
exports.isWaffleMapGroupWithGroups = isWaffleMapGroupWithGroups;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function isWaffleMapGroupWithNodes(subject) {
  return subject && subject.nodes != null && Array.isArray(subject.nodes);
}

function isWaffleMapGroupWithGroups(subject) {
  return subject && subject.groups != null && Array.isArray(subject.groups);
}