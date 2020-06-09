"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsAndGroupByToolbarItems = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _metric_control = require("../../../../public/components/waffle/metric_control");

var _waffle_group_by_controls = require("../../../../public/components/waffle/waffle_group_by_controls");

var _toolbar_wrapper = require("../../../../public/components/inventory/toolbars/toolbar_wrapper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
const MetricsAndGroupByToolbarItems = props => {
  const metricOptions = (0, _react.useMemo)(() => props.metricTypes.map(_toolbar_wrapper.toMetricOpt).filter(v => v), [props.metricTypes]);
  const groupByOptions = (0, _react.useMemo)(() => props.groupByFields.map(_toolbar_wrapper.toGroupByOpt), [props.groupByFields]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_metric_control.WaffleMetricControls, {
    fields: props.createDerivedIndexPattern('metrics').fields,
    options: metricOptions,
    metric: props.metric,
    onChange: props.changeMetric,
    onChangeCustomMetrics: props.changeCustomMetrics,
    customMetrics: props.customMetrics
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_waffle_group_by_controls.WaffleGroupByControls, {
    options: groupByOptions,
    groupBy: props.groupBy,
    nodeType: props.nodeType,
    onChange: props.changeGroupBy,
    fields: props.createDerivedIndexPattern('metrics').fields,
    onChangeCustomOptions: props.changeCustomOptions,
    customOptions: props.customOptions
  })));
};

exports.MetricsAndGroupByToolbarItems = MetricsAndGroupByToolbarItems;