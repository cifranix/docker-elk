"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerAggregationPicker = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _metrics_explorer = require("../../../common/http_api/metrics_explorer");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MetricsExplorerAggregationPicker = function MetricsExplorerAggregationPicker(_ref) {
  var _AGGREGATION_LABELS;

  var options = _ref.options,
      onChange = _ref.onChange;
  var AGGREGATION_LABELS = (_AGGREGATION_LABELS = {}, _defineProperty(_AGGREGATION_LABELS, 'avg', _i18n.i18n.translate('xpack.infra.metricsExplorer.aggregationLables.avg', {
    defaultMessage: 'Average'
  })), _defineProperty(_AGGREGATION_LABELS, 'max', _i18n.i18n.translate('xpack.infra.metricsExplorer.aggregationLables.max', {
    defaultMessage: 'Max'
  })), _defineProperty(_AGGREGATION_LABELS, 'min', _i18n.i18n.translate('xpack.infra.metricsExplorer.aggregationLables.min', {
    defaultMessage: 'Min'
  })), _defineProperty(_AGGREGATION_LABELS, 'cardinality', _i18n.i18n.translate('xpack.infra.metricsExplorer.aggregationLables.cardinality', {
    defaultMessage: 'Cardinality'
  })), _defineProperty(_AGGREGATION_LABELS, 'rate', _i18n.i18n.translate('xpack.infra.metricsExplorer.aggregationLables.rate', {
    defaultMessage: 'Rate'
  })), _defineProperty(_AGGREGATION_LABELS, 'count', _i18n.i18n.translate('xpack.infra.metricsExplorer.aggregationLables.count', {
    defaultMessage: 'Document count'
  })), _AGGREGATION_LABELS);
  var handleChange = (0, _react.useCallback)(function (e) {
    var aggregation = _metrics_explorer.metricsExplorerAggregationRT.is(e.target.value) && e.target.value || 'avg';
    onChange(aggregation);
  }, [onChange]);

  var placeholder = _i18n.i18n.translate('xpack.infra.metricsExplorer.aggregationSelectLabel', {
    defaultMessage: 'Select an aggregation'
  });

  return _react.default.createElement(_eui.EuiSelect, {
    "aria-label": placeholder,
    placeholder: placeholder,
    fullWidth: true,
    value: options.aggregation,
    options: _metrics_explorer.METRIC_EXPLORER_AGGREGATIONS.map(function (k) {
      return {
        text: AGGREGATION_LABELS[k],
        value: k
      };
    }),
    onChange: handleChange
  });
};

exports.MetricsExplorerAggregationPicker = MetricsExplorerAggregationPicker;