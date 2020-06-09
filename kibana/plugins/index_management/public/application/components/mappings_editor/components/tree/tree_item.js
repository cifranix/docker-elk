"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TreeItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _tree = require("./tree");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TreeItem = function TreeItem(_ref) {
  var treeItem = _ref.treeItem;
  return _react.default.createElement("li", {
    className: "esUiTreeItem"
  }, _react.default.createElement("div", {
    className: "esUiTreeItem__label"
  }, treeItem.label), treeItem.children && _react.default.createElement(_tree.Tree, {
    tree: treeItem.children
  }));
};

exports.TreeItem = TreeItem;