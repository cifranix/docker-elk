"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.explorerService = exports.explorerAction$ = exports.dragSelect$ = exports.ALLOW_CELL_RANGE_SELECTION = void 0;

var _lodash = require("lodash");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _actions = require("./actions");

var _explorer_constants = require("./explorer_constants");

var _reducers = require("./reducers");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Service for firing and registering for events across the different
 * components in the Explorer dashboard.
 */
var ALLOW_CELL_RANGE_SELECTION = true;
exports.ALLOW_CELL_RANGE_SELECTION = ALLOW_CELL_RANGE_SELECTION;
var dragSelect$ = new _rxjs.Subject();
exports.dragSelect$ = dragSelect$;
var explorerAction$ = new _rxjs.Subject();
exports.explorerAction$ = explorerAction$;
var explorerFilteredAction$ = explorerAction$.pipe( // consider observables as side-effects
(0, _operators.flatMap)(function (action) {
  return (0, _rxjs.isObservable)(action) ? action : (0, _rxjs.from)([action]);
}), (0, _operators.distinctUntilChanged)(_lodash.isEqual)); // applies action and returns state

var explorerState$ = explorerFilteredAction$.pipe((0, _operators.scan)(_reducers.explorerReducer, (0, _reducers.getExplorerDefaultState)()));
var explorerAppState$ = explorerState$.pipe((0, _operators.map)(function (state) {
  var appState = {
    mlExplorerFilter: {},
    mlExplorerSwimlane: {}
  };

  if (state.selectedCells !== undefined) {
    var swimlaneSelectedCells = state.selectedCells;
    appState.mlExplorerSwimlane.selectedType = swimlaneSelectedCells.type;
    appState.mlExplorerSwimlane.selectedLanes = swimlaneSelectedCells.lanes;
    appState.mlExplorerSwimlane.selectedTimes = swimlaneSelectedCells.times;
    appState.mlExplorerSwimlane.showTopFieldValues = swimlaneSelectedCells.showTopFieldValues;
  }

  if (state.viewBySwimlaneFieldName !== undefined) {
    appState.mlExplorerSwimlane.viewByFieldName = state.viewBySwimlaneFieldName;
  }

  if (state.filterActive) {
    appState.mlExplorerFilter.influencersFilterQuery = state.influencersFilterQuery;
    appState.mlExplorerFilter.filterActive = state.filterActive;
    appState.mlExplorerFilter.filteredFields = state.filteredFields;
    appState.mlExplorerFilter.queryString = state.queryString;
  }

  return appState;
}), (0, _operators.distinctUntilChanged)(_lodash.isEqual));

var setExplorerDataActionCreator = function setExplorerDataActionCreator(payload) {
  return {
    type: _explorer_constants.EXPLORER_ACTION.SET_EXPLORER_DATA,
    payload: payload
  };
};

var setFilterDataActionCreator = function setFilterDataActionCreator(payload) {
  return {
    type: _explorer_constants.EXPLORER_ACTION.SET_FILTER_DATA,
    payload: payload
  };
}; // Export observable state and action dispatchers as service


var explorerService = {
  appState$: explorerAppState$,
  state$: explorerState$,
  clearInfluencerFilterSettings: function clearInfluencerFilterSettings() {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.CLEAR_INFLUENCER_FILTER_SETTINGS
    });
  },
  clearJobs: function clearJobs() {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.CLEAR_JOBS
    });
  },
  updateJobSelection: function updateJobSelection(selectedJobIds) {
    explorerAction$.next((0, _actions.jobSelectionActionCreator)(selectedJobIds));
  },
  setBounds: function setBounds(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_BOUNDS,
      payload: payload
    });
  },
  setCharts: function setCharts(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_CHARTS,
      payload: payload
    });
  },
  setInfluencerFilterSettings: function setInfluencerFilterSettings(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_INFLUENCER_FILTER_SETTINGS,
      payload: payload
    });
  },
  setSelectedCells: function setSelectedCells(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_SELECTED_CELLS,
      payload: payload
    });
  },
  setExplorerData: function setExplorerData(payload) {
    explorerAction$.next(setExplorerDataActionCreator(payload));
  },
  setFilterData: function setFilterData(payload) {
    explorerAction$.next(setFilterDataActionCreator(payload));
  },
  setSwimlaneContainerWidth: function setSwimlaneContainerWidth(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_SWIMLANE_CONTAINER_WIDTH,
      payload: payload
    });
  },
  setSwimlaneLimit: function setSwimlaneLimit(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_SWIMLANE_LIMIT,
      payload: payload
    });
  },
  setViewBySwimlaneFieldName: function setViewBySwimlaneFieldName(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_VIEW_BY_SWIMLANE_FIELD_NAME,
      payload: payload
    });
  },
  setViewBySwimlaneLoading: function setViewBySwimlaneLoading(payload) {
    explorerAction$.next({
      type: _explorer_constants.EXPLORER_ACTION.SET_VIEW_BY_SWIMLANE_LOADING,
      payload: payload
    });
  }
};
exports.explorerService = explorerService;