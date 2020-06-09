"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RareCard = exports.CountCard = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CountCard = function CountCard(_ref) {
  var onClick = _ref.onClick,
      isSelected = _ref.isSelected;
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    "data-test-subj": "mlJobWizardCategorizationDetectorCountCard".concat(isSelected ? ' selected' : ''),
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.categorizationDetectorSelect.countCard.title', {
      defaultMessage: 'Count'
    }),
    description: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.categorizationDetectorSelect.countCard.description",
      defaultMessage: "Look for anomalies in the event rate of a particular category."
    })),
    selectable: {
      onClick: onClick,
      isSelected: isSelected
    }
  }));
};

exports.CountCard = CountCard;

var RareCard = function RareCard(_ref2) {
  var onClick = _ref2.onClick,
      isSelected = _ref2.isSelected;
  return _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiCard, {
    "data-test-subj": "mlJobWizardCategorizationDetectorRareCard".concat(isSelected ? ' selected' : ''),
    title: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.categorizationDetectorSelect.rareCard.title', {
      defaultMessage: 'Rare'
    }),
    description: _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.newJob.wizard.pickFieldsStep.categorizationDetectorSelect.rareCard.description",
      defaultMessage: "Look for categories that occur rarely in time."
    })),
    selectable: {
      onClick: onClick,
      isSelected: isSelected
    }
  }));
};

exports.RareCard = RareCard;