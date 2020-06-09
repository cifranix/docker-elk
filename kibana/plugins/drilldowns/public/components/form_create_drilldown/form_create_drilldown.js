"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormCreateDrilldown = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _drilldown_hello_bar = require("../drilldown_hello_bar");

var _i18n = require("./i18n");

var _drilldown_picker = require("../drilldown_picker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var noop = function noop() {};

var FormCreateDrilldown = function FormCreateDrilldown(_ref) {
  var _ref$name = _ref.name,
      name = _ref$name === void 0 ? '' : _ref$name,
      _ref$onNameChange = _ref.onNameChange,
      onNameChange = _ref$onNameChange === void 0 ? noop : _ref$onNameChange;

  var nameFragment = _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.txtNameOfDrilldown
  }, _react.default.createElement(_eui.EuiFieldText, {
    name: "drilldown_name",
    placeholder: _i18n.txtUntitledDrilldown,
    value: name,
    disabled: onNameChange === noop,
    onChange: function onChange(event) {
      return onNameChange(event.target.value);
    },
    "data-test-subj": "dynamicActionNameInput"
  }));

  var triggerPicker = _react.default.createElement("div", null, "Trigger Picker will be here");

  var actionPicker = _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.txtDrilldownAction
  }, _react.default.createElement(_drilldown_picker.DrilldownPicker, null));

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_drilldown_hello_bar.DrilldownHelloBar, null), _react.default.createElement(_eui.EuiForm, null, nameFragment), triggerPicker, actionPicker);
};

exports.FormCreateDrilldown = FormCreateDrilldown;