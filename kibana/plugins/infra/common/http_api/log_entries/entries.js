"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntriesResponseRT = exports.logEntryRT = exports.logColumnRT = exports.logMessageColumnRT = exports.logFieldColumnRT = exports.logTimestampColumnRT = exports.logMessagePartRT = exports.logMessageFieldPartRT = exports.logMessageConstantPartRT = exports.logEntriesRequestRT = exports.logEntriesCenteredRequestRT = exports.logEntriesAfterRequestRT = exports.logEntriesBeforeRequestRT = exports.logEntriesBaseRequestRT = exports.LOG_ENTRIES_PATH = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const LOG_ENTRIES_PATH = '/api/log_entries/entries';
exports.LOG_ENTRIES_PATH = LOG_ENTRIES_PATH;
const logEntriesBaseRequestRT = rt.intersection([rt.type({
  sourceId: rt.string,
  startTimestamp: rt.number,
  endTimestamp: rt.number
}), rt.partial({
  query: rt.union([rt.string, rt.null]),
  size: rt.number
})]);
exports.logEntriesBaseRequestRT = logEntriesBaseRequestRT;
const logEntriesBeforeRequestRT = rt.intersection([logEntriesBaseRequestRT, rt.type({
  before: rt.union([_common.logEntriesCursorRT, rt.literal('last')])
})]);
exports.logEntriesBeforeRequestRT = logEntriesBeforeRequestRT;
const logEntriesAfterRequestRT = rt.intersection([logEntriesBaseRequestRT, rt.type({
  after: rt.union([_common.logEntriesCursorRT, rt.literal('first')])
})]);
exports.logEntriesAfterRequestRT = logEntriesAfterRequestRT;
const logEntriesCenteredRequestRT = rt.intersection([logEntriesBaseRequestRT, rt.type({
  center: _common.logEntriesCursorRT
})]);
exports.logEntriesCenteredRequestRT = logEntriesCenteredRequestRT;
const logEntriesRequestRT = rt.union([logEntriesBaseRequestRT, logEntriesBeforeRequestRT, logEntriesAfterRequestRT, logEntriesCenteredRequestRT]);
exports.logEntriesRequestRT = logEntriesRequestRT;
const logMessageConstantPartRT = rt.type({
  constant: rt.string
});
exports.logMessageConstantPartRT = logMessageConstantPartRT;
const logMessageFieldPartRT = rt.type({
  field: rt.string,
  value: rt.unknown,
  highlights: rt.array(rt.string)
});
exports.logMessageFieldPartRT = logMessageFieldPartRT;
const logMessagePartRT = rt.union([logMessageConstantPartRT, logMessageFieldPartRT]);
exports.logMessagePartRT = logMessagePartRT;
const logTimestampColumnRT = rt.type({
  columnId: rt.string,
  timestamp: rt.number
});
exports.logTimestampColumnRT = logTimestampColumnRT;
const logFieldColumnRT = rt.type({
  columnId: rt.string,
  field: rt.string,
  value: rt.unknown,
  highlights: rt.array(rt.string)
});
exports.logFieldColumnRT = logFieldColumnRT;
const logMessageColumnRT = rt.type({
  columnId: rt.string,
  message: rt.array(logMessagePartRT)
});
exports.logMessageColumnRT = logMessageColumnRT;
const logColumnRT = rt.union([logTimestampColumnRT, logFieldColumnRT, logMessageColumnRT]);
exports.logColumnRT = logColumnRT;
const logEntryRT = rt.type({
  id: rt.string,
  cursor: _common.logEntriesCursorRT,
  columns: rt.array(logColumnRT)
});
exports.logEntryRT = logEntryRT;
const logEntriesResponseRT = rt.type({
  data: rt.type({
    entries: rt.array(logEntryRT),
    topCursor: rt.union([_common.logEntriesCursorRT, rt.null]),
    bottomCursor: rt.union([_common.logEntriesCursorRT, rt.null])
  })
});
exports.logEntriesResponseRT = logEntriesResponseRT;