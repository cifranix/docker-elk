"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsList = void 0;

var _react = _interopRequireDefault(require("react"));

var _fields_list_item_container = require("./fields_list_item_container");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldsList = _react.default.memo(function FieldsListComponent(_ref) {
  var fields = _ref.fields,
      treeDepth = _ref.treeDepth;

  if (fields === undefined) {
    return null;
  }

  return _react.default.createElement("ul", {
    className: "mappingsEditor__fieldsList"
  }, fields.map(function (field, index) {
    return _react.default.createElement(_fields_list_item_container.FieldsListItemContainer, {
      key: field.id,
      fieldId: field.id,
      treeDepth: treeDepth === undefined ? 0 : treeDepth,
      isLastItem: index === fields.length - 1
    });
  }));
});

exports.FieldsList = FieldsList;