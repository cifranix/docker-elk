"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTopAnomalyScoreAcrossAllPartitions = exports.getAnnotationsForAll = exports.getTotalNumberOfLogEntriesForPartition = exports.getAnnotationsForPartition = exports.getLogEntryRateSeriesForPartition = exports.getLogEntryRateCombinedSeries = exports.getLogEntryRatePartitionedSeries = void 0;

var _i18n = require("@kbn/i18n");

var _log_analysis = require("../../../../../../common/log_analysis");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getLogEntryRatePartitionedSeries = function getLogEntryRatePartitionedSeries(results) {
  return results.histogramBuckets.reduce(function (buckets, bucket) {
    return [].concat(_toConsumableArray(buckets), _toConsumableArray(bucket.partitions.map(function (partition) {
      return {
        group: (0, _log_analysis.getFriendlyNameForPartitionId)(partition.partitionId),
        time: bucket.startTime,
        value: partition.averageActualLogEntryRate
      };
    })));
  }, []);
};

exports.getLogEntryRatePartitionedSeries = getLogEntryRatePartitionedSeries;

var getLogEntryRateCombinedSeries = function getLogEntryRateCombinedSeries(results) {
  return results.histogramBuckets.reduce(function (buckets, bucket) {
    return [].concat(_toConsumableArray(buckets), [{
      time: bucket.startTime,
      value: bucket.partitions.reduce(function (accumulatedValue, partition) {
        return accumulatedValue + partition.averageActualLogEntryRate;
      }, 0)
    }]);
  }, []);
};

exports.getLogEntryRateCombinedSeries = getLogEntryRateCombinedSeries;

var getLogEntryRateSeriesForPartition = function getLogEntryRateSeriesForPartition(results, partitionId) {
  return results.partitionBuckets[partitionId].buckets.reduce(function (buckets, bucket) {
    return [].concat(_toConsumableArray(buckets), [{
      time: bucket.startTime,
      value: bucket.averageActualLogEntryRate
    }]);
  }, []);
};

exports.getLogEntryRateSeriesForPartition = getLogEntryRateSeriesForPartition;

var getAnnotationsForPartition = function getAnnotationsForPartition(results, partitionId) {
  return results.partitionBuckets[partitionId].buckets.reduce(function (annotatedBucketsBySeverity, bucket) {
    var severityCategory = (0, _log_analysis.getSeverityCategoryForScore)(bucket.maximumAnomalyScore);

    if (!severityCategory) {
      return annotatedBucketsBySeverity;
    }

    return _objectSpread({}, annotatedBucketsBySeverity, _defineProperty({}, severityCategory, [].concat(_toConsumableArray(annotatedBucketsBySeverity[severityCategory]), [{
      coordinates: {
        x0: bucket.startTime,
        x1: bucket.startTime + results.bucketDuration
      },
      details: _i18n.i18n.translate('xpack.infra.logs.analysis.partitionMaxAnomalyScoreAnnotationLabel', {
        defaultMessage: 'Max anomaly score: {maxAnomalyScore}',
        values: {
          maxAnomalyScore: (0, _log_analysis.formatAnomalyScore)(bucket.maximumAnomalyScore)
        }
      })
    }])));
  }, {
    warning: [],
    minor: [],
    major: [],
    critical: []
  });
};

exports.getAnnotationsForPartition = getAnnotationsForPartition;

var getTotalNumberOfLogEntriesForPartition = function getTotalNumberOfLogEntriesForPartition(results, partitionId) {
  return results.partitionBuckets[partitionId].totalNumberOfLogEntries;
};

exports.getTotalNumberOfLogEntriesForPartition = getTotalNumberOfLogEntriesForPartition;

var getAnnotationsForAll = function getAnnotationsForAll(results) {
  return results.histogramBuckets.reduce(function (annotatedBucketsBySeverity, bucket) {
    var maxAnomalyScoresByPartition = bucket.partitions.reduce(function (bucketMaxAnomalyScoresByPartition, partition) {
      if (!(0, _log_analysis.getSeverityCategoryForScore)(partition.maximumAnomalyScore)) {
        return bucketMaxAnomalyScoresByPartition;
      }

      return [].concat(_toConsumableArray(bucketMaxAnomalyScoresByPartition), [{
        partitionName: (0, _log_analysis.getFriendlyNameForPartitionId)(partition.partitionId),
        maximumAnomalyScore: (0, _log_analysis.formatAnomalyScore)(partition.maximumAnomalyScore)
      }]);
    }, []);

    if (maxAnomalyScoresByPartition.length === 0) {
      return annotatedBucketsBySeverity;
    }

    var severityCategory = (0, _log_analysis.getSeverityCategoryForScore)(Math.max.apply(Math, _toConsumableArray(maxAnomalyScoresByPartition.map(function (partitionScore) {
      return partitionScore.maximumAnomalyScore;
    }))));

    if (!severityCategory) {
      return annotatedBucketsBySeverity;
    }

    var sortedMaxAnomalyScoresByPartition = maxAnomalyScoresByPartition.sort(function (a, b) {
      return b.maximumAnomalyScore - a.maximumAnomalyScore;
    });
    return _objectSpread({}, annotatedBucketsBySeverity, _defineProperty({}, severityCategory, [].concat(_toConsumableArray(annotatedBucketsBySeverity[severityCategory]), [{
      coordinates: {
        x0: bucket.startTime,
        x1: bucket.startTime + results.bucketDuration
      },
      details: JSON.stringify({
        anomalyScoresByPartition: sortedMaxAnomalyScoresByPartition
      })
    }])));
  }, {
    warning: [],
    minor: [],
    major: [],
    critical: []
  });
};

exports.getAnnotationsForAll = getAnnotationsForAll;

var getTopAnomalyScoreAcrossAllPartitions = function getTopAnomalyScoreAcrossAllPartitions(results) {
  var allTopScores = Object.values(results.partitionBuckets).reduce(function (scores, partition) {
    return [].concat(_toConsumableArray(scores), [partition.topAnomalyScore]);
  }, []);
  return Math.max.apply(Math, _toConsumableArray(allTopScores));
};

exports.getTopAnomalyScoreAcrossAllPartitions = getTopAnomalyScoreAcrossAllPartitions;