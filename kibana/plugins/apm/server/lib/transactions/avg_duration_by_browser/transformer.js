"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transformer = transformer;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function transformer({
  response
}) {
  var _ref, _response$aggregation, _response$aggregation2, _ref2, _response$aggregation3, _response$aggregation4;

  const allUserAgentKeys = new Set(((_ref = (_response$aggregation = response.aggregations) === null || _response$aggregation === void 0 ? void 0 : (_response$aggregation2 = _response$aggregation.user_agent_keys) === null || _response$aggregation2 === void 0 ? void 0 : _response$aggregation2.buckets) !== null && _ref !== void 0 ? _ref : []).map(({
    key
  }) => key.toString()));
  const buckets = (_ref2 = (_response$aggregation3 = response.aggregations) === null || _response$aggregation3 === void 0 ? void 0 : (_response$aggregation4 = _response$aggregation3.browsers) === null || _response$aggregation4 === void 0 ? void 0 : _response$aggregation4.buckets) !== null && _ref2 !== void 0 ? _ref2 : [];
  const series = buckets.reduce((acc, next) => {
    var _ref3, _next$user_agent;

    const userAgentBuckets = (_ref3 = (_next$user_agent = next.user_agent) === null || _next$user_agent === void 0 ? void 0 : _next$user_agent.buckets) !== null && _ref3 !== void 0 ? _ref3 : [];
    const x = next.key;
    const seenUserAgentKeys = new Set();
    userAgentBuckets.map(userAgentBucket => {
      var _userAgentBucket$avg_;

      const key = userAgentBucket.key;
      const y = (_userAgentBucket$avg_ = userAgentBucket.avg_duration) === null || _userAgentBucket$avg_ === void 0 ? void 0 : _userAgentBucket$avg_.value;
      seenUserAgentKeys.add(key.toString());
      acc[key] = (acc[key] || []).concat({
        x,
        y
      });
    });
    const emptyUserAgents = new Set([...allUserAgentKeys].filter(key => !seenUserAgentKeys.has(key))); // If no user agent requests exist for this bucked, fill in the data with
    // undefined

    [...emptyUserAgents].map(key => {
      acc[key] = (acc[key] || []).concat({
        x,
        y: undefined
      });
    });
    return acc;
  }, {});
  return Object.entries(series).map(([title, data]) => ({
    title,
    data
  }));
}