"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupsInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _job_creator_context = require("../../../job_creator_context");

var _group_color_utils = require("../../../../../../../../../common/util/group_color_utils");

var _description = require("./description");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var GroupsInput = function GroupsInput() {
  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator,
      jobCreatorUpdate = _useContext.jobCreatorUpdate,
      jobValidator = _useContext.jobValidator,
      jobValidatorUpdated = _useContext.jobValidatorUpdated;

  var _useContext2 = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      existingJobsAndGroups = _useContext2.existingJobsAndGroups;

  var _useState = (0, _react.useState)(jobCreator.groups),
      _useState2 = _slicedToArray(_useState, 2),
      selectedGroups = _useState2[0],
      setSelectedGroups = _useState2[1];

  var _useState3 = (0, _react.useState)(jobValidator.groupIds),
      _useState4 = _slicedToArray(_useState3, 2),
      validation = _useState4[0],
      setValidation = _useState4[1];

  (0, _react.useEffect)(function () {
    jobCreator.groups = selectedGroups;
    jobCreatorUpdate();
  }, [selectedGroups.join()]);
  var options = existingJobsAndGroups.groupIds.map(function (g) {
    return {
      label: g,
      color: (0, _group_color_utils.tabColor)(g)
    };
  });
  var selectedOptions = selectedGroups.map(function (g) {
    return {
      label: g,
      color: (0, _group_color_utils.tabColor)(g)
    };
  });

  function onChange(optionsIn) {
    setSelectedGroups(optionsIn.map(function (g) {
      return g.label;
    }));
  }

  function onCreateGroup(input, flattenedOptions) {
    var normalizedSearchValue = input.trim().toLowerCase();

    if (!normalizedSearchValue) {
      return;
    }

    var newGroup = {
      label: input,
      color: (0, _group_color_utils.tabColor)(input)
    };

    if (flattenedOptions.findIndex(function (option) {
      return option.label.trim().toLowerCase() === normalizedSearchValue;
    }) === -1) {
      options.push(newGroup);
    }

    setSelectedGroups([].concat(_toConsumableArray(selectedOptions), [newGroup]).map(function (g) {
      return g.label;
    }));
  }

  (0, _react.useEffect)(function () {
    setValidation(jobValidator.groupIds);
  }, [jobValidatorUpdated]);
  return _react.default.createElement(_description.Description, {
    validation: validation
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobDetailsStep.jobGroupSelect.placeholder', {
      defaultMessage: 'Select or create groups'
    }),
    options: options,
    selectedOptions: selectedOptions,
    onChange: onChange,
    onCreateOption: onCreateGroup,
    isClearable: true,
    isInvalid: validation.valid === false,
    "data-test-subj": "mlJobWizardComboBoxJobGroups"
  }));
};

exports.GroupsInput = GroupsInput;