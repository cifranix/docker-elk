"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENTER_SPACE_PATH = exports.KIBANA_SPACES_STATS_TYPE = exports.MAX_SPACE_INITIALS = exports.SPACE_SEARCH_COUNT_THRESHOLD = exports.DEFAULT_SPACE_ID = void 0;

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
const DEFAULT_SPACE_ID = `default`;
/**
 * The minimum number of spaces required to show a search control.
 */

exports.DEFAULT_SPACE_ID = DEFAULT_SPACE_ID;
const SPACE_SEARCH_COUNT_THRESHOLD = 8;
/**
 * The maximum number of characters allowed in the Space Avatar's initials
 */

exports.SPACE_SEARCH_COUNT_THRESHOLD = SPACE_SEARCH_COUNT_THRESHOLD;
const MAX_SPACE_INITIALS = 2;
/**
 * The type name used within the Monitoring index to publish spaces stats.
 * @type {string}
 */

exports.MAX_SPACE_INITIALS = MAX_SPACE_INITIALS;
const KIBANA_SPACES_STATS_TYPE = 'spaces';
/**
 * The path to enter a space.
 */

exports.KIBANA_SPACES_STATS_TYPE = KIBANA_SPACES_STATS_TYPE;
const ENTER_SPACE_PATH = '/spaces/enter';
exports.ENTER_SPACE_PATH = ENTER_SPACE_PATH;