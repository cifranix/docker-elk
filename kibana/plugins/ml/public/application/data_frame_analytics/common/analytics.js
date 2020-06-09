"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValuesFromResponse = getValuesFromResponse;
exports.getEvalQueryBody = getEvalQueryBody;
exports.loadDocsCount = exports.loadEvalData = exports.useRefreshAnalyticsList = exports.refreshAnalyticsList$ = exports.REFRESH_ANALYTICS_LIST_STATE = exports.isClassificationEvaluateResponse = exports.isRegressionEvaluateResponse = exports.isResultsSearchBoolQuery = exports.isClassificationAnalysis = exports.isRegressionAnalysis = exports.isOutlierAnalysis = exports.getPredictedFieldName = exports.getPredictionFieldName = exports.getTrainingPercent = exports.getDependentVar = exports.getAnalysisType = exports.INDEX_STATUS = exports.defaultSearchQuery = exports.TRAINING_PERCENT_MAX = exports.TRAINING_PERCENT_MIN = exports.SEARCH_SIZE = exports.ANALYSIS_CONFIG_TYPE = void 0;

var _react = require("react");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _lodash = require("lodash");

var _ml_api_service = require("../../services/ml_api_service");

var _errors = require("../../../../common/util/errors");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ANALYSIS_CONFIG_TYPE;
exports.ANALYSIS_CONFIG_TYPE = ANALYSIS_CONFIG_TYPE;

(function (ANALYSIS_CONFIG_TYPE) {
  ANALYSIS_CONFIG_TYPE["OUTLIER_DETECTION"] = "outlier_detection";
  ANALYSIS_CONFIG_TYPE["REGRESSION"] = "regression";
  ANALYSIS_CONFIG_TYPE["CLASSIFICATION"] = "classification";
})(ANALYSIS_CONFIG_TYPE || (exports.ANALYSIS_CONFIG_TYPE = ANALYSIS_CONFIG_TYPE = {}));

var SEARCH_SIZE = 1000;
exports.SEARCH_SIZE = SEARCH_SIZE;
var TRAINING_PERCENT_MIN = 1;
exports.TRAINING_PERCENT_MIN = TRAINING_PERCENT_MIN;
var TRAINING_PERCENT_MAX = 100;
exports.TRAINING_PERCENT_MAX = TRAINING_PERCENT_MAX;
var defaultSearchQuery = {
  match_all: {}
};
exports.defaultSearchQuery = defaultSearchQuery;
var INDEX_STATUS;
exports.INDEX_STATUS = INDEX_STATUS;

(function (INDEX_STATUS) {
  INDEX_STATUS[INDEX_STATUS["UNUSED"] = 0] = "UNUSED";
  INDEX_STATUS[INDEX_STATUS["LOADING"] = 1] = "LOADING";
  INDEX_STATUS[INDEX_STATUS["LOADED"] = 2] = "LOADED";
  INDEX_STATUS[INDEX_STATUS["ERROR"] = 3] = "ERROR";
})(INDEX_STATUS || (exports.INDEX_STATUS = INDEX_STATUS = {}));

var getAnalysisType = function getAnalysisType(analysis) {
  var keys = Object.keys(analysis);

  if (keys.length === 1) {
    return keys[0];
  }

  return 'unknown';
};

exports.getAnalysisType = getAnalysisType;

var getDependentVar = function getDependentVar(analysis) {
  var depVar = '';

  if (isRegressionAnalysis(analysis)) {
    depVar = analysis.regression.dependent_variable;
  }

  if (isClassificationAnalysis(analysis)) {
    depVar = analysis.classification.dependent_variable;
  }

  return depVar;
};

exports.getDependentVar = getDependentVar;

var getTrainingPercent = function getTrainingPercent(analysis) {
  var trainingPercent;

  if (isRegressionAnalysis(analysis)) {
    trainingPercent = analysis.regression.training_percent;
  }

  if (isClassificationAnalysis(analysis)) {
    trainingPercent = analysis.classification.training_percent;
  }

  return trainingPercent;
};

