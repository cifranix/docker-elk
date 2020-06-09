"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateAnalyticsButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _check_privilege = require("../../../../../privilege/check_privilege");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var CreateAnalyticsButton = function CreateAnalyticsButton(props) {
  var disabled = props.state.disabled;
  var openModal = props.actions.openModal;

  var button = _react.default.createElement(_eui.EuiButton, {
    disabled: disabled,
    fill: true,
    onClick: openModal,
    iconType: "plusInCircle",
    size: "s",
    "data-test-subj": "mlAnalyticsButtonCreate"
  }, _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.createDataFrameAnalyticsButton', {
    defaultMessage: 'Create analytics job'
  }));

  if (disabled) {
    return _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: (0, _check_privilege.createPermissionFailureMessage)('canCreateDataFrameAnalytics')
    }, button);
  }

  return button;
};

exports.CreateAnalyticsButton = CreateAnalyticsButton;