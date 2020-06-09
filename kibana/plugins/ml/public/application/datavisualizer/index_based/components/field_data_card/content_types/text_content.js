"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _examples_list = require("../examples_list");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TextContent = function TextContent(_ref) {
  var config = _ref.config;
  var stats = config.stats;
  var examples = stats.examples;
  var numExamples = examples.length;
  return _react.default.createElement("div", {
    className: "mlFieldDataCard__stats"
  }, numExamples > 0 && _react.default.createElement(_examples_list.ExamplesList, {
    examples: examples
  }), numExamples === 0 && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "xl"
  }), _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.ml.fieldDataCard.cardText.noExamplesForFieldsTitle', {
      defaultMessage: 'No examples were obtained for this field'
    }),
    iconType: "alert"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardText.fieldNotPresentDescription",
    defaultMessage: "This field was not present in the {sourceParam} field of documents queried.",
    values: {
      sourceParam: _react.default.createElement("span", {
        className: "mlFieldDataCard__codeContent"
      }, "_source")
    }
  }), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardText.fieldMayBePopulatedDescription",
    defaultMessage: "It may be populated, for example, using a {copyToParam} parameter in the document mapping, or be pruned from the {sourceParam} field after indexing through the use of {includesParam} and {excludesParam} parameters.",
    values: {
      copyToParam: _react.default.createElement("span", {
        className: "mlFieldDataCard__codeContent"
      }, "copy_to"),
      sourceParam: _react.default.createElement("span", {
        className: "mlFieldDataCard__codeContent"
      }, "_source"),
      includesParam: _react.default.createElement("span", {
        className: "mlFieldDataCard__codeContent"
      }, "includes"),
      excludesParam: _react.default.createElement("span", {
        className: "mlFieldDataCard__codeContent"
      }, "excludes")
    }
  }))));
};

exports.TextContent = TextContent;