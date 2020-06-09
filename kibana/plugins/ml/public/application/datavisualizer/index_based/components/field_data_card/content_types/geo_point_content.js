"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GeoPointContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _round_to_decimal_place = require("../../../../../formatters/round_to_decimal_place");

var _examples_list = require("../examples_list");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var GeoPointContent = function GeoPointContent(_ref) {
  var config = _ref.config;
  // TODO - adjust server-side query to get examples using:
  // GET /filebeat-apache-2019.01.30/_search
  // {
  //   "size":10,
  //   "_source": false,
  //   "docvalue_fields": ["source.geo.location"],
  //    "query": {
  //        "bool":{
  //          "must":[
  //             {
  //                "exists":{
  //                   "field":"source.geo.location"
  //                }
  //             }
  //          ]
  //       }
  //    }
  // }
  var stats = config.stats;
  var count = stats.count,
      sampleCount = stats.sampleCount,
      cardinality = stats.cardinality,
      examples = stats.examples;
  var docsPercent = (0, _round_to_decimal_place.roundToDecimalPlace)(count / sampleCount * 100);
  return _react.default.createElement("div", {
    className: "mlFieldDataCard__stats"
  }, _react.default.createElement("div", null, _react.default.createElement(_eui.EuiText, {
    size: "xs",
    color: "subdued"
  }, _react.default.createElement(_eui.EuiIcon, {
    type: "document"
  }), "\xA0", _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardGeoPoint.documentsCountDescription",
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
    id: "xpack.ml.fieldDataCard.cardGeoPoint.distinctCountDescription",
    defaultMessage: "{cardinality} distinct {cardinality, plural, zero {value} one {value} other {values}}",
    values: {
      cardinality: cardinality
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_examples_list.ExamplesList, {
    examples: examples
  }));
};

exports.GeoPointContent = GeoPointContent;