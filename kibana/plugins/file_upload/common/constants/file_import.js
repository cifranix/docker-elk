"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_KBN_VERSION = exports.ES_GEO_FIELD_TYPE = exports.INDEX_META_DATA_CREATED_BY = exports.MAX_FILE_SIZE = exports.MAX_BYTES = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const MAX_BYTES = 31457280;
exports.MAX_BYTES = MAX_BYTES;
const MAX_FILE_SIZE = 52428800; // Value to use in the Elasticsearch index mapping metadata to identify the
// index as having been created by the File Upload Plugin.

exports.MAX_FILE_SIZE = MAX_FILE_SIZE;
const INDEX_META_DATA_CREATED_BY = 'file-upload-plugin';
exports.INDEX_META_DATA_CREATED_BY = INDEX_META_DATA_CREATED_BY;
const ES_GEO_FIELD_TYPE = {
  GEO_POINT: 'geo_point',
  GEO_SHAPE: 'geo_shape'
};
exports.ES_GEO_FIELD_TYPE = ES_GEO_FIELD_TYPE;
const DEFAULT_KBN_VERSION = 'kbnVersion';
exports.DEFAULT_KBN_VERSION = DEFAULT_KBN_VERSION;