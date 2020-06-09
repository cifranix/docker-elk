"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasetActionsList = void 0;

var _react = _interopRequireDefault(require("react"));

var _log_analysis = require("../../../../../../common/log_analysis");

var _analyze_dataset_in_ml_action = require("./analyze_dataset_in_ml_action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DatasetActionsList = function DatasetActionsList(_ref) {
  var categorizationJobId = _ref.categorizationJobId,
      categoryId = _ref.categoryId,
      datasets = _ref.datasets,
      timeRange = _ref.timeRange;
  return _react.default.createElement("ul", null, datasets.map(function (dataset) {
    var datasetLabel = (0, _log_analysis.getFriendlyNameForPartitionId)(dataset.name);
    return _react.default.createElement("li", {
      key: datasetLabel
    }, _react.default.createElement(_analyze_dataset_in_ml_action.AnalyzeCategoryDatasetInMlAction, {
      categorizationJobId: categorizationJobId,
      categoryId: categoryId,
      dataset: dataset.name,
      timeRange: timeRange
    }));
  }));
};

exports.DatasetActionsList = DatasetActionsList;