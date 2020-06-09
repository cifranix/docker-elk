"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupGetOperatorSuggestions = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _public = require("../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var equalsText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.equalOperatorDescription.equalsText",
  defaultMessage: "equals",
  description: "Part of xpack.data.kueryAutocomplete.equalOperatorDescription. Full text: 'equals some value'"
});

var lessThanOrEqualToText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.lessThanOrEqualOperatorDescription.lessThanOrEqualToText",
  defaultMessage: "less than or equal to",
  description: "Part of xpack.data.kueryAutocomplete.lessThanOrEqualOperatorDescription. Full text: 'is less than or equal to some value'"
});

var greaterThanOrEqualToText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.greaterThanOrEqualOperatorDescription.greaterThanOrEqualToText",
  defaultMessage: "greater than or equal to",
  description: "Part of xpack.data.kueryAutocomplete.greaterThanOrEqualOperatorDescription. Full text: 'is greater than or equal to some value'"
});

var lessThanText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.lessThanOperatorDescription.lessThanText",
  defaultMessage: "less than",
  description: "Part of xpack.data.kueryAutocomplete.lessThanOperatorDescription. Full text: 'is less than some value'"
});

var greaterThanText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.greaterThanOperatorDescription.greaterThanText",
  defaultMessage: "greater than",
  description: "Part of xpack.data.kueryAutocomplete.greaterThanOperatorDescription. Full text: 'is greater than some value'"
});

var existsText = _react.default.createElement(_react2.FormattedMessage, {
  id: "xpack.data.kueryAutocomplete.existOperatorDescription.existsText",
  defaultMessage: "exists",
  description: "Part of xpack.data.kueryAutocomplete.existOperatorDescription. Full text: 'exists in any form'"
});

var operators = {
  ':': {
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.data.kueryAutocomplete.equalOperatorDescription",
      defaultMessage: "{equals} some value",
      values: {
        equals: _react.default.createElement("span", {
          className: "kbnSuggestionItem__callout"
        }, equalsText)
      },
      description: "Full text: 'equals some value'. See 'xpack.data.kueryAutocomplete.equalOperatorDescription.equalsText' for 'equals' part."
    }),
    fieldTypes: ['string', 'number', 'date', 'ip', 'geo_point', 'geo_shape', 'boolean']
  },
  '<=': {
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.data.kueryAutocomplete.lessThanOrEqualOperatorDescription",
      defaultMessage: "is {lessThanOrEqualTo} some value",
      values: {
        lessThanOrEqualTo: _react.default.createElement("span", {
          className: "kbnSuggestionItem__callout"
        }, lessThanOrEqualToText)
      },
      description: "Full text: 'is less than or equal to some value'. See 'xpack.data.kueryAutocomplete.lessThanOrEqualOperatorDescription.lessThanOrEqualToText' for 'less than or equal to' part."
    }),
    fieldTypes: ['number', 'date', 'ip']
  },
  '>=': {
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.data.kueryAutocomplete.greaterThanOrEqualOperatorDescription",
      defaultMessage: "is {greaterThanOrEqualTo} some value",
      values: {
        greaterThanOrEqualTo: _react.default.createElement("span", {
          className: "kbnSuggestionItem__callout"
        }, greaterThanOrEqualToText)
      },
      description: "Full text: 'is greater than or equal to some value'. See 'xpack.data.kueryAutocomplete.greaterThanOrEqualOperatorDescription.greaterThanOrEqualToText' for 'greater than or equal to' part."
    }),
    fieldTypes: ['number', 'date', 'ip']
  },
  '<': {
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.data.kueryAutocomplete.lessThanOperatorDescription",
      defaultMessage: "is {lessThan} some value",
      values: {
        lessThan: _react.default.createElement("span", {
          className: "kbnSuggestionItem__callout"
        }, lessThanText)
      },
      description: "Full text: 'is less than some value'. See 'xpack.data.kueryAutocomplete.lessThanOperatorDescription.lessThanText' for 'less than' part."
    }),
    fieldTypes: ['number', 'date', 'ip']
  },
  '>': {
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.data.kueryAutocomplete.greaterThanOperatorDescription",
      defaultMessage: "is {greaterThan} some value",
      values: {
        greaterThan: _react.default.createElement("span", {
          className: "kbnSuggestionItem__callout"
        }, greaterThanText)
      },
      description: "Full text: 'is greater than some value'. See 'xpack.data.kueryAutocomplete.greaterThanOperatorDescription.greaterThanText' for 'greater than' part."
    }),
    fieldTypes: ['number', 'date', 'ip']
  },
  ': *': {
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.data.kueryAutocomplete.existOperatorDescription",
      defaultMessage: "{exists} in any form",
      values: {
        exists: _react.default.createElement("span", {
          className: "kbnSuggestionItem__callout"
        }, existsText)
      },
      description: "Full text: 'exists in any form'. See 'xpack.data.kueryAutocomplete.existOperatorDescription.existsText' for 'exists' part."
    }),
    fieldTypes: undefined
  }
};

var getOperatorByName = function getOperatorByName(operator) {
  return operators[operator];
};

var getDescription = function getDescription(operator) {
  return _react.default.createElement("p", null, getOperatorByName(operator).description);
};

var setupGetOperatorSuggestions = function setupGetOperatorSuggestions() {
  return function (_ref, _ref2) {
    var indexPatterns = _ref.indexPatterns;
    var end = _ref2.end,
        fieldName = _ref2.fieldName,
        nestedPath = _ref2.nestedPath;
    var allFields = (0, _lodash.flatten)(indexPatterns.map(function (indexPattern) {
      return indexPattern.fields.slice();
    }));
    var fullFieldName = nestedPath ? "".concat(nestedPath, ".").concat(fieldName) : fieldName;
    var fields = allFields.filter(function (field) {
      return field.name === fullFieldName;
    }).map(function (field) {
      var matchingOperators = Object.keys(operators).filter(function (operator) {
        var _getOperatorByName = getOperatorByName(operator),
            fieldTypes = _getOperatorByName.fieldTypes;

        return !fieldTypes || fieldTypes.includes(field.type);
      });
      var suggestions = matchingOperators.map(function (operator) {
        return {
          type: _public.QuerySuggestionTypes.Operator,
          text: operator + ' ',
          description: getDescription(operator),
          start: end,
          end: end
        };
      });
      return suggestions;
    });
    return Promise.resolve((0, _lodash.flatten)(fields));
  };
};

exports.setupGetOperatorSuggestions = setupGetOperatorSuggestions;