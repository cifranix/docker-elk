"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogFilterState = exports.useLogFilterState = exports.logFilterInitialState = void 0;

var _react = require("react");

var _constate = _interopRequireDefault(require("constate"));

var _public = require("../../../../../../../src/plugins/data/public");

var _kuery = require("../../../utils/kuery");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var logFilterInitialState = {
  filterQuery: null,
  filterQueryDraft: null
};
exports.logFilterInitialState = logFilterInitialState;

var useLogFilterState = function useLogFilterState(_ref) {
  var indexPattern = _ref.indexPattern;

  var _useState = (0, _react.useState)(logFilterInitialState),
      _useState2 = _slicedToArray(_useState, 2),
      state = _useState2[0],
      setState = _useState2[1];

  var filterQuery = state.filterQuery,
      filterQueryDraft = state.filterQueryDraft;
  var setLogFilterQueryDraft = (0, _react.useMemo)(function () {
    var setDraft = function setDraft(payload) {
      return setState(function (prevState) {
        return _objectSpread({}, prevState, {
          filterQueryDraft: payload
        });
      });
    };

    return function (expression) {
      return setDraft({
        kind: 'kuery',
        expression: expression
      });
    };
  }, []);
  var applyLogFilterQuery = (0, _react.useMemo)(function () {
    var applyQuery = function applyQuery(payload) {
      return setState(function (prevState) {
        return _objectSpread({}, prevState, {
          filterQueryDraft: payload.query,
          filterQuery: payload
        });
      });
    };

    return function (expression) {
      return applyQuery({
        query: {
          kind: 'kuery',
          expression: expression
        },
        serializedQuery: (0, _kuery.convertKueryToElasticSearchQuery)(expression, indexPattern)
      });
    };
  }, [indexPattern]);
  var isFilterQueryDraftValid = (0, _react.useMemo)(function () {
    if ((filterQueryDraft === null || filterQueryDraft === void 0 ? void 0 : filterQueryDraft.kind) === 'kuery') {
      try {
        _public.esKuery.fromKueryExpression(filterQueryDraft.expression);
      } catch (err) {
        return false;
      }
    }

    return true;
  }, [filterQueryDraft]);
  var serializedFilterQuery = (0, _react.useMemo)(function () {
    return filterQuery ? filterQuery.serializedQuery : null;
  }, [filterQuery]);
  return _objectSpread({}, state, {
    filterQueryAsKuery: state.filterQuery ? state.filterQuery.query : null,
    filterQuery: serializedFilterQuery,
    isFilterQueryDraftValid: isFilterQueryDraftValid,
    setLogFilterQueryDraft: setLogFilterQueryDraft,
    applyLogFilterQuery: applyLogFilterQuery
  });
};

exports.useLogFilterState = useLogFilterState;
var LogFilterState = (0, _constate.default)(useLogFilterState);
exports.LogFilterState = LogFilterState;