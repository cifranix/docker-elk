"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSearchItems = createSearchItems;
exports.checkCardinalitySuccess = checkCardinalitySuccess;

var _public = require("../../../../../../../../src/plugins/data/public");

var _search = require("../../../../../common/constants/search");

var _index_utils = require("../../../util/index_utils");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

// Provider for creating the items used for searching and job creation.
function createSearchItems(kibanaConfig, indexPattern, savedSearch) {
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
      must: [{
        match_all: {}
      }]
    }
  };

  if (savedSearch !== null) {
    var data = (0, _index_utils.getQueryFromSavedSearch)(savedSearch);
    query = data.query;
    var filter = data.filter;
    var filters = Array.isArray(filter) ? filter : [];

    if (query.language === _search.SEARCH_QUERY_LANGUAGE.KUERY) {
      var ast = _public.esKuery.fromKueryExpression(query.query);

      if (query.query !== '') {
        combinedQuery = _public.esKuery.toElasticsearchQuery(ast, indexPattern);
      }

      var filterQuery = _public.esQuery.buildQueryFromFilters(filters, indexPattern);

      if (combinedQuery.bool.filter === undefined) {
        combinedQuery.bool.filter = [];
      }

      if (combinedQuery.bool.must_not === undefined) {
        combinedQuery.bool.must_not = [];
      }

      combinedQuery.bool.filter = [].concat(_toConsumableArray(combinedQuery.bool.filter), _toConsumableArray(filterQuery.filter));
      combinedQuery.bool.must_not = [].concat(_toConsumableArray(combinedQuery.bool.must_not), _toConsumableArray(filterQuery.must_not));
    } else {
      var esQueryConfigs = _public.esQuery.getEsQueryConfig(kibanaConfig);

      combinedQuery = _public.esQuery.buildEsQuery(indexPattern, [query], filters, esQueryConfigs);
    }
  }

  return {
    query: query,
    combinedQuery: combinedQuery
  };
} // Only model plot cardinality relevant
// format:[{id:"cardinality_model_plot_high",modelPlotCardinality:11405}, {id:"cardinality_partition_field",fieldName:"clientip"}]


function checkCardinalitySuccess(data) {
  var response = {
    success: true
  }; // There were no fields to run cardinality on.

  if (Array.isArray(data) && data.length === 0) {
    return response;
  }

  for (var i = 0; i < data.length; i++) {
    if (data[i].id === 'success_cardinality') {
      break;
    }

    if (data[i].id === 'cardinality_model_plot_high') {
      response.success = false;
      response.highCardinality = data[i].modelPlotCardinality;
      break;
    }
  }

  return response;
}