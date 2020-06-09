"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntriesSummaryResponseRT = exports.logEntriesSummaryBucketRT = exports.logEntriesSummaryRequestRT = exports.LOG_ENTRIES_SUMMARY_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ENTRIES_SUMMARY_PATH = '/api/log_entries/summary';
exports.LOG_ENTRIES_SUMMARY_PATH = LOG_ENTRIES_SUMMARY_PATH;
const logEntriesSummaryRequestRT = rt.type({
  sourceId: rt.string,
  startTimestamp: rt.number,
  endTimestamp: rt.number,
  bucketSize: rt.number,
  query: rt.union([rt.string, rt.undefined, rt.null])
});
exports.logEntriesSummaryRequestRT = logEntriesSummaryRequestRT;
const logEntriesSummaryBucketRT = rt.type({
  start: rt.number,
  end: rt.number,
  entriesCount: rt.number
});
exports.logEntriesSummaryBucketRT = logEntriesSummaryBucketRT;
const logEntriesSummaryResponseRT = rt.type({
  data: rt.type({
    start: rt.number,
    end: rt.number,
    buckets: rt.array(logEntriesSummaryBucketRT)
  })
});
exports.logEntriesSummaryResponseRT = logEntriesSummaryResponseRT;