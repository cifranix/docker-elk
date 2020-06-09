"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMetricData = getMetricData;
exports.getModelPlotOutput = getModelPlotOutput;
exports.getRecordsForCriteria = getRecordsForCriteria;
exports.getScheduledEventsByBucket = getScheduledEventsByBucket;
exports.fetchPartitionFieldsValues = fetchPartitionFieldsValues;

var _operators = require("rxjs/operators");

var _lodash = _interopRequireDefault(require("lodash"));

var _job_utils = require("../../../../common/util/job_utils");

var _ml_api_service = require("../ml_api_service");

var _index_patterns = require("../../../../common/constants/index_patterns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function getMetricData(index, entityFields, query, metricFunction, // ES aggregation name
metricFieldName, timeFieldName, earliestMs, latestMs, interval) {
  // Build the criteria to use in the bool filter part of the request.
  // Add criteria for the time range, entity fields,
  // plus any additional supplied query.
  var shouldCriteria = [];
  var mustCriteria = [{
    range: _defineProperty({}, timeFieldName, {
      gte: earliestMs,
      lte: latestMs,
      format: 'epoch_millis'
    })
  }].concat(_toConsumableArray(query ? [query] : []));
  entityFields.forEach(function (entity) {
    if (entity.fieldValue.length !== 0) {
      mustCriteria.push({
        term: _defineProperty({}, entity.fieldName, entity.fieldValue)
      });
    } else {
      // Add special handling for blank entity field values, checking for either
      // an empty string or the field not existing.
      shouldCriteria.push({
        bool: {
          must: [{
            term: _defineProperty({}, entity.fieldName, '')
          }]
        }
      });
      shouldCriteria.push({
        bool: {
          must_not: [{
            exists: {
              field: entity.fieldName
            }
          }]
        }
      });
    }
  });
  var body = {
    query: {
      bool: {
        must: mustCriteria
      }
    },
    size: 0,
    _source: {
      excludes: []
    },
    aggs: {
      byTime: {
        date_histogram: {
          field: timeFieldName,
          interval: interval,
          min_doc_count: 0
        }
      }
    }
  };

  if (shouldCriteria.length > 0) {
    body.query.bool.should = shouldCriteria;
    body.query.bool.minimum_should_match = shouldCriteria.length / 2;
  }

  if (metricFieldName !== undefined && metricFieldName !== '') {
    body.aggs.byTime.aggs = {};

    var metricAgg = _defineProperty({}, metricFunction, {
      field: metricFieldName
    });

    if (metricFunction === 'percentiles') {
      metricAgg[metricFunction].percents = [_job_utils.ML_MEDIAN_PERCENTS];
    }

    body.aggs.byTime.aggs.metric = metricAgg;
  }

  return _ml_api_service.ml.esSearch$({
    index: index,
    body: body
  }).pipe((0, _operators.map)(function (resp) {
    var _ref, _resp$aggregations, _resp$aggregations$by;

    var obj = {
      success: true,
      results: {}
    };
    var dataByTime = (_ref = resp === null || resp === void 0 ? void 0 : (_resp$aggregations = resp.aggregations) === null || _resp$aggregations === void 0 ? void 0 : (_resp$aggregations$by = _resp$aggregations.byTime) === null || _resp$aggregations$by === void 0 ? void 0 : _resp$aggregations$by.buckets) !== null && _ref !== void 0 ? _ref : [];
    dataByTime.forEach(function (dataForTime) {
      if (metricFunction === 'count') {
        obj.results[dataForTime.key] = dataForTime.doc_count;
      } else {
        var _dataForTime$metric, _dataForTime$metric2;

        var value = dataForTime === null || dataForTime === void 0 ? void 0 : (_dataForTime$metric = dataForTime.metric) === null || _dataForTime$metric === void 0 ? void 0 : _dataForTime$metric.value;
        var values = dataForTime === null || dataForTime === void 0 ? void 0 : (_dataForTime$metric2 = dataForTime.metric) === null || _dataForTime$metric2 === void 0 ? void 0 : _dataForTime$metric2.values;

        if (dataForTime.doc_count === 0) {
          obj.results[dataForTime.key] = null;
        } else if (value !== undefined) {
          obj.results[dataForTime.key] = value;
        } else if (values !== undefined) {
          // Percentiles agg currently returns NaN rather than null when none of the docs in the
          // bucket contain the field used in the aggregation
          // (see elasticsearch issue https://github.com/elastic/elasticsearch/issues/29066).
          // Store as null, so values can be handled in the same manner downstream as other aggs
          // (min, mean, max) which return null.
          var medianValues = values[_job_utils.ML_MEDIAN_PERCENTS];
          obj.results[dataForTime.key] = !isNaN(medianValues) ? medianValues : null;
        } else {
          obj.results[dataForTime.key] = null;
        }
      }
    });
    return obj;
  }));
}

