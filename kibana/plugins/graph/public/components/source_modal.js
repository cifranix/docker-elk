"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceModal = SourceModal;

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireDefault(require("react"));

var _source_picker = require("./source_picker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function SourceModal(props) {
  return _react2.default.createElement("div", {
    className: "gphSourceModal"
  }, _react2.default.createElement(_eui.EuiModalHeader, null, _react2.default.createElement(_eui.EuiModalHeaderTitle, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.graph.sourceModal.title",
    defaultMessage: "Select a data source"
  }))), _react2.default.createElement(_eui.EuiModalBody, null, _react2.default.createElement(_source_picker.SourcePicker, props)));
}