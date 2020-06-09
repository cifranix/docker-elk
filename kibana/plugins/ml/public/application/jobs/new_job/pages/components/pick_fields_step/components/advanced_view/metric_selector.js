"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricSelector = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _advanced_detector_modal = require("../advanced_detector_modal");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MAX_WIDTH = 560;

var MetricSelector = function MetricSelector(_ref) {
  var payload = _ref.payload,
      fields = _ref.fields,
      aggs = _ref.aggs,
      detectorChangeHandler = _ref.detectorChangeHandler,
      closeModal = _ref.closeModal,
      showModal = _ref.showModal;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    style: {
      maxWidth: MAX_WIDTH
    }
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiButton, {
    onClick: showModal,
    "data-test-subj": "mlAddDetectorButton"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.newJob.wizard.pickFieldsStep.addDetectorButton",
    defaultMessage: "Add detector"
  }))))), payload !== null && _react.default.createElement(_advanced_detector_modal.AdvancedDetectorModal, {
    payload: payload,
    fields: fields,
    aggs: aggs,
    detectorChangeHandler: detectorChangeHandler,
    closeModal: closeModal
  }));
};

exports.MetricSelector = MetricSelector;