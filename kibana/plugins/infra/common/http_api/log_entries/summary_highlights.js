"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntriesSummaryHighlightsResponseRT = exports.logEntriesSummaryHighlightsBucketRT = exports.logEntriesSummaryHighlightsRequestRT = exports.LOG_ENTRIES_SUMMARY_HIGHLIGHTS_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _summary = require("./summary");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ENTRIES_SUMMARY_HIGHLIGHTS_PATH = '/api/log_entries/summary_highlights';
exports.LOG_ENTRIES_SUMMARY_HIGHLIGHTS_PATH = LOG_ENTRIES_SUMMARY_HIGHLIGHTS_PATH;
const logEntriesSummaryHighlightsRequestRT = rt.intersection([_summary.logEntriesSummaryRequestRT, rt.type({
  highlightTerms: rt.array(rt.string)
})]);
exports.logEntriesSummaryHighlightsRequestRT = logEntriesSummaryHighlightsRequestRT;
const logEntriesSummaryHighlightsBucketRT = rt.intersection([_summary.logEntriesSummaryBucketRT, rt.type({
  representativeKey: _common.logEntriesCursorRT
})]);
exports.logEntriesSummaryHighlightsBucketRT = logEntriesSummaryHighlightsBucketRT;
const logEntriesSummaryHighlightsResponseRT = rt.type({
  data: rt.array(rt.type({
    start: rt.number,
    end: rt.number,
    buckets: rt.array(logEntriesSummaryHighlightsBucketRT)
  }))
});
exports.logEntriesSummaryHighlightsResponseRT = logEntriesSummaryHighlightsResponseRT;