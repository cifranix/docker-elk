"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeprecationList = void 0;

var _react = _interopRequireDefault(require("react"));

var _types = require("../../../types");

var _constants = require("../constants");

var _cell = require("./cell");

var _index_table = require("./index_table");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var sortByLevelDesc = function sortByLevelDesc(a, b) {
  return -1 * (_constants.LEVEL_MAP[a.level] - _constants.LEVEL_MAP[b.level]);
};
/**
 * Used to show a single deprecation message with any detailed information.
 */


var MessageDeprecation = function MessageDeprecation(_ref) {
  var deprecation = _ref.deprecation;
  var items = [];

  if (deprecation.details) {
    items.push({
      body: deprecation.details
    });
  }

  return _react.default.createElement(_cell.DeprecationCell, {
    reindexBlocker: deprecation.blockerForReindexing,
    headline: deprecation.message,
    healthColor: _constants.COLOR_MAP[deprecation.level],
    indexName: deprecation.index,
    reindex: deprecation.reindex,
    needsDefaultFields: deprecation.needsDefaultFields,
    docUrl: deprecation.url,
    items: items
  });
};
/**
 * Used to show a single (simple) deprecation message with any detailed information.
 */


var SimpleMessageDeprecation = function SimpleMessageDeprecation(_ref2) {
  var deprecation = _ref2.deprecation;
  var items = [];

  if (deprecation.details) {
    items.push({
      body: deprecation.details
    });
  }

  return _react.default.createElement(_cell.DeprecationCell, {
    reindexBlocker: deprecation.blockerForReindexing,
    items: items,
    docUrl: deprecation.url
  });
};

/**
 * Shows a single deprecation and table of affected indices with details for each index.
 */
var IndexDeprecation = function IndexDeprecation(_ref3) {
  var deprecation = _ref3.deprecation,
      indices = _ref3.indices;
  return _react.default.createElement(_cell.DeprecationCell, {
    docUrl: deprecation.url
  }, _react.default.createElement(_index_table.IndexDeprecationTable, {
    indices: indices
  }));
};
/**
 * A list of deprecations that is either shown as individual deprecation cells or as a
 * deprecation summary for a list of indices.
 */


var DeprecationList = function DeprecationList(_ref4) {
  var deprecations = _ref4.deprecations,
      currentGroupBy = _ref4.currentGroupBy;

  // If we're grouping by message and the first deprecation has an index field, show an index
  // group deprecation. Otherwise, show each message.
  if (currentGroupBy === _types.GroupByOption.message && deprecations[0].index !== undefined) {
    // We assume that every deprecation message is the same issue (since they have the same
    // message) and that each deprecation will have an index associated with it.
    var indices = deprecations.map(function (dep) {
      return {
        index: dep.index,
        details: dep.details,
        reindex: dep.reindex === true,
        needsDefaultFields: dep.needsDefaultFields === true,
        blockerForReindexing: dep.blockerForReindexing
      };
    });
    return _react.default.createElement(IndexDeprecation, {
      indices: indices,
      deprecation: deprecations[0]
    });
  } else if (currentGroupBy === _types.GroupByOption.index) {
    return _react.default.createElement("div", null, deprecations.sort(sortByLevelDesc).map(function (dep) {
      return _react.default.createElement(MessageDeprecation, {
        deprecation: dep,
        key: dep.message
      });
    }));
  } else {
    return _react.default.createElement("div", null, deprecations.sort(sortByLevelDesc).map(function (dep) {
      return _react.default.createElement(SimpleMessageDeprecation, {
        deprecation: dep,
        key: dep.message
      });
    }));
  }
};

exports.DeprecationList = DeprecationList;