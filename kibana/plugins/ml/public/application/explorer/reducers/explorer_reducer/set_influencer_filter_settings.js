"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInfluencerFilterSettings = setInfluencerFilterSettings;

var _explorer_constants = require("../../explorer_constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function setInfluencerFilterSettings(state, payload) {
  var influencersFilterQuery = payload.filterQuery,
      isAndOperator = payload.isAndOperator,
      filteredFields = payload.filteredFields,
      queryString = payload.queryString,
      tableQueryString = payload.tableQueryString;
  var selectedCells = state.selectedCells,
      viewBySwimlaneOptions = state.viewBySwimlaneOptions;
  var selectedViewByFieldName = state.viewBySwimlaneFieldName;
  var filteredViewBySwimlaneOptions = viewBySwimlaneOptions.filter(function (d) {
    return filteredFields.includes(d);
  }); // if it's an AND filter set view by swimlane to job ID as the others will have no results

  if (isAndOperator && selectedCells === undefined) {
    selectedViewByFieldName = _explorer_constants.VIEW_BY_JOB_LABEL;
  } else {
    // Set View by dropdown to first relevant fieldName based on incoming filter if there's no cell selection already
    // or if selected cell is from overall swimlane as this won't include an additional influencer filter
    for (var i = 0; i < filteredFields.length; i++) {
      if (filteredViewBySwimlaneOptions.includes(filteredFields[i]) && (selectedCells === undefined || selectedCells && selectedCells.type === 'overall')) {
        selectedViewByFieldName = filteredFields[i];
        break;
      }
    }
  }

  return _objectSpread({}, state, {
    filterActive: true,
    filteredFields: filteredFields,
    influencersFilterQuery: influencersFilterQuery,
    isAndOperator: isAndOperator,
    queryString: queryString,
    tableQueryString: tableQueryString,
    maskAll: selectedViewByFieldName === _explorer_constants.VIEW_BY_JOB_LABEL || filteredFields.includes(selectedViewByFieldName) === false,
    viewBySwimlaneFieldName: selectedViewByFieldName,
    viewBySwimlaneOptions: filteredViewBySwimlaneOptions
  });
}