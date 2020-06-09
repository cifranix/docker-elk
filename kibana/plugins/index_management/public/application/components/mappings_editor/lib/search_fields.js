"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchFields = void 0;

var _react = _interopRequireDefault(require("react"));

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Copied from https://stackoverflow.com/a/9310752
 */
var escapeRegExp = function escapeRegExp(text) {
  return text.replace(/[-\[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

var sortResult = function sortResult(a, b) {
  if (a.metadata.score > b.metadata.score) {
    return -1;
  } else if (b.metadata.score > a.metadata.score) {
    return 1;
  }

  if (a.metadata.stringMatch === null) {
    return 1;
  } else if (b.metadata.stringMatch === null) {
    return -1;
  } // With a match and the same score,...


  if (a.metadata.matchFieldName && b.metadata.matchFieldName) {
    // The field with the shortest name comes first
    // So searching "nam" would bring "name" before "namespace"
    return a.field.source.name.length - b.field.source.name.length;
  }

  if (a.metadata.stringMatch.length === b.metadata.stringMatch.length) {
    // The field with the shortest path (less tree "depth") comes first
    return a.field.path.length - b.field.path.length;
  } // The longest match string wins.


  return b.metadata.stringMatch.length - a.metadata.stringMatch.length;
};

var calculateScore = function calculateScore(metadata) {
  var score = 0;

  if (metadata.fullyMatchFieldName) {
    score += 15;
  }

  if (metadata.matchFieldName) {
    score += 5;
  }

  if (metadata.matchPath) {
    score += 15;
  }

  if (metadata.matchStartOfPath) {
    score += 5;
  }

  if (metadata.fullyMatchPath) {
    score += 5;
  }

  if (metadata.matchType) {
    score += 5;
  }

  if (metadata.fullyMatchType) {
    score += 5;
  }

  return score;
};

var getJSXdisplayFromMeta = function getJSXdisplayFromMeta(searchData, fieldData, metadata) {
  var term = searchData.term;
  var path = fieldData.path;

  var display = _react.default.createElement("span", null, path);

  if (metadata.fullyMatchPath) {
    display = _react.default.createElement("span", {
      style: {
        lineHeight: 1.5
      }
    }, _react.default.createElement("strong", null, path));
  } else if (metadata.matchStartOfPath) {
    var endString = path.substr(term.length, path.length);
    display = _react.default.createElement("span", {
      style: {
        lineHeight: 1.5
      }
    }, _react.default.createElement("strong", null, term), endString);
  } else if (metadata.matchPath) {
    var stringMatch = metadata.stringMatch;
    var charIndex = path.lastIndexOf(stringMatch);
    var startString = path.substr(0, charIndex);

    var _endString = path.substr(charIndex + stringMatch.length);

    display = _react.default.createElement("span", {
      style: {
        lineHeight: 1.5
      }
    }, startString, _react.default.createElement("strong", null, stringMatch), _endString);
  }

  return display;
};

var getSearchMetadata = function getSearchMetadata(searchData, fieldData) {
  var term = searchData.term,
      type = searchData.type,
      searchRegexArray = searchData.searchRegexArray;
  var typeToCompare = type !== null && type !== void 0 ? type : term;
  var fullyMatchFieldName = term === fieldData.name;
  var fullyMatchPath = term === fieldData.path;
  var fieldNameRegMatch = searchRegexArray[0].exec(fieldData.name);
  var matchFieldName = fullyMatchFieldName ? true : fieldNameRegMatch !== null;
  var matchStartOfPath = fieldData.path.startsWith(term);
  var matchType = fieldData.type.includes(typeToCompare);
  var fullyMatchType = typeToCompare === fieldData.type;
  var stringMatch = null;

  if (fullyMatchPath) {
    stringMatch = fieldData.path;
  } else if (matchFieldName) {
    stringMatch = fullyMatchFieldName ? fieldData.name : fieldNameRegMatch[0];
  } else {
    // Execute all the regEx and sort them with the one that has the most
    // characters match first.
    var arrayMatch = searchRegexArray.map(function (regex) {
      return regex.exec(fieldData.path);
    }).filter(Boolean).sort(function (a, b) {
      return b[0].length - a[0].length;
    });

    if (arrayMatch.length) {
      stringMatch = arrayMatch[0][0];
    }
  }

  var matchPath = stringMatch !== null;
  var metadata = {
    matchFieldName: matchFieldName,
    matchPath: matchPath,
    matchStartOfPath: matchStartOfPath,
    fullyMatchPath: fullyMatchPath,
    matchType: matchType,
    fullyMatchFieldName: fullyMatchFieldName,
    fullyMatchType: fullyMatchType,
    stringMatch: stringMatch
  };
  var score = calculateScore(metadata);
  var display = getJSXdisplayFromMeta(searchData, fieldData, metadata);
  return _objectSpread({}, metadata, {
    display: display,
    score: score
  });
};

var getRegexArrayFromSearchTerms = function getRegexArrayFromSearchTerms(searchTerms) {
  var fuzzyJoinChar = '([\\._-\\s]|(\\s>\\s))?';
  return [new RegExp(searchTerms.join(fuzzyJoinChar), 'i')];
};
/**
 * We will parsre the term to check if the _first_ or _last_ word matches a field "type"
 *
 * @param term The term introduced in the search box
 */


var parseSearchTerm = function parseSearchTerm(term) {
  var type;
  var parsedTerm = term.replace(/\s+/g, ' ').trim(); // Remove multiple spaces with 1 single space

  var words = parsedTerm.split(' ').map(escapeRegExp); // We don't take into account if the last word is a ">" char

  if (words[words.length - 1] === '>') {
    words.pop();
    parsedTerm = words.join(' ');
  }

  var searchRegexArray = getRegexArrayFromSearchTerms(words);

  var firstWordIsType = _constants.ALL_DATA_TYPES.includes(words[0]);

  var lastWordIsType = _constants.ALL_DATA_TYPES.includes(words[words.length - 1]);

  if (firstWordIsType) {
    type = words[0];
  } else if (lastWordIsType) {
    type = words[words.length - 1];
  }

  return {
    term: parsedTerm,
    terms: words,
    type: type,
    searchRegexArray: searchRegexArray
  };
};

var searchFields = function searchFields(term, fields) {
  var searchData = parseSearchTerm(term); // An empty string means that we have searched for ">" and that is has been
  // stripped out. So we exit early with an empty result.

  if (searchData.term === '') {
    return [];
  }

  return Object.values(fields).map(function (field) {
    return {
      field: field,
      metadata: getSearchMetadata(searchData, {
        name: field.source.name,
        path: field.path.join(' > '),
        type: field.source.type
      })
    };
  }).filter(function (_ref) {
    var metadata = _ref.metadata;
    return metadata.score > 0;
  }).sort(sortResult).map(function (_ref2) {
    var field = _ref2.field,
        display = _ref2.metadata.display;
    return {
      display: display,
      field: field
    };
  });
};

exports.searchFields = searchFields;