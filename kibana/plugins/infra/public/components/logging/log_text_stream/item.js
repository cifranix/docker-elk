"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStreamItemTimeKey = getStreamItemTimeKey;
exports.getStreamItemId = getStreamItemId;
exports.parseStreamItemId = parseStreamItemId;
exports.getStreamItemBeforeTimeKey = void 0;

var _d3Array = require("d3-array");

var _time = require("../../../../common/time");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getStreamItemTimeKey(item) {
  switch (item.kind) {
    case 'logEntry':
      return item.logEntry.cursor;
  }
}

function getStreamItemId(item) {
  switch (item.kind) {
    case 'logEntry':
      return "".concat(item.logEntry.cursor.time, ":").concat(item.logEntry.cursor.tiebreaker, ":").concat(item.logEntry.id);
  }
}

function parseStreamItemId(id) {
  var idFragments = id.split(':');
  return {
    gid: idFragments.slice(2).join(':'),
    tiebreaker: parseInt(idFragments[1], 10),
    time: parseInt(idFragments[0], 10)
  };
}

var streamItemTimeBisector = (0, _d3Array.bisector)((0, _time.compareToTimeKey)(getStreamItemTimeKey));

var getStreamItemBeforeTimeKey = function getStreamItemBeforeTimeKey(streamItems, key) {
  return streamItems[Math.min(streamItemTimeBisector.left(streamItems, key), streamItems.length - 1)];
};

exports.getStreamItemBeforeTimeKey = getStreamItemBeforeTimeKey;