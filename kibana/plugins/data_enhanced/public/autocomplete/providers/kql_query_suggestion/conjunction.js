"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupGetConjunctionSuggestions = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _public = require("../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var bothArgumentsText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.andOperatorDescription.bothArgumentsText",
  defaultMessage: "both arguments",
  description: "Part of xpack.data.kueryAutocomplete.andOperatorDescription. Full text: 'Requires both arguments to be true'"
});

var oneOrMoreArgumentsText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.orOperatorDescription.oneOrMoreArgumentsText",
  defaultMessage: "one or more arguments",
  description: "Part of xpack.data.kueryAutocomplete.orOperatorDescription. Full text: 'Requires one or more arguments to be true'"
});

var conjunctions = {
  and: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.data.kueryAutocomplete.andOperatorDescription",
    defaultMessage: "Requires {bothArguments} to be true",
    values: {
      bothArguments: _react.default.createElement("span", {
        className: "kbnSuggestionItem__callout"
      }, bothArgumentsText)
    },
    description: "Full text: ' Requires both arguments to be true'. See 'xpack.data.kueryAutocomplete.andOperatorDescription.bothArgumentsText' for 'both arguments' part."
  })),
  or: _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.data.kueryAutocomplete.orOperatorDescription",
    defaultMessage: "Requires {oneOrMoreArguments} to be true",
    values: {
      oneOrMoreArguments: _react.default.createElement("span", {
        className: "kbnSuggestionItem__callout"
      }, oneOrMoreArgumentsText)
    },
    description: "Full text: 'Requires one or more arguments to be true'. See 'xpack.data.kueryAutocomplete.orOperatorDescription.oneOrMoreArgumentsText' for 'one or more arguments' part."
  }))
};

var setupGetConjunctionSuggestions = function setupGetConjunctionSuggestions(core) {
  return function (querySuggestionsArgs, _ref) {
    var text = _ref.text,
        end = _ref.end;
    var suggestions = [];

    if (text.endsWith(' ')) {
      suggestions = Object.keys(conjunctions).map(function (key) {
        return {
          type: _public.QuerySuggestionTypes.Conjunction,
          text: "".concat(key, " "),
          description: conjunctions[key],
          start: end,
          end: end
        };
      });
    }

    return Promise.resolve(suggestions);
  };
};

exports.setupGetConjunctionSuggestions = setupGetConjunctionSuggestions;