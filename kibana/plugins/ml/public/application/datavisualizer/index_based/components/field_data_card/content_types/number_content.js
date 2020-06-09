"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _display_value = require("../../../../../components/display_value");

var _kibana_field_format = require("../../../../../formatters/kibana_field_format");

var _number_as_ordinal = require("../../../../../formatters/number_as_ordinal");

var _round_to_decimal_place = require("../../../../../formatters/round_to_decimal_place");

var _metric_distribution_chart = require("../metric_distribution_chart");

var _top_values = require("../top_values");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DETAILS_MODE;

(function (DETAILS_MODE) {
  DETAILS_MODE["DISTRIBUTION"] = "distribution";
  DETAILS_MODE["TOP_VALUES"] = "top_values";
})(DETAILS_MODE || (DETAILS_MODE = {}));

var METRIC_DISTRIBUTION_CHART_WIDTH = 325;
var METRIC_DISTRIBUTION_CHART_HEIGHT = 210;
var DEFAULT_TOP_VALUES_THRESHOLD = 100;

var NumberContent = function NumberContent(_ref) {
  var config = _ref.config;
  var stats = config.stats,
      fieldFormat = config.fieldFormat;
  (0, _react.useEffect)(function () {
    var chartData = (0, _metric_distribution_chart.buildChartDataFromStats)(stats, METRIC_DISTRIBUTION_CHART_WIDTH);
    setDistributionChartData(chartData);
  }, []);
  var count = stats.count,
      sampleCount = stats.sampleCount,
      cardinality = stats.cardinality,
      min = stats.min,
      median = stats.median,
      max = stats.max,
      distribution = stats.distribution;
  var docsPercent = (0, _round_to_decimal_place.roundToDecimalPlace)(count / sampleCount * 100);

  var _useState = (0, _react.useState)(cardinality <= DEFAULT_TOP_VALUES_THRESHOLD ? DETAILS_MODE.TOP_VALUES : DETAILS_MODE.DISTRIBUTION),
      _useState2 = _slicedToArray(_useState, 2),
      detailsMode = _useState2[0],
      setDetailsMode = _useState2[1];

  var defaultChartData = [];

  var _useState3 = (0, _react.useState)(defaultChartData),
      _useState4 = _slicedToArray(_useState3, 2),
      distributionChartData = _useState4[0],
      setDistributionChartData = _useState4[1];

  var detailsOptions = [{
    id: DETAILS_MODE.TOP_VALUES,
    label: _i18n.i18n.translate('xpack.ml.fieldDataCard.cardNumber.details.topValuesLabel', {
      defaultMessage: 'Top values'
    })
  }, {
    id: DETAILS_MODE.DISTRIBUTION,
    label: _i18n.i18n.translate('xpack.ml.fieldDataCard.cardNumber.details.distributionOfValuesLabel', {
      defaultMessage: 'Distribution'
    })
  }];
  return _react.default.createElement("div", {
    className: "mlFieldDataCard__stats"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "document"
  }), "\xA0", _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardNumber.documentsCountDescription",
    defaultMessage: "{count, plural, zero {# document} one {# document} other {# documents}} ({docsPercent}%)",
    values: {
      count: count,
      docsPercent: docsPercent
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "database"
  }), "\xA0", _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardNumber.distinctCountDescription",
    defaultMessage: "{cardinality} distinct {cardinality, plural, zero {value} one {value} other {values}}",
    values: {
      cardinality: cardinality
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardNumber.minLabel",
    defaultMessage: "min"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardNumber.medianLabel",
    defaultMessage: "median"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1
  }, _react.default.createElement(_eui.EuiText, {
    color: "subdued",
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardNumber.maxLabel",
    defaultMessage: "max"
  })))), _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    justifyContent: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1,
    className: "eui-textTruncate"
  }, _react.default.createElement(_display_value.DisplayValue, {
    value: (0, _kibana_field_format.kibanaFieldFormat)(min, fieldFormat)
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1,
    className: "eui-textTruncate"
  }, _react.default.createElement(_display_value.DisplayValue, {
    value: (0, _kibana_field_format.kibanaFieldFormat)(median, fieldFormat)
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: 1,
    className: "eui-textTruncate"
  }, _react.default.createElement(_display_value.DisplayValue, {
    value: (0, _kibana_field_format.kibanaFieldFormat)(max, fieldFormat)
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiButtonGroup, {
    options: detailsOptions,
    idSelected: detailsMode,
    onChange: function onChange(optionId) {
      return setDetailsMode(optionId);
    },
    "aria-label": _i18n.i18n.translate('xpack.ml.fieldDataCard.cardNumber.selectMetricDetailsDisplayAriaLabel', {
      defaultMessage: 'Select display option for metric details'
    }),
    "data-test-subj": "mlFieldDataCardNumberDetailsSelect",
    isFullWidth: true,
    buttonSize: "compressed"
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), distribution && detailsMode === DETAILS_MODE.DISTRIBUTION && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardNumber.displayingPercentilesLabel",
    defaultMessage: "Displaying {minPercent} - {maxPercent} percentiles",
    values: {
      minPercent: (0, _number_as_ordinal.numberAsOrdinal)(distribution.minPercentile),
      maxPercent: (0, _number_as_ordinal.numberAsOrdinal)(distribution.maxPercentile)
    }
  })))), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "center",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_metric_distribution_chart.MetricDistributionChart, {
    width: METRIC_DISTRIBUTION_CHART_WIDTH,
    height: METRIC_DISTRIBUTION_CHART_HEIGHT,
    chartData: distributionChartData,
    fieldFormat: fieldFormat
  })))), detailsMode === DETAILS_MODE.TOP_VALUES && _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_top_values.TopValues, {
    stats: stats,
    fieldFormat: fieldFormat,
    barColor: "primary"
  }))));
};

exports.NumberContent = NumberContent;