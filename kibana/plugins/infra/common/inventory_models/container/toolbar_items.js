"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerToolbarItems = void 0;

var _react = _interopRequireDefault(require("react"));

var _metrics_and_groupby_toolbar_items = require("../shared/compontents/metrics_and_groupby_toolbar_items");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ContainerToolbarItems = props => {
  const metricTypes = ['cpu', 'memory', 'rx', 'tx'];
  const groupByFields = ['host.name', 'cloud.availability_zone', 'cloud.machine.type', 'cloud.project.id', 'cloud.provider', 'service.type'];
  return _react.default.createElement(_metrics_and_groupby_toolbar_items.MetricsAndGroupByToolbarItems, _extends({}, props, {
    metricTypes: metricTypes,
    groupByFields: groupByFields
  }));
};

exports.ContainerToolbarItems = ContainerToolbarItems;