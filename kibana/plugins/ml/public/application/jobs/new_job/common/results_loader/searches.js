"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScoresByRecord = getScoresByRecord;

var _lodash = require("lodash");

var _index_patterns = require("../../../../../../common/constants/index_patterns");

var _string_utils = require("../../../../util/string_utils");

var _ml_api_service = require("../../../../services/ml_api_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// detector swimlane search
function getScoresByRecord(jobId, earliestMs, latestMs, interval, firstSplitField) {
  return new Promise(function (resolve, reject) {
    var obj = {
      success: true,
      results: {},
      totalResults: 0
    };
    var jobIdFilterStr = 'job_id: ' + jobId;

    if (firstSplitField && firstSplitField.value !== undefined) {
      // Escape any reserved characters for the query_string query,
      // wrapping the value in quotes to do a phrase match.
      // Backslash is a special character in JSON strings, so doubly escape
      // any backslash characters which exist in the field value.
      jobIdFilterStr += " AND ".concat((0, _string_utils.escapeForElasticsearchQuery)(firstSplitField.name), ":");
      jobIdFilterStr += "\"".concat(String(firstSplitField.value).replace(/\\/g, '\\\\'), "\"");
    }

    _ml_api_service.ml.esSearch({
      index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
      size: 0,
      body: {
        query: {
          bool: {
            filter: [{
              query_string: {
                query: 'result_type:record'
              }
            }, {
              bool: {
                must: [{
                  range: {
                    timestamp: {
                      gte: earliestMs,
                      lte: latestMs,
                      format: 'epoch_millis'
                    }
                  }
                }, {
                  query_string: {
                    query: jobIdFilterStr
                  }
                }]
              }
            }]
          }
        },
        aggs: {
          detector_index: {
            terms: {
              field: 'detector_index',
              order: {
                recordScore: 'desc'
              }
            },
            aggs: {
              recordScore: {
                max: {
                  field: 'record_score'
                }
              },
              byTime: {
                date_histogram: {
                  field: 'timestamp',
                  interval: interval,
                  min_doc_count: 1,
                  extended_bounds: {
                    min: earliestMs,
                    max: latestMs
                  }
                },
                aggs: {
                  recordScore: {
                    max: {
                      field: 'record_score'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }).then(function (resp) {
      var detectorsByIndex = (0, _lodash.get)(resp, ['aggregations', 'detector_index', 'buckets'], []);
      detectorsByIndex.forEach(function (dtr) {
        var dtrResults = [];
        var dtrIndex = +dtr.key;
        var buckets = (0, _lodash.get)(dtr, ['byTime', 'buckets'], []);

        for (var j = 0; j < buckets.length; j++) {
          var bkt = buckets[j];
          var time = bkt.key;
          dtrResults.push({
            time: time,
            value: (0, _lodash.get)(bkt, ['recordScore', 'value'])
          });
        }

        obj.results[dtrIndex] = dtrResults;
      });
      resolve(obj);
    }).catch(function (resp) {
      reject(resp);
    });
  });
}