exports.getTrainingPercent = getTrainingPercent;

var getPredictionFieldName = function getPredictionFieldName(analysis) {
  // If undefined will be defaulted to dependent_variable when config is created
  var predictionFieldName;

  if (isRegressionAnalysis(analysis) && analysis.regression.prediction_field_name !== undefined) {
    predictionFieldName = analysis.regression.prediction_field_name;
  } else if (isClassificationAnalysis(analysis) && analysis.classification.prediction_field_name !== undefined) {
    predictionFieldName = analysis.classification.prediction_field_name;
  }

  return predictionFieldName;
};

exports.getPredictionFieldName = getPredictionFieldName;

var getPredictedFieldName = function getPredictedFieldName(resultsField, analysis, forSort) {
  // default is 'ml'
  var predictionFieldName = getPredictionFieldName(analysis);
  var defaultPredictionField = "".concat(getDependentVar(analysis), "_prediction");
  var predictedField = "".concat(resultsField, ".").concat(predictionFieldName ? predictionFieldName : defaultPredictionField);
  return predictedField;
};

exports.getPredictedFieldName = getPredictedFieldName;

var isOutlierAnalysis = function isOutlierAnalysis(arg) {
  var keys = Object.keys(arg);
  return keys.length === 1 && keys[0] === ANALYSIS_CONFIG_TYPE.OUTLIER_DETECTION;
};

exports.isOutlierAnalysis = isOutlierAnalysis;

var isRegressionAnalysis = function isRegressionAnalysis(arg) {
  var keys = Object.keys(arg);
  return keys.length === 1 && keys[0] === ANALYSIS_CONFIG_TYPE.REGRESSION;
};

exports.isRegressionAnalysis = isRegressionAnalysis;

var isClassificationAnalysis = function isClassificationAnalysis(arg) {
  var keys = Object.keys(arg);
  return keys.length === 1 && keys[0] === ANALYSIS_CONFIG_TYPE.CLASSIFICATION;
};

exports.isClassificationAnalysis = isClassificationAnalysis;

var isResultsSearchBoolQuery = function isResultsSearchBoolQuery(arg) {
  var keys = Object.keys(arg);
  return keys.length === 1 && keys[0] === 'bool';
};

exports.isResultsSearchBoolQuery = isResultsSearchBoolQuery;

var isRegressionEvaluateResponse = function isRegressionEvaluateResponse(arg) {
  var _arg$regression, _arg$regression2;

  var keys = Object.keys(arg);
  return keys.length === 1 && keys[0] === ANALYSIS_CONFIG_TYPE.REGRESSION && (arg === null || arg === void 0 ? void 0 : (_arg$regression = arg.regression) === null || _arg$regression === void 0 ? void 0 : _arg$regression.mean_squared_error) !== undefined && (arg === null || arg === void 0 ? void 0 : (_arg$regression2 = arg.regression) === null || _arg$regression2 === void 0 ? void 0 : _arg$regression2.r_squared) !== undefined;
};

exports.isRegressionEvaluateResponse = isRegressionEvaluateResponse;

var isClassificationEvaluateResponse = function isClassificationEvaluateResponse(arg) {
  var _arg$classification;

  var keys = Object.keys(arg);
  return keys.length === 1 && keys[0] === ANALYSIS_CONFIG_TYPE.CLASSIFICATION && (arg === null || arg === void 0 ? void 0 : (_arg$classification = arg.classification) === null || _arg$classification === void 0 ? void 0 : _arg$classification.multiclass_confusion_matrix) !== undefined;
};

exports.isClassificationEvaluateResponse = isClassificationEvaluateResponse;
var REFRESH_ANALYTICS_LIST_STATE;
exports.REFRESH_ANALYTICS_LIST_STATE = REFRESH_ANALYTICS_LIST_STATE;

