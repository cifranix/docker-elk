"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INDEX_META_DATA_CREATED_BY = exports.MAX_BYTES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const MAX_BYTES = 104857600; // Value to use in the Elasticsearch index mapping meta data to identify the
// index as having been created by the ML File Data Visualizer.

exports.MAX_BYTES = MAX_BYTES;
const INDEX_META_DATA_CREATED_BY = 'ml-file-data-visualizer';
exports.INDEX_META_DATA_CREATED_BY = INDEX_META_DATA_CREATED_BY;