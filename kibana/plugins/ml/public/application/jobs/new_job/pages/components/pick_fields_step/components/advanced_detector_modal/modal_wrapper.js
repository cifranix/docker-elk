"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MAX_MODAL_WIDTH = 1200;

var ModalWrapper = function ModalWrapper(_ref) {
  var onCreateClick = _ref.onCreateClick,
      closeModal = _ref.closeModal,
      saveEnabled = _ref.saveEnabled,
      children = _ref.children;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiModal, {
    onClose: closeModal,
    maxWidth: MAX_MODAL_WIDTH,
    "data-test-subj": "mlCreateDetectorModal"
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.title",
    defaultMessage: "Create detector"
  }))), _react.default.createElement(_eui.EuiModalBody, null, children), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: closeModal,
    "data-test-subj": "mlCreateDetectorModalCancelButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.cancelButton",
    defaultMessage: "Cancel"
  })), _react.default.createElement(_eui.EuiButton, {
    onClick: onCreateClick,
    isDisabled: saveEnabled === false,
    fill: true,
    "data-test-subj": "mlCreateDetectorModalSaveButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.advancedDetectorModal.saveButton",
    defaultMessage: "Save"
  })))));
};

exports.ModalWrapper = ModalWrapper;