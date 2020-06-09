"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopValues = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _kibana_field_format = require("../../../../../formatters/kibana_field_format");

var _round_to_decimal_place = require("../../../../../formatters/round_to_decimal_place");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function getPercentLabel(docCount, topValuesSampleSize) {
  var percent = 100 * docCount / topValuesSampleSize;

  if (percent >= 0.1) {
    return "".concat((0, _round_to_decimal_place.roundToDecimalPlace)(percent, 1), "%");
  } else {
    return '< 0.1%';
  }
}

var TopValues = function TopValues(_ref) {
  var stats = _ref.stats,
      fieldFormat = _ref.fieldFormat,
      barColor = _ref.barColor;
  var topValues = stats.topValues,
      topValuesSampleSize = stats.topValuesSampleSize,
      topValuesSamplerShardSize = stats.topValuesSamplerShardSize,
      count = stats.count,
      isTopValuesSampled = stats.isTopValuesSampled;
  var progressBarMax = isTopValuesSampled === true ? topValuesSampleSize : count;
  return _react.default.createElement(_react.Fragment, null, topValues.map(function (value) {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "xs",
      alignItems: "center",
      key: value.key
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      style: {
        width: 100
      },
      className: "eui-textTruncate"
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: (0, _kibana_field_format.kibanaFieldFormat)(value.key, fieldFormat),
      position: "right"
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs",
      textAlign: "right",
      color: "subdued"
    }, (0, _kibana_field_format.kibanaFieldFormat)(value.key, fieldFormat)))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiProgress, {
      value: value.doc_count,
      max: progressBarMax,
      color: barColor,
      size: "m"
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      style: {
        width: 70
      },
      className: "eui-textTruncate"
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs",
      textAlign: "left",
      color: "subdued"
    }, getPercentLabel(value.doc_count, progressBarMax))));
  }), isTopValuesSampled === true && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xs"
  }), _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.topValues.calculatedFromSampleDescription",
    defaultMessage: "Calculated from sample of {topValuesSamplerShardSize} documents per shard",
    values: {
      topValuesSamplerShardSize: topValuesSamplerShardSize
    }
  }))));
};

exports.TopValues = TopValues;