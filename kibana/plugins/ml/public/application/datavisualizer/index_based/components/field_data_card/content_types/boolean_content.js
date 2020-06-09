"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BooleanContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _charts = require("@elastic/charts");

var _react2 = require("@kbn/i18n/react");

var _round_to_decimal_place = require("../../../../../formatters/round_to_decimal_place");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getPercentLabel(value) {
  if (value === 0) {
    return '0%';
  }

  if (value >= 0.1) {
    return "".concat(value, "%");
  } else {
    return '< 0.1%';
  }
}

var BooleanContent = function BooleanContent(_ref) {
  var config = _ref.config;
  var stats = config.stats;
  var count = stats.count,
      sampleCount = stats.sampleCount,
      trueCount = stats.trueCount,
      falseCount = stats.falseCount;
  var docsPercent = (0, _round_to_decimal_place.roundToDecimalPlace)(count / sampleCount * 100);
  return _react.default.createElement("div", {
    className: "mlFieldDataCard__stats"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "document"
  }), "\xA0", _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardBoolean.documentsCountDescription",
    defaultMessage: "{count, plural, zero {# document} one {# document} other {# documents}} ({docsPercent}%)",
    values: {
      count: count,
      docsPercent: docsPercent
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    className: "mlFieldDataCard__valuesTitle"
  }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardBoolean.valuesLabel",
    defaultMessage: "Values"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_charts.Chart, {
    renderer: "canvas",
    className: "story-chart",
    size: {
      height: 200
    }
  }, _react.default.createElement(_charts.Axis, {
    id: "bottom",
    position: "bottom",
    showOverlappingTicks: true
  }), _react.default.createElement(_charts.Settings, {
    showLegend: false,
    theme: {
      barSeriesStyle: {
        displayValue: {
          fill: '#000',
          fontSize: 12,
          fontStyle: 'normal',
          offsetX: 0,
          offsetY: -5,
          padding: 0
        }
      }
    }
  }), _react.default.createElement(_charts.BarSeries, {
    id: config.fieldName || config.fieldFormat,
    data: [{
      x: 'true',
      y: (0, _round_to_decimal_place.roundToDecimalPlace)(trueCount / count * 100)
    }, {
      x: 'false',
      y: (0, _round_to_decimal_place.roundToDecimalPlace)(falseCount / count * 100)
    }],
    displayValueSettings: {
      hideClippedValue: true,
      isAlternatingValueLabel: true,
      valueFormatter: getPercentLabel,
      isValueContainedInElement: false,
      showValueLabel: true
    },
    color: ['rgba(230, 194, 32, 0.5)', 'rgba(224, 187, 20, 0.71)'],
    splitSeriesAccessors: ['x'],
    stackAccessors: ['x'],
    xAccessor: "x",
    xScaleType: "ordinal",
    yAccessors: ['y'],
    yScaleType: "linear"
  }))));
};

exports.BooleanContent = BooleanContent;