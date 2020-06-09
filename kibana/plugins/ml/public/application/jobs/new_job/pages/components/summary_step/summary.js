"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummaryStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _kibana = require("../../../../../contexts/kibana");

var _wizard_nav = require("../wizard_nav");

var _step_types = require("../step_types");

var _job_creator_context = require("../job_creator_context");

var _job_service = require("../../../../../services/job_service");

var _json_editor_flyout = require("../common/json_editor_flyout");

var _datafeed_preview_flyout = require("../common/datafeed_preview_flyout");

var _new_job = require("../../../../../../../common/constants/new_job");

var _errors = require("../../../../../../../common/util/errors");

var _job_creator = require("../../../common/job_creator");

var _job_details = require("./components/job_details");

var _datafeed_details = require("./components/datafeed_details");

var _detector_chart = require("./components/detector_chart");

var _job_progress = require("./components/job_progress");

var _post_save_options = require("./components/post_save_options");

var _general = require("../../../common/job_creator/util/general");

var _common = require("./components/common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SummaryStep = function SummaryStep(_ref) {
  var setCurrentStep = _ref.setCurrentStep,
      isCurrentStep = _ref.isCurrentStep;

  var _useMlKibana = (0, _kibana.useMlKibana)(),
      notifications = _useMlKibana.services.notifications;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated,
      resultsLoader = _useContext.resultsLoader;

  var _useState = (0, _react.useState)(resultsLoader.progress),
      _useState2 = _slicedToArray(_useState, 2),
      progress = _useState2[0],
      setProgress = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      creatingJob = _useState4[0],
      setCreatingJob = _useState4[1];

  var _useState5 = (0, _react.useState)(jobValidator.validationSummary.basic),
      _useState6 = _slicedToArray(_useState5, 2),
      isValid = _useState6[0],
      setIsValid = _useState6[1];

  var _useState7 = (0, _react.useState)(null),
      _useState8 = _slicedToArray(_useState7, 2),
      jobRunner = _useState8[0],
      setJobRunner = _useState8[1];

  var isAdvanced = (0, _job_creator.isAdvancedJobCreator)(jobCreator);
  (0, _react.useEffect)(function () {
    jobCreator.subscribeToProgress(setProgress);
  }, []);

  function start() {
    return _start.apply(this, arguments);
  }

  function _start() {
    _start = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(jobCreator.type === _new_job.JOB_TYPE.ADVANCED)) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return startAdvanced();

            case 3:
              _context.next = 7;
              break;

            case 5:
              _context.next = 7;
              return startInline();

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _start.apply(this, arguments);
  }

  function startInline() {
    return _startInline.apply(this, arguments);
  }

  function _startInline() {
    _startInline = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var jr, toasts;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setCreatingJob(true);
              _context2.prev = 1;
              _context2.next = 4;
              return jobCreator.createAndStartJob();

            case 4:
              jr = _context2.sent;
              setJobRunner(jr);
              _context2.next = 13;
              break;

            case 8:
              _context2.prev = 8;
              _context2.t0 = _context2["catch"](1);
              // catch and display all job creation errors
              toasts = notifications.toasts;
              toasts.addDanger({
                title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.createJobError', {
                  defaultMessage: "Job creation error"
                }),
                text: (0, _errors.getErrorMessage)(_context2.t0)
              });
              setCreatingJob(false);

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 8]]);
    }));
    return _startInline.apply(this, arguments);
  }

  function startAdvanced() {
    return _startAdvanced.apply(this, arguments);
  }

  function _startAdvanced() {
    _startAdvanced = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var toasts;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setCreatingJob(true);
              _context3.prev = 1;
              _context3.next = 4;
              return jobCreator.createJob();

            case 4:
              _context3.next = 6;
              return jobCreator.createDatafeed();

            case 6:
              (0, _general.advancedStartDatafeed)(jobCreator);
              _context3.next = 14;
              break;

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3["catch"](1);
              // catch and display all job creation errors
              toasts = notifications.toasts;
              toasts.addDanger({
                title: _i18n.i18n.translate('xpack.ml.newJob.wizard.summaryStep.createJobError', {
                  defaultMessage: "Job creation error"
                }),
                text: (0, _errors.getErrorMessage)(_context3.t0)
              });
              setCreatingJob(false);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 9]]);
    }));
    return _startAdvanced.apply(this, arguments);
  }

  function viewResults() {
    var url = _job_service.mlJobService.createResultsUrl([jobCreator.jobId], jobCreator.start, jobCreator.end, (0, _job_creator.isSingleMetricJobCreator)(jobCreator) === true ? 'timeseriesexplorer' : 'explorer');

    window.open(url, '_blank');
  }

  function clickResetJob() {
    (0, _general.resetJob)(jobCreator);
  }

  var convertToAdvanced = function convertToAdvanced() {
    (0, _general.convertToAdvancedJob)(jobCreator);
  };

  (0, _react.useEffect)(function () {
    setIsValid(jobValidator.validationSummary.basic);
  }, [jobValidatorUpdated]);
  return _react.default.createElement(_react.Fragment, null, isCurrentStep && _react.default.createElement(_react.Fragment, null, isAdvanced && _react.default.createElement(_common.JobSectionTitle, null), _react.default.createElement(_detector_chart.DetectorChart, null), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_job_progress.JobProgress, {
    progress: progress
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_job_details.JobDetails, null), isAdvanced && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_common.DatafeedSectionTitle, null), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_datafeed_details.DatafeedDetails, null)), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiFlexGroup, null, progress < 100 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_wizard_nav.PreviousButton, {
    previous: function previous() {
      return setCurrentStep(_step_types.WIZARD_STEPS.VALIDATION);
    },
    previousActive: creatingJob === false && isValid === true
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: start,
    isDisabled: creatingJob === true || isValid === false,
    "data-test-subj": "mlJobWizardButtonCreateJob",
    fill: true
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.createJobButton",
    defaultMessage: "Create job"
  })))), creatingJob === false && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_json_editor_flyout.JsonEditorFlyout, {
    isDisabled: progress > 0,
    jobEditorMode: _json_editor_flyout.EDITOR_MODE.READONLY,
    datafeedEditorMode: _json_editor_flyout.EDITOR_MODE.READONLY
  })), jobCreator.type === _new_job.JOB_TYPE.ADVANCED ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_datafeed_preview_flyout.DatafeedPreviewFlyout, {
    isDisabled: false
  })) : _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: convertToAdvanced
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.convertToAdvancedButton",
    defaultMessage: "Convert to advanced job"
  })))), progress > 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: viewResults,
    "data-test-subj": "mlJobWizardButtonViewResults"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.viewResultsButton",
    defaultMessage: "View results"
  })))), progress === 100 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    onClick: clickResetJob,
    "data-test-subj": "mlJobWizardButtonResetJob"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.summaryStep.resetJobButton",
    defaultMessage: "Reset job"
  }))), _react.default.createElement(_post_save_options.PostSaveOptions, {
    jobRunner: jobRunner
  })))));
};

exports.SummaryStep = SummaryStep;