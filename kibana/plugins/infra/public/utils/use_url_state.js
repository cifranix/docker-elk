"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceStateKeyInQueryString = exports.useUrlState = void 0;

var _queryString = require("query-string");

var _react = require("react");

var _risonNode = require("rison-node");

var _public = require("../../../../../src/plugins/kibana_utils/public");

var _history_context = require("./history_context");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useUrlState = function useUrlState(_ref) {
  var defaultState = _ref.defaultState,
      decodeUrlState = _ref.decodeUrlState,
      encodeUrlState = _ref.encodeUrlState,
      urlStateKey = _ref.urlStateKey,
      _ref$writeDefaultStat = _ref.writeDefaultState,
      writeDefaultState = _ref$writeDefaultStat === void 0 ? false : _ref$writeDefaultStat;
  var history = (0, _history_context.useHistory)(); // history.location is mutable so we can't reliably use useMemo

  var queryString = (history === null || history === void 0 ? void 0 : history.location) ? getQueryStringFromLocation(history.location) : '';
  var urlStateString = (0, _react.useMemo)(function () {
    if (!queryString) {
      return;
    }

    return getParamFromQueryString(queryString, urlStateKey);
  }, [queryString, urlStateKey]);
  var decodedState = (0, _react.useMemo)(function () {
    return decodeUrlState(decodeRisonUrlState(urlStateString));
  }, [decodeUrlState, urlStateString]);
  var state = (0, _react.useMemo)(function () {
    return typeof decodedState !== 'undefined' ? decodedState : defaultState;
  }, [defaultState, decodedState]);
  var setState = (0, _react.useCallback)(function (newState) {
    if (!history || !history.location) {
      return;
    }

    var currentLocation = history.location;
    var newLocation = replaceQueryStringInLocation(currentLocation, replaceStateKeyInQueryString(urlStateKey, typeof newState !== 'undefined' ? encodeUrlState(newState) : undefined)(getQueryStringFromLocation(currentLocation)));

    if (newLocation !== currentLocation) {
      history.replace(newLocation);
    }
  }, [encodeUrlState, history, urlStateKey]);

  var _useState = (0, _react.useState)(writeDefaultState && typeof decodedState === 'undefined'),
      _useState2 = _slicedToArray(_useState, 2),
      shouldInitialize = _useState2[0],
      setShouldInitialize = _useState2[1];

  (0, _react.useEffect)(function () {
    if (shouldInitialize) {
      setShouldInitialize(false);
      setState(defaultState);
    }
  }, [shouldInitialize, setState, defaultState]);
  return [state, setState];
};

exports.useUrlState = useUrlState;

var decodeRisonUrlState = function decodeRisonUrlState(value) {
  try {
    return value ? (0, _risonNode.decode)(value) : undefined;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('rison decoder error')) {
      return {};
    }

    throw error;
  }
};

var encodeRisonUrlState = function encodeRisonUrlState(state) {
  return (0, _risonNode.encode)(state);
};

var getQueryStringFromLocation = function getQueryStringFromLocation(location) {
  return location.search.substring(1);
};

var getParamFromQueryString = function getParamFromQueryString(queryString, key) {
  var parsedQueryString = (0, _queryString.parse)(queryString, {
    sort: false
  });
  var queryParam = parsedQueryString[key];
  return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};

var replaceStateKeyInQueryString = function replaceStateKeyInQueryString(stateKey, urlState) {
  return function (queryString) {
    var previousQueryValues = (0, _queryString.parse)(queryString, {
      sort: false
    });
    var encodedUrlState = typeof urlState !== 'undefined' ? encodeRisonUrlState(urlState) : undefined;
    return (0, _queryString.stringify)(_public.url.encodeQuery(_objectSpread({}, previousQueryValues, _defineProperty({}, stateKey, encodedUrlState))), {
      sort: false,
      encode: false
    });
  };
};

exports.replaceStateKeyInQueryString = replaceStateKeyInQueryString;

var replaceQueryStringInLocation = function replaceQueryStringInLocation(location, queryString) {
  if (queryString === getQueryStringFromLocation(location)) {
    return location;
  } else {
    return _objectSpread({}, location, {
      search: "?".concat(queryString)
    });
  }
};