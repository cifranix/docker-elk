"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasDatasourceSelector = exports.datasourceSelector = exports.datasourceReducer = exports.datasourceLoaded = exports.requestDatasource = exports.setDatasource = void 0;

var _typescriptFsa = _interopRequireDefault(require("typescript-fsa"));

var _dist = require("typescript-fsa-reducers/dist");

var _reselect = require("reselect");

var _global = require("./global");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var actionCreator = (0, _typescriptFsa.default)('x-pack/graph/datasource');

/**
 * Sets the current datasource. This will not trigger a load of fields
 */
var setDatasource = actionCreator('SET_DATASOURCE');
/**
 * Sets the current datasource. This will trigger a load of fields and overwrite the current
 * fields configuration
 */

exports.setDatasource = setDatasource;
var requestDatasource = actionCreator('SET_DATASOURCE_REQUEST');
/**
 * Datasource loading finished successfully.
 */

exports.requestDatasource = requestDatasource;
var datasourceLoaded = actionCreator('SET_DATASOURCE_SUCCESS');
exports.datasourceLoaded = datasourceLoaded;
var initialDatasource = {
  current: {
    type: 'none'
  },
  loading: false
};
var datasourceReducer = (0, _dist.reducerWithInitialState)(initialDatasource).case(_global.reset, function () {
  return initialDatasource;
}).case(setDatasource, function (_oldDatasource, newDatasource) {
  return {
    current: newDatasource,
    loading: false
  };
}).case(requestDatasource, function (_oldDatasource, newDatasource) {
  return {
    current: newDatasource,
    loading: true
  };
}).case(datasourceLoaded, function (datasource) {
  return _objectSpread({}, datasource, {
    loading: false
  });
}).build();
exports.datasourceReducer = datasourceReducer;

var datasourceSelector = function datasourceSelector(state) {
  return state.datasource;
};

exports.datasourceSelector = datasourceSelector;
var hasDatasourceSelector = (0, _reselect.createSelector)(datasourceSelector, function (datasource) {
  return datasource.current.type !== 'none';
});
exports.hasDatasourceSelector = hasDatasourceSelector;