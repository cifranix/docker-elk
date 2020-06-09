"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUiTracker = useUiTracker;
exports.useTrackMetric = useTrackMetric;
exports.useTrackPageview = useTrackPageview;
Object.defineProperty(exports, "METRIC_TYPE", {
  enumerable: true,
  get: function get() {
    return _analytics.METRIC_TYPE;
  }
});

var _react = require("react");

var _analytics = require("@kbn/analytics");

var _public = require("../../../../../src/plugins/kibana_react/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useUiTracker() {
  var _useKibana$services, _useKibana$services$u;

  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      defaultApp = _ref.app;

  var reportUiStats = (_useKibana$services = (0, _public.useKibana)().services) === null || _useKibana$services === void 0 ? void 0 : (_useKibana$services$u = _useKibana$services.usageCollection) === null || _useKibana$services$u === void 0 ? void 0 : _useKibana$services$u.reportUiStats;
  var trackEvent = (0, _react.useMemo)(function () {
    return function (_ref2) {
      var _ref2$app = _ref2.app,
          app = _ref2$app === void 0 ? defaultApp : _ref2$app,
          metric = _ref2.metric,
          _ref2$metricType = _ref2.metricType,
          metricType = _ref2$metricType === void 0 ? _analytics.METRIC_TYPE.COUNT : _ref2$metricType;

      if (reportUiStats) {
        reportUiStats(app, metricType, metric);
      }
    };
  }, [defaultApp, reportUiStats]);
  return trackEvent;
}

function useTrackMetric(_ref3) {
  var _useKibana$services2, _useKibana$services2$;

  var app = _ref3.app,
      metric = _ref3.metric,
      _ref3$metricType = _ref3.metricType,
      metricType = _ref3$metricType === void 0 ? _analytics.METRIC_TYPE.COUNT : _ref3$metricType,
      _ref3$delay = _ref3.delay,
      delay = _ref3$delay === void 0 ? 0 : _ref3$delay;
  var effectDependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var reportUiStats = (_useKibana$services2 = (0, _public.useKibana)().services) === null || _useKibana$services2 === void 0 ? void 0 : (_useKibana$services2$ = _useKibana$services2.usageCollection) === null || _useKibana$services2$ === void 0 ? void 0 : _useKibana$services2$.reportUiStats;
  (0, _react.useEffect)(function () {
    if (!reportUiStats) {
      // eslint-disable-next-line no-console
      console.log('usageCollection.reportUiStats is unavailable. Ensure this is setup via <KibanaContextProvider />.');
    } else {
      var decoratedMetric = metric;

      if (delay > 0) {
        decoratedMetric += "__delayed_".concat(delay, "ms");
      }

      var id = setTimeout(function () {
        return reportUiStats(app, metricType, decoratedMetric);
      }, Math.max(delay, 0));
      return function () {
        return clearTimeout(id);
      };
    } // the dependencies are managed externally
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, effectDependencies);
}
/**
 * useTrackPageview is a convenience wrapper for tracking a pageview
 * Its metrics will be found at:
 * stack_stats.kibana.plugins.ui_metric.{app}.pageview__{path}(__delayed_{n}ms)?
 */


function useTrackPageview(_ref4) {
  var effectDependencies = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var path = _ref4.path,
      rest = _objectWithoutProperties(_ref4, ["path"]);

  useTrackMetric(_objectSpread({}, rest, {
    metric: "pageview__".concat(path)
  }), effectDependencies);
}