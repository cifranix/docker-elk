"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvancedDetectorModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _general = require("../../../../../common/job_creator/util/general");

var _fields = require("../../../../../../../../../common/types/fields");

var _modal_wrapper = require("./modal_wrapper");

var _string_utils = require("../../../../../../../util/string_utils");

var _default_configs = require("../../../../../common/job_creator/util/default_configs");

var _descriptions = require("./descriptions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var emptyOption = {
  label: ''
};
var excludeFrequentOptions = [{
  label: 'all'
}, {
  label: 'none'
}];

var AdvancedDetectorModal = function AdvancedDetectorModal(_ref) {
  var payload = _ref.payload,
      fields = _ref.fields,
      aggs = _ref.aggs,
      detectorChangeHandler = _ref.detectorChangeHandler,
      closeModal = _ref.closeModal;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jc = _useContext.jobCreator;

  var jobCreator = jc;

  var _useState = (0, _react.useState)(payload.detector),
      _useState2 = _slicedToArray(_useState, 2),
      detector = _useState2[0],
      setDetector = _useState2[1];

  var _useState3 = (0, _react.useState)(createAggOption(detector.agg)),
      _useState4 = _slicedToArray(_useState3, 2),
      aggOption = _useState4[0],
      setAggOption = _useState4[1];

  var _useState5 = (0, _react.useState)(createFieldOption(detector.field)),
      _useState6 = _slicedToArray(_useState5, 2),
      fieldOption = _useState6[0],
      setFieldOption = _useState6[1];

  var _useState7 = (0, _react.useState)(createFieldOption(detector.byField)),
      _useState8 = _slicedToArray(_useState7, 2),
      byFieldOption = _useState8[0],
      setByFieldOption = _useState8[1];

  var _useState9 = (0, _react.useState)(createFieldOption(detector.overField)),
      _useState10 = _slicedToArray(_useState9, 2),
      overFieldOption = _useState10[0],
      setOverFieldOption = _useState10[1];

  var _useState11 = (0, _react.useState)(createFieldOption(detector.partitionField)),
      _useState12 = _slicedToArray(_useState11, 2),
      partitionFieldOption = _useState12[0],
      setPartitionFieldOption = _useState12[1];

  var _useState13 = (0, _react.useState)(createExcludeFrequentOption(detector.excludeFrequent)),
      _useState14 = _slicedToArray(_useState13, 2),
      excludeFrequentOption = _useState14[0],
      setExcludeFrequentOption = _useState14[1];

  var _useState15 = (0, _react.useState)(detector.description || ''),
      _useState16 = _slicedToArray(_useState15, 2),
      descriptionOption = _useState16[0],
      setDescriptionOption = _useState16[1];

  var _useState17 = (0, _react.useState)(true),
      _useState18 = _slicedToArray(_useState17, 2),
      splitFieldsEnabled = _useState18[0],
      setSplitFieldsEnabled = _useState18[1];

  var _useState19 = (0, _react.useState)(true),
      _useState20 = _slicedToArray(_useState19, 2),
      excludeFrequentEnabled = _useState20[0],
      setExcludeFrequentEnabled = _useState20[1];

  var _useState21 = (0, _react.useState)(true),
      _useState22 = _slicedToArray(_useState21, 2),
      fieldOptionEnabled = _useState22[0],
      setFieldOptionEnabled = _useState22[1];

  var _useDetectorPlacehold = useDetectorPlaceholder(detector),
      descriptionPlaceholder = _useDetectorPlacehold.descriptionPlaceholder,
      setDescriptionPlaceholder = _useDetectorPlacehold.setDescriptionPlaceholder;

  var usingScriptFields = jobCreator.additionalFields.length > 0; // list of aggregation combobox options.

  var aggOptions = aggs.filter(function (agg) {
    return filterAggs(agg, usingScriptFields);
  }).map(createAggOption); // fields available for the selected agg

  var _useCurrentFieldOptio = useCurrentFieldOptions(detector.agg, jobCreator.additionalFields, fields),
      currentFieldOptions = _useCurrentFieldOptio.currentFieldOptions,
      setCurrentFieldOptions = _useCurrentFieldOptio.setCurrentFieldOptions;

  var allFieldOptions = _toConsumableArray((0, _general.createFieldOptions)(fields, jobCreator.additionalFields)).sort(comboBoxOptionsSort);

  var splitFieldOptions = [].concat(_toConsumableArray(allFieldOptions), _toConsumableArray((0, _general.createMlcategoryFieldOption)(jobCreator.categorizationFieldName))).sort(comboBoxOptionsSort);
  var eventRateField = fields.find(function (f) {
    return f.id === _fields.EVENT_RATE_FIELD_ID;
  });

  var onOptionChange = function onOptionChange(func) {
    return function (selectedOptions) {
      func(selectedOptions[0] || emptyOption);
    };
  };

  function getAgg(title) {
    return aggs.find(function (a) {
      return a.id === title;
    }) || null;
  }

  function getField(title) {
    if (title === _fields.mlCategory.id) {
      return _fields.mlCategory;
    }

    return fields.find(function (f) {
      return f.id === title;
    }) || jobCreator.additionalFields.find(function (f) {
      return f.id === title;
    }) || null;
  }

  (0, _react.useEffect)(function () {
    var agg = getAgg(aggOption.label);
    var field = getField(fieldOption.label);
    var byField = getField(byFieldOption.label);
    var overField = getField(overFieldOption.label);
    var partitionField = getField(partitionFieldOption.label);

    if (agg !== null) {
      setCurrentFieldOptions(agg);

      if (isFieldlessAgg(agg) && eventRateField !== undefined) {
        setSplitFieldsEnabled(true);
        setFieldOption(emptyOption);
        setFieldOptionEnabled(false);
        field = eventRateField;
      } else {
        setSplitFieldsEnabled(field !== null);
        setFieldOptionEnabled(true);
      } // only enable exclude frequent if there is a by or over selected


      setExcludeFrequentEnabled(byField !== null || overField !== null);
    } else {
      setSplitFieldsEnabled(false);
      setFieldOptionEnabled(false);
    }

    var dtr = {
      agg: agg,
      field: field,
      byField: byField,
      overField: overField,
      partitionField: partitionField,
      excludeFrequent: excludeFrequentOption.label !== '' ? excludeFrequentOption.label : null,
      description: descriptionOption !== '' ? descriptionOption : null,
      customRules: null
    };
    setDetector(dtr);
    setDescriptionPlaceholder(dtr);
  }, [aggOption, fieldOption, byFieldOption, overFieldOption, partitionFieldOption, excludeFrequentOption, descriptionOption]);
  (0, _react.useEffect)(function () {
    var agg = getAgg(aggOption.label);
    setSplitFieldsEnabled(aggOption.label !== '');

    if (agg !== null) {
      setFieldOptionEnabled(isFieldlessAgg(agg) === false);
      var byField = getField(byFieldOption.label);
      var overField = getField(overFieldOption.label);
      setExcludeFrequentEnabled(byField !== null || overField !== null);
    }
  }, []);
  (0, _react.useEffect)(function () {
    // wipe the exclude frequent choice if the select has been disabled
    if (excludeFrequentEnabled === false) {
      setExcludeFrequentOption(emptyOption);
    }
  }, [excludeFrequentEnabled]);

  function onCreateClick() {
    detectorChangeHandler(detector, payload.index);
  }

  function saveEnabled() {
    return splitFieldsEnabled && (fieldOptionEnabled === false || fieldOptionEnabled === true && fieldOption.label !== '');
  }

  return _react.default.createElement(_modal_wrapper.ModalWrapper, {
    onCreateClick: onCreateClick,
    closeModal: closeModal,
    saveEnabled: saveEnabled()
  }, _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlAdvancedFunctionSelect"
  }, _react.default.createElement(_descriptions.AggDescription, null, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: aggOptions,
    selectedOptions: createSelectedOptions(aggOption, aggOptions),
    onChange: onOptionChange(setAggOption),
    isClearable: true
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlAdvancedFieldSelect"
  }, _react.default.createElement(_descriptions.FieldDescription, null, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: currentFieldOptions,
    selectedOptions: createSelectedOptions(fieldOption, currentFieldOptions),
    onChange: onOptionChange(setFieldOption),
    isClearable: true,
    isDisabled: fieldOptionEnabled === false
  })))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "l"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    columns: 2
  }, _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlAdvancedByFieldSelect"
  }, _react.default.createElement(_descriptions.ByFieldDescription, null, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: splitFieldOptions,
    selectedOptions: createSelectedOptions(byFieldOption, splitFieldOptions),
    onChange: onOptionChange(setByFieldOption),
    isClearable: true,
    isDisabled: splitFieldsEnabled === false
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlAdvancedOverFieldSelect"
  }, _react.default.createElement(_descriptions.OverFieldDescription, null, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: splitFieldOptions,
    selectedOptions: createSelectedOptions(overFieldOption, splitFieldOptions),
    onChange: onOptionChange(setOverFieldOption),
    isClearable: true,
    isDisabled: splitFieldsEnabled === false
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlAdvancedPartitionFieldSelect"
  }, _react.default.createElement(_descriptions.PartitionFieldDescription, null, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: splitFieldOptions,
    selectedOptions: createSelectedOptions(partitionFieldOption, splitFieldOptions),
    onChange: onOptionChange(setPartitionFieldOption),
    isClearable: true,
    isDisabled: splitFieldsEnabled === false
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    "data-test-subj": "mlAdvancedExcludeFrequentSelect"
  }, _react.default.createElement(_descriptions.ExcludeFrequentDescription, null, _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: excludeFrequentOptions,
    selectedOptions: createSelectedOptions(excludeFrequentOption, excludeFrequentOptions),
    onChange: onOptionChange(setExcludeFrequentOption),
    isClearable: true,
    isDisabled: splitFieldsEnabled === false || excludeFrequentEnabled === false
  })))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "l"
  }), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_descriptions.DescriptionDescription, null, _react.default.createElement(_eui.EuiTextArea, {
    rows: 2,
    fullWidth: true,
    placeholder: descriptionPlaceholder,
    value: descriptionOption,
    onChange: function onChange(e) {
      return setDescriptionOption(e.target.value);
    },
    "data-test-subj": "mlAdvancedDetectorDescriptionInput"
  }))))));
};

