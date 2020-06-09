"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryCategoriesAnalysis = void 0;

var _log_analysis = require("../../../common/log_analysis");

var _performance_tracing = require("../../../common/performance_tracing");

var _runtime_types = require("../../../common/runtime_types");

var _errors = require("./errors");

var _log_entry_categories = require("./queries/log_entry_categories");

var _log_entry_category_examples = require("./queries/log_entry_category_examples");

var _log_entry_category_histograms = require("./queries/log_entry_category_histograms");

var _log_entry_data_sets = require("./queries/log_entry_data_sets");

var _ml_jobs = require("./queries/ml_jobs");

var _top_log_entry_categories = require("./queries/top_log_entry_categories");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const COMPOSITE_AGGREGATION_BATCH_SIZE = 1000;

class LogEntryCategoriesAnalysis {
  constructor(libs) {
    this.libs = libs;
  }

  async getTopLogEntryCategories(requestContext, request, sourceId, startTime, endTime, categoryCount, datasets, histograms) {
    const finalizeTopLogEntryCategoriesSpan = (0, _performance_tracing.startTracingSpan)('get top categories');
    const logEntryCategoriesCountJobId = (0, _log_analysis.getJobId)(this.libs.framework.getSpaceId(request), sourceId, _log_analysis.logEntryCategoriesJobTypes[0]);
    const {
      topLogEntryCategories,
      timing: {
        spans: fetchTopLogEntryCategoriesAggSpans
      }
    } = await this.fetchTopLogEntryCategories(requestContext, logEntryCategoriesCountJobId, startTime, endTime, categoryCount, datasets);
    const categoryIds = topLogEntryCategories.map(({
      categoryId
    }) => categoryId);
    const {
      logEntryCategoriesById,
      timing: {
        spans: fetchTopLogEntryCategoryPatternsSpans
      }
    } = await this.fetchLogEntryCategories(requestContext, logEntryCategoriesCountJobId, categoryIds);
    const {
      categoryHistogramsById,
      timing: {
        spans: fetchTopLogEntryCategoryHistogramsSpans
      }
    } = await this.fetchTopLogEntryCategoryHistograms(requestContext, logEntryCategoriesCountJobId, categoryIds, histograms);
    const topLogEntryCategoriesSpan = finalizeTopLogEntryCategoriesSpan();
    return {
      data: topLogEntryCategories.map(topCategory => {
        var _ref, _logEntryCategoriesBy, _categoryHistogramsBy;

        return { ...topCategory,
          regularExpression: (_ref = (_logEntryCategoriesBy = logEntryCategoriesById[topCategory.categoryId]) === null || _logEntryCategoriesBy === void 0 ? void 0 : _logEntryCategoriesBy._source.regex) !== null && _ref !== void 0 ? _ref : '',
          histograms: (_categoryHistogramsBy = categoryHistogramsById[topCategory.categoryId]) !== null && _categoryHistogramsBy !== void 0 ? _categoryHistogramsBy : []
        };
      }),
      timing: {
        spans: [topLogEntryCategoriesSpan, ...fetchTopLogEntryCategoriesAggSpans, ...fetchTopLogEntryCategoryPatternsSpans, ...fetchTopLogEntryCategoryHistogramsSpans]
      }
    };
  }

