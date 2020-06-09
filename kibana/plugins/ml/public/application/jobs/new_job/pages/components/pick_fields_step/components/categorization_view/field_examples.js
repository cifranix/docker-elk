"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldExamples = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TOKEN_HIGHLIGHT_COLOR = '#b0ccf7';

var FieldExamples = function FieldExamples(_ref) {
  var fieldExamples = _ref.fieldExamples;

  if (fieldExamples === null || fieldExamples.length === 0) {
    return null;
  }

  var columns = [{
    field: 'example',
    name: _i18n.i18n.translate('xpack.ml.newJob.wizard.pickFieldsStep.categorizationFieldExamples.title', {
      defaultMessage: 'Examples'
    }),
    render: function render(example) {
      return _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("code", null, example));
    }
  }];
  var items = fieldExamples.map(function (example, i) {
    var txt = [];
    var tokenCounter = 0;
    var buffer = '';
    var charCount = 0;

    while (charCount < example.text.length) {
      var token = example.tokens[tokenCounter];

      if (token && charCount === token.start_offset) {
        txt.push(buffer);
        buffer = '';
        txt.push(_react.default.createElement(Token, {
          key: "".concat(i).concat(charCount)
        }, token.token));
        charCount += token.end_offset - token.start_offset;
        tokenCounter++;
      } else {
        buffer += example.text[charCount];
        charCount++;
      }
    }

    txt.push(buffer);
    return {
      example: txt
    };
  });
  return _react.default.createElement(_eui.EuiBasicTable, {
    columns: columns,
    items: items,
    "data-test-subj": "mlJobWizardCategorizationExamplesTable"
  });
};

exports.FieldExamples = FieldExamples;

var Token = function Token(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement("span", {
    style: {
      backgroundColor: TOKEN_HIGHLIGHT_COLOR
    }
  }, children);
};