"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraKibanaLogEntriesAdapter = void 0;

var _d3Time = require("d3-time");

var runtimeTypes = _interopRequireWildcard(require("io-ts"));

var _lodash = require("lodash");

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _log_entries_domain = require("../../domains/log_entries_domain");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/* eslint-disable @typescript-eslint/no-empty-interface */
const TIMESTAMP_FORMAT = 'epoch_millis';

class InfraKibanaLogEntriesAdapter {
  constructor(framework) {
    this.framework = framework;
  }

  async getLogEntries(requestContext, sourceConfiguration, fields, params) {
    const {
      startTimestamp,
      endTimestamp,
      query,
      cursor,
      size,
      highlightTerm
    } = params;
    const {
      sortDirection,
      searchAfterClause
    } = processCursor(cursor);
    const highlightQuery = createHighlightQuery(highlightTerm, fields);
    const highlightClause = highlightQuery ? {
      highlight: {
        boundary_scanner: 'word',
        fields: fields.reduce((highlightFieldConfigs, fieldName) => ({ ...highlightFieldConfigs,
          [fieldName]: {}
        }), {}),
        fragment_size: 1,
        number_of_fragments: 100,
        post_tags: [''],
        pre_tags: [''],
        highlight_query: highlightQuery
      }
    } : {};
    const sort = {
      [sourceConfiguration.fields.timestamp]: sortDirection,
      [sourceConfiguration.fields.tiebreaker]: sortDirection
    };
    const esQuery = {
      allowNoIndices: true,
      index: sourceConfiguration.logAlias,
      ignoreUnavailable: true,
      body: {
        size: typeof size !== 'undefined' ? size : _log_entries_domain.LOG_ENTRIES_PAGE_SIZE,
        track_total_hits: false,
        _source: fields,
        query: {
          bool: {
            filter: [...createFilterClauses(query, highlightQuery), {
              range: {
                [sourceConfiguration.fields.timestamp]: {
                  gte: startTimestamp,
                  lte: endTimestamp,
                  format: TIMESTAMP_FORMAT
                }
              }
            }]
          }
        },
        sort,
        ...highlightClause,
        ...searchAfterClause
      }
    };
    const esResult = await this.framework.callWithRequest(requestContext, 'search', esQuery);
    const hits = sortDirection === 'asc' ? esResult.hits.hits : esResult.hits.hits.reverse();
    return mapHitsToLogEntryDocuments(hits, sourceConfiguration.fields.timestamp, fields);
  }

  async getContainedLogSummaryBuckets(requestContext, sourceConfiguration, startTimestamp, endTimestamp, bucketSize, filterQuery) {
    const bucketIntervalStarts = (0, _d3Time.timeMilliseconds)(new Date(startTimestamp), new Date(endTimestamp), bucketSize);
    const query = {
      allowNoIndices: true,
      index: sourceConfiguration.logAlias,
      ignoreUnavailable: true,
      body: {
        aggregations: {
          count_by_date: {
            date_range: {
              field: sourceConfiguration.fields.timestamp,
              format: TIMESTAMP_FORMAT,
              ranges: bucketIntervalStarts.map(bucketIntervalStart => ({
                from: bucketIntervalStart.getTime(),
                to: bucketIntervalStart.getTime() + bucketSize
              }))
            },
            aggregations: {
              top_hits_by_key: {
                top_hits: {
                  size: 1,
                  sort: [{
                    [sourceConfiguration.fields.timestamp]: 'asc'
                  }, {
                    [sourceConfiguration.fields.tiebreaker]: 'asc'
                  }],
                  _source: false
                }
              }
            }
          }
        },
        query: {
          bool: {
            filter: [...createQueryFilterClauses(filterQuery), {
              range: {
                [sourceConfiguration.fields.timestamp]: {
                  gte: startTimestamp,
                  lte: endTimestamp,
                  format: TIMESTAMP_FORMAT
                }
              }
            }]
          }
        },
        size: 0,
        track_total_hits: false
      }
    };
    const response = await this.framework.callWithRequest(requestContext, 'search', query);
    return (0, _pipeable.pipe)(LogSummaryResponseRuntimeType.decode(response), (0, _Either.map)(logSummaryResponse => logSummaryResponse.aggregations.count_by_date.buckets.map(convertDateRangeBucketToSummaryBucket)), (0, _Either.fold)((0, _function.constant)([]), _function.identity));
  }