exports.AdvancedDetectorModal = AdvancedDetectorModal;

function createAggOption(agg) {
  if (agg === null) {
    return emptyOption;
  }

  return {
    label: agg.id
  };
} // get list of aggregations, filtering out any aggs with no fields,
// unless script fields are being used, in which case list all fields, as it's not possible
// to determine the type of a script field and so all aggs should be available.


function filterAggs(agg, usingScriptFields) {
  return agg.fields !== undefined && (usingScriptFields || agg.fields.length);
}

function createFieldOption(field) {
  if (field === null) {
    return emptyOption;
  }

  return {
    label: field.name
  };
}

function createExcludeFrequentOption(excludeFrequent) {
  if (excludeFrequent === null) {
    return emptyOption;
  }

  return {
    label: excludeFrequent
  };
}

function isFieldlessAgg(agg) {
  // fieldless aggs have been given one event rate field for UI reasons.
  // therefore if an agg's field list only contains event rate, it must be
  // a fieldless agg.
  return agg.fields && agg.fields.length === 1 && agg.fields[0].id === _fields.EVENT_RATE_FIELD_ID;
}

function useDetectorPlaceholder(detector) {
  var _useState23 = (0, _react.useState)(createDefaultDescription(detector)),
      _useState24 = _slicedToArray(_useState23, 2),
      descriptionPlaceholder = _useState24[0],
      setDescriptionPlaceholderString = _useState24[1];

  function setDescriptionPlaceholder(dtr) {
    setDescriptionPlaceholderString(createDefaultDescription(dtr));
  }

  return {
    descriptionPlaceholder: descriptionPlaceholder,
    setDescriptionPlaceholder: setDescriptionPlaceholder
  };
} // creates list of combobox options based on an aggregation's field list


