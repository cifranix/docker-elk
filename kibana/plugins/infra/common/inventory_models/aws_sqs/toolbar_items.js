"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AwsSQSToolbarItems = void 0;

var _react = _interopRequireDefault(require("react"));

var _metrics_and_groupby_toolbar_items = require("../shared/compontents/metrics_and_groupby_toolbar_items");

var _cloud_toolbar_items = require("../shared/compontents/cloud_toolbar_items");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const AwsSQSToolbarItems = props => {
  const metricTypes = ['sqsMessagesVisible', 'sqsMessagesDelayed', 'sqsMessagesSent', 'sqsMessagesEmpty', 'sqsOldestMessage'];
  const groupByFields = ['cloud.region'];
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_cloud_toolbar_items.CloudToolbarItems, props), _react.default.createElement(_metrics_and_groupby_toolbar_items.MetricsAndGroupByToolbarItems, _extends({}, props, {
    metricTypes: metricTypes,
    groupByFields: groupByFields
  })));
};

exports.AwsSQSToolbarItems = AwsSQSToolbarItems;