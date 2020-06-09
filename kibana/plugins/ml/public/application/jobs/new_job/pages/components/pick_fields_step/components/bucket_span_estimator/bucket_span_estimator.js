"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BucketSpanEstimator = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _job_creator = require("../../../../../common/job_creator");

var _job_creator_context = require("../../../job_creator_context");

var _field_types = require("../../../../../../../../../common/constants/field_types");

var _estimate_bucket_span = require("./estimate_bucket_span");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var BucketSpanEstimator = function BucketSpanEstimator(_ref) {
  var setEstimating = _ref.setEstimating;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate;

  var _useEstimateBucketSpa = (0, _estimate_bucket_span.useEstimateBucketSpan)(),
      status = _useEstimateBucketSpa.status,
      estimateBucketSpan = _useEstimateBucketSpa.estimateBucketSpan;

  var _useState = (0, _react.useState)(jobCreator.detectors.length === 0),
      _useState2 = _slicedToArray(_useState, 2),
      noDetectors = _useState2[0],
      setNoDetectors = _useState2[1];

  var _useState3 = (0, _react.useState)(checkIsUsingMlCategory()),
      _useState4 = _slicedToArray(_useState3, 2),
      isUsingMlCategory = _useState4[0],
      setIsUsingMlCategory = _useState4[1];

  (0, _react.useEffect)(function () {
    setEstimating(status === _estimate_bucket_span.ESTIMATE_STATUS.RUNNING);
  }, [status]);
  (0, _react.useEffect)(function () {
    setNoDetectors(jobCreator.detectors.length === 0);
    setIsUsingMlCategory(checkIsUsingMlCategory());
  }, [jobCreatorUpdate]);

  function checkIsUsingMlCategory() {
    return (0, _job_creator.isAdvancedJobCreator)(jobCreator) && jobCreator.detectors.some(function (d) {
      if (d.partition_field_name === _field_types.MLCATEGORY || d.over_field_name === _field_types.MLCATEGORY || d.by_field_name === _field_types.MLCATEGORY) {
        return true;
      }
    });
  }

  return _react.default.createElement(_eui.EuiButton, {
    disabled: status === _estimate_bucket_span.ESTIMATE_STATUS.RUNNING || noDetectors === true || isUsingMlCategory === true,
    onClick: estimateBucketSpan
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.bucketSpanEstimatorButton",
    defaultMessage: "Estimate bucket span"
  }));
};

exports.BucketSpanEstimator = BucketSpanEstimator;