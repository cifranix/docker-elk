"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSelectedCells = void 0;

var _url_state = require("../../util/url_state");

var _explorer_constants = require("../explorer_constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSelectedCells = function useSelectedCells() {
  var _useUrlState = (0, _url_state.useUrlState)('_a'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      appState = _useUrlState2[0],
      setAppState = _useUrlState2[1];

  var selectedCells; // keep swimlane selection, restore selectedCells from AppState

  if (appState && appState.mlExplorerSwimlane && appState.mlExplorerSwimlane.selectedType !== undefined) {
    selectedCells = {
      type: appState.mlExplorerSwimlane.selectedType,
      lanes: appState.mlExplorerSwimlane.selectedLanes,
      times: appState.mlExplorerSwimlane.selectedTimes,
      showTopFieldValues: appState.mlExplorerSwimlane.showTopFieldValues,
      viewByFieldName: appState.mlExplorerSwimlane.viewByFieldName
    };
  }

  var setSelectedCells = function setSelectedCells(swimlaneSelectedCells) {
    var mlExplorerSwimlane = _objectSpread({}, appState.mlExplorerSwimlane);

    if (swimlaneSelectedCells !== undefined) {
      var _selectedCells, _selectedCells2, _selectedCells3;

      swimlaneSelectedCells.showTopFieldValues = false;
      var currentSwimlaneType = (_selectedCells = selectedCells) === null || _selectedCells === void 0 ? void 0 : _selectedCells.type;
      var currentShowTopFieldValues = (_selectedCells2 = selectedCells) === null || _selectedCells2 === void 0 ? void 0 : _selectedCells2.showTopFieldValues;
      var newSwimlaneType = (_selectedCells3 = selectedCells) === null || _selectedCells3 === void 0 ? void 0 : _selectedCells3.type;

      if (currentSwimlaneType === _explorer_constants.SWIMLANE_TYPE.OVERALL && newSwimlaneType === _explorer_constants.SWIMLANE_TYPE.VIEW_BY || newSwimlaneType === _explorer_constants.SWIMLANE_TYPE.OVERALL || currentShowTopFieldValues === true) {
        swimlaneSelectedCells.showTopFieldValues = true;
      }

      mlExplorerSwimlane.selectedType = swimlaneSelectedCells.type;
      mlExplorerSwimlane.selectedLanes = swimlaneSelectedCells.lanes;
      mlExplorerSwimlane.selectedTimes = swimlaneSelectedCells.times;
      mlExplorerSwimlane.showTopFieldValues = swimlaneSelectedCells.showTopFieldValues;
      setAppState('mlExplorerSwimlane', mlExplorerSwimlane);
    } else {
      delete mlExplorerSwimlane.selectedType;
      delete mlExplorerSwimlane.selectedLanes;
      delete mlExplorerSwimlane.selectedTimes;
      delete mlExplorerSwimlane.showTopFieldValues;
      setAppState('mlExplorerSwimlane', mlExplorerSwimlane);
    }
  };

  return [selectedCells, setSelectedCells];
};

exports.useSelectedCells = useSelectedCells;