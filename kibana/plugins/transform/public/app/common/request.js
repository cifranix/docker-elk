"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPivotQuery = getPivotQuery;
exports.isSimpleQuery = isSimpleQuery;
exports.isMatchAllQuery = isMatchAllQuery;
exports.isDefaultQuery = isDefaultQuery;
exports.getPreviewRequestBody = getPreviewRequestBody;
exports.getCreateRequestBody = getCreateRequestBody;
exports.defaultQuery = exports.matchAllQuery = void 0;

var _common = require("../../../common/types/common");

var _common2 = require("../common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getPivotQuery(search) {
  if (typeof search === 'string') {
    return {
      query_string: {
        query: search,
        default_operator: 'AND'
      }
    };
  }

  return search;
}

function isSimpleQuery(arg) {
  return arg.query_string !== undefined;
}

var matchAllQuery = {
  match_all: {}
};
exports.matchAllQuery = matchAllQuery;

function isMatchAllQuery(query) {
  return query.match_all !== undefined && Object.keys(query.match_all).length === 0;
}

var defaultQuery = {
  query_string: {
    query: '*'
  }
};
exports.defaultQuery = defaultQuery;

function isDefaultQuery(query) {
  return isSimpleQuery(query) && query.query_string.query === '*';
}

function getPreviewRequestBody(indexPatternTitle, query, groupBy, aggs) {
  var index = indexPatternTitle.split(',').map(function (name) {
    return name.trim();
  });
  var request = {
    source: {
      index: index
    },
    pivot: {
      group_by: {},
      aggregations: {}
    }
  };

  if (!isDefaultQuery(query) && !isMatchAllQuery(query)) {
    request.source.query = query;
  }

  groupBy.forEach(function (g) {
    if ((0, _common2.isGroupByTerms)(g)) {
      var termsAgg = {
        terms: {
          field: g.field
        }
      };
      request.pivot.group_by[g.aggName] = termsAgg;
    } else if ((0, _common2.isGroupByHistogram)(g)) {
      var histogramAgg = {
        histogram: {
          field: g.field,
          interval: g.interval
        }
      };
      request.pivot.group_by[g.aggName] = histogramAgg;
    } else if ((0, _common2.isGroupByDateHistogram)(g)) {
      var dateHistogramAgg = {
        date_histogram: {
          field: g.field,
          calendar_interval: g.calendar_interval
        }
      };
      request.pivot.group_by[g.aggName] = dateHistogramAgg;
    } else {
      request.pivot.group_by[g.aggName] = (0, _common2.getEsAggFromGroupByConfig)(g);
    }
  });
  aggs.forEach(function (agg) {
    request.pivot.aggregations[agg.aggName] = (0, _common2.getEsAggFromAggConfig)(agg);
  });
  return request;
}

function getCreateRequestBody(indexPatternTitle, pivotState, transformDetailsState) {
  var request = _objectSpread({}, getPreviewRequestBody(indexPatternTitle, getPivotQuery(pivotState.searchQuery), (0, _common.dictionaryToArray)(pivotState.groupByList), (0, _common.dictionaryToArray)(pivotState.aggList)), {}, transformDetailsState.transformDescription !== '' ? {
    description: transformDetailsState.transformDescription
  } : {}, {
    dest: {
      index: transformDetailsState.destinationIndex
    }
  }, transformDetailsState.isContinuousModeEnabled ? {
    sync: {
      time: {
        field: transformDetailsState.continuousModeDateField,
        delay: transformDetailsState.continuousModeDelay
      }
    }
  } : {});

  return request;
}