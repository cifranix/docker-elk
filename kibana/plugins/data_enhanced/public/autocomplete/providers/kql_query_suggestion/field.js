"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupGetFieldSuggestions = void 0;

var _react = _interopRequireDefault(require("react"));

var _lodash = require("lodash");

var _react2 = require("@kbn/i18n/react");

var _escape_kuery = require("./lib/escape_kuery");

var _sort_prefix_first = require("./sort_prefix_first");

var _public = require("../../../../../../../src/plugins/data/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var getDescription = function getDescription(field) {
  return _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.data.kueryAutocomplete.filterResultsDescription",
    defaultMessage: "Filter results that contain {fieldName}",
    values: {
      fieldName: _react.default.createElement("span", {
        className: "kbnSuggestionItem__callout"
      }, field.name)
    }
  }));
};

var keywordComparator = function keywordComparator(first, second) {
  var extensions = ['raw', 'keyword'];

  if (extensions.map(function (ext) {
    return "".concat(first.name, ".").concat(ext);
  }).includes(second.name)) {
    return 1;
  } else if (extensions.map(function (ext) {
    return "".concat(second.name, ".").concat(ext);
  }).includes(first.name)) {
    return -1;
  }

  return first.name.localeCompare(second.name);
};

var setupGetFieldSuggestions = function setupGetFieldSuggestions(core) {
  return function (_ref, _ref2) {
    var indexPatterns = _ref.indexPatterns;
    var start = _ref2.start,
        end = _ref2.end,
        prefix = _ref2.prefix,
        suffix = _ref2.suffix,
        _ref2$nestedPath = _ref2.nestedPath,
        nestedPath = _ref2$nestedPath === void 0 ? '' : _ref2$nestedPath;
    var allFields = (0, _lodash.flatten)(indexPatterns.map(function (indexPattern) {
      return indexPattern.fields.filter(_public.indexPatterns.isFilterable);
    }));
    var search = "".concat(prefix).concat(suffix).trim().toLowerCase();
    var matchingFields = allFields.filter(function (field) {
      return (!nestedPath || nestedPath && field.subType && field.subType.nested && field.subType.nested.path.includes(nestedPath)) && field.name.toLowerCase().includes(search) && field.name !== search;
    });
    var sortedFields = (0, _sort_prefix_first.sortPrefixFirst)(matchingFields.sort(keywordComparator), search, 'name');
    var suggestions = sortedFields.map(function (field) {
      var remainingPath = field.subType && field.subType.nested ? field.subType.nested.path.slice(nestedPath ? nestedPath.length + 1 : 0) : '';
      var text = field.subType && field.subType.nested && remainingPath.length > 0 ? "".concat((0, _escape_kuery.escapeKuery)(remainingPath), ":{ ").concat((0, _escape_kuery.escapeKuery)(field.name.slice(field.subType.nested.path.length + 1)), "  }") : "".concat((0, _escape_kuery.escapeKuery)(field.name.slice(nestedPath ? nestedPath.length + 1 : 0)), " ");
      var description = getDescription(field);
      var cursorIndex = field.subType && field.subType.nested && remainingPath.length > 0 ? text.length - 2 : text.length;
      return {
        type: _public.QuerySuggestionTypes.Field,
        text: text,
        description: description,
        start: start,
        end: end,
        cursorIndex: cursorIndex,
        field: field
      };
    });
    return Promise.resolve(suggestions);
  };
};

exports.setupGetFieldSuggestions = setupGetFieldSuggestions;