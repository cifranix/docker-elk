"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.waffleFilterReducer = exports.initialWaffleFilterState = void 0;

var _dist = require("typescript-fsa-reducers/dist");

var _actions = require("./actions");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialWaffleFilterState = {
  filterQuery: null,
  filterQueryDraft: null
};
exports.initialWaffleFilterState = initialWaffleFilterState;
var waffleFilterReducer = (0, _dist.reducerWithInitialState)(initialWaffleFilterState).case(_actions.setWaffleFilterQueryDraft, function (state, filterQueryDraft) {
  return _objectSpread({}, state, {
    filterQueryDraft: filterQueryDraft
  });
}).case(_actions.applyWaffleFilterQuery, function (state, filterQuery) {
  return _objectSpread({}, state, {
    filterQuery: filterQuery,
    filterQueryDraft: filterQuery.query
  });
}).build();
exports.waffleFilterReducer = waffleFilterReducer;