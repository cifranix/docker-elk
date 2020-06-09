"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataVisualizer = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _field_types = require("../../../common/constants/field_types");

var _job_utils = require("../../../common/util/job_utils");

var _query_utils = require("../../lib/query_utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const SAMPLER_TOP_TERMS_THRESHOLD = 100000;
const SAMPLER_TOP_TERMS_SHARD_SIZE = 5000;
const AGGREGATABLE_EXISTS_REQUEST_BATCH_SIZE = 200;
const FIELDS_REQUEST_BATCH_SIZE = 10;

class DataVisualizer {
  constructor(callAsCurrentUser) {
    _defineProperty(this, "callAsCurrentUser", void 0);

    this.callAsCurrentUser = callAsCurrentUser;
  } // Obtains overall stats on the fields in the supplied index pattern, returning an object
  // containing the total document count, and four arrays showing which of the supplied
  // aggregatable and non-aggregatable fields do or do not exist in documents.
  // Sampling will be used if supplied samplerShardSize > 0.


  async getOverallStats(indexPatternTitle, query, aggregatableFields, nonAggregatableFields, samplerShardSize, timeFieldName, earliestMs, latestMs) {
    const stats = {
      totalCount: 0,
      aggregatableExistsFields: [],
      aggregatableNotExistsFields: [],
      nonAggregatableExistsFields: [],
      nonAggregatableNotExistsFields: []
    }; // To avoid checking for the existence of too many aggregatable fields in one request,
    // split the check into multiple batches (max 200 fields per request).

    const batches = [[]];

    _lodash.default.each(aggregatableFields, field => {
      let lastArray = _lodash.default.last(batches);

      if (lastArray.length === AGGREGATABLE_EXISTS_REQUEST_BATCH_SIZE) {
        lastArray = [];
        batches.push(lastArray);
      }

      lastArray.push(field);
    });

    await Promise.all(batches.map(async fields => {
      const batchStats = await this.checkAggregatableFieldsExist(indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs); // Total count will be returned with each batch of fields. Just overwrite.

      stats.totalCount = batchStats.totalCount; // Add to the lists of fields which do and do not exist.

      stats.aggregatableExistsFields.push(...batchStats.aggregatableExistsFields);
      stats.aggregatableNotExistsFields.push(...batchStats.aggregatableNotExistsFields);
    }));
    await Promise.all(nonAggregatableFields.map(async field => {
      const existsInDocs = await this.checkNonAggregatableFieldExists(indexPatternTitle, query, field, timeFieldName, earliestMs, latestMs);
      const fieldData = {
        fieldName: field,
        existsInDocs,
        stats: {}
      };

      if (existsInDocs === true) {
        stats.nonAggregatableExistsFields.push(fieldData);
      } else {
        stats.nonAggregatableNotExistsFields.push(fieldData);
      }
    }));
    return stats;
  } // Obtains statistics for supplied list of fields. The statistics for each field in the
  // returned array depend on the type of the field (keyword, number, date etc).
  // Sampling will be used if supplied samplerShardSize > 0.


  async getStatsForFields(indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs, interval, maxExamples) {
    // Batch up fields by type, getting stats for multiple fields at a time.
    const batches = [];
    const batchedFields = {};

    _lodash.default.each(fields, field => {
      if (field.fieldName === undefined) {
        // undefined fieldName is used for a document count request.
        // getDocumentCountStats requires timeField - don't add to batched requests if not defined
        if (timeFieldName !== undefined) {
          batches.push([field]);
        }
      } else {
        const fieldType = field.type;

        if (batchedFields[fieldType] === undefined) {
          batchedFields[fieldType] = [[]];
        }

        let lastArray = _lodash.default.last(batchedFields[fieldType]);

        if (lastArray.length === FIELDS_REQUEST_BATCH_SIZE) {
          lastArray = [];
          batchedFields[fieldType].push(lastArray);
        }

        lastArray.push(field);
      }
    });

    _lodash.default.each(batchedFields, lists => {
      batches.push(...lists);
    });

    let results = [];
    await Promise.all(batches.map(async batch => {
      let batchStats = [];
      const first = batch[0];

      switch (first.type) {
        case _field_types.ML_JOB_FIELD_TYPES.NUMBER:
          // undefined fieldName is used for a document count request.
          if (first.fieldName !== undefined) {
            batchStats = await this.getNumericFieldsStats(indexPatternTitle, query, batch, samplerShardSize, timeFieldName, earliestMs, latestMs);
          } else {
            // Will only ever be one document count card,
            // so no value in batching up the single request.
            const stats = await this.getDocumentCountStats(indexPatternTitle, query, timeFieldName, earliestMs, latestMs, interval);
            batchStats.push(stats);
          }

          break;

        case _field_types.ML_JOB_FIELD_TYPES.KEYWORD:
        case _field_types.ML_JOB_FIELD_TYPES.IP:
          batchStats = await this.getStringFieldsStats(indexPatternTitle, query, batch, samplerShardSize, timeFieldName, earliestMs, latestMs);
          break;

        case _field_types.ML_JOB_FIELD_TYPES.DATE:
          batchStats = await this.getDateFieldsStats(indexPatternTitle, query, batch, samplerShardSize, timeFieldName, earliestMs, latestMs);
          break;

        case _field_types.ML_JOB_FIELD_TYPES.BOOLEAN:
          batchStats = await this.getBooleanFieldsStats(indexPatternTitle, query, batch, samplerShardSize, timeFieldName, earliestMs, latestMs);
          break;

        case _field_types.ML_JOB_FIELD_TYPES.TEXT:
        default:
          // Use an exists filter on the the field name to get
          // examples of the field, so cannot batch up.
          await Promise.all(batch.map(async field => {
            const stats = await this.getFieldExamples(indexPatternTitle, query, field.fieldName, timeFieldName, earliestMs, latestMs, maxExamples);
            batchStats.push(stats);
          }));
          break;
      }

      results = [...results, ...batchStats];
    }));
    return results;
  }

  async checkAggregatableFieldsExist(indexPatternTitle, query, aggregatableFields, samplerShardSize, timeFieldName, earliestMs, latestMs) {
    const index = indexPatternTitle;
    const size = 0;
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query); // Value count aggregation faster way of checking if field exists than using
    // filter aggregation with exists query.

    const aggs = {};
    aggregatableFields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field, i);
      aggs[`${safeFieldName}_count`] = {
        filter: {
          exists: {
            field
          }
        }
      };
      aggs[`${safeFieldName}_cardinality`] = {
        cardinality: {
          field
        }
      };
    });
    const body = {
      query: {
        bool: {
          filter: filterCriteria
        }
      },
      aggs: (0, _query_utils.buildSamplerAggregation)(aggs, samplerShardSize)
    };
    const resp = await this.callAsCurrentUser('search', {
      index,
      rest_total_hits_as_int: true,
      size,
      body
    });
    const aggregations = resp.aggregations;

    const totalCount = _lodash.default.get(resp, ['hits', 'total'], 0);

    const stats = {
      totalCount,
      aggregatableExistsFields: [],
      aggregatableNotExistsFields: []
    };
    const aggsPath = (0, _query_utils.getSamplerAggregationsResponsePath)(samplerShardSize);
    const sampleCount = samplerShardSize > 0 ? _lodash.default.get(aggregations, ['sample', 'doc_count'], 0) : totalCount;
    aggregatableFields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field, i);

      const count = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_count`, 'doc_count'], 0);

      if (count > 0) {
        const cardinality = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_cardinality`, 'value'], 0);

        stats.aggregatableExistsFields.push({
          fieldName: field,
          existsInDocs: true,
          stats: {
            sampleCount,
            count,
            cardinality
          }
        });
      } else {
        stats.aggregatableNotExistsFields.push({
          fieldName: field,
          existsInDocs: false
        });
      }
    });
    return stats;
  }

  async checkNonAggregatableFieldExists(indexPatternTitle, query, field, timeFieldName, earliestMs, latestMs) {
    const index = indexPatternTitle;
    const size = 0;
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query);
    const body = {
      query: {
        bool: {
          filter: filterCriteria
        }
      }
    };
    filterCriteria.push({
      exists: {
        field
      }
    });
    const resp = await this.callAsCurrentUser('search', {
      index,
      rest_total_hits_as_int: true,
      size,
      body
    });
    return resp.hits.total > 0;
  }

  async getDocumentCountStats(indexPatternTitle, query, timeFieldName, earliestMs, latestMs, interval) {
    const index = indexPatternTitle;
    const size = 0;
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query); // Don't use the sampler aggregation as this can lead to some potentially
    // confusing date histogram results depending on the date range of data amongst shards.

    const aggs = {
      eventRate: {
        date_histogram: {
          field: timeFieldName,
          interval,
          min_doc_count: 1
        }
      }
    };
    const body = {
      query: {
        bool: {
          filter: filterCriteria
        }
      },
      aggs
    };
    const resp = await this.callAsCurrentUser('search', {
      index,
      size,
      body
    });
    const buckets = {};

    const dataByTimeBucket = _lodash.default.get(resp, ['aggregations', 'eventRate', 'buckets'], []);

    _lodash.default.each(dataByTimeBucket, dataForTime => {
      const time = dataForTime.key;
      buckets[time] = dataForTime.doc_count;
    });

    return {
      documentCounts: {
        interval,
        buckets
      }
    };
  }

  async getNumericFieldsStats(indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs) {
    const index = indexPatternTitle;
    const size = 0;
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query); // Build the percents parameter which defines the percentiles to query
    // for the metric distribution data.
    // Use a fixed percentile spacing of 5%.

    const MAX_PERCENT = 100;
    const PERCENTILE_SPACING = 5;
    let count = 0;
    const percents = Array.from(Array(MAX_PERCENT / PERCENTILE_SPACING), () => count += PERCENTILE_SPACING);
    const aggs = {};
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);
      aggs[`${safeFieldName}_field_stats`] = {
        filter: {
          exists: {
            field: field.fieldName
          }
        },
        aggs: {
          actual_stats: {
            stats: {
              field: field.fieldName
            }
          }
        }
      };
      aggs[`${safeFieldName}_percentiles`] = {
        percentiles: {
          field: field.fieldName,
          percents,
          keyed: false
        }
      };
      const top = {
        terms: {
          field: field.fieldName,
          size: 10,
          order: {
            _count: 'desc'
          }
        }
      }; // If cardinality >= SAMPLE_TOP_TERMS_THRESHOLD, run the top terms aggregation
      // in a sampler aggregation, even if no sampling has been specified (samplerShardSize < 1).

      if (samplerShardSize < 1 && field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD) {
        aggs[`${safeFieldName}_top`] = {
          sampler: {
            shard_size: SAMPLER_TOP_TERMS_SHARD_SIZE
          },
          aggs: {
            top
          }
        };
      } else {
        aggs[`${safeFieldName}_top`] = top;
      }
    });
    const body = {
      query: {
        bool: {
          filter: filterCriteria
        }
      },
      aggs: (0, _query_utils.buildSamplerAggregation)(aggs, samplerShardSize)
    };
    const resp = await this.callAsCurrentUser('search', {
      index,
      size,
      body
    });
    const aggregations = resp.aggregations;
    const aggsPath = (0, _query_utils.getSamplerAggregationsResponsePath)(samplerShardSize);
    const batchStats = [];
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);

      const docCount = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_field_stats`, 'doc_count'], 0);

      const fieldStatsResp = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_field_stats`, 'actual_stats'], {});

      const topAggsPath = [...aggsPath, `${safeFieldName}_top`];

      if (samplerShardSize < 1 && field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD) {
        topAggsPath.push('top');
      }

      const topValues = _lodash.default.get(aggregations, [...topAggsPath, 'buckets'], []);

      const stats = {
        fieldName: field.fieldName,
        count: docCount,
        min: _lodash.default.get(fieldStatsResp, 'min', 0),
        max: _lodash.default.get(fieldStatsResp, 'max', 0),
        avg: _lodash.default.get(fieldStatsResp, 'avg', 0),
        isTopValuesSampled: field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD || samplerShardSize > 0,
        topValues,
        topValuesSampleSize: topValues.reduce((acc, curr) => acc + curr.doc_count, _lodash.default.get(aggregations, [...topAggsPath, 'sum_other_doc_count'], 0)),
        topValuesSamplerShardSize: field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD ? SAMPLER_TOP_TERMS_SHARD_SIZE : samplerShardSize
      };

      if (stats.count > 0) {
        const percentiles = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_percentiles`, 'values'], []);

        const medianPercentile = _lodash.default.find(percentiles, {
          key: 50
        });

        stats.median = medianPercentile !== undefined ? medianPercentile.value : 0;
        stats.distribution = this.processDistributionData(percentiles, PERCENTILE_SPACING, stats.min);
      }

      batchStats.push(stats);
    });
    return batchStats;
  }

  async getStringFieldsStats(indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs) {
    const index = indexPatternTitle;
    const size = 0;
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query);
    const aggs = {};
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);
      const top = {
        terms: {
          field: field.fieldName,
          size: 10,
          order: {
            _count: 'desc'
          }
        }
      }; // If cardinality >= SAMPLE_TOP_TERMS_THRESHOLD, run the top terms aggregation
      // in a sampler aggregation, even if no sampling has been specified (samplerShardSize < 1).

      if (samplerShardSize < 1 && field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD) {
        aggs[`${safeFieldName}_top`] = {
          sampler: {
            shard_size: SAMPLER_TOP_TERMS_SHARD_SIZE
          },
          aggs: {
            top
          }
        };
      } else {
        aggs[`${safeFieldName}_top`] = top;
      }
    });
    const body = {
      query: {
        bool: {
          filter: filterCriteria
        }
      },
      aggs: (0, _query_utils.buildSamplerAggregation)(aggs, samplerShardSize)
    };
    const resp = await this.callAsCurrentUser('search', {
      index,
      size,
      body
    });
    const aggregations = resp.aggregations;
    const aggsPath = (0, _query_utils.getSamplerAggregationsResponsePath)(samplerShardSize);
    const batchStats = [];
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);
      const topAggsPath = [...aggsPath, `${safeFieldName}_top`];

      if (samplerShardSize < 1 && field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD) {
        topAggsPath.push('top');
      }

      const topValues = _lodash.default.get(aggregations, [...topAggsPath, 'buckets'], []);

      const stats = {
        fieldName: field.fieldName,
        isTopValuesSampled: field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD || samplerShardSize > 0,
        topValues,
        topValuesSampleSize: topValues.reduce((acc, curr) => acc + curr.doc_count, _lodash.default.get(aggregations, [...topAggsPath, 'sum_other_doc_count'], 0)),
        topValuesSamplerShardSize: field.cardinality >= SAMPLER_TOP_TERMS_THRESHOLD ? SAMPLER_TOP_TERMS_SHARD_SIZE : samplerShardSize
      };
      batchStats.push(stats);
    });
    return batchStats;
  }

  async getDateFieldsStats(indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs) {
    const index = indexPatternTitle;
    const size = 0;
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query);
    const aggs = {};
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);
      aggs[`${safeFieldName}_field_stats`] = {
        filter: {
          exists: {
            field: field.fieldName
          }
        },
        aggs: {
          actual_stats: {
            stats: {
              field: field.fieldName
            }
          }
        }
      };
    });
    const body = {
      query: {
        bool: {
          filter: filterCriteria
        }
      },
      aggs: (0, _query_utils.buildSamplerAggregation)(aggs, samplerShardSize)
    };
    const resp = await this.callAsCurrentUser('search', {
      index,
      size,
      body
    });
    const aggregations = resp.aggregations;
    const aggsPath = (0, _query_utils.getSamplerAggregationsResponsePath)(samplerShardSize);
    const batchStats = [];
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);

      const docCount = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_field_stats`, 'doc_count'], 0);

      const fieldStatsResp = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_field_stats`, 'actual_stats'], {});

      batchStats.push({
        fieldName: field.fieldName,
        count: docCount,
        earliest: _lodash.default.get(fieldStatsResp, 'min', 0),
        latest: _lodash.default.get(fieldStatsResp, 'max', 0)
      });
    });
    return batchStats;
  }

  async getBooleanFieldsStats(indexPatternTitle, query, fields, samplerShardSize, timeFieldName, earliestMs, latestMs) {
    const index = indexPatternTitle;
    const size = 0;
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query);
    const aggs = {};
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);
      aggs[`${safeFieldName}_value_count`] = {
        filter: {
          exists: {
            field: field.fieldName
          }
        }
      };
      aggs[`${safeFieldName}_values`] = {
        terms: {
          field: field.fieldName,
          size: 2
        }
      };
    });
    const body = {
      query: {
        bool: {
          filter: filterCriteria
        }
      },
      aggs: (0, _query_utils.buildSamplerAggregation)(aggs, samplerShardSize)
    };
    const resp = await this.callAsCurrentUser('search', {
      index,
      size,
      body
    });
    const aggregations = resp.aggregations;
    const aggsPath = (0, _query_utils.getSamplerAggregationsResponsePath)(samplerShardSize);
    const batchStats = [];
    fields.forEach((field, i) => {
      const safeFieldName = (0, _job_utils.getSafeAggregationName)(field.fieldName, i);
      const stats = {
        fieldName: field.fieldName,
        count: _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_value_count`, 'doc_count'], 0),
        trueCount: 0,
        falseCount: 0
      };

      const valueBuckets = _lodash.default.get(aggregations, [...aggsPath, `${safeFieldName}_values`, 'buckets'], []);

      _lodash.default.each(valueBuckets, bucket => {
        stats[`${bucket.key_as_string}Count`] = bucket.doc_count;
      });

      batchStats.push(stats);
    });
    return batchStats;
  }

  async getFieldExamples(indexPatternTitle, query, field, timeFieldName, earliestMs, latestMs, maxExamples) {
    const index = indexPatternTitle; // Request at least 100 docs so that we have a chance of obtaining
    // 'maxExamples' of the field.

    const size = Math.max(100, maxExamples);
    const filterCriteria = (0, _query_utils.buildBaseFilterCriteria)(timeFieldName, earliestMs, latestMs, query); // Use an exists filter to return examples of the field.

    filterCriteria.push({
      exists: {
        field
      }
    });
    const body = {
      _source: field,
      query: {
        bool: {
          filter: filterCriteria
        }
      }
    };
    const resp = await this.callAsCurrentUser('search', {
      index,
      rest_total_hits_as_int: true,
      size,
      body
    });
    const stats = {
      fieldName: field,
      examples: []
    };

    if (resp.hits.total !== 0) {
      const hits = resp.hits.hits;

      for (let i = 0; i < hits.length; i++) {
        // Look in the _source for the field value.
        // If the field is not in the _source (as will happen if the
        // field is populated using copy_to in the index mapping),
        // there will be no example to add.
        // Use lodash _.get() to support field names containing dots.
        const example = _lodash.default.get(hits[i]._source, field);

        if (example !== undefined && stats.examples.indexOf(example) === -1) {
          stats.examples.push(example);

          if (stats.examples.length === maxExamples) {
            break;
          }
        }
      }
    }

    return stats;
  }

  processDistributionData(percentiles, percentileSpacing, minValue) {
    const distribution = {
      percentiles: [],
      minPercentile: 0,
      maxPercentile: 100
    };

    if (percentiles.length === 0) {
      return distribution;
    }

    let percentileBuckets = [];
    let lowerBound = minValue;

    if (lowerBound >= 0) {
      // By default return results for 0 - 90% percentiles.
      distribution.minPercentile = 0;
      distribution.maxPercentile = 90;
      percentileBuckets = percentiles.slice(0, percentiles.length - 2); // Look ahead to the last percentiles and process these too if
      // they don't add more than 50% to the value range.

      const lastValue = _lodash.default.last(percentileBuckets).value;

      const upperBound = lowerBound + 1.5 * (lastValue - lowerBound);
      const filteredLength = percentileBuckets.length;

      for (let i = filteredLength; i < percentiles.length; i++) {
        if (percentiles[i].value < upperBound) {
          percentileBuckets.push(percentiles[i]);
          distribution.maxPercentile += percentileSpacing;
        } else {
          break;
        }
      }
    } else {
      // By default return results for 5 - 95% percentiles.
      const dataMin = lowerBound;
      lowerBound = percentiles[0].value;
      distribution.minPercentile = 5;
      distribution.maxPercentile = 95;
      percentileBuckets = percentiles.slice(1, percentiles.length - 1); // Add in 0-5 and 95-100% if they don't add more
      // than 25% to the value range at either end.

      const lastValue = _lodash.default.last(percentileBuckets).value;

      const maxDiff = 0.25 * (lastValue - lowerBound);

      if (lowerBound - dataMin < maxDiff) {
        percentileBuckets.splice(0, 0, percentiles[0]);
        distribution.minPercentile = 0;
        lowerBound = dataMin;
      }

      if (percentiles[percentiles.length - 1].value - lastValue < maxDiff) {
        percentileBuckets.push(percentiles[percentiles.length - 1]);
        distribution.maxPercentile = 100;
      }
    } // Combine buckets with the same value.


    const totalBuckets = percentileBuckets.length;
    let lastBucketValue = lowerBound;
    let numEqualValueBuckets = 0;

    for (let i = 0; i < totalBuckets; i++) {
      const bucket = percentileBuckets[i]; // Results from the percentiles aggregation can have precision rounding
      // artifacts e.g returning 200 and 200.000000000123, so check for equality
      // around double floating point precision i.e. 15 sig figs.

      if (bucket.value.toPrecision(15) !== lastBucketValue.toPrecision(15)) {
        // Create a bucket for any 'equal value' buckets which had a value <= last bucket
        if (numEqualValueBuckets > 0) {
          distribution.percentiles.push({
            percent: numEqualValueBuckets * percentileSpacing,
            minValue: lastBucketValue,
            maxValue: lastBucketValue
          });
        }

        distribution.percentiles.push({
          percent: percentileSpacing,
          minValue: lastBucketValue,
          maxValue: bucket.value
        });
        lastBucketValue = bucket.value;
        numEqualValueBuckets = 0;
      } else {
        numEqualValueBuckets++;

        if (i === totalBuckets - 1) {
          // If at the last bucket, create a final bucket for the equal value buckets.
          distribution.percentiles.push({
            percent: numEqualValueBuckets * percentileSpacing,
            minValue: lastBucketValue,
            maxValue: lastBucketValue
          });
        }
      }
    }

    return distribution;
  }

}

exports.DataVisualizer = DataVisualizer;