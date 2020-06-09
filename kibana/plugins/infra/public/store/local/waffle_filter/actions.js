"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applyWaffleFilterQuery = exports.setWaffleFilterQueryDraft = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var actionCreator = (0, _typescriptFsa.default)('x-pack/infra/local/waffle_filter');
var setWaffleFilterQueryDraft = actionCreator('SET_WAFFLE_FILTER_QUERY_DRAFT');
exports.setWaffleFilterQueryDraft = setWaffleFilterQueryDraft;
var applyWaffleFilterQuery = actionCreator('APPLY_WAFFLE_FILTER_QUERY');
exports.applyWaffleFilterQuery = applyWaffleFilterQuery;