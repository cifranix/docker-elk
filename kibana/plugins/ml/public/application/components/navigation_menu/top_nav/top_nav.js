"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopNav = void 0;

var _react = _interopRequireWildcard(require("react"));

var _rxjs = require("rxjs");

var _eui = require("@elastic/eui");

var _timefilter_refresh_service = require("../../../services/timefilter_refresh_service");

var _url_state = require("../../../util/url_state");

var _kibana = require("../../../contexts/kibana");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getRecentlyUsedRangesFactory(timeHistory) {
  return function () {
    var _ref, _timeHistory$get;

    return (_ref = (_timeHistory$get = timeHistory.get()) === null || _timeHistory$get === void 0 ? void 0 : _timeHistory$get.map(function (_ref2) {
      var from = _ref2.from,
          to = _ref2.to;
      return {
        start: from,
        end: to
      };
    })) !== null && _ref !== void 0 ? _ref : [];
  };
}

function updateLastRefresh(timeRange) {
  _timefilter_refresh_service.mlTimefilterRefresh$.next({
    lastRefresh: Date.now(),
    timeRange: timeRange
  });
}

var TopNav = function TopNav() {
  var _ref3;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      services = _useMlKibana.services;

  var config = services.uiSettings;
  var _services$data$query$ = services.data.query.timefilter,
      timefilter = _services$data$query$.timefilter,
      history = _services$data$query$.history;

  var _useUrlState = (0, _url_state.useUrlState)('_g'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      globalState = _useUrlState2[0],
      setGlobalState = _useUrlState2[1];

  var getRecentlyUsedRanges = getRecentlyUsedRangesFactory(history);

  var _useState = (0, _react.useState)((_ref3 = globalState === null || globalState === void 0 ? void 0 : globalState.refreshInterval) !== null && _ref3 !== void 0 ? _ref3 : timefilter.getRefreshInterval()),
      _useState2 = _slicedToArray(_useState, 2),
      refreshInterval = _useState2[0],
      setRefreshInterval = _useState2[1];

  (0, _react.useEffect)(function () {
    setGlobalState({
      refreshInterval: refreshInterval
    });
    timefilter.setRefreshInterval(refreshInterval);
  }, [refreshInterval === null || refreshInterval === void 0 ? void 0 : refreshInterval.pause, refreshInterval === null || refreshInterval === void 0 ? void 0 : refreshInterval.value]);

  var _useState3 = (0, _react.useState)(timefilter.getTime()),
      _useState4 = _slicedToArray(_useState3, 2),
      time = _useState4[0],
      setTime = _useState4[1];

  var _useState5 = (0, _react.useState)(getRecentlyUsedRanges()),
      _useState6 = _slicedToArray(_useState5, 2),
      recentlyUsedRanges = _useState6[0],
      setRecentlyUsedRanges = _useState6[1];

  var _useState7 = (0, _react.useState)(timefilter.isAutoRefreshSelectorEnabled()),
      _useState8 = _slicedToArray(_useState7, 2),
      isAutoRefreshSelectorEnabled = _useState8[0],
      setIsAutoRefreshSelectorEnabled = _useState8[1];

  var _useState9 = (0, _react.useState)(timefilter.isTimeRangeSelectorEnabled()),
      _useState10 = _slicedToArray(_useState9, 2),
      isTimeRangeSelectorEnabled = _useState10[0],
      setIsTimeRangeSelectorEnabled = _useState10[1];

  var dateFormat = config.get('dateFormat');
  (0, _react.useEffect)(function () {
    var subscriptions = new _rxjs.Subscription();
    var refreshIntervalUpdate$ = timefilter.getRefreshIntervalUpdate$();

    if (refreshIntervalUpdate$ !== undefined) {
      subscriptions.add(refreshIntervalUpdate$.subscribe(timefilterUpdateListener));
    }

    var timeUpdate$ = timefilter.getTimeUpdate$();

    if (timeUpdate$ !== undefined) {
      subscriptions.add(timeUpdate$.subscribe(timefilterUpdateListener));
    }

    var enabledUpdated$ = timefilter.getEnabledUpdated$();

    if (enabledUpdated$ !== undefined) {
      subscriptions.add(enabledUpdated$.subscribe(timefilterUpdateListener));
    }

    return function cleanup() {
      subscriptions.unsubscribe();
    };
  }, []);
  (0, _react.useEffect)(function () {
    // Force re-render with up-to-date values when isTimeRangeSelectorEnabled/isAutoRefreshSelectorEnabled are changed.
    timefilterUpdateListener();
  }, [isTimeRangeSelectorEnabled, isAutoRefreshSelectorEnabled]);

  function timefilterUpdateListener() {
    setTime(timefilter.getTime());
    setRefreshInterval(timefilter.getRefreshInterval());
    setIsAutoRefreshSelectorEnabled(timefilter.isAutoRefreshSelectorEnabled());
    setIsTimeRangeSelectorEnabled(timefilter.isTimeRangeSelectorEnabled());
  }

  function updateFilter(_ref4) {
    var start = _ref4.start,
        end = _ref4.end;
    var newTime = {
      from: start,
      to: end
    }; // Update timefilter for controllers listening for changes

    timefilter.setTime(newTime);
    setTime(newTime);
    setRecentlyUsedRanges(getRecentlyUsedRanges());

    _timefilter_refresh_service.mlTimefilterTimeChange$.next({
      lastRefresh: Date.now(),
      timeRange: {
        start: start,
        end: end
      }
    });
  }

  function updateInterval(_ref5) {
    var pause = _ref5.isPaused,
        value = _ref5.refreshInterval;
    setRefreshInterval({
      pause: pause,
      value: value
    });
  }

  return _react.default.createElement(_react.Fragment, null, (isAutoRefreshSelectorEnabled || isTimeRangeSelectorEnabled) && _react.default.createElement("div", {
    className: "mlNavigationMenu__topNav"
  }, _react.default.createElement(_eui.EuiSuperDatePicker, {
    start: time.from,
    end: time.to,
    isPaused: refreshInterval.pause,
    isAutoRefreshOnly: !isTimeRangeSelectorEnabled,
    refreshInterval: refreshInterval.value,
    onTimeChange: updateFilter,
    onRefresh: updateLastRefresh,
    onRefreshChange: updateInterval,
    recentlyUsedRanges: recentlyUsedRanges,
    dateFormat: dateFormat
  })));
};

exports.TopNav = TopNav;