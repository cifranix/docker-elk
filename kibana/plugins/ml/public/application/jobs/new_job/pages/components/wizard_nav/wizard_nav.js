"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NextButton = exports.PreviousButton = exports.WizardNav = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
      nextActive = _ref$nextActive === void 0 ? true : _ref$nextActive,
      children = _ref.children;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, null), _react.default.createElement(_eui.EuiFlexGroup, null, previous && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(PreviousButton, {
    previous: previous,
    previousActive: previousActive
  })), next && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(NextButton, {
    next: next,
    nextActive: nextActive
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, children), _react.default.createElement(_eui.EuiFlexItem, null)));
};

exports.WizardNav = WizardNav;

var PreviousButton = function PreviousButton(_ref2) {
  var previous = _ref2.previous,
      _ref2$previousActive = _ref2.previousActive,
      previousActive = _ref2$previousActive === void 0 ? true : _ref2$previousActive;
  return _react.default.createElement(_eui.EuiButtonEmpty, {
    disabled: !previousActive,
    onClick: previous,
    iconType: "arrowLeft",
    iconSide: "left",
    "data-test-subj": "mlJobWizardNavButtonPrevious"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.previousStepButton",
    defaultMessage: "Previous"
  }));
};

exports.PreviousButton = PreviousButton;

var NextButton = function NextButton(_ref3) {
  var next = _ref3.next,
      _ref3$nextActive = _ref3.nextActive,
      nextActive = _ref3$nextActive === void 0 ? true : _ref3$nextActive;
  return _react.default.createElement(_eui.EuiButton, {
    fill: true,
    disabled: !nextActive,
    onClick: next,
    iconSide: "right",
    iconType: "arrowRight",
    "data-test-subj": "mlJobWizardNavButtonNext"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.nextStepButton",
    defaultMessage: "Next"
  }));
};

exports.NextButton = NextButton;