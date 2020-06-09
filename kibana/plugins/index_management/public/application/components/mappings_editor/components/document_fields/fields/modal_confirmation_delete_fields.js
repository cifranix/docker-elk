"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ModalConfirmationDeleteFields = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _lib = require("../../../lib");

var _fields_tree = require("../../fields_tree");

var _constants = require("../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ModalConfirmationDeleteFields = function ModalConfirmationDeleteFields(_ref) {
  var title = _ref.title,
      childFields = _ref.childFields,
      aliases = _ref.aliases,
      byId = _ref.byId,
      confirmButtonText = _ref.confirmButtonText,
      onCancel = _ref.onCancel,
      onConfirm = _ref.onConfirm;
  var fieldsTree = childFields && childFields.length ? (0, _lib.buildFieldTreeFromIds)(childFields, byId, function (fieldItem) {
    return _react.default.createElement(_react.default.Fragment, null, fieldItem.source.name, fieldItem.isMultiField && _react.default.createElement(_react.default.Fragment, null, ' ', _react.default.createElement(_eui.EuiBadge, {
      color: "hollow"
    }, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.deleteField.confirmationModal.multiFieldBadgeLabel', {
      defaultMessage: '{dataType} multi-field',
      values: {
        dataType: _constants.TYPE_DEFINITION[fieldItem.source.type].label
      }
    }))));
  }) : null;
  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: title,
    onCancel: onCancel,
    onConfirm: onConfirm,
    cancelButtonText: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.deleteField.confirmationModal.cancelButtonLabel', {
      defaultMessage: 'Cancel'
    }),
    buttonColor: "danger",
    confirmButtonText: confirmButtonText
  }, _react.default.createElement(_react.default.Fragment, null, fieldsTree && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.confirmationModal.deleteFieldsDescription', {
    defaultMessage: 'This will also delete the following fields.'
  })), _react.default.createElement(_fields_tree.FieldsTree, {
    fields: fieldsTree
  })), aliases && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.confirmationModal.deleteAliasesDescription', {
    defaultMessage: 'The following aliases will also be deleted.'
  })), _react.default.createElement("ul", null, aliases.map(function (aliasPath) {
    return _react.default.createElement("li", {
      key: aliasPath
    }, _react.default.createElement(_eui.EuiCode, null, aliasPath));
  }))))));
};

exports.ModalConfirmationDeleteFields = ModalConfirmationDeleteFields;