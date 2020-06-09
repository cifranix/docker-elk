"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileTree = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _index_details = require("./index_details");

var _shard_details = require("./shard_details");

var _init_data = require("./init_data");

var _highlight_context = require("./highlight_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ProfileTree = (0, _react.memo)(function (_ref) {
  var data = _ref.data,
      target = _ref.target,
      onHighlight = _ref.onHighlight,
      onDataInitError = _ref.onDataInitError;

  if (!data || data.length === 0) {
    return null;
  }

  var sortedIndices;

  try {
    sortedIndices = (0, _init_data.initDataFor)(target)(data);
  } catch (e) {
    onDataInitError(e);
    return null;
  }

  return _react.default.createElement(_highlight_context.HighlightContextProvider, {
    onHighlight: onHighlight
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    className: "prfDevTool__profileTree__container",
    gutterSize: "none",
    direction: "column"
  }, sortedIndices.map(function (index) {
    return _react.default.createElement(_eui.EuiFlexItem, {
      key: index.name,
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      className: "prfDevTool__profileTree__panel prfDevTool__profileTree__index",
      gutterSize: "none",
      key: index.name,
      direction: "column"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_index_details.IndexDetails, {
      index: index
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, index.shards.map(function (shard, idx) {
      return _react.default.createElement(_react.Fragment, {
        key: shard.id[1] + "_".concat(idx)
      }, _react.default.createElement(_shard_details.ShardDetails, {
        index: index,
        shard: shard,
        operations: shard[target]
      }), idx < index.shards.length - 1 ? _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }) : undefined);
    }))));
  })));
});
exports.ProfileTree = ProfileTree;