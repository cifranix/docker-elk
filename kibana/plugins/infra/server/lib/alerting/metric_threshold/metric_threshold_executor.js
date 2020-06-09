"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIRED_ACTIONS = exports.createMetricThresholdExecutor = exports.getElasticsearchMetricQuery = void 0;

var _lodash = require("lodash");

var _i18n = require("@kbn/i18n");

var _sources = require("../../sources/sources");

var _saved_object_mappings = require("../../sources/saved_object_mappings");

var _create_afterkey_handler = require("../../../utils/create_afterkey_handler");

var _get_all_composite_data = require("../../../utils/get_all_composite_data");

var _network_traffic = require("../../../../common/inventory_models/shared/metrics/snapshot/network_traffic");

var _types = require("./types");

var _get_interval_in_seconds = require("../../../utils/get_interval_in_seconds");

var _query_helpers = require("../../snapshot/query_helpers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const TOTAL_BUCKETS = 5;
const DEFAULT_INDEX_PATTERN = 'metricbeat-*';

const getCurrentValueFromAggregations = (aggregations, aggType) => {
  try {
    const {
      buckets
    } = aggregations.aggregatedIntervals;
    if (!buckets.length) return null; // No Data state

    const mostRecentBucket = buckets[buckets.length - 1];

    if (aggType === 'count') {
      return mostRecentBucket.doc_count;
    }

    const {
      value
    } = mostRecentBucket.aggregatedValue;
    return value;
  } catch (e) {
    return undefined; // Error state
  }
};

const getParsedFilterQuery = filterQuery => {
  if (!filterQuery) return {};

  try {
    return JSON.parse(filterQuery).bool;
  } catch (e) {
    return [{
      query_string: {
        query: filterQuery,
        analyze_wildcard: true
      }
    }];
  }
};

const getElasticsearchMetricQuery = ({
  metric,
  aggType,
  timeUnit,
  timeSize
}, groupBy, filterQuery) => {
  if (aggType === 'count' && metric) {
    throw new Error('Cannot aggregate document count with a metric');
  }

  if (aggType !== 'count' && !metric) {
    throw new Error('Can only aggregate without a metric if using the document count aggregator');
  }

  const interval = `${timeSize}${timeUnit}`;
  const to = Date.now();
  const intervalAsSeconds = (0, _get_interval_in_seconds.getIntervalInSeconds)(interval); // We need enough data for 5 buckets worth of data. We also need
  // to convert the intervalAsSeconds to milliseconds.

  const from = to - intervalAsSeconds * 1000 * TOTAL_BUCKETS;
  const offset = (0, _query_helpers.getDateHistogramOffset)(from, interval);
  const aggregations = aggType === 'count' ? {} : aggType === 'rate' ? (0, _network_traffic.networkTraffic)('aggregatedValue', metric) : {
    aggregatedValue: {
      [aggType]: {
        field: metric
      }
    }
  };
  const baseAggs = {
    aggregatedIntervals: {
      date_histogram: {
        field: '@timestamp',
        fixed_interval: interval,
        offset,
        extended_bounds: {
          min: from,
          max: to
        }
      },
      aggregations
    }
  };
  const aggs = groupBy ? {
    groupings: {
      composite: {
        size: 10,
        sources: [{
          groupBy: {
            terms: {
              field: groupBy
            }
          }
        }]
      },
      aggs: baseAggs
    }
  } : baseAggs;
  const rangeFilters = [{
    range: {
      '@timestamp': {
        gte: from,
        lte: to,
        format: 'epoch_millis'
      }
    }
  }];
  const metricFieldFilters = metric ? [{
    exists: {
      field: metric
    }
  }] : [];
  const parsedFilterQuery = getParsedFilterQuery(filterQuery);
  return {
    query: {
      bool: {
        filter: [...rangeFilters, ...metricFieldFilters, ...(Array.isArray(parsedFilterQuery) ? parsedFilterQuery : [])],
        ...(!Array.isArray(parsedFilterQuery) ? parsedFilterQuery : {})
      }
    },
    size: 0,
    aggs
  };
};

exports.getElasticsearchMetricQuery = getElasticsearchMetricQuery;

const getIndexPattern = async function ({
  savedObjectsClient
}, sourceId = 'default') {
  try {
    const sourceConfiguration = await savedObjectsClient.get(_saved_object_mappings.infraSourceConfigurationSavedObjectType, sourceId);
    const {
      metricAlias
    } = (0, _sources.convertSavedObjectToSavedSourceConfiguration)(sourceConfiguration).configuration;
    return metricAlias || DEFAULT_INDEX_PATTERN;
  } catch (e) {
    if (e.output.statusCode === 404) {
      return DEFAULT_INDEX_PATTERN;
    } else {
      throw e;
    }
  }
};

const getMetric = async function ({
  savedObjectsClient,
  callCluster
}, params, index, groupBy, filterQuery) {
  const {
    aggType
  } = params;
  const searchBody = getElasticsearchMetricQuery(params, groupBy, filterQuery);

  try {
    if (groupBy) {
      const bucketSelector = response => {
        var _response$aggregation, _response$aggregation2;

        return ((_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : (_response$aggregation2 = _response$aggregation.groupings) === null || _response$aggregation2 === void 0 ? void 0 : _response$aggregation2.buckets) || [];
      };

      const afterKeyHandler = (0, _create_afterkey_handler.createAfterKeyHandler)('aggs.groupings.composite.after', response => {
        var _response$aggregation3, _response$aggregation4;

        return (_response$aggregation3 = response.aggregations) === null || _response$aggregation3 === void 0 ? void 0 : (_response$aggregation4 = _response$aggregation3.groupings) === null || _response$aggregation4 === void 0 ? void 0 : _response$aggregation4.after_key;
      });
      const compositeBuckets = await (0, _get_all_composite_data.getAllCompositeData)(body => callCluster('search', {
        body,
        index
      }), searchBody, bucketSelector, afterKeyHandler);
      return compositeBuckets.reduce((result, bucket) => ({ ...result,
        [bucket.key.groupBy]: getCurrentValueFromAggregations(bucket, aggType)
      }), {});
    }

    const result = await callCluster('search', {
      body: searchBody,
      index
    });
    return {
      '*': getCurrentValueFromAggregations(result.aggregations, aggType)
    };
  } catch (e) {
    return {
      '*': undefined
    }; // Trigger an Error state
  }
};

const comparatorMap = {
  [_types.Comparator.BETWEEN]: (value, [a, b]) => value >= Math.min(a, b) && value <= Math.max(a, b),
  // `threshold` is always an array of numbers in case the BETWEEN comparator is
  // used; all other compartors will just destructure the first value in the array
  [_types.Comparator.GT]: (a, [b]) => a > b,
  [_types.Comparator.LT]: (a, [b]) => a < b,
  [_types.Comparator.GT_OR_EQ]: (a, [b]) => a >= b,
  [_types.Comparator.LT_OR_EQ]: (a, [b]) => a <= b
};

const mapToConditionsLookup = (list, mapFn) => list.map(mapFn).reduce((result, value, i) => ({ ...result,
  [`condition${i}`]: value
}), {});

const createMetricThresholdExecutor = alertUUID => async function ({
  services,
  params
}) {
  const {
    criteria,
    groupBy,
    filterQuery,
    sourceId
  } = params;
  const alertResults = await Promise.all(criteria.map(criterion => (async () => {
    const index = await getIndexPattern(services, sourceId);
    const currentValues = await getMetric(services, criterion, index, groupBy, filterQuery);
    const {
      threshold,
      comparator
    } = criterion;
    const comparisonFunction = comparatorMap[comparator];
    return (0, _lodash.mapValues)(currentValues, value => ({
      shouldFire: value !== undefined && value !== null && comparisonFunction(value, threshold),
      currentValue: value,
      isNoData: value === null,
      isError: value === undefined
    }));
  })()));
  const groups = Object.keys(alertResults[0]);

  for (const group of groups) {
    const alertInstance = services.alertInstanceFactory(`${alertUUID}-${group}`); // AND logic; all criteria must be across the threshold

    const shouldAlertFire = alertResults.every(result => result[group].shouldFire); // AND logic; because we need to evaluate all criteria, if one of them reports no data then the
    // whole alert is in a No Data/Error state

    const isNoData = alertResults.some(result => result[group].isNoData);
    const isError = alertResults.some(result => result[group].isError);

    if (shouldAlertFire) {
      alertInstance.scheduleActions(FIRED_ACTIONS.id, {
        group,
        valueOf: mapToConditionsLookup(alertResults, result => result[group].currentValue),
        thresholdOf: mapToConditionsLookup(criteria, criterion => criterion.threshold),
        metricOf: mapToConditionsLookup(criteria, criterion => criterion.metric)
      });
    } // Future use: ability to fetch display current alert state


    alertInstance.replaceState({
      alertState: isError ? _types.AlertStates.ERROR : isNoData ? _types.AlertStates.NO_DATA : shouldAlertFire ? _types.AlertStates.ALERT : _types.AlertStates.OK
    });
  }
};

exports.createMetricThresholdExecutor = createMetricThresholdExecutor;
const FIRED_ACTIONS = {
  id: 'metrics.threshold.fired',
  name: _i18n.i18n.translate('xpack.infra.metrics.alerting.threshold.fired', {
    defaultMessage: 'Fired'
  })
};
exports.FIRED_ACTIONS = FIRED_ACTIONS;