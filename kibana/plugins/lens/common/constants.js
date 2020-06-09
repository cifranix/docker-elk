"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBasePath = getBasePath;
exports.getEditPath = getEditPath;
exports.BASE_API_URL = exports.BASE_APP_URL = exports.NOT_INTERNATIONALIZED_PRODUCT_NAME = exports.LENS_EMBEDDABLE_TYPE = exports.PLUGIN_ID = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const PLUGIN_ID = 'lens';
exports.PLUGIN_ID = PLUGIN_ID;
const LENS_EMBEDDABLE_TYPE = 'lens';
exports.LENS_EMBEDDABLE_TYPE = LENS_EMBEDDABLE_TYPE;
const NOT_INTERNATIONALIZED_PRODUCT_NAME = 'Lens Visualizations';
exports.NOT_INTERNATIONALIZED_PRODUCT_NAME = NOT_INTERNATIONALIZED_PRODUCT_NAME;
const BASE_APP_URL = '/app/kibana';
exports.BASE_APP_URL = BASE_APP_URL;
const BASE_API_URL = '/api/lens';
exports.BASE_API_URL = BASE_API_URL;

function getBasePath() {
  return `${BASE_APP_URL}#/lens`;
}

function getEditPath(id) {
  return `${BASE_APP_URL}#/lens/edit/${encodeURIComponent(id)}`;
}