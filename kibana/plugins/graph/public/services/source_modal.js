"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openSourceModal = openSourceModal;

var _react = _interopRequireDefault(require("react"));

var _source_modal = require("../components/source_modal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function openSourceModal(_ref, onSelected) {
  var overlays = _ref.overlays,
      savedObjects = _ref.savedObjects,
      uiSettings = _ref.uiSettings;
  var modalRef = overlays.openModal(_react.default.createElement(_source_modal.SourceModal, {
    uiSettings: uiSettings,
    savedObjects: savedObjects,
    onIndexPatternSelected: function onIndexPatternSelected(indexPattern) {
      onSelected(indexPattern);
      modalRef.close();
    }
  }));
}