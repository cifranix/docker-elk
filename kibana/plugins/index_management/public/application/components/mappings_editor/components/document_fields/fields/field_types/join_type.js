"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JoinType = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _edit_field = require("../edit_field");

var _field_parameters = require("../../field_parameters");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var i18nTexts = {
  eagerGlobalOrdinalsDescription: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.join.eagerGlobalOrdinalsFieldDescription', {
    defaultMessage: 'The join field uses global ordinals to speed up joins. By default, if the index has changed, global ordinals for the join field will be rebuilt as part of the refresh. This can add significant time to the refresh, however most of the times this is the right trade-off.'
  })
};

var JoinType = function JoinType() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_edit_field.BasicParametersSection, null, _react.default.createElement(_field_parameters.RelationsParameter, null)), _react.default.createElement(_edit_field.AdvancedParametersSection, null, _react.default.createElement(_field_parameters.EagerGlobalOrdinalsParameter, {
    configPath: "eager_global_ordinals_join",
    description: i18nTexts.eagerGlobalOrdinalsDescription
  })));
};

exports.JoinType = JoinType;