"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postPagerduty = postPagerduty;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// post an event to pagerduty
async function postPagerduty(options) {
  const {
    apiUrl,
    data,
    headers
  } = options;
  const axiosOptions = {
    headers,
    validateStatus: () => true
  };
  return _axios.default.post(apiUrl, data, axiosOptions);
}