  async getLogEntryCategoryDatasets(requestContext, request, sourceId, startTime, endTime) {
    const finalizeLogEntryDatasetsSpan = (0, _performance_tracing.startTracingSpan)('get data sets');
    const logEntryCategoriesCountJobId = (0, _log_analysis.getJobId)(this.libs.framework.getSpaceId(request), sourceId, _log_analysis.logEntryCategoriesJobTypes[0]);
    let logEntryDatasetBuckets = [];
    let afterLatestBatchKey;
    let esSearchSpans = [];

    while (true) {
      const finalizeEsSearchSpan = (0, _performance_tracing.startTracingSpan)('fetch category dataset batch from ES');
      const logEntryDatasetsResponse = (0, _runtime_types.decodeOrThrow)(_log_entry_data_sets.logEntryDatasetsResponseRT)((await this.libs.framework.callWithRequest(requestContext, 'search', (0, _log_entry_data_sets.createLogEntryDatasetsQuery)(logEntryCategoriesCountJobId, startTime, endTime, COMPOSITE_AGGREGATION_BATCH_SIZE, afterLatestBatchKey))));

      if (logEntryDatasetsResponse._shards.total === 0) {
        throw new _errors.NoLogAnalysisResultsIndexError(`Failed to find ml result index for job ${logEntryCategoriesCountJobId}.`);
      }

      const {
        after_key: afterKey,
        buckets: latestBatchBuckets
      } = logEntryDatasetsResponse.aggregations.dataset_buckets;
      logEntryDatasetBuckets = [...logEntryDatasetBuckets, ...latestBatchBuckets];
      afterLatestBatchKey = afterKey;
      esSearchSpans = [...esSearchSpans, finalizeEsSearchSpan()];

      if (latestBatchBuckets.length < COMPOSITE_AGGREGATION_BATCH_SIZE) {
        break;
      }
    }

    const logEntryDatasetsSpan = finalizeLogEntryDatasetsSpan();
    return {
      data: logEntryDatasetBuckets.map(logEntryDatasetBucket => logEntryDatasetBucket.key.dataset),
      timing: {
        spans: [logEntryDatasetsSpan, ...esSearchSpans]
      }
    };
  }

  async getLogEntryCategoryExamples(requestContext, request, sourceId, startTime, endTime, categoryId, exampleCount) {
    var _customSettings$logs_, _customSettings$logs_2;

    const finalizeLogEntryCategoryExamplesSpan = (0, _performance_tracing.startTracingSpan)('get category example log entries');
    const logEntryCategoriesCountJobId = (0, _log_analysis.getJobId)(this.libs.framework.getSpaceId(request), sourceId, _log_analysis.logEntryCategoriesJobTypes[0]);
    const {
      mlJob,
      timing: {
        spans: fetchMlJobSpans
      }
    } = await this.fetchMlJob(requestContext, logEntryCategoriesCountJobId);
    const customSettings = (0, _runtime_types.decodeOrThrow)(_log_analysis.jobCustomSettingsRT)(mlJob.custom_settings);
    const indices = customSettings === null || customSettings === void 0 ? void 0 : (_customSettings$logs_ = customSettings.logs_source_config) === null || _customSettings$logs_ === void 0 ? void 0 : _customSettings$logs_.indexPattern;
    const timestampField = customSettings === null || customSettings === void 0 ? void 0 : (_customSettings$logs_2 = customSettings.logs_source_config) === null || _customSettings$logs_2 === void 0 ? void 0 : _customSettings$logs_2.timestampField;

    if (indices == null || timestampField == null) {
      throw new _errors.InsufficientLogAnalysisMlJobConfigurationError(`Failed to find index configuration for ml job ${logEntryCategoriesCountJobId}`);
    }

    const {
      logEntryCategoriesById,
      timing: {
        spans: fetchLogEntryCategoriesSpans
      }
    } = await this.fetchLogEntryCategories(requestContext, logEntryCategoriesCountJobId, [categoryId]);
    const category = logEntryCategoriesById[categoryId];

    if (category == null) {
      throw new _errors.UnknownCategoryError(categoryId);
    }

    const {
      examples,
      timing: {
        spans: fetchLogEntryCategoryExamplesSpans
      }
    } = await this.fetchLogEntryCategoryExamples(requestContext, indices, timestampField, startTime, endTime, category._source.terms, exampleCount);
    const logEntryCategoryExamplesSpan = finalizeLogEntryCategoryExamplesSpan();
    return {
      data: examples,
      timing: {
        spans: [logEntryCategoryExamplesSpan, ...fetchMlJobSpans, ...fetchLogEntryCategoriesSpans, ...fetchLogEntryCategoryExamplesSpans]
      }
    };
  }

