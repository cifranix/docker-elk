"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectIsWaffleFilterQueryDraftValid = exports.selectWaffleFilterQueryDraft = exports.selectWaffleFilterQueryAsJson = exports.selectWaffleFilterQuery = void 0;

var _reselect = require("reselect");

var _public = require("../../../../../../../src/plugins/data/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectWaffleFilterQuery = function selectWaffleFilterQuery(state) {
  return state.filterQuery ? state.filterQuery.query : null;
};

exports.selectWaffleFilterQuery = selectWaffleFilterQuery;

var selectWaffleFilterQueryAsJson = function selectWaffleFilterQueryAsJson(state) {
  return state.filterQuery ? state.filterQuery.serializedQuery : null;
};

exports.selectWaffleFilterQueryAsJson = selectWaffleFilterQueryAsJson;

var selectWaffleFilterQueryDraft = function selectWaffleFilterQueryDraft(state) {
  return state.filterQueryDraft;
};

exports.selectWaffleFilterQueryDraft = selectWaffleFilterQueryDraft;
var selectIsWaffleFilterQueryDraftValid = (0, _reselect.createSelector)(selectWaffleFilterQueryDraft, function (filterQueryDraft) {
  if (filterQueryDraft && filterQueryDraft.kind === 'kuery') {
    try {
      _public.esKuery.fromKueryExpression(filterQueryDraft.expression);
    } catch (err) {
      return false;
    }
  }

  return true;
});
exports.selectIsWaffleFilterQueryDraftValid = selectIsWaffleFilterQueryDraftValid;