"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchVisualization = void 0;

var _react = _interopRequireWildcard(require("react"));

var _charts = require("@elastic/charts");

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _visualize_options = require("../../../../models/visualize_options");

var _threshold_watch = require("../../../../models/watch/threshold_watch");

var _api = require("../../../../lib/api");

var _watch_context = require("../../watch_context");

var _agg_types = require("../../../../models/watch/agg_types");

var _comparators = require("../../../../models/watch/comparators");

var _components = require("../../../../components");

var _app_context = require("../../../../app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var customTheme = function customTheme() {
  return {
    lineSeriesStyle: {
      line: {
        strokeWidth: 3
      },
      point: {
        visible: false
      }
    }
  };
};

var getTimezone = function getTimezone(config) {
  var DATE_FORMAT_CONFIG_KEY = 'dateFormat:tz';
  var isCustomTimezone = !config.isDefault(DATE_FORMAT_CONFIG_KEY);

  if (isCustomTimezone) {
    return config.get(DATE_FORMAT_CONFIG_KEY);
  }

  var detectedTimezone = _momentTimezone.default.tz.guess();

  if (detectedTimezone) {
    return detectedTimezone;
  } // default to UTC if we can't figure out the timezone


  return (0, _momentTimezone.default)().format('Z');
};

var getDomain = function getDomain(watch) {
  var VISUALIZE_TIME_WINDOW_MULTIPLIER = 5;
  var fromExpression = "now-".concat(watch.timeWindowSize * VISUALIZE_TIME_WINDOW_MULTIPLIER).concat(watch.timeWindowUnit);
  var toExpression = 'now';

  var fromMoment = _datemath.default.parse(fromExpression);

  var toMoment = _datemath.default.parse(toExpression);

  var visualizeTimeWindowFrom = fromMoment ? fromMoment.valueOf() : 0;
  var visualizeTimeWindowTo = toMoment ? toMoment.valueOf() : 0;
  return {
    min: visualizeTimeWindowFrom,
    max: visualizeTimeWindowTo
  };
};

var getThreshold = function getThreshold(watch) {
  return watch.threshold.slice(0, _comparators.comparators[watch.thresholdComparator].requiredValues);
};

var getTimeBuckets = function getTimeBuckets(watch, timeBuckets) {
  var domain = getDomain(watch);
  timeBuckets.setBounds(domain);
  return timeBuckets;
};

