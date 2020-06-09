"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;

var _react = _interopRequireDefault(require("react"));

var _tree_item = require("./tree_item");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Tree = function Tree(_ref) {
  var tree = _ref.tree;
  return _react.default.createElement("ul", {
    className: "esUiTree"
  }, tree.map(function (treeItem, i) {
    return _react.default.createElement(_tree_item.TreeItem, {
      key: i,
      treeItem: treeItem
    });
  }));
};

exports.Tree = Tree;