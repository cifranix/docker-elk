"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DropDown = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DropDown = function DropDown(_ref) {
  var changeHandler = _ref.changeHandler,
      options = _ref.options,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? 'Search ...' : _ref$placeholder,
      testSubj = _ref.testSubj;
  return _react.default.createElement(_eui.EuiComboBox, {
    placeholder: placeholder,
    singleSelection: {
      asPlainText: true
    },
    options: options,
    selectedOptions: [],
    onChange: changeHandler,
    isClearable: false,
    "data-test-subj": testSubj
  });
};

exports.DropDown = DropDown;