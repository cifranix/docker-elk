"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupKqlQuerySuggestionProvider = exports.KUERY_LANGUAGE_NAME = void 0;

var _lodash = require("lodash");

var _field = require("./field");

var _value = require("./value");

var _operator = require("./operator");

var _conjunction = require("./conjunction");

var _public = require("../../../../../../../src/plugins/data/public");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var cursorSymbol = '@kuery-cursor@';

var dedup = function dedup(suggestions) {
  return (0, _lodash.uniq)(suggestions, function (_ref) {
    var type = _ref.type,
        text = _ref.text,
        start = _ref.start,
        end = _ref.end;
    return [type, text, start, end].join('|');
  });
};

var KUERY_LANGUAGE_NAME = 'kuery';
exports.KUERY_LANGUAGE_NAME = KUERY_LANGUAGE_NAME;

var setupKqlQuerySuggestionProvider = function setupKqlQuerySuggestionProvider(core) {
  var providers = {
    field: (0, _field.setupGetFieldSuggestions)(core),
    value: (0, _value.setupGetValueSuggestions)(core),
    operator: (0, _operator.setupGetOperatorSuggestions)(core),
    conjunction: (0, _conjunction.setupGetConjunctionSuggestions)(core)
  };

  var getSuggestionsByType = function getSuggestionsByType(cursoredQuery, querySuggestionsArgs) {
    try {
      var cursorNode = _public.esKuery.fromKueryExpression(cursoredQuery, {
        cursorSymbol: cursorSymbol,
        parseCursor: true
      });

      return cursorNode.suggestionTypes.map(function (type) {
        return providers[type](querySuggestionsArgs, cursorNode);
      });
    } catch (e) {
      return [];
    }
  };

  return function (querySuggestionsArgs) {
    var query = querySuggestionsArgs.query,
        selectionStart = querySuggestionsArgs.selectionStart,
        selectionEnd = querySuggestionsArgs.selectionEnd;
    var cursoredQuery = "".concat(query.substr(0, selectionStart)).concat(cursorSymbol).concat(query.substr(selectionEnd));
    return Promise.all(getSuggestionsByType(cursoredQuery, querySuggestionsArgs)).then(function (suggestionsByType) {
      return dedup((0, _lodash.flatten)(suggestionsByType));
    });
  };
};

exports.setupKqlQuerySuggestionProvider = setupKqlQuerySuggestionProvider;