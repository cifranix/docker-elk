"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStore = exports.initialState = void 0;

var _react = require("react");

var _reducer = require("./reducer");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var initialState = {
  profiling: false,
  pristine: true,
  highlightDetails: null,
  activeTab: null,
  currentResponse: null
};
exports.initialState = initialState;

var useStore = function useStore() {
  var _useReducer = (0, _react.useReducer)(_reducer.reducer, initialState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  return {
    state: state,
    dispatch: dispatch
  };
};

exports.useStore = useStore;