"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShardDetailTree = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _shard_details_tree_node = require("./shard_details_tree_node");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ShardDetailTree = function ShardDetailTree(_ref) {
  var data = _ref.data,
      index = _ref.index,
      shard = _ref.shard;

  var renderOperations = function renderOperations(operation) {
    var nextOperation = operation.treeRoot || operation;
    return _react.default.createElement(_shard_details_tree_node.ShardDetailsTreeNode, {
      shard: shard,
      index: index,
      operation: nextOperation
    });
  };

  return _react.default.createElement("div", {
    className: "prfDevTool__profileTree__panelBody"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    responsive: false,
    gutterSize: "none",
    direction: "column"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("div", {
    className: "prfDevTool__profileTree__tvHeader"
  }, _react.default.createElement(_eui.EuiText, {
    size: "s",
    className: "euiTextAlign--left prfDevTool__profileTree__cell"
  }, _i18n.i18n.translate('xpack.searchProfiler.profileTree.header.typeTitle', {
    defaultMessage: 'Type and description'
  })), _react.default.createElement(_eui.EuiText, {
    size: "s",
    className: "prfDevTool__profileTree__cell prfDevTool__profileTree__time"
  }, _i18n.i18n.translate('xpack.searchProfiler.profileTree.header.selfTimeTitle', {
    defaultMessage: 'Self time'
  })), _react.default.createElement(_eui.EuiText, {
    size: "s",
    className: "prfDevTool__profileTree__cell prfDevTool__profileTree__time"
  }, _i18n.i18n.translate('xpack.searchProfiler.profileTree.header.totalTimeTitle', {
    defaultMessage: 'Total time'
  })), _react.default.createElement("div", {
    className: "prfDevTool__profileTree__cell prfDevTool__profileTree__percentage"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, renderOperations(data))));
};

exports.ShardDetailTree = ShardDetailTree;