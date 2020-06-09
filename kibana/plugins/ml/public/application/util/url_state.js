"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlState = getUrlState;
exports.useUrlState = void 0;

var _queryString = require("query-string");

var _react = require("react");

var _lodash = require("lodash");

var _risonNode = require("rison-node");

var _reactRouterDom = require("react-router-dom");

var _object_utils = require("./object_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Set of URL query parameters that require the rison serialization.
 */
var risonSerializedParams = new Set(['_a', '_g']);
/**
 * Checks if the URL query parameter requires rison serialization.
 * @param queryParam
 */

function isRisonSerializationRequired(queryParam) {
  return risonSerializedParams.has(queryParam);
}

function getUrlState(search) {
  var urlState = {};
  var parsedQueryString = (0, _queryString.parse)(search, {
    sort: false
  });

  try {
    Object.keys(parsedQueryString).forEach(function (a) {
      if (isRisonSerializationRequired(a)) {
        urlState[a] = (0, _risonNode.decode)(parsedQueryString[a]);
      } else {
        urlState[a] = parsedQueryString[a];
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Could not read url state', error);
  }

  return urlState;
} // Compared to the original appState/globalState,
// this no longer makes use of fetch/save methods.
// - Reading from `location.search` is the successor of `fetch`.
// - `history.push()` is the successor of `save`.
// - The exposed state and set call make use of the above and make sure that
//   different urlStates(e.g. `_a` / `_g`) don't overwrite each other.


var useUrlState = function useUrlState(accessor) {
  var history = (0, _reactRouterDom.useHistory)();

  var _useLocation = (0, _reactRouterDom.useLocation)(),
      search = _useLocation.search;

  var setUrlState = (0, _react.useCallback)(function (attribute, value) {
    var urlState = getUrlState(search);
    var parsedQueryString = (0, _queryString.parse)(search, {
      sort: false
    });

    if (!Object.prototype.hasOwnProperty.call(urlState, accessor)) {
      urlState[accessor] = {};
    }

    if (typeof attribute === 'string') {
      if ((0, _lodash.isEqual)((0, _object_utils.getNestedProperty)(urlState, "".concat(accessor, ".").concat(attribute)), value)) {
        return;
      }

      urlState[accessor][attribute] = value;
    } else {
      var attributes = attribute;
      Object.keys(attributes).forEach(function (a) {
        urlState[accessor][a] = attributes[a];
      });
    }

    try {
      var oldLocationSearch = (0, _queryString.stringify)(parsedQueryString, {
        sort: false,
        encode: false
      });
      Object.keys(urlState).forEach(function (a) {
        if (isRisonSerializationRequired(a)) {
          parsedQueryString[a] = (0, _risonNode.encode)(urlState[a]);
        } else {
          parsedQueryString[a] = urlState[a];
        }
      });
      var newLocationSearch = (0, _queryString.stringify)(parsedQueryString, {
        sort: false,
        encode: false
      });

      if (oldLocationSearch !== newLocationSearch) {
        history.push({
          search: (0, _queryString.stringify)(parsedQueryString, {
            sort: false
          })
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Could not save url state', error);
    }
  }, [search]);
  return [getUrlState(search)[accessor], setUrlState];
};

exports.useUrlState = useUrlState;