"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadIndexPatterns = loadIndexPatterns;
exports.getIndexPatternIdByTitle = getIndexPatternIdByTitle;
exports.loadCurrentIndexPattern = loadCurrentIndexPattern;
exports.loadCurrentSavedSearch = loadCurrentSavedSearch;
exports.createSearchItems = createSearchItems;
exports.refreshIndexPatterns = void 0;

var _public = require("../../../../../../../src/plugins/data/public");

var _common = require("../../common");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var indexPatternCache = [];
var fullIndexPatterns;
var currentIndexPattern = null;
var currentSavedSearch = null;
var refreshIndexPatterns;
exports.refreshIndexPatterns = refreshIndexPatterns;

function loadIndexPatterns(savedObjectsClient, indexPatterns) {
  fullIndexPatterns = indexPatterns;
  return savedObjectsClient.find({
    type: 'index-pattern',
    fields: ['id', 'title', 'type', 'fields'],
    perPage: 10000
  }).then(function (response) {
    indexPatternCache = response.savedObjects;

    if (refreshIndexPatterns === null) {
      exports.refreshIndexPatterns = refreshIndexPatterns = function refreshIndexPatterns() {
        return new Promise(function (resolve, reject) {
          loadIndexPatterns(savedObjectsClient, indexPatterns).then(function (resp) {
            resolve(resp);
          }).catch(function (error) {
            reject(error);
          });
        });
      };
    }

    return indexPatternCache;
  });
}

function getIndexPatternIdByTitle(indexPatternTitle) {
  var _indexPatternCache$fi;

  return (_indexPatternCache$fi = indexPatternCache.find(function (d) {
    var _d$attributes;

    return (d === null || d === void 0 ? void 0 : (_d$attributes = d.attributes) === null || _d$attributes === void 0 ? void 0 : _d$attributes.title) === indexPatternTitle;
  })) === null || _indexPatternCache$fi === void 0 ? void 0 : _indexPatternCache$fi.id;
}

function loadCurrentIndexPattern(indexPatterns, indexPatternId) {
  fullIndexPatterns = indexPatterns;
  currentIndexPattern = fullIndexPatterns.get(indexPatternId);
  return currentIndexPattern;
}

function loadCurrentSavedSearch(savedSearches, savedSearchId) {
  currentSavedSearch = savedSearches.get(savedSearchId);
  return currentSavedSearch;
}

function isIndexPattern(arg) {
  return arg !== undefined;
}

// Helper for creating the items used for searching and job creation.
function createSearchItems(indexPattern, savedSearch, config) {
  // query is only used by the data visualizer as it needs
  // a lucene query_string.
  // Using a blank query will cause match_all:{} to be used
  // when passed through luceneStringToDsl
  var query = {
    query: '',
    language: 'lucene'
  };
  var combinedQuery = {
    bool: {
      must: [_common.matchAllQuery]
    }
  };

  if (!isIndexPattern(indexPattern) && savedSearch !== null && savedSearch.id !== undefined) {
    var searchSource = savedSearch.searchSource;
    indexPattern = searchSource.getField('index');
    query = searchSource.getField('query');
    var fs = searchSource.getField('filter');
    var filters = fs.length ? fs : [];

    var esQueryConfigs = _public.esQuery.getEsQueryConfig(config);

    combinedQuery = _public.esQuery.buildEsQuery(indexPattern, [query], filters, esQueryConfigs);
  }

  if (!isIndexPattern(indexPattern)) {
    throw new Error('Index Pattern is not defined.');
  }

  return {
    indexPattern: indexPattern,
    savedSearch: savedSearch,
    query: query,
    combinedQuery: combinedQuery
  };
}