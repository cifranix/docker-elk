"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategorizationDetectors = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _messagebar = require("../../../../../../../components/messagebar");

var _job_creator_context = require("../../../job_creator_context");

var _categorization_field = require("../categorization_field");

var _categorization_detector = require("../categorization_detector");

var _field_examples = require("./field_examples");

var _examples_valid_callout = require("./examples_valid_callout");

var _categorization_job = require("../../../../../../../../../common/constants/categorization_job");

var _loading_wrapper = require("../../../charts/loading_wrapper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CategorizationDetectors = function CategorizationDetectors(_ref) {
  var setIsValid = _ref.setIsValid;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      loadingData = _useState2[0],
      setLoadingData = _useState2[1];

  var _useState3 = (0, _react.useState)(jobCreator.start),
      _useState4 = _slicedToArray(_useState3, 2),
      start = _useState4[0],
      setStart = _useState4[1];

  var _useState5 = (0, _react.useState)(jobCreator.end),
      _useState6 = _slicedToArray(_useState5, 2),
      end = _useState6[0],
      setEnd = _useState6[1];

  var _useState7 = (0, _react.useState)(JSON.stringify(jobCreator.categorizationAnalyzer)),
      _useState8 = _slicedToArray(_useState7, 2),
      categorizationAnalyzerString = _useState8[0],
      setCategorizationAnalyzerString = _useState8[1];

  var _useState9 = (0, _react.useState)(null),
      _useState10 = _slicedToArray(_useState9, 2),
      fieldExamples = _useState10[0],
      setFieldExamples = _useState10[1];

  var _useState11 = (0, _react.useState)(_categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID),
      _useState12 = _slicedToArray(_useState11, 2),
      overallValidStatus = _useState12[0],
      setOverallValidStatus = _useState12[1];

  var _useState13 = (0, _react.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      validationChecks = _useState14[0],
      setValidationChecks = _useState14[1];

  var _useState15 = (0, _react.useState)(jobCreator.categorizationFieldName),
      _useState16 = _slicedToArray(_useState15, 2),
      categorizationFieldName = _useState16[0],
      setCategorizationFieldName = _useState16[1];

  (0, _react.useEffect)(function () {
    if (jobCreator.categorizationFieldName !== categorizationFieldName) {
      jobCreator.categorizationFieldName = categorizationFieldName;
      jobCreatorUpdate();
    }

    loadFieldExamples();
  }, [categorizationFieldName]);
  (0, _react.useEffect)(function () {
    var updateExamples = false;

    if (jobCreator.start !== start || jobCreator.end !== end) {
      setStart(jobCreator.start);
      setEnd(jobCreator.end);
      updateExamples = true;
    }

    var tempCategorizationAnalyzerString = JSON.stringify(jobCreator.categorizationAnalyzer);

    if (tempCategorizationAnalyzerString !== categorizationAnalyzerString) {
      setCategorizationAnalyzerString(tempCategorizationAnalyzerString);
      updateExamples = true;
    }

    if (updateExamples) {
      loadFieldExamples();
    }

    if (jobCreator.categorizationFieldName !== categorizationFieldName) {
      setCategorizationFieldName(jobCreator.categorizationFieldName);
    }
  }, [jobCreatorUpdated]);

  function loadFieldExamples() {
    return _loadFieldExamples.apply(this, arguments);
  }

  function _loadFieldExamples() {
    _loadFieldExamples = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref2, examples, tempOverallValidStatus, tempValidationChecks;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(categorizationFieldName !== null)) {
                _context.next = 24;
                break;
              }

              setLoadingData(true);
              _context.prev = 2;
              _context.next = 5;
              return jobCreator.loadCategorizationFieldExamples();

            case 5:
              _ref2 = _context.sent;
              examples = _ref2.examples;
              tempOverallValidStatus = _ref2.overallValidStatus;
              tempValidationChecks = _ref2.validationChecks;
              setFieldExamples(examples);
              setOverallValidStatus(tempOverallValidStatus);
              setValidationChecks(tempValidationChecks);
              setLoadingData(false);
              _context.next = 22;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](2);
              setLoadingData(false);
              setFieldExamples(null);
              setValidationChecks([]);
              setOverallValidStatus(_categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID);

              _messagebar.mlMessageBarService.notify.error(_context.t0);

            case 22:
              _context.next = 27;
              break;

            case 24:
              setFieldExamples(null);
              setValidationChecks([]);
              setOverallValidStatus(_categorization_job.CATEGORY_EXAMPLES_VALIDATION_STATUS.INVALID);

            case 27:
              setIsValid(categorizationFieldName !== null);

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 15]]);
    }));
    return _loadFieldExamples.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    jobCreatorUpdate();
  }, [overallValidStatus]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_categorization_detector.CategorizationDetector, null), _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_categorization_field.CategorizationField, null), loadingData === true && _react.default.createElement(_loading_wrapper.LoadingWrapper, {
    hasData: false,
    loading: true
  }, _react.default.createElement("div", null)), fieldExamples !== null && loadingData === false && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_examples_valid_callout.ExamplesValidCallout, {
    overallValidStatus: overallValidStatus,
    validationChecks: validationChecks,
    categorizationAnalyzer: jobCreator.categorizationAnalyzer
  }), _react.default.createElement(_field_examples.FieldExamples, {
    fieldExamples: fieldExamples
  })));
};

exports.CategorizationDetectors = CategorizationDetectors;