"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceMetricTimeInQueryString = exports.WithMetricsTimeUrlState = exports.WithMetricsTime = exports.MetricsTimeContainer = exports.useMetricsTime = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = require("lodash");

var _moment = _interopRequireDefault(require("moment"));

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var rt = _interopRequireWildcard(require("io-ts"));

var _Either = require("fp-ts/lib/Either");

var _url_state = require("../../../utils/url_state");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parseRange = function parseRange(range) {
  var parsedFrom = _datemath.default.parse(range.from);

  var parsedTo = _datemath.default.parse(range.to, {
    roundUp: true
  });

  return _objectSpread({}, range, {
    from: parsedFrom && parsedFrom.valueOf() || (0, _moment.default)().subtract(1, 'hour').valueOf(),
    to: parsedTo && parsedTo.valueOf() || (0, _moment.default)().valueOf()
  });
};

var useMetricsTime = function useMetricsTime() {
  var defaultRange = {
    from: 'now-1h',
    to: 'now',
    interval: '>=1m'
  };

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isAutoReloading = _useState2[0],
      setAutoReload = _useState2[1];

  var _useState3 = (0, _react.useState)(5000),
      _useState4 = _slicedToArray(_useState3, 2),
      refreshInterval = _useState4[0],
      setRefreshInterval = _useState4[1];

  var _useState5 = (0, _react.useState)((0, _moment.default)().valueOf()),
      _useState6 = _slicedToArray(_useState5, 2),
      lastRefresh = _useState6[0],
      setLastRefresh = _useState6[1];

  var _useState7 = (0, _react.useState)(defaultRange),
      _useState8 = _slicedToArray(_useState7, 2),
      timeRange = _useState8[0],
      setTimeRange = _useState8[1];

  var _useState9 = (0, _react.useState)(parseRange(defaultRange)),
      _useState10 = _slicedToArray(_useState9, 2),
      parsedTimeRange = _useState10[0],
      setParsedTimeRange = _useState10[1];

  var updateTimeRange = (0, _react.useCallback)(function (range) {
    setTimeRange(range);
    setParsedTimeRange(parseRange(range));
  }, []);
  return {
    timeRange: timeRange,
    setTimeRange: updateTimeRange,
    parsedTimeRange: parsedTimeRange,
    refreshInterval: refreshInterval,
    setRefreshInterval: setRefreshInterval,
    isAutoReloading: isAutoReloading,
    setAutoReload: setAutoReload,
    lastRefresh: lastRefresh,
    triggerRefresh: (0, _react.useCallback)(function () {
      return setLastRefresh((0, _moment.default)().valueOf());
    }, [setLastRefresh])
  };
};

exports.useMetricsTime = useMetricsTime;
var MetricsTimeContainer = (0, _constate.default)(useMetricsTime);
exports.MetricsTimeContainer = MetricsTimeContainer;

var WithMetricsTime = function WithMetricsTime(_ref) {
  var children = _ref.children;
  var metricsTimeState = (0, _react.useContext)(MetricsTimeContainer.Context);
  return children(_objectSpread({}, metricsTimeState));
};
/**
 * Url State
 */


exports.WithMetricsTime = WithMetricsTime;

var WithMetricsTimeUrlState = function WithMetricsTimeUrlState() {
  return _react.default.createElement(WithMetricsTime, null, function (_ref2) {
    var timeRange = _ref2.timeRange,
        setTimeRange = _ref2.setTimeRange,
        refreshInterval = _ref2.refreshInterval,
        setRefreshInterval = _ref2.setRefreshInterval,
        isAutoReloading = _ref2.isAutoReloading,
        setAutoReload = _ref2.setAutoReload;
    return _react.default.createElement(_url_state.UrlStateContainer, {
      urlState: {
        time: timeRange,
        autoReload: isAutoReloading,
        refreshInterval: refreshInterval
      },
      urlStateKey: "metricTime",
      mapToUrlState: mapToUrlState,
      onChange: function onChange(newUrlState) {
        if (newUrlState && newUrlState.time) {
          setTimeRange(newUrlState.time);
        }

        if (newUrlState && newUrlState.autoReload) {
          setAutoReload(true);
        } else if (newUrlState && typeof newUrlState.autoReload !== 'undefined' && !newUrlState.autoReload) {
          setAutoReload(false);
        }

        if (newUrlState && newUrlState.refreshInterval) {
          setRefreshInterval(newUrlState.refreshInterval);
        }
      },
      onInitialize: function onInitialize(initialUrlState) {
        if (initialUrlState && initialUrlState.time) {
          if (timeRange.from !== initialUrlState.time.from || timeRange.to !== initialUrlState.time.to || timeRange.interval !== initialUrlState.time.interval) {
            setTimeRange(initialUrlState.time);
          }
        }

        if (initialUrlState && initialUrlState.autoReload) {
          setAutoReload(true);
        }

        if (initialUrlState && initialUrlState.refreshInterval) {
          setRefreshInterval(initialUrlState.refreshInterval);
        }
      }
    });
  });
};

exports.WithMetricsTimeUrlState = WithMetricsTimeUrlState;

var mapToUrlState = function mapToUrlState(value) {
  return value ? {
    time: mapToTimeUrlState(value.time),
    autoReload: mapToAutoReloadUrlState(value.autoReload),
    refreshInterval: mapToRefreshInterval(value.refreshInterval)
  } : undefined;
};

var MetricsTimeRT = rt.type({
  from: rt.union([rt.string, rt.number]),
  to: rt.union([rt.string, rt.number]),
  interval: rt.string
});

var mapToTimeUrlState = function mapToTimeUrlState(value) {
  var result = MetricsTimeRT.decode(value);

  if ((0, _Either.isRight)(result)) {
    var resultValue = result.right;
    var to = (0, _lodash.isNumber)(resultValue.to) ? (0, _moment.default)(resultValue.to).toISOString() : resultValue.to;
    var from = (0, _lodash.isNumber)(resultValue.from) ? (0, _moment.default)(resultValue.from).toISOString() : resultValue.from;
    return _objectSpread({}, resultValue, {
      from: from,
      to: to
    });
  }

  return undefined;
};

var mapToAutoReloadUrlState = function mapToAutoReloadUrlState(value) {
  return typeof value === 'boolean' ? value : undefined;
};

var mapToRefreshInterval = function mapToRefreshInterval(value) {
  return typeof value === 'number' ? value : undefined;
};

var replaceMetricTimeInQueryString = function replaceMetricTimeInQueryString(from, to) {
  return Number.isNaN(from) || Number.isNaN(to) ? function (value) {
    return value;
  } : (0, _url_state.replaceStateKeyInQueryString)('metricTime', {
    autoReload: false,
    time: {
      interval: '>=1m',
      from: (0, _moment.default)(from).toISOString(),
      to: (0, _moment.default)(to).toISOString()
    }
  });
};

exports.replaceMetricTimeInQueryString = replaceMetricTimeInQueryString;