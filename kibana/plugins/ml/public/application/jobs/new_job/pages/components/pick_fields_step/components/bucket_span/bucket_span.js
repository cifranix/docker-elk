"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BucketSpan = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _bucket_span_input = require("./bucket_span_input");

var _job_creator_context = require("../../../job_creator_context");

var _description = require("./description");

var _bucket_span_estimator = require("../bucket_span_estimator");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var BucketSpan = function BucketSpan(_ref) {
  var setIsValid = _ref.setIsValid,
      _ref$hideEstimateButt = _ref.hideEstimateButton,
      hideEstimateButton = _ref$hideEstimateButt === void 0 ? false : _ref$hideEstimateButt;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(jobCreator.bucketSpan),
      _useState2 = _slicedToArray(_useState, 2),
      bucketSpan = _useState2[0],
      setBucketSpan = _useState2[1];

  var _useState3 = (0, _react.useState)(jobValidator.bucketSpan),
      _useState4 = _slicedToArray(_useState3, 2),
      validation = _useState4[0],
      setValidation = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      estimating = _useState6[0],
      setEstimating = _useState6[1];

  (0, _react.useEffect)(function () {
    jobCreator.bucketSpan = bucketSpan;
    jobCreatorUpdate();
  }, [bucketSpan]);
  (0, _react.useEffect)(function () {
    setBucketSpan(jobCreator.bucketSpan);
  }, [jobCreatorUpdated]);
  (0, _react.useEffect)(function () {
    setValidation(jobValidator.bucketSpan);
  }, [jobValidatorUpdated]);
  (0, _react.useEffect)(function () {
    setIsValid(estimating === false);
  }, [estimating]);
  return _react.default.createElement(_description.Description, {
    validation: validation
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_bucket_span_input.BucketSpanInput, {
    setBucketSpan: setBucketSpan,
    bucketSpan: bucketSpan,
    isInvalid: validation.valid === false,
    disabled: estimating
  })), hideEstimateButton === false && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_bucket_span_estimator.BucketSpanEstimator, {
    setEstimating: setEstimating
  }))));
};

exports.BucketSpan = BucketSpan;