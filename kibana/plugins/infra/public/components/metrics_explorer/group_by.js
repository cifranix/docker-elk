"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerGroupBy = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricsExplorerGroupBy = function MetricsExplorerGroupBy(_ref) {
  var options = _ref.options,
      onChange = _ref.onChange,
      fields = _ref.fields;
  var handleChange = (0, _react.useCallback)(function (selectedOptions) {
    var groupBy = selectedOptions.length === 1 && selectedOptions[0].label || null;
    onChange(groupBy);
  }, [onChange]);
  return _react.default.createElement(_eui.EuiComboBox, {
    placeholder: _i18n.i18n.translate('xpack.infra.metricsExplorer.groupByLabel', {
      defaultMessage: 'Everything'
    }),
    "aria-label": _i18n.i18n.translate('xpack.infra.metricsExplorer.groupByAriaLabel', {
      defaultMessage: 'Graph per'
    }),
    fullWidth: true,
    singleSelection: true,
    selectedOptions: options.groupBy && [{
      label: options.groupBy
    }] || [],
    options: fields.filter(function (f) {
      return f.aggregatable && f.type === 'string';
    }).map(function (f) {
      return {
        label: f.name
      };
    }),
    onChange: handleChange,
    isClearable: true
  });
};

exports.MetricsExplorerGroupBy = MetricsExplorerGroupBy;