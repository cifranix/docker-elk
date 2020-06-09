"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithWaffleFilterUrlState = exports.WithWaffleFilter = exports.withWaffleFilter = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _store = require("../../store");

var _kuery = require("../../utils/kuery");

var _typed_react = require("../../utils/typed_react");

var _typed_redux = require("../../utils/typed_redux");

var _url_state = require("../../utils/url_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var withWaffleFilter = (0, _reactRedux.connect)(function (state) {
  return {
    filterQuery: _store.waffleFilterSelectors.selectWaffleFilterQuery(state),
    filterQueryDraft: _store.waffleFilterSelectors.selectWaffleFilterQueryDraft(state),
    filterQueryAsJson: _store.waffleFilterSelectors.selectWaffleFilterQueryAsJson(state),
    isFilterQueryDraftValid: _store.waffleFilterSelectors.selectIsWaffleFilterQueryDraftValid(state)
  };
}, function (dispatch, ownProps) {
  return (0, _typed_redux.bindPlainActionCreators)({
    applyFilterQuery: function applyFilterQuery(query) {
      return _store.waffleFilterActions.applyWaffleFilterQuery({
        query: query,
        serializedQuery: (0, _kuery.convertKueryToElasticSearchQuery)(query.expression, ownProps.indexPattern)
      });
    },
    applyFilterQueryFromKueryExpression: function applyFilterQueryFromKueryExpression(expression) {
      return _store.waffleFilterActions.applyWaffleFilterQuery({
        query: {
          kind: 'kuery',
          expression: expression
        },
        serializedQuery: (0, _kuery.convertKueryToElasticSearchQuery)(expression, ownProps.indexPattern)
      });
    },
    setFilterQueryDraft: _store.waffleFilterActions.setWaffleFilterQueryDraft,
    setFilterQueryDraftFromKueryExpression: function setFilterQueryDraftFromKueryExpression(expression) {
      return _store.waffleFilterActions.setWaffleFilterQueryDraft({
        kind: 'kuery',
        expression: expression
      });
    }
  });
});
exports.withWaffleFilter = withWaffleFilter;
var WithWaffleFilter = (0, _typed_react.asChildFunctionRenderer)(withWaffleFilter);
/**
 * Url State
 */

exports.WithWaffleFilter = WithWaffleFilter;

var WithWaffleFilterUrlState = function WithWaffleFilterUrlState(_ref) {
  var indexPattern = _ref.indexPattern;
  return _react.default.createElement(WithWaffleFilter, {
    indexPattern: indexPattern
  }, function (_ref2) {
    var applyFilterQuery = _ref2.applyFilterQuery,
        filterQuery = _ref2.filterQuery;
    return _react.default.createElement(_url_state.UrlStateContainer, {
      urlState: filterQuery,
      urlStateKey: "waffleFilter",
      mapToUrlState: mapToUrlState,
      onChange: function onChange(urlState) {
        if (urlState) {
          applyFilterQuery(urlState);
        }
      },
      onInitialize: function onInitialize(urlState) {
        if (urlState) {
          applyFilterQuery(urlState);
        }
      }
    });
  });
};

exports.WithWaffleFilterUrlState = WithWaffleFilterUrlState;

var mapToUrlState = function mapToUrlState(value) {
  return value && value.kind === 'kuery' && typeof value.expression === 'string' ? {
    kind: value.kind,
    expression: value.expression
  } : undefined;
};