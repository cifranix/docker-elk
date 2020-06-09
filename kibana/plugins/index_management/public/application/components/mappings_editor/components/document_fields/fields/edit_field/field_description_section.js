"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldDescriptionSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldDescriptionSection = function FieldDescriptionSection(_ref) {
  var children = _ref.children,
      isMultiField = _ref.isMultiField;

  if (!children && !isMultiField) {
    return null;
  }

  return _react.default.createElement("section", null, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), _react.default.createElement(_eui.EuiText, {
    size: "s",
    color: "subdued"
  }, children, isMultiField && _react.default.createElement("p", null, _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.multiFieldIntroductionText', {
    defaultMessage: 'This field is a multi-field. You can use multi-fields to index the same field in different ways.'
  }))));
};

exports.FieldDescriptionSection = FieldDescriptionSection;