function getModelPlotOutput(jobId, detectorIndex, criteriaFields, earliestMs, latestMs, interval, aggType) {
  var obj = {
    success: true,
    results: {}
  }; // if an aggType object has been passed in, use it.
  // otherwise default to min and max aggs for the upper and lower bounds

  var modelAggs = aggType === undefined ? {
    max: 'max',
    min: 'min'
  } : {
    max: aggType.max,
    min: aggType.min
  }; // Build the criteria to use in the bool filter part of the request.
  // Add criteria for the job ID and time range.

  var mustCriteria = [{
    term: {
      job_id: jobId
    }
  }, {
    range: {
      timestamp: {
        gte: earliestMs,
        lte: latestMs,
        format: 'epoch_millis'
      }
    }
  }]; // Add in term queries for each of the specified criteria.

  _lodash.default.each(criteriaFields, function (criteria) {
    mustCriteria.push({
      term: _defineProperty({}, criteria.fieldName, criteria.fieldValue)
    });
  }); // Add criteria for the detector index. Results from jobs created before 6.1 will not
  // contain a detector_index field, so use a should criteria with a 'not exists' check.


  var shouldCriteria = [{
    term: {
      detector_index: detectorIndex
    }
  }, {
    bool: {
      must_not: [{
        exists: {
          field: 'detector_index'
        }
      }]
    }
  }];
  return _ml_api_service.ml.esSearch$({
    index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
    size: 0,
    body: {
      query: {
        bool: {
          filter: [{
            query_string: {
              query: 'result_type:model_plot',
              analyze_wildcard: true
            }
          }, {
            bool: {
              must: mustCriteria,
              should: shouldCriteria,
              minimum_should_match: 1
            }
          }]
        }
      },
      aggs: {
        times: {
          date_histogram: {
            field: 'timestamp',
            interval: interval,
            min_doc_count: 0
          },
          aggs: {
            actual: {
              avg: {
                field: 'actual'
              }
            },
            modelUpper: _defineProperty({}, modelAggs.max, {
              field: 'model_upper'
            }),
            modelLower: _defineProperty({}, modelAggs.min, {
              field: 'model_lower'
            })
          }
        }
      }
    }
  }).pipe((0, _operators.map)(function (resp) {
    var aggregationsByTime = _lodash.default.get(resp, ['aggregations', 'times', 'buckets'], []);

    _lodash.default.each(aggregationsByTime, function (dataForTime) {
      var time = dataForTime.key;

      var modelUpper = _lodash.default.get(dataForTime, ['modelUpper', 'value']);

      var modelLower = _lodash.default.get(dataForTime, ['modelLower', 'value']);

      var actual = _lodash.default.get(dataForTime, ['actual', 'value']);

      obj.results[time] = {
        actual: actual,
        modelUpper: modelUpper === undefined || isFinite(modelUpper) === false ? null : modelUpper,
        modelLower: modelLower === undefined || isFinite(modelLower) === false ? null : modelLower
      };
    });

    return obj;
  }));
}

