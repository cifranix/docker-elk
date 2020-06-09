"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DatasetsSelector = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _log_analysis = require("../../../../../../common/log_analysis");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var DatasetsSelector = function DatasetsSelector(_ref) {
  var availableDatasets = _ref.availableDatasets,
      _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      onChangeDatasetSelection = _ref.onChangeDatasetSelection,
      selectedDatasets = _ref.selectedDatasets;
  var options = (0, _react.useMemo)(function () {
    return availableDatasets.map(function (dataset) {
      return {
        value: dataset,
        label: (0, _log_analysis.getFriendlyNameForPartitionId)(dataset)
      };
    });
  }, [availableDatasets]);
  var selectedOptions = (0, _react.useMemo)(function () {
    return options.filter(function (_ref2) {
      var value = _ref2.value;
      return value != null && selectedDatasets.includes(value);
    });
  }, [options, selectedDatasets]);
  var handleChange = (0, _react.useCallback)(function (newSelectedOptions) {
    return onChangeDatasetSelection(newSelectedOptions.map(function (_ref3) {
      var value = _ref3.value;
      return value;
    }).filter(isDefined));
  }, [onChangeDatasetSelection]);
  return _react.default.createElement(_eui.EuiComboBox, {
    "aria-label": datasetFilterPlaceholder,
    isLoading: isLoading,
    onChange: handleChange,
    options: options,
    placeholder: datasetFilterPlaceholder,
    selectedOptions: selectedOptions
  });
};

exports.DatasetsSelector = DatasetsSelector;

var datasetFilterPlaceholder = _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.datasetFilterPlaceholder', {
  defaultMessage: 'Filter by datasets'
});

var isDefined = function isDefined(value) {
  return value != null;
};