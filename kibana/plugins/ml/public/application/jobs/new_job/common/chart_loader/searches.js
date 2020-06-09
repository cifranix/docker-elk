"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCategoryFields = getCategoryFields;

var _lodash = require("lodash");

var _ml_api_service = require("../../../../services/ml_api_service");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getCategoryFields(indexPatternName, fieldName, size, query) {
  return new Promise(function (resolve, reject) {
    _ml_api_service.ml.esSearch({
      index: indexPatternName,
      size: 0,
      body: {
        query: query,
        aggs: {
          catFields: {
            terms: {
              field: fieldName,
              size: size
            }
          }
        }
      }
    }).then(function (resp) {
      var catFields = (0, _lodash.get)(resp, ['aggregations', 'catFields', 'buckets'], []);
      resolve({
        success: true,
        results: catFields.map(function (f) {
          return f.key;
        })
      });
    }).catch(function (resp) {
      reject(resp);
    });
  });
}