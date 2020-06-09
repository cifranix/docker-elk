"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SplitFieldSelect = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var SplitFieldSelect = function SplitFieldSelect(_ref) {
  var fields = _ref.fields,
      changeHandler = _ref.changeHandler,
      selectedField = _ref.selectedField,
      isClearable = _ref.isClearable,
      testSubject = _ref.testSubject,
      placeholder = _ref.placeholder;
  var options = fields.map(function (f) {
    return {
      label: f.name,
      field: f
    };
  });
  var selection = [];

  if (selectedField !== null) {
    selection.push({
      label: selectedField.name,
      field: selectedField
    });
  }

  function onChange(selectedOptions) {
    var option = selectedOptions[0];

    if (typeof option !== 'undefined') {
      changeHandler(option.field);
    } else {
      changeHandler(null);
    }
  }

  return _react.default.createElement(_eui.EuiComboBox, {
    singleSelection: {
      asPlainText: true
    },
    options: options,
    selectedOptions: selection,
    onChange: onChange,
    isClearable: isClearable,
    placeholder: placeholder,
    "data-test-subj": testSubject
  });
};

exports.SplitFieldSelect = SplitFieldSelect;