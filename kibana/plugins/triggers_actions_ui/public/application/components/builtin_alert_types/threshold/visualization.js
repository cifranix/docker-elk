"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThresholdVisualization = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _rxjs = require("rxjs");

var _charts = require("@elastic/charts");

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _index_threshold_api = require("../../../../common/lib/index_threshold_api");

var _parse_duration = require("../../../../../../alerting/common/parse_duration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var getTimezone = function getTimezone(uiSettings) {
  var config = uiSettings;
  var DATE_FORMAT_CONFIG_KEY = 'dateFormat:tz';
  var isCustomTimezone = !config.isDefault(DATE_FORMAT_CONFIG_KEY);

  if (isCustomTimezone) {
    return config.get(DATE_FORMAT_CONFIG_KEY);
  }

  var detectedTimezone = _momentTimezone.default.tz.guess();

  if (detectedTimezone) {
    return detectedTimezone;
  } // default to UTC if we can't figure out the timezone


  var tzOffset = (0, _momentTimezone.default)().format('Z');
  return tzOffset;
};

var getDomain = function getDomain(alertInterval, startAt) {
  var VISUALIZE_INTERVALS = 30;
  var intervalMillis;

  try {
    intervalMillis = (0, _parse_duration.parseDuration)(alertInterval);
  } catch (err) {
    intervalMillis = 1000 * 60; // default to one minute if not parseable
  }

  return {
    min: startAt.getTime() - intervalMillis * VISUALIZE_INTERVALS,
    max: startAt.getTime()
  };
};

var DEFAULT_REFRESH_RATE = 5000;
var LoadingStateType;

(function (LoadingStateType) {
  LoadingStateType[LoadingStateType["FirstLoad"] = 0] = "FirstLoad";
  LoadingStateType[LoadingStateType["Refresh"] = 1] = "Refresh";
  LoadingStateType[LoadingStateType["Idle"] = 2] = "Idle";
})(LoadingStateType || (LoadingStateType = {}));