function createFieldOptionsFromAgg(agg, additionalFields) {
  return (0, _general.createFieldOptions)(agg !== null && agg.fields !== undefined ? agg.fields : [], additionalFields);
} // custom hook for storing combobox options based on an aggregation field list


function useCurrentFieldOptions(aggregation, additionalFields, fields) {
  var _useState25 = (0, _react.useState)(createFieldOptionsFromAgg(aggregation, additionalFields)),
      _useState26 = _slicedToArray(_useState25, 2),
      currentFieldOptions = _useState26[0],
      _setCurrentFieldOptions = _useState26[1];

  return {
    currentFieldOptions: currentFieldOptions,
    setCurrentFieldOptions: function setCurrentFieldOptions(agg) {
      return _setCurrentFieldOptions(createFieldOptionsFromAgg(agg, additionalFields));
    }
  };
}

function createDefaultDescription(dtr) {
  if (dtr.agg === null || dtr.field === null) {
    return '';
  }

  var basicDetector = (0, _default_configs.createBasicDetector)(dtr.agg, dtr.field);
  basicDetector.by_field_name = dtr.byField ? dtr.byField.id : undefined;
  basicDetector.over_field_name = dtr.overField ? dtr.overField.id : undefined;
  basicDetector.partition_field_name = dtr.partitionField ? dtr.partitionField.id : undefined;
  basicDetector.exclude_frequent = dtr.excludeFrequent ? dtr.excludeFrequent : undefined;
  return (0, _string_utils.detectorToString)(basicDetector);
} // fixes issue with EuiComboBox.
// if the options list only contains one option and nothing has been selected, set
// selectedOptions list to be an empty array


function createSelectedOptions(selectedOption, options) {
  return options.length === 1 && options[0].label !== selectedOption.label || selectedOption.label === '' ? [] : [selectedOption];
}

function comboBoxOptionsSort(a, b) {
  return a.label.localeCompare(b.label);
}