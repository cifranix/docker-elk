"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateUniqueName = void 0;

var _i18n = require("@kbn/i18n");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var validateUniqueName = function validateUniqueName(_ref) {
  var rootLevelFields = _ref.rootLevelFields,
      byId = _ref.byId;
  var initialName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var parentId = arguments.length > 2 ? arguments[2] : undefined;

  var validator = function validator(_ref2) {
    var value = _ref2.value;
    var existingNames = parentId ? Object.values(byId).filter(function (field) {
      return field.parentId === parentId;
    }).map(function (field) {
      return field.source.name;
    }) : rootLevelFields.map(function (fieldId) {
      return byId[fieldId].source.name;
    });

    if (existingNames.filter(function (name) {
      return name !== initialName;
    }).includes(value)) {
      return {
        message: _i18n.i18n.translate('xpack.idxMgmt.mappingsEditor.existNamesValidationErrorMessage', {
          defaultMessage: 'There is already a field with this name.'
        })
      };
    }
  };

  return validator;
};

exports.validateUniqueName = validateUniqueName;