// [epochMillis, value]
var ThresholdVisualization = function ThresholdVisualization(_ref) {
  var alertParams = _ref.alertParams,
      alertInterval = _ref.alertInterval,
      aggregationTypes = _ref.aggregationTypes,
      comparators = _ref.comparators,
      alertsContext = _ref.alertsContext,
      _ref$refreshRateInMil = _ref.refreshRateInMilliseconds,
      refreshRateInMilliseconds = _ref$refreshRateInMil === void 0 ? DEFAULT_REFRESH_RATE : _ref$refreshRateInMil;
  var index = alertParams.index,
      timeField = alertParams.timeField,
      aggType = alertParams.aggType,
      aggField = alertParams.aggField,
      termSize = alertParams.termSize,
      termField = alertParams.termField,
      thresholdComparator = alertParams.thresholdComparator,
      timeWindowSize = alertParams.timeWindowSize,
      timeWindowUnit = alertParams.timeWindowUnit,
      groupBy = alertParams.groupBy,
      threshold = alertParams.threshold;
  var http = alertsContext.http,
      toastNotifications = alertsContext.toastNotifications,
      charts = alertsContext.charts,
      uiSettings = alertsContext.uiSettings,
      dataFieldsFormats = alertsContext.dataFieldsFormats;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      loadingState = _useState2[0],
      setLoadingState = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      error = _useState4[0],
      setError = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      visualizationData = _useState6[0],
      setVisualizationData = _useState6[1];

  var _useState7 = (0, _react.useState)(new Date()),
      _useState8 = _slicedToArray(_useState7, 2),
      startVisualizationAt = _useState8[0],
      setStartVisualizationAt = _useState8[1];

  (0, _react.useEffect)(function () {
    var source = (0, _rxjs.interval)(refreshRateInMilliseconds);
    var subscription = source.subscribe(function (val) {
      setStartVisualizationAt(new Date());
    });
    return function () {
      subscription.unsubscribe();
    };
  }, [refreshRateInMilliseconds]);
  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setLoadingState(loadingState ? LoadingStateType.Refresh : LoadingStateType.FirstLoad);
              _context.t0 = setVisualizationData;
              _context.next = 5;
              return getVisualizationData(alertWithoutActions, visualizeOptions, http);

            case 5:
              _context.t1 = _context.sent;
              (0, _context.t0)(_context.t1);
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t2 = _context["catch"](0);

              if (toastNotifications) {
                toastNotifications.addDanger({
                  title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.unableToLoadVisualizationMessage', {
                    defaultMessage: 'Unable to load visualization'
                  })
                });
              }

              setError(_context.t2);

            case 13:
              _context.prev = 13;
              setLoadingState(LoadingStateType.Idle);
              return _context.finish(13);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9, 13, 16]]);
    }))();
    /* eslint-disable react-hooks/exhaustive-deps */

  }, [index, timeField, aggType, aggField, termSize, termField, thresholdComparator, timeWindowSize, timeWindowUnit, groupBy, threshold, startVisualizationAt]);
  /* eslint-enable react-hooks/exhaustive-deps */

  if (!charts || !uiSettings || !dataFieldsFormats) {
    return null;
  }

  var chartsTheme = charts.theme.useChartsTheme();
  var domain = getDomain(alertInterval, startVisualizationAt);
  var visualizeOptions = {
    rangeFrom: new Date(domain.min).toISOString(),
    rangeTo: new Date(domain.max).toISOString(),
    interval: alertInterval
  }; // Fetching visualization data is independent of alert actions

  var alertWithoutActions = _objectSpread({}, alertParams, {
    actions: [],
    type: 'threshold'
  });

  if (loadingState === LoadingStateType.FirstLoad) {
    return _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement(_eui.EuiLoadingChart, {
        size: "xl"
      }),
      body: _react.default.createElement(_eui.EuiText, {
        color: "subdued"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.alertAdd.loadingAlertVisualizationDescription",
        defaultMessage: "Loading alert visualization\u2026"
      }))
    });
  }

  if (error) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.alertAdd.errorLoadingAlertVisualizationTitle",
        defaultMessage: "Cannot load alert visualization",
        values: {}
      }),
      color: "danger",
      iconType: "alert"
    }, error));
  }

  var getThreshold = function getThreshold() {
    return thresholdComparator ? threshold.slice(0, comparators[thresholdComparator].requiredValues) : [];
  };

  if (visualizationData) {
    var alertVisualizationDataKeys = Object.keys(visualizationData);
    var timezone = getTimezone(uiSettings);
    var actualThreshold = getThreshold();
    var maxY = actualThreshold[actualThreshold.length - 1];
    Object.values(visualizationData).forEach(function (data) {
      data.forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            y = _ref4[1];

        if (y > maxY) {
          maxY = y;
        }
      });
    });
    var dateFormatter = (0, _charts.niceTimeFormatter)([domain.min, domain.max]);
    var aggLabel = aggregationTypes[aggType].text;
    return _react.default.createElement("div", {
      "data-test-subj": "alertVisualizationChart",
      style: {
        position: 'relative'
      }
    }, loadingState === LoadingStateType.Refresh ? _react.default.createElement(_eui.EuiLoadingSpinner, {
      size: "l",
      style: {
        position: 'absolute',
        top: '8%',
        right: '5%'
      }
    }) : _react.default.createElement(_react.Fragment, null), alertVisualizationDataKeys.length ? _react.default.createElement(_charts.Chart, {
      size: ['100%', 200],
      renderer: "canvas"
    }, _react.default.createElement(_charts.Settings, {
      theme: [customTheme(), chartsTheme],
      xDomain: domain,
      showLegend: !!termField,
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
    }), alertVisualizationDataKeys.map(function (key) {
      return _react.default.createElement(_charts.LineSeries, {
        key: key,
        id: key,
        xScaleType: _charts.ScaleType.Time,
        yScaleType: _charts.ScaleType.Linear,
        data: visualizationData[key],
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
          dataValue: threshold[i],
          details: specId
        }]
      });
    })) : _react.default.createElement(_eui.EuiCallOut, {
      size: "s",
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.alertAdd.thresholdPreviewChart.noDataTitle",
        defaultMessage: "No data matches this query"
      }),
      color: "warning"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertAdd.thresholdPreviewChart.dataDoesNotExistTextMessage",
      defaultMessage: "Check that your time range and filters are correct."
    })));
  }

  return null;
}; // convert the data from the visualization API into something easier to digest with charts


exports.ThresholdVisualization = ThresholdVisualization;

function getVisualizationData(_x, _x2, _x3) {
  return _getVisualizationData.apply(this, arguments);
}

function _getVisualizationData() {
  _getVisualizationData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(model, visualizeOptions, http) {
    var vizData, result, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, groupMetrics;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _index_threshold_api.getThresholdAlertVisualizationData)({
              model: model,
              visualizeOptions: visualizeOptions,
              http: http
            });

          case 2:
            vizData = _context2.sent;
            result = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 7;

            for (_iterator = vizData.results[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              groupMetrics = _step.value;
              result[groupMetrics.group] = groupMetrics.metrics.map(function (metricResult) {
                return [Date.parse(metricResult[0]), metricResult[1]];
              });
            }

            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](7);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 15:
            _context2.prev = 15;
            _context2.prev = 16;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 18:
            _context2.prev = 18;

            if (!_didIteratorError) {
              _context2.next = 21;
              break;
            }

            throw _iteratorError;

          case 21:
            return _context2.finish(18);

          case 22:
            return _context2.finish(15);

          case 23:
            return _context2.abrupt("return", result);

          case 24:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 11, 15, 23], [16,, 18, 22]]);
  }));
  return _getVisualizationData.apply(this, arguments);
}