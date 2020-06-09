"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTemplate = renderTemplate;
exports.getMedianStringLength = getMedianStringLength;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// A simple template renderer, it replaces mustache/angular style {{...}} tags with
// the values provided via the data object
function renderTemplate(str, data) {
  const matches = str.match(/{{(.*?)}}/g);

  if (Array.isArray(matches) && data !== undefined) {
    matches.forEach(v => {
      str = str.replace(v, data[v.replace(/{{|}}/g, '')]);
    });
  }

  return str;
}

function getMedianStringLength(strings) {
  const sortedStringLengths = strings.map(s => s.length).sort((a, b) => a - b);
  return sortedStringLengths[Math.floor(sortedStringLengths.length / 2)] || 0;
}