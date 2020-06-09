"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHighlightFieldSegment = exports.isHighlightFieldColumn = exports.isHighlightMessageColumn = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var isHighlightMessageColumn = function isHighlightMessageColumn(column) {
  return column != null && 'message' in column;
};

exports.isHighlightMessageColumn = isHighlightMessageColumn;

var isHighlightFieldColumn = function isHighlightFieldColumn(column) {
  return column != null && 'field' in column;
};

exports.isHighlightFieldColumn = isHighlightFieldColumn;

var isHighlightFieldSegment = function isHighlightFieldSegment(segment) {
  return segment && 'field' in segment && 'highlights' in segment;
};

exports.isHighlightFieldSegment = isHighlightFieldSegment;