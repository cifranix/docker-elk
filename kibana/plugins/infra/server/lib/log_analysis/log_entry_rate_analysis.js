"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryRateAnalysis = void 0;

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _log_analysis = require("../../../common/log_analysis");

var _runtime_types = require("../../../common/runtime_types");

var _errors = require("./errors");

var _queries = require("./queries");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const COMPOSITE_AGGREGATION_BATCH_SIZE = 1000;

class LogEntryRateAnalysis {
  constructor(libs) {
    this.libs = libs;
  }

  getJobIds(request, sourceId) {
    return {
      logEntryRate: (0, _log_analysis.getJobId)(this.libs.framework.getSpaceId(request), sourceId, 'log-entry-rate')
    };
  }

  async getLogEntryRateBuckets(requestContext, request, sourceId, startTime, endTime, bucketDuration) {
    const logRateJobId = this.getJobIds(request, sourceId).logEntryRate;
    let mlModelPlotBuckets = [];
    let afterLatestBatchKey;

    while (true) {
      const mlModelPlotResponse = await this.libs.framework.callWithRequest(requestContext, 'search', (0, _queries.createLogEntryRateQuery)(logRateJobId, startTime, endTime, bucketDuration, COMPOSITE_AGGREGATION_BATCH_SIZE, afterLatestBatchKey));

      if (mlModelPlotResponse._shards.total === 0) {
        throw new _errors.NoLogAnalysisResultsIndexError(`Failed to find ml result index for job ${logRateJobId}.`);
      }

      const {
        after_key: afterKey,
        buckets: latestBatchBuckets
      } = (0, _pipeable.pipe)(_queries.logRateModelPlotResponseRT.decode(mlModelPlotResponse), (0, _Either.map)(response => response.aggregations.timestamp_partition_buckets), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity));
      mlModelPlotBuckets = [...mlModelPlotBuckets, ...latestBatchBuckets];
      afterLatestBatchKey = afterKey;

      if (latestBatchBuckets.length < COMPOSITE_AGGREGATION_BATCH_SIZE) {
        break;
      }
    }

    return mlModelPlotBuckets.reduce((histogramBuckets, timestampPartitionBucket) => {
      const previousHistogramBucket = histogramBuckets[histogramBuckets.length - 1];
      const partition = {
        analysisBucketCount: timestampPartitionBucket.filter_model_plot.doc_count,
        anomalies: timestampPartitionBucket.filter_records.top_hits_record.hits.hits.map(({
          _source: record
        }) => ({
          actualLogEntryRate: record.actual[0],
          anomalyScore: record.record_score,
          duration: record.bucket_span * 1000,
          startTime: record.timestamp,
          typicalLogEntryRate: record.typical[0]
        })),
        averageActualLogEntryRate: timestampPartitionBucket.filter_model_plot.average_actual.value || 0,
        maximumAnomalyScore: timestampPartitionBucket.filter_records.maximum_record_score.value || 0,
        numberOfLogEntries: timestampPartitionBucket.filter_model_plot.sum_actual.value || 0,
        partitionId: timestampPartitionBucket.key.partition
      };

      if (previousHistogramBucket && previousHistogramBucket.startTime === timestampPartitionBucket.key.timestamp) {
        return [...histogramBuckets.slice(0, -1), { ...previousHistogramBucket,
          partitions: [...previousHistogramBucket.partitions, partition]
        }];
      } else {
        return [...histogramBuckets, {
          partitions: [partition],
          startTime: timestampPartitionBucket.key.timestamp
        }];
      }
    }, []);
  }

}

exports.LogEntryRateAnalysis = LogEntryRateAnalysis;