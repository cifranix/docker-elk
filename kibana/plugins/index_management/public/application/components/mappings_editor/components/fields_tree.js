"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsTree = void 0;

var _react = _interopRequireDefault(require("react"));

var _code_block = require("./code_block");

var _tree = require("./tree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FieldsTree = function FieldsTree(_ref) {
  var fields = _ref.fields;
  return _react.default.createElement(_code_block.CodeBlock, null, _react.default.createElement(_tree.Tree, {
    tree: fields
  }));
};

exports.FieldsTree = FieldsTree;