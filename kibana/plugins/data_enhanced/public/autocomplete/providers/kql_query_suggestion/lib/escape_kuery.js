"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeQuotes = escapeQuotes;
exports.escapeKuery = void 0;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function escapeQuotes(str) {
  return str.replace(/"/g, '\\"');
}

var escapeKuery = (0, _lodash.flow)(escapeSpecialCharacters, escapeAndOr, escapeNot, escapeWhitespace); // See the SpecialCharacter rule in kuery.peg

exports.escapeKuery = escapeKuery;

function escapeSpecialCharacters(str) {
  return str.replace(/[\\():<>"*]/g, '\\$&'); // $& means the whole matched string
} // See the Keyword rule in kuery.peg


function escapeAndOr(str) {
  return str.replace(/(\s+)(and|or)(\s+)/gi, '$1\\$2$3');
}

function escapeNot(str) {
  return str.replace(/not(\s+)/gi, '\\$&');
} // See the Space rule in kuery.peg


function escapeWhitespace(str) {
  return str.replace(/\t/g, '\\t').replace(/\r/g, '\\r').replace(/\n/g, '\\n');
}