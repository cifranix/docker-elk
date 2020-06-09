"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmAlterActiveSpaceModal = void 0;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ConfirmAlterActiveSpaceModalUI = function ConfirmAlterActiveSpaceModalUI(props) {
  return _react2.default.createElement(_eui.EuiOverlayMask, null, _react2.default.createElement(_eui.EuiConfirmModal, {
    onConfirm: props.onConfirm,
    onCancel: props.onCancel,
    title: _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.spaces.management.confirmAlterActiveSpaceModal.title",
      defaultMessage: "Confirm update space"
    }),
    defaultFocusedButton: 'confirm',
    cancelButtonText: props.intl.formatMessage({
      id: 'xpack.spaces.management.confirmAlterActiveSpaceModal.cancelButton',
      defaultMessage: 'Cancel'
    }),
    confirmButtonText: props.intl.formatMessage({
      id: 'xpack.spaces.management.confirmAlterActiveSpaceModal.updateSpaceButton',
      defaultMessage: 'Update space'
    })
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.spaces.management.confirmAlterActiveSpaceModal.reloadWarningMessage",
    defaultMessage: "You have updated the visible features in this space. Your page will reload after saving."
  }))));
};

var ConfirmAlterActiveSpaceModal = (0, _react.injectI18n)(ConfirmAlterActiveSpaceModalUI);
exports.ConfirmAlterActiveSpaceModal = ConfirmAlterActiveSpaceModal;