(function (REFRESH_ANALYTICS_LIST_STATE) {
  REFRESH_ANALYTICS_LIST_STATE["ERROR"] = "error";
  REFRESH_ANALYTICS_LIST_STATE["IDLE"] = "idle";
  REFRESH_ANALYTICS_LIST_STATE["LOADING"] = "loading";
  REFRESH_ANALYTICS_LIST_STATE["REFRESH"] = "refresh";
})(REFRESH_ANALYTICS_LIST_STATE || (exports.REFRESH_ANALYTICS_LIST_STATE = REFRESH_ANALYTICS_LIST_STATE = {}));

var refreshAnalyticsList$ = new _rxjs.BehaviorSubject(REFRESH_ANALYTICS_LIST_STATE.IDLE);
exports.refreshAnalyticsList$ = refreshAnalyticsList$;

var useRefreshAnalyticsList = function useRefreshAnalyticsList() {
  var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  (0, _react.useEffect)(function () {
    var distinct$ = refreshAnalyticsList$.pipe((0, _operators.distinctUntilChanged)());
    var subscriptions = [];

    if (typeof callback.onRefresh === 'function') {
      // initial call to refresh
      callback.onRefresh();
      subscriptions.push(distinct$.pipe((0, _operators.filter)(function (state) {
        return state === REFRESH_ANALYTICS_LIST_STATE.REFRESH;
      })).subscribe(function () {
        return typeof callback.onRefresh === 'function' && callback.onRefresh();
      }));
    }

    if (typeof callback.isLoading === 'function') {
      subscriptions.push(distinct$.subscribe(function (state) {
        return typeof callback.isLoading === 'function' && callback.isLoading(state === REFRESH_ANALYTICS_LIST_STATE.LOADING);
      }));
    }

    return function () {
      subscriptions.map(function (sub) {
        return sub.unsubscribe();
      });
    };
  }, []);
  return {
    refresh: function refresh() {
      // A refresh is followed immediately by setting the state to loading
      // to trigger data fetching and loading indicators in one go.
      refreshAnalyticsList$.next(REFRESH_ANALYTICS_LIST_STATE.REFRESH);
      refreshAnalyticsList$.next(REFRESH_ANALYTICS_LIST_STATE.LOADING);
    }
  };
};

exports.useRefreshAnalyticsList = useRefreshAnalyticsList;
var DEFAULT_SIG_FIGS = 3;

function getValuesFromResponse(response) {
  var _response$regression, _response$regression$, _response$regression2, _response$regression3;

  var meanSquaredError = response === null || response === void 0 ? void 0 : (_response$regression = response.regression) === null || _response$regression === void 0 ? void 0 : (_response$regression$ = _response$regression.mean_squared_error) === null || _response$regression$ === void 0 ? void 0 : _response$regression$.error;

  if (meanSquaredError) {
    meanSquaredError = Number(meanSquaredError.toPrecision(DEFAULT_SIG_FIGS));
  }

  var rSquared = response === null || response === void 0 ? void 0 : (_response$regression2 = response.regression) === null || _response$regression2 === void 0 ? void 0 : (_response$regression3 = _response$regression2.r_squared) === null || _response$regression3 === void 0 ? void 0 : _response$regression3.value;

  if (rSquared) {
    rSquared = Number(rSquared.toPrecision(DEFAULT_SIG_FIGS));
  }

  return {
    meanSquaredError: meanSquaredError,
    rSquared: rSquared
  };
}

function getEvalQueryBody(_ref) {
  var resultsField = _ref.resultsField,
      isTraining = _ref.isTraining,
      searchQuery = _ref.searchQuery,
      ignoreDefaultQuery = _ref.ignoreDefaultQuery;
  var query = {
    term: _defineProperty({}, "".concat(resultsField, ".is_training"), {
      value: isTraining
    })
  };

  if (searchQuery !== undefined && ignoreDefaultQuery === true) {
    query = searchQuery;
  } else if (searchQuery !== undefined && isResultsSearchBoolQuery(searchQuery)) {
    var searchQueryClone = (0, _lodash.cloneDeep)(searchQuery);
    searchQueryClone.bool.must.push(query);
    query = searchQueryClone;
  }

  return query;
}

