"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfraLogEntriesDomain = exports.LOG_ENTRIES_PAGE_SIZE = void 0;

var _lodash = require("lodash");

var _sources = require("../../sources");

var _builtin_rules = require("./builtin_rules");

var _convert_document_source_to_log_item_fields = require("./convert_document_source_to_log_item_fields");

var _message = require("./message");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ENTRIES_PAGE_SIZE = 200;
exports.LOG_ENTRIES_PAGE_SIZE = LOG_ENTRIES_PAGE_SIZE;

class InfraLogEntriesDomain {
  constructor(adapter, libs) {
    this.adapter = adapter;
    this.libs = libs;
  }
  /* Name is temporary until we can clean up the GraphQL implementation */

  /* eslint-disable-next-line @typescript-eslint/camelcase */


  async getLogEntriesAround__new(requestContext, sourceId, params) {
    const {
      startTimestamp,
      endTimestamp,
      center,
      query,
      size,
      highlightTerm
    } = params;
    /*
     * For odd sizes we will round this value down for the first half, and up
     * for the second. This keeps the center cursor right in the center.
     *
     * For even sizes the half before is one entry bigger than the half after.
     * [1, 2, 3, 4, 5, *6*, 7, 8, 9, 10]
     *  | 5 entries |       |4 entries|
     */

    const halfSize = (size || LOG_ENTRIES_PAGE_SIZE) / 2;
    const entriesBefore = await this.getLogEntries(requestContext, sourceId, {
      startTimestamp,
      endTimestamp,
      query,
      cursor: {
        before: center
      },
      size: Math.floor(halfSize),
      highlightTerm
    });
    /*
     * Elasticsearch's `search_after` returns documents after the specified cursor.
     * - If we have documents before the center, we search after the last of
     *   those. The first document of the new group is the center.
     * - If there were no documents, we search one milisecond before the
     *   center. It then becomes the first document.
     */

    const cursorAfter = entriesBefore.length > 0 ? entriesBefore[entriesBefore.length - 1].cursor : {
      time: center.time - 1,
      tiebreaker: 0
    };
    const entriesAfter = await this.getLogEntries(requestContext, sourceId, {
      startTimestamp,
      endTimestamp,
      query,
      cursor: {
        after: cursorAfter
      },
      size: Math.ceil(halfSize),
      highlightTerm
    });
    return [...entriesBefore, ...entriesAfter];
  }

  async getLogEntries(requestContext, sourceId, params) {
    const {
      configuration
    } = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const messageFormattingRules = (0, _message.compileFormattingRules)((0, _builtin_rules.getBuiltinRules)(configuration.fields.message));
    const requiredFields = getRequiredFields(configuration, messageFormattingRules);
    const documents = await this.adapter.getLogEntries(requestContext, configuration, requiredFields, params);
    const entries = documents.map(doc => {
      return {
        id: doc.gid,
        cursor: doc.key,
        columns: configuration.logColumns.map(column => {
          if ('timestampColumn' in column) {
            return {
              columnId: column.timestampColumn.id,
              timestamp: doc.key.time
            };
          } else if ('messageColumn' in column) {
            return {
              columnId: column.messageColumn.id,
              message: messageFormattingRules.format(doc.fields, doc.highlights)
            };
          } else {
            return {
              columnId: column.fieldColumn.id,
              field: column.fieldColumn.field,
              value: doc.fields[column.fieldColumn.field],
              highlights: doc.highlights[column.fieldColumn.field] || []
            };
          }
        })
      };
    });
    return entries;
  }

  async getLogSummaryBucketsBetween(requestContext, sourceId, start, end, bucketSize, filterQuery) {
    const {
      configuration
    } = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const dateRangeBuckets = await this.adapter.getContainedLogSummaryBuckets(requestContext, configuration, start, end, bucketSize, filterQuery);
    return dateRangeBuckets;
  }

  async getLogSummaryHighlightBucketsBetween(requestContext, sourceId, startTimestamp, endTimestamp, bucketSize, highlightQueries, filterQuery) {
    const {
      configuration
    } = await this.libs.sources.getSourceConfiguration(requestContext, sourceId);
    const messageFormattingRules = (0, _message.compileFormattingRules)((0, _builtin_rules.getBuiltinRules)(configuration.fields.message));
    const requiredFields = getRequiredFields(configuration, messageFormattingRules);
    const summaries = await Promise.all(highlightQueries.map(async highlightQueryPhrase => {
      const highlightQuery = createHighlightQueryDsl(highlightQueryPhrase, requiredFields);
      const query = filterQuery ? {
        bool: {
          must: [filterQuery, highlightQuery]
        }
      } : highlightQuery;
      const summaryBuckets = await this.adapter.getContainedLogSummaryBuckets(requestContext, configuration, startTimestamp, endTimestamp, bucketSize, query);
      const summaryHighlightBuckets = summaryBuckets.filter(logSummaryBucketHasEntries).map(convertLogSummaryBucketToSummaryHighlightBucket);
      return summaryHighlightBuckets;
    }));
    return summaries;
  }

  async getLogItem(requestContext, id, sourceConfiguration) {
    const document = await this.adapter.getLogItem(requestContext, id, sourceConfiguration);
    const defaultFields = [{
      field: '_index',
      value: document._index
    }, {
      field: '_id',
      value: document._id
    }];
    return {
      id: document._id,
      index: document._index,
      key: {
        time: document.sort[0],
        tiebreaker: document.sort[1]
      },
      fields: (0, _lodash.sortBy)([...defaultFields, ...(0, _convert_document_source_to_log_item_fields.convertDocumentSourceToLogItemFields)(document._source)], 'field')
    };
  }

}

exports.InfraLogEntriesDomain = InfraLogEntriesDomain;

const logSummaryBucketHasEntries = bucket => bucket.entriesCount > 0 && bucket.topEntryKeys.length > 0;

const convertLogSummaryBucketToSummaryHighlightBucket = bucket => ({
  entriesCount: bucket.entriesCount,
  start: bucket.start,
  end: bucket.end,
  representativeKey: bucket.topEntryKeys[0]
});

const getRequiredFields = (configuration, messageFormattingRules) => {
  const fieldsFromCustomColumns = configuration.logColumns.reduce((accumulatedFields, logColumn) => {
    if (_sources.SavedSourceConfigurationFieldColumnRuntimeType.is(logColumn)) {
      return [...accumulatedFields, logColumn.fieldColumn.field];
    }

    return accumulatedFields;
  }, []);
  const fieldsFromFormattingRules = messageFormattingRules.requiredFields;
  return Array.from(new Set([...fieldsFromCustomColumns, ...fieldsFromFormattingRules]));
};

const createHighlightQueryDsl = (phrase, fields) => ({
  multi_match: {
    fields,
    lenient: true,
    query: phrase,
    type: 'phrase'
  }
});