// Queries Elasticsearch to obtain the record level results matching the given criteria,
// for the specified job(s), time range, and record score threshold.
// criteriaFields parameter must be an array, with each object in the array having 'fieldName'
// 'fieldValue' properties.
// Pass an empty array or ['*'] to search over all job IDs.
function getRecordsForCriteria(jobIds, criteriaFields, threshold, earliestMs, latestMs, maxResults) {
  var obj = {
    success: true,
    records: []
  }; // Build the criteria to use in the bool filter part of the request.
  // Add criteria for the time range, record score, plus any specified job IDs.

  var boolCriteria = [{
    range: {
      timestamp: {
        gte: earliestMs,
        lte: latestMs,
        format: 'epoch_millis'
      }
    }
  }, {
    range: {
      record_score: {
        gte: threshold
      }
    }
  }];

  if (jobIds && jobIds.length > 0 && !(jobIds.length === 1 && jobIds[0] === '*')) {
    var jobIdFilterStr = '';

    _lodash.default.each(jobIds, function (jobId, i) {
      if (i > 0) {
        jobIdFilterStr += ' OR ';
      }

      jobIdFilterStr += 'job_id:';
      jobIdFilterStr += jobId;
    });

    boolCriteria.push({
      query_string: {
        analyze_wildcard: false,
        query: jobIdFilterStr
      }
    });
  } // Add in term queries for each of the specified criteria.


  _lodash.default.each(criteriaFields, function (criteria) {
    boolCriteria.push({
      term: _defineProperty({}, criteria.fieldName, criteria.fieldValue)
    });
  });

  return _ml_api_service.ml.esSearch$({
    index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
    rest_total_hits_as_int: true,
    size: maxResults !== undefined ? maxResults : 100,
    body: {
      query: {
        bool: {
          filter: [{
            query_string: {
              query: 'result_type:record',
              analyze_wildcard: false
            }
          }, {
            bool: {
              must: boolCriteria
            }
          }]
        }
      },
      sort: [{
        record_score: {
          order: 'desc'
        }
      }]
    }
  }).pipe((0, _operators.map)(function (resp) {
    if (resp.hits.total !== 0) {
      _lodash.default.each(resp.hits.hits, function (hit) {
        obj.records.push(hit._source);
      });
    }

    return obj;
  }));
}

// Obtains a list of scheduled events by job ID and time.
// Pass an empty array or ['*'] to search over all job IDs.
// Returned response contains a events property, which will only
// contains keys for jobs which have scheduled events for the specified time range.
function getScheduledEventsByBucket(jobIds, earliestMs, latestMs, interval, maxJobs, maxEvents) {
  var obj = {
    success: true,
    events: {}
  }; // Build the criteria to use in the bool filter part of the request.
  // Adds criteria for the time range plus any specified job IDs.

  var boolCriteria = [{
    range: {
      timestamp: {
        gte: earliestMs,
        lte: latestMs,
        format: 'epoch_millis'
      }
    }
  }, {
    exists: {
      field: 'scheduled_events'
    }
  }];

  if (jobIds && jobIds.length > 0 && !(jobIds.length === 1 && jobIds[0] === '*')) {
    var jobIdFilterStr = '';

    _lodash.default.each(jobIds, function (jobId, i) {
      jobIdFilterStr += "".concat(i > 0 ? ' OR ' : '', "job_id:").concat(jobId);
    });

    boolCriteria.push({
      query_string: {
        analyze_wildcard: false,
        query: jobIdFilterStr
      }
    });
  }

  return _ml_api_service.ml.esSearch$({
    index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
    size: 0,
    body: {
      query: {
        bool: {
          filter: [{
            query_string: {
              query: 'result_type:bucket',
              analyze_wildcard: false
            }
          }, {
            bool: {
              must: boolCriteria
            }
          }]
        }
      },
      aggs: {
        jobs: {
          terms: {
            field: 'job_id',
            min_doc_count: 1,
            size: maxJobs
          },
          aggs: {
            times: {
              date_histogram: {
                field: 'timestamp',
                interval: interval,
                min_doc_count: 1
              },
              aggs: {
                events: {
                  terms: {
                    field: 'scheduled_events',
                    size: maxEvents
                  }
                }
              }
            }
          }
        }
      }
    }
  }).pipe((0, _operators.map)(function (resp) {
    var dataByJobId = _lodash.default.get(resp, ['aggregations', 'jobs', 'buckets'], []);

    _lodash.default.each(dataByJobId, function (dataForJob) {
      var jobId = dataForJob.key;
      var resultsForTime = {};

      var dataByTime = _lodash.default.get(dataForJob, ['times', 'buckets'], []);

      _lodash.default.each(dataByTime, function (dataForTime) {
        var time = dataForTime.key;

        var events = _lodash.default.get(dataForTime, ['events', 'buckets']);

        resultsForTime[time] = _lodash.default.map(events, 'key');
      });

      obj.events[jobId] = resultsForTime;
    });

    return obj;
  }));
}

function fetchPartitionFieldsValues(jobId, searchTerm, criteriaFields, earliestMs, latestMs) {
  return _ml_api_service.ml.results.fetchPartitionFieldsValues(jobId, searchTerm, criteriaFields, earliestMs, latestMs);
}