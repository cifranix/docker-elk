"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhancedEsSearchStrategyProvider = void 0;

var _operators = require("rxjs/operators");

var _lodash = require("lodash");

var _server = require("../../../../../src/plugins/data/server");

var _shim_hits_total = require("./shim_hits_total");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const enhancedEsSearchStrategyProvider = (context, caller) => {
  const search = async (request, options) => {
    const config = await context.config$.pipe((0, _operators.first)()).toPromise();
    const defaultParams = (0, _server.getDefaultSearchParams)(config);
    const params = { ...defaultParams,
      ...request.params
    };
    return request.indexType === 'rollup' ? rollupSearch(caller, { ...request,
      params
    }, options) : asyncSearch(caller, { ...request,
      params
    }, options);
  };

  const cancel = async id => {
    const method = 'DELETE';
    const path = encodeURI(`/_async_search/${id}`);
    await caller('transport.request', {
      method,
      path
    });
  };

  return {
    search,
    cancel
  };
};

exports.enhancedEsSearchStrategyProvider = enhancedEsSearchStrategyProvider;

async function asyncSearch(caller, request, options) {
  const {
    timeout = undefined,
    restTotalHitsAsInt = undefined,
    ...params
  } = {
    trackTotalHits: true,
    // Get the exact count of hits
    ...request.params
  }; // If we have an ID, then just poll for that ID, otherwise send the entire request body

  const {
    body = undefined,
    index = undefined,
    ...queryParams
  } = request.id ? {} : params;
  const method = request.id ? 'GET' : 'POST';
  const path = encodeURI(request.id ? `/_async_search/${request.id}` : `/${index}/_async_search`); // Wait up to 1s for the response to return

  const query = toSnakeCase({
    waitForCompletionTimeout: '1s',
    ...queryParams
  });
  const {
    id,
    response,
    is_partial,
    is_running
  } = await caller('transport.request', {
    method,
    path,
    body,
    query
  }, options);
  return {
    id,
    is_partial,
    is_running,
    rawResponse: (0, _shim_hits_total.shimHitsTotal)(response),
    ...(0, _server.getTotalLoaded)(response._shards)
  };
}

async function rollupSearch(caller, request, options) {
  const {
    body,
    index,
    ...params
  } = request.params;
  const method = 'POST';
  const path = encodeURI(`/${index}/_rollup_search`);
  const query = toSnakeCase(params);
  const rawResponse = await caller('transport.request', {
    method,
    path,
    body,
    query
  }, options);
  return {
    rawResponse,
    ...(0, _server.getTotalLoaded)(rawResponse._shards)
  };
}

function toSnakeCase(obj) {
  return (0, _lodash.mapKeys)(obj, (value, key) => (0, _lodash.snakeCase)(key));
}