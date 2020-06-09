"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StoreParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _documentation = require("../../../../../services/documentation");

var _edit_field = require("../fields/edit_field");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var StoreParameter = function StoreParameter() {
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.storeFieldValueFieldTitle', {
      defaultMessage: 'Store field value outside of _source'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.storeFieldValueFieldDescription', {
      defaultMessage: 'This can be useful when the _source field is very large and you want to retrieve a few select fields without extracting them from _source.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.storeDocLinkText', {
        defaultMessage: 'Store documentation'
      }),
      href: _documentation.documentationService.getStoreLink()
    },
    formFieldPath: "store"
  });
};

exports.StoreParameter = StoreParameter;