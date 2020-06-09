"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topCategoriesProvider = topCategoriesProvider;

var _index_patterns = require("../../../../../common/constants/index_patterns");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function topCategoriesProvider(callWithRequest) {
  async function getTotalCategories(jobId) {
    var _ref, _totalResp$hits, _totalResp$hits$total;

    const totalResp = await callWithRequest('search', {
      index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
      size: 0,
      body: {
        query: {
          bool: {
            filter: [{
              term: {
                job_id: jobId
              }
            }, {
              exists: {
                field: 'category_id'
              }
            }]
          }
        }
      }
    });
    return (_ref = totalResp === null || totalResp === void 0 ? void 0 : (_totalResp$hits = totalResp.hits) === null || _totalResp$hits === void 0 ? void 0 : (_totalResp$hits$total = _totalResp$hits.total) === null || _totalResp$hits$total === void 0 ? void 0 : _totalResp$hits$total.value) !== null && _ref !== void 0 ? _ref : 0;
  }

  async function getTopCategoryCounts(jobId, numberOfCategories) {
    var _top$aggregations, _top$aggregations$cat;

    const top = await callWithRequest('search', {
      index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
      size: 0,
      body: {
        query: {
          bool: {
            filter: [{
              term: {
                job_id: jobId
              }
            }, {
              term: {
                result_type: 'model_plot'
              }
            }, {
              term: {
                by_field_name: 'mlcategory'
              }
            }]
          }
        },
        aggs: {
          cat_count: {
            terms: {
              field: 'by_field_value',
              size: numberOfCategories
            }
          }
        }
      }
    });
    const catCounts = (_top$aggregations = top.aggregations) === null || _top$aggregations === void 0 ? void 0 : (_top$aggregations$cat = _top$aggregations.cat_count) === null || _top$aggregations$cat === void 0 ? void 0 : _top$aggregations$cat.buckets.map(c => ({
      id: c.key,
      count: c.doc_count
    }));
    return catCounts || [];
  }

  async function getCategories(jobId, catIds, size) {
    var _result$hits$hits;

    const categoryFilter = catIds.length ? {
      terms: {
        category_id: catIds
      }
    } : {
      exists: {
        field: 'category_id'
      }
    };
    const result = await callWithRequest('search', {
      index: _index_patterns.ML_RESULTS_INDEX_PATTERN,
      size,
      body: {
        query: {
          bool: {
            filter: [{
              term: {
                job_id: jobId
              }
            }, categoryFilter]
          }
        }
      }
    });
    return ((_result$hits$hits = result.hits.hits) === null || _result$hits$hits === void 0 ? void 0 : _result$hits$hits.map(c => c._source)) || [];
  }

  async function topCategories(jobId, numberOfCategories) {
    const catCounts = await getTopCategoryCounts(jobId, numberOfCategories);
    const categories = await getCategories(jobId, catCounts.map(c => c.id), catCounts.length || numberOfCategories);
    const catsById = categories.reduce((p, c) => {
      p[c.category_id] = c;
      return p;
    }, {});
    const total = await getTotalCategories(jobId);

    if (catCounts.length) {
      return {
        total,
        categories: catCounts.map(({
          id,
          count
        }) => {
          var _catsById$id;

          return {
            count,
            category: (_catsById$id = catsById[id]) !== null && _catsById$id !== void 0 ? _catsById$id : null
          };
        })
      };
    } else {
      return {
        total,
        categories: categories.map(category => {
          return {
            category
          };
        })
      };
    }
  }

  return {
    topCategories
  };
}