"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryFormStepTwo = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../common/constants");

var _documentation = require("../../services/documentation");

var _type_settings = require("./type_settings");

var _text = require("../../services/text");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RepositoryFormStepTwo = function RepositoryFormStepTwo(_ref) {
  var repository = _ref.repository,
      isManagedRepository = _ref.isManagedRepository,
      isEditing = _ref.isEditing,
      isSaving = _ref.isSaving,
      onSave = _ref.onSave,
      updateRepository = _ref.updateRepository,
      validation = _ref.validation,
      saveError = _ref.saveError,
      onBack = _ref.onBack;
  var hasValidationErrors = !validation.isValid;
  var name = repository.name,
      type = repository.type,
      delegateType = repository.settings.delegateType;
  var typeForDocs = type === _constants.REPOSITORY_TYPES.source ? delegateType : type;

  var renderSettings = function renderSettings() {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      justifyContent: "spaceBetween"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "m"
    }, _react.default.createElement("h2", {
      "data-test-subj": "title"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.fields.settingsTitle",
      defaultMessage: "{repositoryName} settings",
      values: {
        repositoryName: "'".concat(name, "'")
      }
    })))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      size: "s",
      flush: "right",
      href: _documentation.documentationLinksService.getRepositoryTypeDocUrl(typeForDocs),
      target: "_blank",
      iconType: "help"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.repositoryTypeDocLink",
      defaultMessage: "{repositoryType} repository docs",
      values: {
        repositoryType: _text.textService.getRepositoryTypeName(typeForDocs)
      }
    })))), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), _react.default.createElement(_type_settings.TypeSettings, {
      repository: repository,
      updateRepository: updateRepository,
      settingErrors: hasValidationErrors && validation.errors.settings ? validation.errors.settings : {}
    }));
  };

  var renderActions = function renderActions() {
    var saveLabel = isEditing ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.saveButtonLabel",
      defaultMessage: "Save"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.registerButtonLabel",
      defaultMessage: "Register"
    });

    var savingLabel = _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.savingButtonLabel",
      defaultMessage: "Saving\u2026"
    });

    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "m",
      alignItems: "center"
    }, isEditing ? null : _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      color: "primary",
      iconType: "arrowLeft",
      onClick: onBack,
      "data-test-subj": "backButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryForm.backButtonLabel",
      defaultMessage: "Back"
    }))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      color: isManagedRepository ? 'warning' : 'secondary',
      iconType: "check",
      onClick: onSave,
      fill: isManagedRepository ? false : true,
      "data-test-subj": "submitButton",
      isLoading: isSaving
    }, isSaving ? savingLabel : saveLabel)));
  };

  var renderFormValidationError = function renderFormValidationError() {
    if (!hasValidationErrors) {
      return null;
    }

    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryForm.validationErrorTitle",
        defaultMessage: "Fix errors before continuing."
      }),
      color: "danger",
      iconType: "cross",
      "data-test-subj": "repositoryFormError"
    }), _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }));
  };

  var renderSaveError = function renderSaveError() {
    if (!saveError) {
      return null;
    }

    return _react.default.createElement(_react.Fragment, null, saveError, _react.default.createElement(_eui.EuiSpacer, {
      size: "m"
    }));
  };

  return _react.default.createElement("div", {
    "data-test-subj": "stepTwo"
  }, renderSettings(), renderFormValidationError(), renderSaveError(), renderActions());
};

exports.RepositoryFormStepTwo = RepositoryFormStepTwo;