var WatchVisualization = function WatchVisualization() {
  var _useAppContext = (0, _app_context.useAppContext)(),
      createTimeBuckets = _useAppContext.createTimeBuckets,
      theme = _useAppContext.theme,
      uiSettings = _useAppContext.uiSettings;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      watch = _useContext.watch;

  var chartsTheme = theme.useChartsTheme();
  var index = watch.index,
      timeField = watch.timeField,
      triggerIntervalSize = watch.triggerIntervalSize,
      triggerIntervalUnit = watch.triggerIntervalUnit,
      aggType = watch.aggType,
      aggField = watch.aggField,
      termSize = watch.termSize,
      termField = watch.termField,
      thresholdComparator = watch.thresholdComparator,
      timeWindowSize = watch.timeWindowSize,
      timeWindowUnit = watch.timeWindowUnit,
      groupBy = watch.groupBy,
      threshold = watch.threshold;
  var domain = getDomain(watch);
  var timeBuckets = createTimeBuckets();
  timeBuckets.setBounds(domain);
  var interval = timeBuckets.getInterval().expression;
  var visualizeOptions = new _visualize_options.VisualizeOptions({
    rangeFrom: domain.min,
    rangeTo: domain.max,
    interval: interval,
    timezone: getTimezone(uiSettings)
  }); // Fetching visualization data is independent of watch actions

  var watchWithoutActions = new _threshold_watch.ThresholdWatch(_objectSpread({}, watch, {
    actions: []
  }));

  var _useGetWatchVisualiza = (0, _api.useGetWatchVisualizationData)(watchWithoutActions, visualizeOptions),
      isInitialRequest = _useGetWatchVisualiza.isInitialRequest,
      isLoading = _useGetWatchVisualiza.isLoading,
      watchVisualizationData = _useGetWatchVisualiza.data,
      error = _useGetWatchVisualiza.error,
      reload = _useGetWatchVisualiza.sendRequest;

  (0, _react.useEffect)(function () {
    // Prevent sending a second request on initial render.
    if (isInitialRequest) {
      return;
    }

    reload();
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
  [index, timeField, triggerIntervalSize, triggerIntervalUnit, aggType, aggField, termSize, termField, thresholdComparator, timeWindowSize, timeWindowUnit, groupBy, threshold]);

  if (isInitialRequest && isLoading) {
    return _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement(_eui.EuiLoadingChart, {
        size: "xl"
      }),
      body: _react.default.createElement(_eui.EuiText, {
        color: "subdued"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchEdit.loadingWatchVisualizationDescription",
        defaultMessage: "Loading watch visualization\u2026"
      }))
    });
  }

  if (error) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchEdit.errorLoadingWatchVisualizationTitle",
        defaultMessage: "Cannot load watch visualization"
      }),
      error: error
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }));
  }

  if (watchVisualizationData) {
    var watchVisualizationDataKeys = Object.keys(watchVisualizationData);
    var timezone = getTimezone(uiSettings);
    var actualThreshold = getThreshold(watch);
    var maxY = actualThreshold[actualThreshold.length - 1];
    Object.values(watchVisualizationData).forEach(function (watchData) {
      watchData.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            y = _ref2[1];

        if (y > maxY) {
          maxY = y;
        }
      });
    });

    var dateFormatter = function dateFormatter(d) {
      return (0, _momentTimezone.default)(d).tz(timezone).format(getTimeBuckets(watch, createTimeBuckets()).getScaledDateFormat());
    };

    var aggLabel = _agg_types.aggTypes[watch.aggType].text;
    return _react.default.createElement("div", {
      "data-test-subj": "watchVisualizationChart"
    }, _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), watchVisualizationDataKeys.length ? _react.default.createElement(_charts.Chart, {
      size: ['100%', 300],
      renderer: "canvas"
    }, _react.default.createElement(_charts.Settings, {
      theme: [customTheme(), chartsTheme],
      xDomain: domain,
      showLegend: !!watch.termField,
      showLegendExtra: true,
      legendPosition: _charts.Position.Bottom
    }), _react.default.createElement(_charts.Axis, {
      id: "bottom",
      position: _charts.Position.Bottom,
      showOverlappingTicks: true,
      tickFormat: dateFormatter
    }), _react.default.createElement(_charts.Axis, {
      domain: {
        max: maxY
      },
      id: "left",
      title: aggLabel,
      position: _charts.Position.Left
    }), watchVisualizationDataKeys.map(function (key) {
      return _react.default.createElement(_charts.LineSeries, {
        key: key,
        id: key,
        xScaleType: _charts.ScaleType.Time,
        yScaleType: _charts.ScaleType.Linear,
        data: watchVisualizationData[key],
        xAccessor: 0,
        yAccessors: [1],
        timeZone: timezone
      });
    }), actualThreshold.map(function (_value, i) {
      var specId = i === 0 ? 'threshold' : "threshold".concat(i);
      return _react.default.createElement(_charts.LineAnnotation, {
        key: specId,
        id: specId,
        domainType: _charts.AnnotationDomainTypes.YDomain,
        dataValues: [{
          dataValue: watch.threshold[i],
          details: specId
        }]
      });
    })) : _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.thresholdPreviewChart.noDataTitle",
        defaultMessage: "No data"
      }),
      color: "warning"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.thresholdPreviewChart.dataDoesNotExistTextMessage",
      defaultMessage: "Your index and condition did not return any data."
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }));
  }

  return null;
};

exports.WatchVisualization = WatchVisualization;