  async fetchTopLogEntryCategories(requestContext, logEntryCategoriesCountJobId, startTime, endTime, categoryCount, datasets) {
    const finalizeEsSearchSpan = (0, _performance_tracing.startTracingSpan)('Fetch top categories from ES');
    const topLogEntryCategoriesResponse = (0, _runtime_types.decodeOrThrow)(_top_log_entry_categories.topLogEntryCategoriesResponseRT)((await this.libs.framework.callWithRequest(requestContext, 'search', (0, _top_log_entry_categories.createTopLogEntryCategoriesQuery)(logEntryCategoriesCountJobId, startTime, endTime, categoryCount, datasets))));
    const esSearchSpan = finalizeEsSearchSpan();

    if (topLogEntryCategoriesResponse._shards.total === 0) {
      throw new _errors.NoLogAnalysisResultsIndexError(`Failed to find ml result index for job ${logEntryCategoriesCountJobId}.`);
    }

    const topLogEntryCategories = topLogEntryCategoriesResponse.aggregations.terms_category_id.buckets.map(topCategoryBucket => {
      var _topCategoryBucket$fi, _topCategoryBucket$fi2;

      const maximumAnomalyScoresByDataset = topCategoryBucket.filter_record.terms_dataset.buckets.reduce((accumulatedMaximumAnomalyScores, datasetFromRecord) => {
        var _datasetFromRecord$ma;

        return { ...accumulatedMaximumAnomalyScores,
          [datasetFromRecord.key]: (_datasetFromRecord$ma = datasetFromRecord.maximum_record_score.value) !== null && _datasetFromRecord$ma !== void 0 ? _datasetFromRecord$ma : 0
        };
      }, {});
      return {
        categoryId: parseCategoryId(topCategoryBucket.key),
        logEntryCount: (_topCategoryBucket$fi = topCategoryBucket.filter_model_plot.sum_actual.value) !== null && _topCategoryBucket$fi !== void 0 ? _topCategoryBucket$fi : 0,
        datasets: topCategoryBucket.filter_model_plot.terms_dataset.buckets.map(datasetBucket => {
          var _maximumAnomalyScores;

          return {
            name: datasetBucket.key,
            maximumAnomalyScore: (_maximumAnomalyScores = maximumAnomalyScoresByDataset[datasetBucket.key]) !== null && _maximumAnomalyScores !== void 0 ? _maximumAnomalyScores : 0
          };
        }).sort(_log_analysis.compareDatasetsByMaximumAnomalyScore).reverse(),
        maximumAnomalyScore: (_topCategoryBucket$fi2 = topCategoryBucket.filter_record.maximum_record_score.value) !== null && _topCategoryBucket$fi2 !== void 0 ? _topCategoryBucket$fi2 : 0
      };
    });
    return {
      topLogEntryCategories,
      timing: {
        spans: [esSearchSpan]
      }
    };
  }

  async fetchLogEntryCategories(requestContext, logEntryCategoriesCountJobId, categoryIds) {
    if (categoryIds.length === 0) {
      return {
        logEntryCategoriesById: {},
        timing: {
          spans: []
        }
      };
    }

    const finalizeEsSearchSpan = (0, _performance_tracing.startTracingSpan)('Fetch category patterns from ES');
    const logEntryCategoriesResponse = (0, _runtime_types.decodeOrThrow)(_log_entry_categories.logEntryCategoriesResponseRT)((await this.libs.framework.callWithRequest(requestContext, 'search', (0, _log_entry_categories.createLogEntryCategoriesQuery)(logEntryCategoriesCountJobId, categoryIds))));
    const esSearchSpan = finalizeEsSearchSpan();
    const logEntryCategoriesById = logEntryCategoriesResponse.hits.hits.reduce((accumulatedCategoriesById, categoryHit) => ({ ...accumulatedCategoriesById,
      [categoryHit._source.category_id]: categoryHit
    }), {});
    return {
      logEntryCategoriesById,
      timing: {
        spans: [esSearchSpan]
      }
    };
  }

