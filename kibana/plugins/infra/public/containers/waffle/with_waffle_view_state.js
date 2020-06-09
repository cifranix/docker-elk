"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WithWaffleViewState = exports.withWaffleViewState = void 0;

var _reactRedux = require("react-redux");

var _reselect = require("reselect");

var _store = require("../../store");

var _typed_react = require("../../utils/typed_react");

var _kuery = require("../../utils/kuery");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var selectViewState = (0, _reselect.createSelector)(_store.waffleOptionsSelectors.selectMetric, _store.waffleOptionsSelectors.selectView, _store.waffleOptionsSelectors.selectGroupBy, _store.waffleOptionsSelectors.selectNodeType, _store.waffleOptionsSelectors.selectCustomOptions, _store.waffleOptionsSelectors.selectBoundsOverride, _store.waffleOptionsSelectors.selectAutoBounds, _store.waffleTimeSelectors.selectCurrentTime, _store.waffleTimeSelectors.selectIsAutoReloading, _store.waffleFilterSelectors.selectWaffleFilterQuery, _store.waffleOptionsSelectors.selectCustomMetrics, function (metric, view, groupBy, nodeType, customOptions, boundsOverride, autoBounds, time, autoReload, filterQuery, customMetrics) {
  return {
    time: time,
    autoReload: autoReload,
    metric: metric,
    groupBy: groupBy,
    nodeType: nodeType,
    view: view,
    customOptions: customOptions,
    boundsOverride: boundsOverride,
    autoBounds: autoBounds,
    filterQuery: filterQuery,
    customMetrics: customMetrics
  };
});
var withWaffleViewState = (0, _reactRedux.connect)(function (state) {
  return {
    viewState: selectViewState(state),
    defaultViewState: selectViewState(_store.initialState)
  };
}, function (dispatch, ownProps) {
  return {
    onViewChange: function onViewChange(viewState) {
      if (viewState.time) {
        dispatch(_store.waffleTimeActions.jumpToTime(viewState.time));
      }

      if (viewState.autoReload) {
        dispatch(_store.waffleTimeActions.startAutoReload());
      } else if (typeof viewState.autoReload !== 'undefined' && !viewState.autoReload) {
        dispatch(_store.waffleTimeActions.stopAutoReload());
      }

      if (viewState.metric) {
        dispatch(_store.waffleOptionsActions.changeMetric(viewState.metric));
      }

      if (viewState.groupBy) {
        dispatch(_store.waffleOptionsActions.changeGroupBy(viewState.groupBy));
      }

      if (viewState.nodeType) {
        dispatch(_store.waffleOptionsActions.changeNodeType(viewState.nodeType));
      }

      if (viewState.view) {
        dispatch(_store.waffleOptionsActions.changeView(viewState.view));
      }

      if (viewState.customOptions) {
        dispatch(_store.waffleOptionsActions.changeCustomOptions(viewState.customOptions));
      }

      if (viewState.customMetrics) {
        dispatch(_store.waffleOptionsActions.changeCustomMetrics(viewState.customMetrics));
      }

      if (viewState.boundsOverride) {
        dispatch(_store.waffleOptionsActions.changeBoundsOverride(viewState.boundsOverride));
      }

      if (viewState.autoBounds) {
        dispatch(_store.waffleOptionsActions.changeAutoBounds(viewState.autoBounds));
      }

      if (viewState.filterQuery) {
        dispatch(_store.waffleFilterActions.applyWaffleFilterQuery({
          query: viewState.filterQuery,
          serializedQuery: (0, _kuery.convertKueryToElasticSearchQuery)(viewState.filterQuery.expression, ownProps.indexPattern)
        }));
      } else {
        dispatch(_store.waffleFilterActions.applyWaffleFilterQuery({
          query: null,
          serializedQuery: null
        }));
      }
    }
  };
});
exports.withWaffleViewState = withWaffleViewState;
var WithWaffleViewState = (0, _typed_react.asChildFunctionRenderer)(withWaffleViewState);
/**
 * View State
 */

exports.WithWaffleViewState = WithWaffleViewState;