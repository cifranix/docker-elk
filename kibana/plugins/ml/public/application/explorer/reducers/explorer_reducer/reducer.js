"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.explorerReducer = void 0;

var _date_utils = require("../../../util/date_utils");

var _explorer_charts_container_service = require("../../explorer_charts/explorer_charts_container_service");

var _explorer_constants = require("../../explorer_constants");

var _explorer_utils = require("../../explorer_utils");

var _check_selected_cells = require("./check_selected_cells");

var _clear_influencer_filter_settings = require("./clear_influencer_filter_settings");

var _job_selection_change = require("./job_selection_change");

var _set_influencer_filter_settings = require("./set_influencer_filter_settings");

var _set_kql_query_bar_placeholder = require("./set_kql_query_bar_placeholder");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var explorerReducer = function explorerReducer(state, nextAction) {
  var type = nextAction.type,
      payload = nextAction.payload;
  var nextState;

  switch (type) {
    case _explorer_constants.EXPLORER_ACTION.CLEAR_INFLUENCER_FILTER_SETTINGS:
      nextState = (0, _clear_influencer_filter_settings.clearInfluencerFilterSettings)(state);
      break;

    case _explorer_constants.EXPLORER_ACTION.CLEAR_JOBS:
      nextState = _objectSpread({}, state, {}, (0, _explorer_utils.getClearedSelectedAnomaliesState)(), {
        loading: false,
        selectedJobs: []
      });
      break;

    case _explorer_constants.EXPLORER_ACTION.JOB_SELECTION_CHANGE:
      nextState = (0, _job_selection_change.jobSelectionChange)(state, payload);
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_BOUNDS:
      nextState = _objectSpread({}, state, {
        bounds: payload
      });
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_CHARTS:
      nextState = _objectSpread({}, state, {
        chartsData: _objectSpread({}, (0, _explorer_charts_container_service.getDefaultChartsData)(), {
          chartsPerRow: payload.chartsPerRow,
          seriesToPlot: payload.seriesToPlot,
          // convert truthy/falsy value to Boolean
          tooManyBuckets: !!payload.tooManyBuckets
        })
      });
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_INFLUENCER_FILTER_SETTINGS:
      nextState = (0, _set_influencer_filter_settings.setInfluencerFilterSettings)(state, payload);
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_SELECTED_CELLS:
      var _selectedCells = payload;
      nextState = _objectSpread({}, state, {
        selectedCells: _selectedCells
      });
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_EXPLORER_DATA:
    case _explorer_constants.EXPLORER_ACTION.SET_FILTER_DATA:
      nextState = _objectSpread({}, state, {}, payload);
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_SWIMLANE_CONTAINER_WIDTH:
      if (state.noInfluencersConfigured === true) {
        // swimlane is full width, minus 30 for the 'no influencers' info icon,
        // minus 170 for the lane labels, minus 50 padding
        nextState = _objectSpread({}, state, {
          swimlaneContainerWidth: payload - 250
        });
      } else {
        // swimlane width is 5 sixths of the window,
        // minus 170 for the lane labels, minus 50 padding
        nextState = _objectSpread({}, state, {
          swimlaneContainerWidth: payload / 6 * 5 - 220
        });
      }

      break;

    case _explorer_constants.EXPLORER_ACTION.SET_SWIMLANE_LIMIT:
      nextState = _objectSpread({}, state, {
        swimlaneLimit: payload
      });
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_VIEW_BY_SWIMLANE_FIELD_NAME:
      var filteredFields = state.filteredFields,
          influencersFilterQuery = state.influencersFilterQuery;
      var _viewBySwimlaneFieldName = payload;
      var maskAll = false;

      if (influencersFilterQuery !== undefined) {
        maskAll = _viewBySwimlaneFieldName === _explorer_constants.VIEW_BY_JOB_LABEL || filteredFields.includes(_viewBySwimlaneFieldName) === false;
      }

      nextState = _objectSpread({}, state, {}, (0, _explorer_utils.getClearedSelectedAnomaliesState)(), {
        maskAll: maskAll,
        viewBySwimlaneFieldName: _viewBySwimlaneFieldName
      });
      break;

    case _explorer_constants.EXPLORER_ACTION.SET_VIEW_BY_SWIMLANE_LOADING:
      var annotationsData = payload.annotationsData,
          overallState = payload.overallState,
          tableData = payload.tableData;
      nextState = _objectSpread({}, state, {
        annotationsData: annotationsData
      }, overallState, {
        tableData: tableData,
        viewBySwimlaneData: _objectSpread({}, (0, _explorer_utils.getDefaultSwimlaneData)()),
        viewBySwimlaneDataLoading: true
      });
      break;

    default:
      nextState = state;
  }

  if (nextState.selectedJobs === null || nextState.bounds === undefined) {
    return nextState;
  }

  var swimlaneBucketInterval = (0, _explorer_utils.getSwimlaneBucketInterval)(nextState.selectedJobs, nextState.swimlaneContainerWidth); // Does a sanity check on the selected `viewBySwimlaneFieldName`
  // and returns the available `viewBySwimlaneOptions`.

  var _getViewBySwimlaneOpt = (0, _explorer_utils.getViewBySwimlaneOptions)({
    currentViewBySwimlaneFieldName: nextState.viewBySwimlaneFieldName,
    filterActive: nextState.filterActive,
    filteredFields: nextState.filteredFields,
    isAndOperator: nextState.isAndOperator,
    selectedJobs: nextState.selectedJobs,
    selectedCells: nextState.selectedCells
  }),
      viewBySwimlaneFieldName = _getViewBySwimlaneOpt.viewBySwimlaneFieldName,
      viewBySwimlaneOptions = _getViewBySwimlaneOpt.viewBySwimlaneOptions;

  var _nextState = nextState,
      bounds = _nextState.bounds,
      selectedCells = _nextState.selectedCells;
  var timerange = (0, _explorer_utils.getSelectionTimeRange)(selectedCells, swimlaneBucketInterval.asSeconds(), bounds);
  return _objectSpread({}, nextState, {
    swimlaneBucketInterval: swimlaneBucketInterval,
    viewByLoadedForTimeFormatted: selectedCells !== undefined && selectedCells.showTopFieldValues === true ? (0, _date_utils.formatHumanReadableDateTime)(timerange.earliestMs) : null,
    viewBySwimlaneFieldName: viewBySwimlaneFieldName,
    viewBySwimlaneOptions: viewBySwimlaneOptions
  }, (0, _check_selected_cells.checkSelectedCells)(nextState), {}, (0, _set_kql_query_bar_placeholder.setKqlQueryBarPlaceholder)(nextState));
};

exports.explorerReducer = explorerReducer;