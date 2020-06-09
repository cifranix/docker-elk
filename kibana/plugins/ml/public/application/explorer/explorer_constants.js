"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_BY_JOB_LABEL = exports.MAX_INFLUENCER_FIELD_NAMES = exports.MAX_INFLUENCER_FIELD_VALUES = exports.MAX_CATEGORY_EXAMPLES = exports.CHART_TYPE = exports.SWIMLANE_TYPE = exports.FILTER_ACTION = exports.EXPLORER_ACTION = exports.DRAG_SELECT_ACTION = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/*
 * Contains values for ML anomaly explorer.
 */
var DRAG_SELECT_ACTION = {
  NEW_SELECTION: 'newSelection',
  ELEMENT_SELECT: 'elementSelect',
  DRAG_START: 'dragStart'
};
exports.DRAG_SELECT_ACTION = DRAG_SELECT_ACTION;
var EXPLORER_ACTION = {
  CLEAR_INFLUENCER_FILTER_SETTINGS: 'clearInfluencerFilterSettings',
  CLEAR_JOBS: 'clearJobs',
  JOB_SELECTION_CHANGE: 'jobSelectionChange',
  SET_BOUNDS: 'setBounds',
  SET_CHARTS: 'setCharts',
  SET_EXPLORER_DATA: 'setExplorerData',
  SET_FILTER_DATA: 'setFilterData',
  SET_INFLUENCER_FILTER_SETTINGS: 'setInfluencerFilterSettings',
  SET_SELECTED_CELLS: 'setSelectedCells',
  SET_SWIMLANE_CONTAINER_WIDTH: 'setSwimlaneContainerWidth',
  SET_SWIMLANE_LIMIT: 'setSwimlaneLimit',
  SET_VIEW_BY_SWIMLANE_FIELD_NAME: 'setViewBySwimlaneFieldName',
  SET_VIEW_BY_SWIMLANE_LOADING: 'setViewBySwimlaneLoading'
};
exports.EXPLORER_ACTION = EXPLORER_ACTION;
var FILTER_ACTION = {
  ADD: '+',
  REMOVE: '-'
};
exports.FILTER_ACTION = FILTER_ACTION;
var SWIMLANE_TYPE = {
  OVERALL: 'overall',
  VIEW_BY: 'viewBy'
};
exports.SWIMLANE_TYPE = SWIMLANE_TYPE;
var CHART_TYPE = {
  EVENT_DISTRIBUTION: 'event_distribution',
  POPULATION_DISTRIBUTION: 'population_distribution',
  SINGLE_METRIC: 'single_metric'
};
exports.CHART_TYPE = CHART_TYPE;
var MAX_CATEGORY_EXAMPLES = 10;
exports.MAX_CATEGORY_EXAMPLES = MAX_CATEGORY_EXAMPLES;
var MAX_INFLUENCER_FIELD_VALUES = 10;
exports.MAX_INFLUENCER_FIELD_VALUES = MAX_INFLUENCER_FIELD_VALUES;
var MAX_INFLUENCER_FIELD_NAMES = 50;
exports.MAX_INFLUENCER_FIELD_NAMES = MAX_INFLUENCER_FIELD_NAMES;

var VIEW_BY_JOB_LABEL = _i18n.i18n.translate('xpack.ml.explorer.jobIdLabel', {
  defaultMessage: 'job ID'
});

exports.VIEW_BY_JOB_LABEL = VIEW_BY_JOB_LABEL;