  async getLogItem(requestContext, id, sourceConfiguration) {
    const search = searchOptions => this.framework.callWithRequest(requestContext, 'search', searchOptions);

    const params = {
      index: sourceConfiguration.logAlias,
      terminate_after: 1,
      body: {
        size: 1,
        sort: [{
          [sourceConfiguration.fields.timestamp]: 'desc'
        }, {
          [sourceConfiguration.fields.tiebreaker]: 'desc'
        }],
        query: {
          ids: {
            values: [id]
          }
        }
      }
    };
    const response = await search(params);
    const document = (0, _lodash.first)(response.hits.hits);

    if (!document) {
      throw new Error('Document not found');
    }

    return document;
  }

}

exports.InfraKibanaLogEntriesAdapter = InfraKibanaLogEntriesAdapter;

function mapHitsToLogEntryDocuments(hits, timestampField, fields) {
  return hits.map(hit => {
    const logFields = fields.reduce((flattenedFields, field) => {
      if ((0, _lodash.has)(hit._source, field)) {
        flattenedFields[field] = (0, _lodash.get)(hit._source, field);
      }

      return flattenedFields;
    }, {});
    return {
      gid: hit._id,
      // timestamp: hit._source[timestampField],
      // FIXME s/key/cursor/g
      key: {
        time: hit.sort[0],
        tiebreaker: hit.sort[1]
      },
      fields: logFields,
      highlights: hit.highlight || {}
    };
  });
}

const convertDateRangeBucketToSummaryBucket = bucket => ({
  entriesCount: bucket.doc_count,
  start: bucket.from || 0,
  end: bucket.to || 0,
  topEntryKeys: bucket.top_hits_by_key.hits.hits.map(hit => ({
    tiebreaker: hit.sort[1],
    time: hit.sort[0]
  }))
});

const createHighlightQuery = (highlightTerm, fields) => {
  if (highlightTerm) {
    return {
      multi_match: {
        fields,
        lenient: true,
        query: highlightTerm,
        type: 'phrase'
      }
    };
  }
};

const createFilterClauses = (filterQuery, highlightQuery) => {
  if (filterQuery && highlightQuery) {
    return [{
      bool: {
        filter: [filterQuery, highlightQuery]
      }
    }];
  }

  return (0, _lodash.compact)([filterQuery, highlightQuery]);
};

const createQueryFilterClauses = filterQuery => filterQuery ? [filterQuery] : [];

function processCursor(cursor) {
  if (cursor) {
    if ('before' in cursor) {
      return {
        sortDirection: 'desc',
        searchAfterClause: cursor.before !== 'last' ? {
          search_after: [cursor.before.time, cursor.before.tiebreaker]
        } : {}
      };
    } else if (cursor.after !== 'first') {
      return {
        sortDirection: 'asc',
        searchAfterClause: {
          search_after: [cursor.after.time, cursor.after.tiebreaker]
        }
      };
    }
  }

  return {
    sortDirection: 'asc',
    searchAfterClause: {}
  };
}

const LogSummaryDateRangeBucketRuntimeType = runtimeTypes.intersection([runtimeTypes.type({
  doc_count: runtimeTypes.number,
  key: runtimeTypes.string,
  top_hits_by_key: runtimeTypes.type({
    hits: runtimeTypes.type({
      hits: runtimeTypes.array(runtimeTypes.type({
        sort: runtimeTypes.tuple([runtimeTypes.number, runtimeTypes.number])
      }))
    })
  })
}), runtimeTypes.partial({
  from: runtimeTypes.number,
  to: runtimeTypes.number
})]);
const LogSummaryResponseRuntimeType = runtimeTypes.type({
  aggregations: runtimeTypes.type({
    count_by_date: runtimeTypes.type({
      buckets: runtimeTypes.array(LogSummaryDateRangeBucketRuntimeType)
    })
  })
});