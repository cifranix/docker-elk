"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrequencyInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _description = require("./description");

var _job_utils = require("../../../../../../../../../common/util/job_utils");

var _hooks = require("../hooks");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FrequencyInput = function FrequencyInput() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobCreatorUpdated = _useContext.jobCreatorUpdated,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(jobValidator.frequency),
      _useState2 = _slicedToArray(_useState, 2),
      validation = _useState2[0],
      setValidation = _useState2[1];

  var _useStringifiedValue = (0, _hooks.useStringifiedValue)(jobCreator.frequency),
      frequency = _useStringifiedValue.value,
      setFrequency = _useStringifiedValue.setValue;

  var _useState3 = (0, _react.useState)(createDefaultFrequency()),
      _useState4 = _slicedToArray(_useState3, 2),
      defaultFrequency = _useState4[0],
      setDefaultFrequency = _useState4[1];

  (0, _react.useEffect)(function () {
    jobCreator.frequency = frequency === '' ? null : frequency;
    jobCreatorUpdate();
  }, [frequency]);
  (0, _react.useEffect)(function () {
    setFrequency(jobCreator.frequency);
    var df = createDefaultFrequency();
    setDefaultFrequency(df);
  }, [jobCreatorUpdated]);
  (0, _react.useEffect)(function () {
    setValidation(jobValidator.frequency);
  }, [jobValidatorUpdated]);

  function createDefaultFrequency() {
    var df = (0, _job_utils.calculateDatafeedFrequencyDefaultSeconds)(jobCreator.bucketSpanMs / 1000);
    return "".concat(df, "s");
  }

  return _react.default.createElement(_description.Description, {
    validation: validation
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: frequency,
    placeholder: defaultFrequency,
    onChange: function onChange(e) {
      return setFrequency(e.target.value);
    },
    isInvalid: validation.valid === false,
    "data-test-subj": "mlJobWizardInputFrequency"
  }));
};

exports.FrequencyInput = FrequencyInput;