"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openSaveModal = openSaveModal;

var _react = _interopRequireDefault(require("react"));

var _save_modal = require("../components/save_modal");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function openSaveModal(_ref) {
  var savePolicy = _ref.savePolicy,
      hasData = _ref.hasData,
      workspace = _ref.workspace,
      saveWorkspace = _ref.saveWorkspace,
      showSaveModal = _ref.showSaveModal,
      I18nContext = _ref.I18nContext,
      services = _ref.services;
  var currentTitle = workspace.title;
  var currentDescription = workspace.description;

  var onSave = function onSave(_ref2) {
    var newTitle = _ref2.newTitle,
        newDescription = _ref2.newDescription,
        newCopyOnSave = _ref2.newCopyOnSave,
        isTitleDuplicateConfirmed = _ref2.isTitleDuplicateConfirmed,
        onTitleDuplicate = _ref2.onTitleDuplicate,
        dataConsent = _ref2.dataConsent;
    workspace.title = newTitle;
    workspace.description = newDescription;
    workspace.copyOnSave = newCopyOnSave;
    var saveOptions = {
      confirmOverwrite: false,
      isTitleDuplicateConfirmed: isTitleDuplicateConfirmed,
      onTitleDuplicate: onTitleDuplicate
    };
    return saveWorkspace(saveOptions, dataConsent, services).then(function (response) {
      // If the save wasn't successful, put the original values back.
      if (!('id' in response) || !Boolean(response.id)) {
        workspace.title = currentTitle;
        workspace.description = currentDescription;
      }

      return response;
    });
  };

  showSaveModal(_react.default.createElement(_save_modal.SaveModal, {
    savePolicy: savePolicy,
    hasData: hasData,
    onSave: onSave,
    onClose: function onClose() {},
    title: workspace.title,
    description: workspace.description,
    showCopyOnSave: Boolean(workspace.id)
  }), I18nContext);
}