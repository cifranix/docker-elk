"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExamplesList = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var ExamplesList = function ExamplesList(_ref) {
  var examples = _ref.examples;

  if (examples === undefined || examples === null || examples.length === 0) {
    return null;
  }

  var examplesContent = examples.map(function (example, i) {
    return _react.default.createElement(_eui.EuiListGroupItem, {
      style: {
        padding: 0,
        justifyContent: 'center'
      },
      size: "xs",
      key: "example_".concat(i),
      label: typeof example === 'string' ? example : JSON.stringify(example)
    });
  });
  return _react.default.createElement("div", null, _react.default.createElement(_eui.EuiTitle, {
    size: "xxxs",
    className: "mlFieldDataCard__valuesTitle"
  }, _react.default.createElement("span", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardText.examplesTitle",
    defaultMessage: "{numExamples, plural, one {value} other {examples}}",
    values: {
      numExamples: examples.length
    }
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiListGroup, {
    flush: true,
    showToolTips: true
  }, examplesContent));
};

exports.ExamplesList = ExamplesList;