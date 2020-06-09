"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandedRowPreviewPane = void 0;

var _react = _interopRequireDefault(require("react"));

var _common = require("../../../../common");

var _step_define = require("../../../create_transform/components/step_define/");

var _pivot_preview = require("../../../../components/pivot_preview");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ExpandedRowPreviewPane = function ExpandedRowPreviewPane(_ref) {
  var transformConfig = _ref.transformConfig;
  var previewConfig = (0, _step_define.applyTransformConfigToDefineState)((0, _step_define.getDefaultStepDefineState)({}), transformConfig);
  var indexPatternTitle = Array.isArray(transformConfig.source.index) ? transformConfig.source.index.join(',') : transformConfig.source.index;
  return _react.default.createElement(_pivot_preview.PivotPreview, {
    aggs: previewConfig.aggList,
    groupBy: previewConfig.groupByList,
    indexPatternTitle: indexPatternTitle,
    query: (0, _common.getPivotQuery)(previewConfig.searchQuery),
    showHeader: false
  });
};

exports.ExpandedRowPreviewPane = ExpandedRowPreviewPane;