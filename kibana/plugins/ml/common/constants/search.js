"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SEARCH_QUERY_LANGUAGE = exports.ANOMALIES_TABLE_DEFAULT_QUERY_SIZE = exports.ANNOTATIONS_TABLE_DEFAULT_QUERY_SIZE = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const ANNOTATIONS_TABLE_DEFAULT_QUERY_SIZE = 500;
exports.ANNOTATIONS_TABLE_DEFAULT_QUERY_SIZE = ANNOTATIONS_TABLE_DEFAULT_QUERY_SIZE;
const ANOMALIES_TABLE_DEFAULT_QUERY_SIZE = 500;
exports.ANOMALIES_TABLE_DEFAULT_QUERY_SIZE = ANOMALIES_TABLE_DEFAULT_QUERY_SIZE;
let SEARCH_QUERY_LANGUAGE;
exports.SEARCH_QUERY_LANGUAGE = SEARCH_QUERY_LANGUAGE;

(function (SEARCH_QUERY_LANGUAGE) {
  SEARCH_QUERY_LANGUAGE["KUERY"] = "kuery";
  SEARCH_QUERY_LANGUAGE["LUCENE"] = "lucene";
})(SEARCH_QUERY_LANGUAGE || (exports.SEARCH_QUERY_LANGUAGE = SEARCH_QUERY_LANGUAGE = {}));