var loadEvalData =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref3) {
    var isTraining, index, dependentVariable, resultsField, predictionFieldName, searchQuery, ignoreDefaultQuery, jobType, requiresKeyword, results, defaultPredictionField, predictedField, query, metrics, config, evalResult;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isTraining = _ref3.isTraining, index = _ref3.index, dependentVariable = _ref3.dependentVariable, resultsField = _ref3.resultsField, predictionFieldName = _ref3.predictionFieldName, searchQuery = _ref3.searchQuery, ignoreDefaultQuery = _ref3.ignoreDefaultQuery, jobType = _ref3.jobType, requiresKeyword = _ref3.requiresKeyword;
            results = {
              success: false,
              eval: null,
              error: null
            };
            defaultPredictionField = "".concat(dependentVariable, "_prediction");
            predictedField = "".concat(resultsField, ".").concat(predictionFieldName ? predictionFieldName : defaultPredictionField);

            if (jobType === ANALYSIS_CONFIG_TYPE.CLASSIFICATION && requiresKeyword === true) {
              predictedField = "".concat(predictedField, ".keyword");
            }

            query = getEvalQueryBody({
              resultsField: resultsField,
              isTraining: isTraining,
              searchQuery: searchQuery,
              ignoreDefaultQuery: ignoreDefaultQuery
            });
            metrics = {
              classification: {
                multiclass_confusion_matrix: {}
              },
              regression: {
                r_squared: {},
                mean_squared_error: {}
              }
            };
            config = {
              index: index,
              query: query,
              evaluation: _defineProperty({}, jobType, {
                actual_field: dependentVariable,
                predicted_field: predictedField,
                metrics: metrics[jobType]
              })
            };
            _context.prev = 8;
            _context.next = 11;
            return _ml_api_service.ml.dataFrameAnalytics.evaluateDataFrameAnalytics(config);

          case 11:
            evalResult = _context.sent;
            results.success = true;
            results.eval = evalResult;
            return _context.abrupt("return", results);

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](8);
            results.error = (0, _errors.getErrorMessage)(_context.t0);
            return _context.abrupt("return", results);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 17]]);
  }));

  return function loadEvalData(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.loadEvalData = loadEvalData;

var loadDocsCount =
/*#__PURE__*/
function () {
  var _ref4 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref5) {
    var _ref5$ignoreDefaultQu, ignoreDefaultQuery, isTraining, searchQuery, resultsField, destIndex, query, body, resp, docsCount;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref5$ignoreDefaultQu = _ref5.ignoreDefaultQuery, ignoreDefaultQuery = _ref5$ignoreDefaultQu === void 0 ? true : _ref5$ignoreDefaultQu, isTraining = _ref5.isTraining, searchQuery = _ref5.searchQuery, resultsField = _ref5.resultsField, destIndex = _ref5.destIndex;
            query = getEvalQueryBody({
              resultsField: resultsField,
              isTraining: isTraining,
              ignoreDefaultQuery: ignoreDefaultQuery,
              searchQuery: searchQuery
            });
            _context2.prev = 2;
            body = {
              track_total_hits: true,
              query: query
            };
            _context2.next = 6;
            return _ml_api_service.ml.esSearch({
              index: destIndex,
              size: 0,
              body: body
            });

          case 6:
            resp = _context2.sent;
            docsCount = resp.hits.total && resp.hits.total.value;
            return _context2.abrupt("return", {
              docsCount: docsCount,
              success: docsCount !== undefined
            });

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](2);
            return _context2.abrupt("return", {
              docsCount: null,
              success: false
            });

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 11]]);
  }));

  return function loadDocsCount(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.loadDocsCount = loadDocsCount;