"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPings = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const getPings = async ({
  callES,
  dynamicSettings,
  dateRangeStart,
  dateRangeEnd,
  monitorId,
  status,
  sort,
  size,
  location,
  page
}) => {
  var _ref;

  const sortParam = {
    sort: [{
      '@timestamp': {
        order: sort !== null && sort !== void 0 ? sort : 'desc'
      }
    }]
  };
  const sizeParam = size ? {
    size
  } : undefined;
  const filter = [{
    range: {
      '@timestamp': {
        gte: dateRangeStart,
        lte: dateRangeEnd
      }
    }
  }];

  if (monitorId) {
    filter.push({
      term: {
        'monitor.id': monitorId
      }
    });
  }

  if (status) {
    filter.push({
      term: {
        'monitor.status': status
      }
    });
  }

  let postFilterClause = {};

  if (location) {
    postFilterClause = {
      post_filter: {
        term: {
          'observer.geo.name': location
        }
      }
    };
  }

  const queryContext = {
    bool: {
      filter
    }
  };
  const params = {
    index: dynamicSettings.heartbeatIndices,
    body: {
      query: { ...queryContext
      },
      ...sortParam,
      ...sizeParam,
      aggregations: {
        locations: {
          terms: {
            field: 'observer.geo.name',
            missing: 'N/A',
            size: 1000
          }
        }
      },
      ...postFilterClause
    }
  };

  if (page) {
    params.body.from = page * (size !== null && size !== void 0 ? size : 25);
  }

  const {
    hits: {
      hits,
      total
    },
    aggregations: aggs
  } = await callES('search', params);
  const locations = (_ref = aggs === null || aggs === void 0 ? void 0 : aggs.locations) !== null && _ref !== void 0 ? _ref : {
    buckets: [{
      key: 'N/A',
      doc_count: 0
    }]
  };
  const pings = hits.map(({
    _id,
    _source
  }) => {
    var _source$http, _source$http$response;

    const timestamp = _source['@timestamp']; // Calculate here the length of the content string in bytes, this is easier than in client JS, where
    // we don't have access to Buffer.byteLength. There are some hacky ways to do this in the
    // client but this is cleaner.

    const httpBody = _source === null || _source === void 0 ? void 0 : (_source$http = _source.http) === null || _source$http === void 0 ? void 0 : (_source$http$response = _source$http.response) === null || _source$http$response === void 0 ? void 0 : _source$http$response.body;

    if (httpBody && httpBody.content) {
      httpBody.content_bytes = Buffer.byteLength(httpBody.content);
    }

    return {
      id: _id,
      timestamp,
      ..._source
    };
  });
  const results = {
    total: total.value,
    locations: locations.buckets.map(bucket => bucket.key),
    pings
  };
  return results;
};

exports.getPings = getPings;