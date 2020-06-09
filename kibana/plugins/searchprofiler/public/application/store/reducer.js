"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = void 0;

var _utils = require("../utils");

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var reducer = function reducer(state, action) {
  var nextState = _objectSpread({}, state);

  if (action.type === 'setProfiling') {
    nextState.pristine = false;
    nextState.profiling = action.value;

    if (nextState.profiling) {
      nextState.currentResponse = null;
      nextState.highlightDetails = null;
    }

    return nextState;
  }

  if (action.type === 'setHighlightDetails') {
    if (action.value) {
      var value = action.value; // Exclude children to avoid unnecessary work copying a recursive structure.

      var _value$operation = value.operation,
          children = _value$operation.children,
          parent = _value$operation.parent,
          restOfOperation = _objectWithoutProperties(_value$operation, ["children", "parent"]);

      nextState.highlightDetails = {
        indexName: value.indexName,
        operation: Object.freeze(restOfOperation),
        // prettier-ignore
        shardName: "[".concat(
        /* shard id */
        value.shard.id[0], "][").concat(
        /* shard number */
        value.shard.id[2], "]")
      };
    } else {
      nextState.highlightDetails = null;
    }

    return nextState;
  }

  if (action.type === 'setActiveTab') {
    nextState.activeTab = action.value;
    return nextState;
  }

  if (action.type === 'setCurrentResponse') {
    nextState.currentResponse = action.value;

    if (nextState.currentResponse) {
      var currentResponseHasAggregations = (0, _utils.hasAggregations)(nextState.currentResponse);
      var currentResponseHasSearch = (0, _utils.hasSearch)(nextState.currentResponse);

      if (nextState.activeTab === 'searches' && !currentResponseHasSearch && currentResponseHasAggregations) {
        nextState.activeTab = 'aggregations';
      } else if (nextState.activeTab === 'aggregations' && !currentResponseHasAggregations && currentResponseHasSearch) {
        nextState.activeTab = 'searches';
      } else if (!nextState.activeTab) {
        // Default to searches tab
        nextState.activeTab = 'searches';
      }
    } else {
      nextState.activeTab = null;
    }

    return nextState;
  }

  throw new Error("Unknown action: ".concat(action));
};

exports.reducer = reducer;