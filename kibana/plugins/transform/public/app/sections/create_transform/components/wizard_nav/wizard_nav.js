"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WizardNav = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var WizardNav = function WizardNav(_ref) {
  var previous = _ref.previous,
      _ref$previousActive = _ref.previousActive,
      previousActive = _ref$previousActive === void 0 ? true : _ref$previousActive,
      next = _ref.next,
      _ref$nextActive = _ref.nextActive,
      nextActive = _ref$nextActive === void 0 ? true : _ref$nextActive;
  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null), previous && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    disabled: !previousActive,
    onClick: previous,
    iconType: "arrowLeft",
    size: "s",
    "data-test-subj": "transformWizardNavButtonPrevious"
  }, _i18n.i18n.translate('xpack.transform.wizard.previousStepButton', {
    defaultMessage: 'Previous'
  }))), next && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    disabled: !nextActive,
    onClick: next,
    iconType: "arrowRight",
    size: "s",
    "data-test-subj": "transformWizardNavButtonNext"
  }, _i18n.i18n.translate('xpack.transform.wizard.nextStepButton', {
    defaultMessage: 'Next'
  }))));
};

exports.WizardNav = WizardNav;