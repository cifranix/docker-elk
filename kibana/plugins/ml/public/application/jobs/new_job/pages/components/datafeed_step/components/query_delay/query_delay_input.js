"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueryDelayInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _description = require("./description");

var _hooks = require("../hooks");

var _new_job = require("../../../../../../../../../common/constants/new_job");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var QueryDelayInput = function QueryDelayInput() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(jobValidator.queryDelay),
      _useState2 = _slicedToArray(_useState, 2),
      validation = _useState2[0],
      setValidation = _useState2[1];

  var _useStringifiedValue = (0, _hooks.useStringifiedValue)(jobCreator.queryDelay),
      queryDelay = _useStringifiedValue.value,
      setQueryDelay = _useStringifiedValue.setValue;

  (0, _react.useEffect)(function () {
    jobCreator.queryDelay = queryDelay === '' ? null : queryDelay;
    jobCreatorUpdate();
  }, [queryDelay]);
  (0, _react.useEffect)(function () {
    setQueryDelay(jobCreator.queryDelay === null ? '' : jobCreator.queryDelay);
  }, [jobCreatorUpdate]);
  (0, _react.useEffect)(function () {
    setValidation(jobValidator.queryDelay);
  }, [jobValidatorUpdated]);
  return _react.default.createElement(_description.Description, {
    validation: validation
  }, _react.default.createElement(_eui.EuiFieldText, {
    value: queryDelay,
    placeholder: _new_job.DEFAULT_QUERY_DELAY,
    onChange: function onChange(e) {
      return setQueryDelay(e.target.value);
    },
    isInvalid: validation.valid === false,
    "data-test-subj": "mlJobWizardInputQueryDelay"
  }));
};

exports.QueryDelayInput = QueryDelayInput;