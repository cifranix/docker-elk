"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertKueryToElasticSearchQuery = void 0;

var _public = require("../../../../../src/plugins/data/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var convertKueryToElasticSearchQuery = function convertKueryToElasticSearchQuery(kueryExpression, indexPattern) {
  try {
    return kueryExpression ? JSON.stringify(_public.esKuery.toElasticsearchQuery(_public.esKuery.fromKueryExpression(kueryExpression), indexPattern)) : '';
  } catch (err) {
    return '';
  }
};

exports.convertKueryToElasticSearchQuery = convertKueryToElasticSearchQuery;