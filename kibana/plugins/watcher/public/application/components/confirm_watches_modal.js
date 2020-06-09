"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfirmWatchesModal = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ConfirmWatchesModal = function ConfirmWatchesModal(_ref) {
  var modalOptions = _ref.modalOptions,
      callback = _ref.callback;

  if (!modalOptions) {
    return null;
  }

  var title = modalOptions.title,
      message = modalOptions.message,
      buttonType = modalOptions.buttonType,
      buttonLabel = modalOptions.buttonLabel;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    buttonColor: buttonType ? buttonType : 'primary',
    title: title,
    onCancel: function onCancel() {
      return callback();
    },
    onConfirm: function onConfirm() {
      callback(true);
    },
    cancelButtonText: _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.saveConfirmModal.cancelButtonLabel', {
      defaultMessage: 'Cancel'
    }),
    confirmButtonText: buttonLabel ? buttonLabel : _i18n.i18n.translate('xpack.watcher.sections.watchEdit.json.saveConfirmModal.saveButtonLabel', {
      defaultMessage: 'Save watch'
    })
  }, message));
};

exports.ConfirmWatchesModal = ConfirmWatchesModal;