  async fetchTopLogEntryCategoryHistograms(requestContext, logEntryCategoriesCountJobId, categoryIds, histograms) {
    if (categoryIds.length === 0 || histograms.length === 0) {
      return {
        categoryHistogramsById: {},
        timing: {
          spans: []
        }
      };
    }

    const finalizeEsSearchSpan = (0, _performance_tracing.startTracingSpan)('Fetch category histograms from ES');
    const categoryHistogramsReponses = await Promise.all(histograms.map(({
      bucketCount,
      endTime,
      id: histogramId,
      startTime
    }) => this.libs.framework.callWithRequest(requestContext, 'search', (0, _log_entry_category_histograms.createLogEntryCategoryHistogramsQuery)(logEntryCategoriesCountJobId, categoryIds, startTime, endTime, bucketCount)).then((0, _runtime_types.decodeOrThrow)(_log_entry_category_histograms.logEntryCategoryHistogramsResponseRT)).then(response => ({
      histogramId,
      histogramBuckets: response.aggregations.filters_categories.buckets
    }))));
    const esSearchSpan = finalizeEsSearchSpan();
    const categoryHistogramsById = Object.values(categoryHistogramsReponses).reduce((outerAccumulatedHistograms, {
      histogramId,
      histogramBuckets
    }) => Object.entries(histogramBuckets).reduce((innerAccumulatedHistograms, [categoryBucketKey, categoryBucket]) => {
      var _innerAccumulatedHist;

      const categoryId = parseCategoryId(categoryBucketKey);
      return { ...innerAccumulatedHistograms,
        [categoryId]: [...((_innerAccumulatedHist = innerAccumulatedHistograms[categoryId]) !== null && _innerAccumulatedHist !== void 0 ? _innerAccumulatedHist : []), {
          histogramId,
          buckets: categoryBucket.histogram_timestamp.buckets.map(bucket => ({
            bucketDuration: categoryBucket.histogram_timestamp.meta.bucketDuration,
            logEntryCount: bucket.sum_actual.value,
            startTime: bucket.key
          }))
        }]
      };
    }, outerAccumulatedHistograms), {});
    return {
      categoryHistogramsById,
      timing: {
        spans: [esSearchSpan]
      }
    };
  }

  async fetchMlJob(requestContext, logEntryCategoriesCountJobId) {
    const finalizeMlGetJobSpan = (0, _performance_tracing.startTracingSpan)('Fetch ml job from ES');
    const {
      jobs: [mlJob]
    } = (0, _runtime_types.decodeOrThrow)(_ml_jobs.mlJobsResponseRT)((await this.libs.framework.callWithRequest(requestContext, 'transport.request', (0, _ml_jobs.createMlJobsQuery)([logEntryCategoriesCountJobId]))));
    const mlGetJobSpan = finalizeMlGetJobSpan();

    if (mlJob == null) {
      throw new _errors.NoLogAnalysisMlJobError(`Failed to find ml job ${logEntryCategoriesCountJobId}.`);
    }

    return {
      mlJob,
      timing: {
        spans: [mlGetJobSpan]
      }
    };
  }

  async fetchLogEntryCategoryExamples(requestContext, indices, timestampField, startTime, endTime, categoryQuery, exampleCount) {
    const finalizeEsSearchSpan = (0, _performance_tracing.startTracingSpan)('Fetch examples from ES');
    const {
      hits: {
        hits
      }
    } = (0, _runtime_types.decodeOrThrow)(_log_entry_category_examples.logEntryCategoryExamplesResponseRT)((await this.libs.framework.callWithRequest(requestContext, 'search', (0, _log_entry_category_examples.createLogEntryCategoryExamplesQuery)(indices, timestampField, startTime, endTime, categoryQuery, exampleCount))));
    const esSearchSpan = finalizeEsSearchSpan();
    return {
      examples: hits.map(hit => {
        var _ref2, _hit$_source$event, _hit$_source$message;

        return {
          dataset: (_ref2 = (_hit$_source$event = hit._source.event) === null || _hit$_source$event === void 0 ? void 0 : _hit$_source$event.dataset) !== null && _ref2 !== void 0 ? _ref2 : '',
          message: (_hit$_source$message = hit._source.message) !== null && _hit$_source$message !== void 0 ? _hit$_source$message : '',
          timestamp: hit.sort[0]
        };
      }),
      timing: {
        spans: [esSearchSpan]
      }
    };
  }

}

exports.LogEntryCategoriesAnalysis = LogEntryCategoriesAnalysis;

const parseCategoryId = rawCategoryId => parseInt(rawCategoryId, 10);