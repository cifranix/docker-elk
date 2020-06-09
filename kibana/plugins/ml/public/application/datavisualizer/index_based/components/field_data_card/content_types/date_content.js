"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _format = require("@elastic/eui/lib/services/format");

var _react2 = require("@kbn/i18n/react");

var _round_to_decimal_place = require("../../../../../formatters/round_to_decimal_place");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// @ts-ignore
var TIME_FORMAT = 'MMM D YYYY, HH:mm:ss.SSS';

var DateContent = function DateContent(_ref) {
  var config = _ref.config;
  var stats = config.stats;
  var count = stats.count,
      sampleCount = stats.sampleCount,
      earliest = stats.earliest,
      latest = stats.latest;
  var docsPercent = (0, _round_to_decimal_place.roundToDecimalPlace)(count / sampleCount * 100);
  return _react.default.createElement("div", {
    className: "mlFieldDataCard__stats"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "document"
  }), "\xA0", _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardDate.documentsCountDescription",
    defaultMessage: "{count, plural, zero {# document} one {# document} other {# documents}} ({docsPercent}%)",
    values: {
      count: count,
      docsPercent: docsPercent
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardDate.earliestDescription",
    defaultMessage: "earliest {earliestFormatted}",
    values: {
      earliestFormatted: (0, _format.formatDate)(earliest, TIME_FORMAT)
    }
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("div", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardDate.latestDescription",
    defaultMessage: "latest {latestFormatted}",
    values: {
      latestFormatted: (0, _format.formatDate)(latest, TIME_FORMAT)
    }
  })));
};

exports.DateContent = DateContent;