"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDynamicIndexPattern = void 0;

var _lruCache = _interopRequireDefault(require("lru-cache"));

var _server = require("../../../../../../src/plugins/data/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const cache = new _lruCache.default({
  max: 100,
  maxAge: 1000 * 60
}); // TODO: this is currently cached globally. In the future we might want to cache this per user

const getDynamicIndexPattern = async ({
  context,
  indices,
  processorEvent
}) => {
  const patternIndices = getPatternIndices(indices, processorEvent);
  const indexPatternTitle = patternIndices.join(',');
  const CACHE_KEY = `apm_dynamic_index_pattern_${indexPatternTitle}`;

  if (cache.has(CACHE_KEY)) {
    return cache.get(CACHE_KEY);
  }

  const indexPatternsFetcher = new _server.IndexPatternsFetcher((...rest) => context.core.elasticsearch.adminClient.callAsCurrentUser(...rest)); // Since `getDynamicIndexPattern` is called in setup_request (and thus by every endpoint)
  // and since `getFieldsForWildcard` will throw if the specified indices don't exist,
  // we have to catch errors here to avoid all endpoints returning 500 for users without APM data
  // (would be a bad first time experience)

  try {
    const fields = await indexPatternsFetcher.getFieldsForWildcard({
      pattern: patternIndices
    });
    const indexPattern = {
      fields,
      title: indexPatternTitle
    };
    cache.set(CACHE_KEY, indexPattern);
    return indexPattern;
  } catch (e) {
    var _e$output;

    // since `getDynamicIndexPattern` can be called multiple times per request it can be expensive not to cache failed lookups
    cache.set(CACHE_KEY, undefined);
    const notExists = ((_e$output = e.output) === null || _e$output === void 0 ? void 0 : _e$output.statusCode) === 404;

    if (notExists) {
      context.logger.error(`Could not get dynamic index pattern because indices "${indexPatternTitle}" don't exist`);
      return;
    } // re-throw


    throw e;
  }
};

exports.getDynamicIndexPattern = getDynamicIndexPattern;

function getPatternIndices(indices, processorEvent) {
  const indexNames = processorEvent ? [processorEvent] : ['transaction', 'metric', 'error'];
  const indicesMap = {
    transaction: indices['apm_oss.transactionIndices'],
    metric: indices['apm_oss.metricsIndices'],
    error: indices['apm_oss.errorIndices']
  };
  return indexNames.map(name => indicesMap[name]);
}