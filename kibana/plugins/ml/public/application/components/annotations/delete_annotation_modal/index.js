"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAnnotationModal = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DeleteAnnotationModal = function DeleteAnnotationModal(_ref) {
  var cancelAction = _ref.cancelAction,
      deleteAction = _ref.deleteAction,
      isVisible = _ref.isVisible;
  return _react.default.createElement(_react.Fragment, null, isVisible === true && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.timeSeriesExplorer.deleteAnnotationModal.deleteAnnotationTitle",
      defaultMessage: "Delete this annotation?"
    }),
    onCancel: cancelAction,
    onConfirm: deleteAction,
    cancelButtonText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.timeSeriesExplorer.deleteAnnotationModal.cancelButtonLabel",
      defaultMessage: "Cancel"
    }),
    confirmButtonText: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.timeSeriesExplorer.deleteAnnotationModal.deleteButtonLabel",
      defaultMessage: "Delete"
    }),
    buttonColor: "danger",
    defaultFocusedButton: _eui.EUI_MODAL_CONFIRM_BUTTON,
    className: "eui-textBreakWord"
  })));
};

exports.DeleteAnnotationModal = DeleteAnnotationModal;
DeleteAnnotationModal.propTypes = {
  cancelAction: _propTypes.default.func.isRequired,
  deleteAction: _propTypes.default.func.isRequired,
  isVisible: _propTypes.default.bool.isRequired
};