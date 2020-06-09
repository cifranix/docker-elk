"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchModal = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var pivotModalTitle = _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorSwitchModalTitle', {
  defaultMessage: 'Unapplied changes'
});

var sourceModalTitle = _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedSourceEditorSwitchModalTitle', {
  defaultMessage: 'Edits will be lost'
});

var pivotModalMessage = _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorSwitchModalBodyText', {
  defaultMessage: "The changes in the advanced editor haven't been applied yet. By disabling the advanced editor you will lose your edits."
});

var sourceModalMessage = _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedSourceEditorSwitchModalBodyText', {
  defaultMessage: "By switching back to the query bar you will lose your edits."
});

var pivotModalConfirmButtonText = _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorSwitchModalConfirmButtonText', {
  defaultMessage: 'Disable advanced editor'
});

var sourceModalConfirmButtonText = _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedSourceEditorSwitchModalConfirmButtonText', {
  defaultMessage: 'Switch to query bar'
});

var cancelButtonText = _i18n.i18n.translate('xpack.transform.stepDefineForm.advancedEditorSwitchModalCancelButtonText', {
  defaultMessage: 'Cancel'
});

var SwitchModal = function SwitchModal(_ref) {
  var onCancel = _ref.onCancel,
      onConfirm = _ref.onConfirm,
      type = _ref.type;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: type === 'pivot' ? pivotModalTitle : sourceModalTitle,
    onCancel: onCancel,
    onConfirm: onConfirm,
    cancelButtonText: cancelButtonText,
    confirmButtonText: type === 'pivot' ? pivotModalConfirmButtonText : sourceModalConfirmButtonText,
    buttonColor: "danger",
    defaultFocusedButton: "confirm"
  }, _react.default.createElement("p", null, type === 'pivot' ? pivotModalMessage : sourceModalMessage)));
};

exports.SwitchModal = SwitchModal;