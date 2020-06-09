"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandedRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _date_utils = require("../../../../../util/date_utils");

var _expanded_row_details_pane = require("./expanded_row_details_pane");

var _expanded_row_json_pane = require("./expanded_row_json_pane");

var _progress_bar = require("./progress_bar");

var _common = require("../../../../common");

var _columns = require("./columns");

var _common2 = require("./common");

var _analytics = require("../../../../common/analytics");

var _expanded_row_messages_pane = require("./expanded_row_messages_pane");

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getItemDescription(value) {
  if (_typeof(value) === 'object') {
    return JSON.stringify(value);
  }

  return value.toString();
}

var LoadedStat = function LoadedStat(_ref) {
  var isLoading = _ref.isLoading,
      evalData = _ref.evalData,
      resultProperty = _ref.resultProperty;
  return _react.default.createElement(_react.Fragment, null, isLoading === false && evalData.error !== null && _react.default.createElement(_eui.EuiIcon, {
    type: "alert",
    size: "s"
  }), isLoading === true && _react.default.createElement(_eui.EuiLoadingSpinner, {
    size: "s"
  }), isLoading === false && evalData.error === null && evalData[resultProperty]);
};

var defaultEval = {
  meanSquaredError: '',
  rSquared: '',
  error: null
};

var ExpandedRow = function ExpandedRow(_ref2) {
  var _item$config, _item$config$dest, _item$config2;

  var item = _ref2.item;

  var _useState = (0, _react.useState)(defaultEval),
      _useState2 = _slicedToArray(_useState, 2),
      trainingEval = _useState2[0],
      setTrainingEval = _useState2[1];

  var _useState3 = (0, _react.useState)(defaultEval),
      _useState4 = _slicedToArray(_useState3, 2),
      generalizationEval = _useState4[0],
      setGeneralizationEval = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isLoadingTraining = _useState6[0],
      setIsLoadingTraining = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isLoadingGeneralization = _useState8[0],
      setIsLoadingGeneralization = _useState8[1];

  var index = item === null || item === void 0 ? void 0 : (_item$config = item.config) === null || _item$config === void 0 ? void 0 : (_item$config$dest = _item$config.dest) === null || _item$config$dest === void 0 ? void 0 : _item$config$dest.index;
  var dependentVariable = (0, _common.getDependentVar)(item.config.analysis);
  var predictionFieldName = (0, _common.getPredictionFieldName)(item.config.analysis); // default is 'ml'

  var resultsField = item.config.dest.results_field;
  var jobIsCompleted = (0, _common2.isCompletedAnalyticsJob)(item.stats);
  var isRegressionJob = (0, _analytics.isRegressionAnalysis)(item.config.analysis);

  var loadData =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var genErrorEval, _getValuesFromRespons, meanSquaredError, rSquared, trainingErrorEval, _getValuesFromRespons2, _meanSquaredError, _rSquared;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsLoadingGeneralization(true);
              setIsLoadingTraining(true);
              _context.next = 4;
              return (0, _common.loadEvalData)({
                isTraining: false,
                index: index,
                dependentVariable: dependentVariable,
                resultsField: resultsField,
                predictionFieldName: predictionFieldName,
                jobType: _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION
              });

            case 4:
              genErrorEval = _context.sent;

              if (genErrorEval.success === true && genErrorEval.eval && (0, _analytics.isRegressionEvaluateResponse)(genErrorEval.eval)) {
                _getValuesFromRespons = (0, _common.getValuesFromResponse)(genErrorEval.eval), meanSquaredError = _getValuesFromRespons.meanSquaredError, rSquared = _getValuesFromRespons.rSquared;
                setGeneralizationEval({
                  meanSquaredError: meanSquaredError,
                  rSquared: rSquared,
                  error: null
                });
                setIsLoadingGeneralization(false);
              } else {
                setIsLoadingGeneralization(false);
                setGeneralizationEval({
                  meanSquaredError: '',
                  rSquared: '',
                  error: genErrorEval.error
                });
              }

              _context.next = 8;
              return (0, _common.loadEvalData)({
                isTraining: true,
                index: index,
                dependentVariable: dependentVariable,
                resultsField: resultsField,
                predictionFieldName: predictionFieldName,
                jobType: _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION
              });

            case 8:
              trainingErrorEval = _context.sent;

              if (trainingErrorEval.success === true && trainingErrorEval.eval && (0, _analytics.isRegressionEvaluateResponse)(trainingErrorEval.eval)) {
                _getValuesFromRespons2 = (0, _common.getValuesFromResponse)(trainingErrorEval.eval), _meanSquaredError = _getValuesFromRespons2.meanSquaredError, _rSquared = _getValuesFromRespons2.rSquared;
                setTrainingEval({
                  meanSquaredError: _meanSquaredError,
                  rSquared: _rSquared,
                  error: null
                });
                setIsLoadingTraining(false);
              } else {
                setIsLoadingTraining(false);
                setTrainingEval({
                  meanSquaredError: '',
                  rSquared: '',
                  error: genErrorEval.error
                });
              }

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function loadData() {
      return _ref3.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    if (jobIsCompleted && isRegressionJob) {
      loadData();
    }
  }, [jobIsCompleted]);

  var stateValues = _objectSpread({}, item.stats);

  if ((_item$config2 = item.config) === null || _item$config2 === void 0 ? void 0 : _item$config2.description) {
    stateValues.description = item.config.description;
  }

  delete stateValues.progress;
  var state = {
    title: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.expandedRow.tabs.jobSettings.state', {
      defaultMessage: 'State'
    }),
    items: Object.entries(stateValues).map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          stateKey = _ref5[0],
          stateValue = _ref5[1];

      var title = stateKey.toString();

      if (title === 'state') {
        return {
          title: title,
          description: (0, _columns.getTaskStateBadge)(getItemDescription(stateValue))
        };
      }

      return {
        title: title,
        description: getItemDescription(stateValue)
      };
    }),
    position: 'left'
  };
  var progress = {
    title: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.expandedRow.tabs.jobSettings.progress', {
      defaultMessage: 'Progress'
    }),
    items: item.stats.progress.map(function (s) {
      return {
        title: s.phase,
        description: _react.default.createElement(_progress_bar.ProgressBar, {
          progress: s.progress_percent
        })
      };
    }),
    position: 'left'
  };
  var stats = {
    title: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.expandedRow.tabs.jobSettings.stats', {
      defaultMessage: 'Stats'
    }),
    items: [{
      title: 'create_time',
      description: (0, _date_utils.formatHumanReadableDateTimeSeconds)((0, _momentTimezone.default)(item.config.create_time).unix() * 1000)
    }, {
      title: 'model_memory_limit',
      description: item.config.model_memory_limit
    }, {
      title: 'version',
      description: item.config.version
    }],
    position: 'right'
  };

  if (jobIsCompleted && isRegressionJob) {
    stats.items.push({
      title: 'generalization mean squared error',
      description: _react.default.createElement(LoadedStat, {
        isLoading: isLoadingGeneralization,
        evalData: generalizationEval,
        resultProperty: 'meanSquaredError'
      })
    }, {
      title: 'generalization r squared',
      description: _react.default.createElement(LoadedStat, {
        isLoading: isLoadingGeneralization,
        evalData: generalizationEval,
        resultProperty: 'rSquared'
      })
    }, {
      title: 'training mean squared error',
      description: _react.default.createElement(LoadedStat, {
        isLoading: isLoadingTraining,
        evalData: trainingEval,
        resultProperty: 'meanSquaredError'
      })
    }, {
      title: 'training r squared',
      description: _react.default.createElement(LoadedStat, {
        isLoading: isLoadingTraining,
        evalData: trainingEval,
        resultProperty: 'rSquared'
      })
    });
  }

  var tabs = [{
    id: 'ml-analytics-job-details',
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.expandedRow.tabs.jobSettingsLabel', {
      defaultMessage: 'Job details'
    }),
    content: _react.default.createElement(_expanded_row_details_pane.ExpandedRowDetailsPane, {
      sections: [state, progress, stats]
    })
  }, {
    id: 'ml-analytics-job-json',
    name: 'JSON',
    content: _react.default.createElement(_expanded_row_json_pane.ExpandedRowJsonPane, {
      json: item.config
    })
  }, {
    id: 'ml-analytics-job-messages',
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.analyticsDetails.tabs.analyticsMessagesLabel', {
      defaultMessage: 'Job messages'
    }),
    content: _react.default.createElement(_expanded_row_messages_pane.ExpandedRowMessagesPane, {
      analyticsId: item.id
    })
  }]; // Using `expand=false` here so the tabs themselves don't spread
  // across the full width. The 100% width is used so the bottom line
  // as well as the tab content spans across the full width.
  // EuiTabbedContent would do that usually anyway,
  // it just doesn't seem to work within certain layouts.

  return _react.default.createElement(_eui.EuiTabbedContent, {
    size: "s",
    tabs: tabs,
    initialSelectedTab: tabs[0],
    onTabClick: function onTabClick() {},
    expand: false,
    style: {
      width: '100%'
    }
  });
};

exports.ExpandedRow = ExpandedRow;