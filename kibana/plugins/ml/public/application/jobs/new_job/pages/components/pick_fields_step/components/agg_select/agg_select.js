"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createLabel = createLabel;
exports.AggSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AggSelect = function AggSelect(_ref) {
  var fields = _ref.fields,
      changeHandler = _ref.changeHandler,
      selectedOptions = _ref.selectedOptions,
      removeOptions = _ref.removeOptions;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useState = (0, _react.useState)(jobValidator.duplicateDetectors),
      _useState2 = _slicedToArray(_useState, 2),
      validation = _useState2[0],
      setValidation = _useState2[1]; // create list of labels based on already selected detectors
  // so they can be removed from the dropdown list


  var removeLabels = removeOptions.map(createLabel);
  var options = fields.map(function (f) {
    var aggOption = {
      label: f.name,
      options: []
    };

    if (typeof f.aggs !== 'undefined') {
      aggOption.options = f.aggs.filter(function (a) {
        return a.dslName !== null;
      }) // don't include aggs which have no ES equivalent
      .map(function (a) {
        return {
          label: "".concat(a.title, "(").concat(f.name, ")"),
          agg: a,
          field: f
        };
      }).filter(function (o) {
        return removeLabels.includes(o.label) === false;
      });
    }

    return aggOption;
  });
  (0, _react.useEffect)(function () {
    setValidation(jobValidator.duplicateDetectors);
  }, [jobValidatorUpdated]);
  return _react.default.createElement(_eui.EuiFormRow, {
    error: validation.message,
    isInvalid: validation.valid === false,
    "data-test-subj": "mlJobWizardAggSelection"
  }, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: options,
    selectedOptions: selectedOptions,
    onChange: changeHandler,
    isClearable: false,
    isInvalid: validation.valid === false
  }));
};

exports.AggSelect = AggSelect;

function createLabel(pair) {
  return "".concat(pair.agg.title, "(").concat(pair.field.name, ")");
}