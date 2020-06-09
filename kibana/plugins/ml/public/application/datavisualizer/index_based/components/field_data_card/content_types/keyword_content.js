"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeywordContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _round_to_decimal_place = require("../../../../../formatters/round_to_decimal_place");

var _top_values = require("../top_values");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var KeywordContent = function KeywordContent(_ref) {
  var config = _ref.config;
  var stats = config.stats,
      fieldFormat = config.fieldFormat;
  var count = stats.count,
      sampleCount = stats.sampleCount,
      cardinality = stats.cardinality;
  var docsPercent = (0, _round_to_decimal_place.roundToDecimalPlace)(count / sampleCount * 100);
  return _react.default.createElement("div", {
    className: "mlFieldDataCard__stats"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "document"
  }), "\xA0", _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardKeyword.documentsCountDescription",
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
    id: "xpack.ml.fieldDataCard.cardKeyword.distinctCountDescription",
    defaultMessage: "{cardinality} distinct {cardinality, plural, zero {value} one {value} other {values}}",
    values: {
      cardinality: cardinality
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    className: "mlFieldDataCard__valuesTitle"
  }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardKeyword.topValuesLabel",
    defaultMessage: "Top values"
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_top_values.TopValues, {
    stats: stats,
    fieldFormat: fieldFormat,
    barColor: "secondary"
  })));
};

exports.KeywordContent = KeywordContent;