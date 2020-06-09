"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kibanaContextValueMock = void 0;

var _index_pattern = require("./index_pattern");

var _index_patterns = require("./index_patterns");

var _kibana_config = require("./kibana_config");

var _saved_search = require("./saved_search");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var kibanaContextValueMock = {
  combinedQuery: {
    query: 'the-query-string',
    language: 'the-query-language'
  },
  currentIndexPattern: _index_pattern.indexPatternMock,
  currentSavedSearch: _saved_search.savedSearchMock,
  indexPatterns: _index_patterns.indexPatternsMock,
  kibanaConfig: _kibana_config.kibanaConfigMock
};
exports.kibanaContextValueMock = kibanaContextValueMock;