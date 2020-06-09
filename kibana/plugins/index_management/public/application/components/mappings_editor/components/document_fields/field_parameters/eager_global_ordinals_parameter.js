"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EagerGlobalOrdinalsParameter = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../fields/edit_field");

var _documentation = require("../../../../../services/documentation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var EagerGlobalOrdinalsParameter = function EagerGlobalOrdinalsParameter(_ref) {
  var description = _ref.description,
      _ref$configPath = _ref.configPath,
      configPath = _ref$configPath === void 0 ? 'eager_global_ordinals' : _ref$configPath;
  return _react.default.createElement(_edit_field.EditFieldFormRow, {
    title: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.eagerGlobalOrdinalsFieldTitle', {
      defaultMessage: 'Build global ordinals at index time'
    }),
    description: description ? description : _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.eagerGlobalOrdinalsFieldDescription', {
      defaultMessage: 'By default, global ordinals are built at search time, which optimizes for index speed. You can optimize for search performance by building them at index time instead.'
    }),
    docLink: {
      text: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.eagerGlobalOrdinalsDocLinkText', {
        defaultMessage: 'Global ordinals documentation'
      }),
      href: _documentation.documentationService.getEagerGlobalOrdinalsLink()
    },
    formFieldPath: "eager_global_ordinals",
    configPath: configPath
  });
};

exports.EagerGlobalOrdinalsParameter = EagerGlobalOrdinalsParameter;