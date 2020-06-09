"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkSelectedCells = void 0;

var _explorer_constants = require("../../explorer_constants");

var _explorer_utils = require("../../explorer_utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// do a sanity check against selectedCells. It can happen that a previously
// selected lane loaded via URL/AppState is not available anymore.
// If filter is active - selectedCell may not be available due to swimlane view by change to filter fieldName
// Ok to keep cellSelection in this case
var checkSelectedCells = function checkSelectedCells(state) {
  var filterActive = state.filterActive,
      loading = state.loading,
      selectedCells = state.selectedCells,
      viewBySwimlaneData = state.viewBySwimlaneData,
      viewBySwimlaneDataLoading = state.viewBySwimlaneDataLoading;

  if (loading || viewBySwimlaneDataLoading) {
    return {};
  }

  var clearSelection = false;

  if (selectedCells !== undefined && selectedCells !== null && selectedCells.type === _explorer_constants.SWIMLANE_TYPE.VIEW_BY && viewBySwimlaneData !== undefined && viewBySwimlaneData.points !== undefined && viewBySwimlaneData.points.length > 0) {
    clearSelection = filterActive === false && !selectedCells.lanes.some(function (lane) {
      return viewBySwimlaneData.points.some(function (point) {
        return point.laneLabel === lane && point.time >= selectedCells.times[0] && point.time <= selectedCells.times[1];
      });
    });
  }

  if (clearSelection === true) {
    return _objectSpread({}, (0, _explorer_utils.getClearedSelectedAnomaliesState)());
  }

  return {};
};

exports.checkSelectedCells = checkSelectedCells;