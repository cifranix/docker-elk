"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OtherContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _round_to_decimal_place = require("../../../../../formatters/round_to_decimal_place");

var _examples_list = require("../examples_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var OtherContent = function OtherContent(_ref) {
  var config = _ref.config;
  var stats = config.stats,
      type = config.type,
      aggregatable = config.aggregatable;
  var count = stats.count,
      sampleCount = stats.sampleCount,
      cardinality = stats.cardinality,
      examples = stats.examples;
  var docsPercent = (0, _round_to_decimal_place.roundToDecimalPlace)(count / sampleCount * 100);
  return _react.default.createElement("div", {
    className: "mlFieldDataCard__stats"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardOther.cardTypeLabel",
    defaultMessage: "{cardType} type",
    values: {
      cardType: type
    }
  }))), aggregatable === true && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "document"
  }), "\xA0", _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardOther.documentsCountDescription",
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
    id: "xpack.ml.fieldDataCard.cardOther.distinctCountDescription",
    defaultMessage: "{cardinality} distinct {cardinality, plural, zero {value} one {value} other {values}}",
    values: {
      cardinality: cardinality
    }
  })))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_examples_list.ExamplesList, {
    examples: examples
  }));
};

exports.OtherContent = OtherContent;