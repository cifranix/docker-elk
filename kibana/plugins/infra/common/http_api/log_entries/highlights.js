"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntriesHighlightsResponseRT = exports.logEntriesHighlightsRequestRT = exports.logEntriesHighlightsCenteredRequestRT = exports.logEntriesHighlightsAfterRequestRT = exports.logEntriesHighlightsBeforeRequestRT = exports.logEntriesHighlightsBaseRequestRT = exports.LOG_ENTRIES_HIGHLIGHTS_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _entries = require("./entries");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ENTRIES_HIGHLIGHTS_PATH = '/api/log_entries/highlights';
exports.LOG_ENTRIES_HIGHLIGHTS_PATH = LOG_ENTRIES_HIGHLIGHTS_PATH;
const highlightsRT = rt.type({
  highlightTerms: rt.array(rt.string)
});
const logEntriesHighlightsBaseRequestRT = rt.intersection([_entries.logEntriesBaseRequestRT, highlightsRT]);
exports.logEntriesHighlightsBaseRequestRT = logEntriesHighlightsBaseRequestRT;
const logEntriesHighlightsBeforeRequestRT = rt.intersection([_entries.logEntriesBeforeRequestRT, highlightsRT]);
exports.logEntriesHighlightsBeforeRequestRT = logEntriesHighlightsBeforeRequestRT;
const logEntriesHighlightsAfterRequestRT = rt.intersection([_entries.logEntriesAfterRequestRT, highlightsRT]);
exports.logEntriesHighlightsAfterRequestRT = logEntriesHighlightsAfterRequestRT;
const logEntriesHighlightsCenteredRequestRT = rt.intersection([_entries.logEntriesCenteredRequestRT, highlightsRT]);
exports.logEntriesHighlightsCenteredRequestRT = logEntriesHighlightsCenteredRequestRT;
const logEntriesHighlightsRequestRT = rt.union([logEntriesHighlightsBaseRequestRT, logEntriesHighlightsBeforeRequestRT, logEntriesHighlightsAfterRequestRT, logEntriesHighlightsCenteredRequestRT]);
exports.logEntriesHighlightsRequestRT = logEntriesHighlightsRequestRT;
const logEntriesHighlightsResponseRT = rt.type({
  data: rt.array(rt.type({
    topCursor: _common.logEntriesCursorRT,
    bottomCursor: _common.logEntriesCursorRT,
    entries: rt.array(_entries.logEntryRT)
  }))
});
exports.logEntriesHighlightsResponseRT = logEntriesHighlightsResponseRT;