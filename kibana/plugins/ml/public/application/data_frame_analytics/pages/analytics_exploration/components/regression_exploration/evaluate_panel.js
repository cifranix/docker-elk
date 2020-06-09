"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvaluatePanel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _kibana = require("../../../../../contexts/kibana");

var _error_callout = require("../error_callout");

var _common = require("../../../../common");

var _columns = require("../../../analytics_management/components/analytics_list/columns");

var _evaluate_stat = require("./evaluate_stat");

var _analytics = require("../../../../common/analytics");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var defaultEval = {
  meanSquaredError: '',
  rSquared: '',
  error: null
};

var EvaluatePanel = function EvaluatePanel(_ref) {
  var jobConfig = _ref.jobConfig,
      jobStatus = _ref.jobStatus,
      searchQuery = _ref.searchQuery;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      docLinks = _useMlKibana.services.docLinks;

  var ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL,
      DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION;

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

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      trainingDocsCount = _useState10[0],
      setTrainingDocsCount = _useState10[1];

  var _useState11 = (0, _react.useState)(null),
      _useState12 = _slicedToArray(_useState11, 2),
      generalizationDocsCount = _useState12[0],
      setGeneralizationDocsCount = _useState12[1];

  var index = jobConfig.dest.index;
  var dependentVariable = (0, _common.getDependentVar)(jobConfig.analysis);
  var predictionFieldName = (0, _common.getPredictionFieldName)(jobConfig.analysis); // default is 'ml'

  var resultsField = jobConfig.dest.results_field;

  var loadGeneralizationData =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var ignoreDefaultQuery,
          genErrorEval,
          _getValuesFromRespons,
          meanSquaredError,
          rSquared,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              ignoreDefaultQuery = _args.length > 0 && _args[0] !== undefined ? _args[0] : true;
              setIsLoadingGeneralization(true);
              _context.next = 4;
              return (0, _common.loadEvalData)({
                isTraining: false,
                index: index,
                dependentVariable: dependentVariable,
                resultsField: resultsField,
                predictionFieldName: predictionFieldName,
                searchQuery: searchQuery,
                ignoreDefaultQuery: ignoreDefaultQuery,
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

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function loadGeneralizationData() {
      return _ref2.apply(this, arguments);
    };
  }();

  var loadTrainingData =
  /*#__PURE__*/
  function () {
    var _ref3 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var ignoreDefaultQuery,
          trainingErrorEval,
          _getValuesFromRespons2,
          meanSquaredError,
          rSquared,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              ignoreDefaultQuery = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : true;
              setIsLoadingTraining(true);
              _context2.next = 4;
              return (0, _common.loadEvalData)({
                isTraining: true,
                index: index,
                dependentVariable: dependentVariable,
                resultsField: resultsField,
                predictionFieldName: predictionFieldName,
                searchQuery: searchQuery,
                ignoreDefaultQuery: ignoreDefaultQuery,
                jobType: _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION
              });

            case 4:
              trainingErrorEval = _context2.sent;

              if (trainingErrorEval.success === true && trainingErrorEval.eval && (0, _analytics.isRegressionEvaluateResponse)(trainingErrorEval.eval)) {
                _getValuesFromRespons2 = (0, _common.getValuesFromResponse)(trainingErrorEval.eval), meanSquaredError = _getValuesFromRespons2.meanSquaredError, rSquared = _getValuesFromRespons2.rSquared;
                setTrainingEval({
                  meanSquaredError: meanSquaredError,
                  rSquared: rSquared,
                  error: null
                });
                setIsLoadingTraining(false);
              } else {
                setIsLoadingTraining(false);
                setTrainingEval({
                  meanSquaredError: '',
                  rSquared: '',
                  error: trainingErrorEval.error
                });
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function loadTrainingData() {
      return _ref3.apply(this, arguments);
    };
  }();

  var loadData =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(_ref5) {
      var isTrainingClause, docsCountResp, _docsCountResp, genDocsCountResp, trainDocsCountResp;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              isTrainingClause = _ref5.isTrainingClause;

              if (!(isTrainingClause !== undefined && isTrainingClause.query === 'false')) {
                _context3.next = 11;
                break;
              }

              loadGeneralizationData();
              _context3.next = 5;
              return (0, _common.loadDocsCount)({
                isTraining: false,
                searchQuery: searchQuery,
                resultsField: resultsField,
                destIndex: jobConfig.dest.index
              });

            case 5:
              docsCountResp = _context3.sent;

              if (docsCountResp.success === true) {
                setGeneralizationDocsCount(docsCountResp.docsCount);
              } else {
                setGeneralizationDocsCount(null);
              }

              setTrainingDocsCount(0);
              setTrainingEval({
                meanSquaredError: '--',
                rSquared: '--',
                error: null
              });
              _context3.next = 31;
              break;

            case 11:
              if (!(isTrainingClause !== undefined && isTrainingClause.query === 'true')) {
                _context3.next = 21;
                break;
              }

              // searchBar query is filtering for training data
              loadTrainingData();
              _context3.next = 15;
              return (0, _common.loadDocsCount)({
                isTraining: true,
                searchQuery: searchQuery,
                resultsField: resultsField,
                destIndex: jobConfig.dest.index
              });

            case 15:
              _docsCountResp = _context3.sent;

              if (_docsCountResp.success === true) {
                setTrainingDocsCount(_docsCountResp.docsCount);
              } else {
                setTrainingDocsCount(null);
              }

              setGeneralizationDocsCount(0);
              setGeneralizationEval({
                meanSquaredError: '--',
                rSquared: '--',
                error: null
              });
              _context3.next = 31;
              break;

            case 21:
              // No is_training clause/filter from search bar so load both
              loadGeneralizationData(false);
              _context3.next = 24;
              return (0, _common.loadDocsCount)({
                ignoreDefaultQuery: false,
                isTraining: false,
                searchQuery: searchQuery,
                resultsField: resultsField,
                destIndex: jobConfig.dest.index
              });

            case 24:
              genDocsCountResp = _context3.sent;

              if (genDocsCountResp.success === true) {
                setGeneralizationDocsCount(genDocsCountResp.docsCount);
              } else {
                setGeneralizationDocsCount(null);
              }

              loadTrainingData(false);
              _context3.next = 29;
              return (0, _common.loadDocsCount)({
                ignoreDefaultQuery: false,
                isTraining: true,
                searchQuery: searchQuery,
                resultsField: resultsField,
                destIndex: jobConfig.dest.index
              });

            case 29:
              trainDocsCountResp = _context3.sent;

              if (trainDocsCountResp.success === true) {
                setTrainingDocsCount(trainDocsCountResp.docsCount);
              } else {
                setTrainingDocsCount(null);
              }

            case 31:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function loadData(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    var hasIsTrainingClause = (0, _analytics.isResultsSearchBoolQuery)(searchQuery) && searchQuery.bool.must.filter(function (clause) {
      return clause.match && clause.match["".concat(resultsField, ".is_training")] !== undefined;
    });
    var isTrainingClause = hasIsTrainingClause && hasIsTrainingClause[0] && hasIsTrainingClause[0].match["".concat(resultsField, ".is_training")];
    loadData({
      isTrainingClause: isTrainingClause
    });
  }, [JSON.stringify(searchQuery)]);
  return _react.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "mlDFAnalyticsRegressionExplorationEvaluatePanel"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.evaluateJobIdTitle', {
    defaultMessage: 'Evaluation of regression job ID {jobId}',
    values: {
      jobId: jobConfig.id
    }
  })))), jobStatus !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("span", null, (0, _columns.getTaskStateBadge)(jobStatus))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiSpacer, null)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    target: "_blank",
    iconType: "help",
    iconSide: "left",
    color: "primary",
    href: "".concat(ELASTIC_WEBSITE_URL, "guide/en/machine-learning/").concat(DOC_LINK_VERSION, "/ml-dfanalytics-evaluate.html#ml-dfanalytics-regression-evaluation")
  }, _i18n.i18n.translate('xpack.ml.dataframe.analytics.classificationExploration.regressionDocsLink', {
    defaultMessage: 'Regression evaluation docs '
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.generalizationErrorTitle', {
    defaultMessage: 'Generalization error'
  }))), generalizationDocsCount !== null && _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.dataframe.analytics.regressionExploration.generalizationDocsCount",
    defaultMessage: "{docsCount, plural, one {# doc} other {# docs}} evaluated",
    values: {
      docsCount: generalizationDocsCount
    }
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, generalizationEval.error !== null && _react.default.createElement(_error_callout.ErrorCallout, {
    error: generalizationEval.error
  }), generalizationEval.error === null && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_evaluate_stat.EvaluateStat, {
    dataTestSubj: 'mlDFAnalyticsRegressionGenMSEstat',
    isLoading: isLoadingGeneralization,
    title: generalizationEval.meanSquaredError,
    isMSE: true
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_evaluate_stat.EvaluateStat, {
    dataTestSubj: 'mlDFAnalyticsRegressionGenRSquaredStat',
    isLoading: isLoadingGeneralization,
    title: generalizationEval.rSquared,
    isMSE: false
  }))))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.trainingErrorTitle', {
    defaultMessage: 'Training error'
  }))), trainingDocsCount !== null && _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.dataframe.analytics.regressionExploration.trainingDocsCount",
    defaultMessage: "{docsCount, plural, one {# doc} other {# docs}} evaluated",
    values: {
      docsCount: trainingDocsCount
    }
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFlexGroup, null, trainingEval.error !== null && _react.default.createElement(_error_callout.ErrorCallout, {
    error: trainingEval.error
  }), trainingEval.error === null && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_evaluate_stat.EvaluateStat, {
    dataTestSubj: 'mlDFAnalyticsRegressionTrainingMSEstat',
    isLoading: isLoadingTraining,
    title: trainingEval.meanSquaredError,
    isMSE: true
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_evaluate_stat.EvaluateStat, {
    dataTestSubj: 'mlDFAnalyticsRegressionTrainingRSquaredStat',
    isLoading: isLoadingTraining,
    title: trainingEval.rSquared,
    isMSE: false
  })))))));
};

exports.EvaluatePanel = EvaluatePanel;