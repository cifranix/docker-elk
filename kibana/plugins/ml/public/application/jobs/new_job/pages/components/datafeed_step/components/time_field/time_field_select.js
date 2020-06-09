"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeFieldSelect = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _job_creator_context = require("../../../job_creator_context");

var _general = require("../../../../../common/job_creator/util/general");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TimeFieldSelect = function TimeFieldSelect(_ref) {
  var fields = _ref.fields,
      changeHandler = _ref.changeHandler,
      selectedField = _ref.selectedField;

  var _useContext = (0, _react.useContext)(_job_creator_context.JobCreatorContext),
      jobCreator = _useContext.jobCreator;

  var options = (0, _general.createFieldOptions)(fields, jobCreator.additionalFields);
  var selection = [];

  if (selectedField !== null) {
    selection.push({
      label: selectedField
    });
  }

  function onChange(selectedOptions) {
    var option = selectedOptions[0];

    if (typeof option !== 'undefined') {
      changeHandler(option.label);
    }
  }

  return _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: options,
    selectedOptions: selection,
    onChange: onChange,
    isClearable: false,
    "data-test-subj": "mlTimeFieldNameSelect"
  });
};

exports.TimeFieldSelect = TimeFieldSelect;