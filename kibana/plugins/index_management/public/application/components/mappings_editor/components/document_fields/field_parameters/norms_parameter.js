"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NormsParameter = void 0;

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
var NormsParameter = function NormsParameter(_ref) {
  var _ref$configPath = _ref.configPath,
      configPath = _ref$configPath === void 0 ? 'norms' : _ref$configPath;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.useNormsFieldTitle', {
      defaultMessage: 'Use norms'
    }),
    description: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.useNormsFieldDescription', {
      defaultMessage: 'Account for field length when scoring queries. Norms require significant memory and are not necessary for fields that are used solely for filtering or aggregations.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.normsDocLinkText', {
        defaultMessage: 'Norms documentation'
      }),
      href: _documentation.documentationService.getNormsLink()
    },
    formFieldPath: "norms",
    configPath: configPath
  });
};

exports.NormsParameter = NormsParameter;