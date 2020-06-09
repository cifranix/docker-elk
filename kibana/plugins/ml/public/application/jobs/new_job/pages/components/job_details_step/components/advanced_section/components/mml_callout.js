"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MMLCallout = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../../job_creator_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MMLCallout = function MMLCallout() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      highCardinality = _useState2[0],
      setHighCardinality = _useState2[1];

  (0, _react.useEffect)(function () {
    var _ref, _jobValidator$latestV, _jobValidator$latestV2;

    var value = (_ref = (_jobValidator$latestV = jobValidator.latestValidationResult) === null || _jobValidator$latestV === void 0 ? void 0 : (_jobValidator$latestV2 = _jobValidator$latestV.highCardinality) === null || _jobValidator$latestV2 === void 0 ? void 0 : _jobValidator$latestV2.value) !== null && _ref !== void 0 ? _ref : null;
    setHighCardinality(value);
  }, [jobValidatorUpdated]);
  return jobCreator.modelPlot && highCardinality !== null ? _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.jobDetailsStep.advancedSection.mmlWarning.title",
      defaultMessage: "Proceed with caution!"
    }),
    color: "warning",
    iconType: "help"
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.jobDetailsStep.advancedSection.mmlWarning.message",
    defaultMessage: "Creating model plots is resource intensive and not recommended where the cardinality of the selected fields is greater than 100. Estimated cardinality for this job is {highCardinality}. If you enable model plot with this configuration we recommend you use a dedicated results index.",
    values: {
      highCardinality: highCardinality
    }
  }))) : null;
};

exports.MMLCallout = MMLCallout;