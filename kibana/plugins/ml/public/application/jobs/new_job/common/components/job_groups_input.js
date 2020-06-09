"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobGroupsInput = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _group_color_utils = require("../../../../../../common/util/group_color_utils");

var _description = require("../../pages/components/job_details_step/components/groups/description");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var JobGroupsInput = (0, _react.memo)(function (_ref) {
  var existingGroups = _ref.existingGroups,
      selectedGroups = _ref.selectedGroups,
      onChange = _ref.onChange,
      validation = _ref.validation;
  var options = existingGroups.map(function (g) {
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

  function onChangeCallback(optionsIn) {
    onChange(optionsIn.map(function (g) {
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

    onChangeCallback([].concat(_toConsumableArray(selectedOptions), [newGroup]));
  }

  return _react.default.createElement(_description.Description, {
    validation: validation
  }, _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('xpack.ml.newJob.wizard.jobDetailsStep.jobGroupSelect.placeholder', {
      defaultMessage: 'Select or create groups'
    }),
    options: options,
    selectedOptions: selectedOptions,
    onChange: onChangeCallback,
    onCreateOption: onCreateGroup,
    isClearable: true,
    isInvalid: !validation.valid,
    "data-test-subj": "mlJobWizardComboBoxJobGroups"
  }));
});
exports.JobGroupsInput = JobGroupsInput;