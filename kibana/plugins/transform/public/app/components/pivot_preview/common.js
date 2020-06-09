"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPivotPreviewDevConsoleStatement = exports.multiColumnSortFactory = void 0;

var _object_utils = require("../../../../common/utils/object_utils");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

/**
 * Helper to sort an array of objects based on an EuiDataGrid sorting configuration.
 * `sortFn()` is recursive to support sorting on multiple columns.
 *
 * @param sortingColumns - The EUI data grid sorting configuration
 * @returns The sorting function which can be used with an array's sort() function.
 */
var multiColumnSortFactory = function multiColumnSortFactory(sortingColumns) {
  var isString = function isString(arg) {
    return typeof arg === 'string';
  };

  var sortFn = function sortFn(a, b) {
    var sortingColumnIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var sort = sortingColumns[sortingColumnIndex];
    var aValue = (0, _object_utils.getNestedProperty)(a, sort.id, null);
    var bValue = (0, _object_utils.getNestedProperty)(b, sort.id, null);

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      if (aValue < bValue) {
        return sort.direction === 'asc' ? -1 : 1;
      }

      if (aValue > bValue) {
        return sort.direction === 'asc' ? 1 : -1;
      }
    }

    if (isString(aValue) && isString(bValue)) {
      if (aValue.localeCompare(bValue) === -1) {
        return sort.direction === 'asc' ? -1 : 1;
      }

      if (aValue.localeCompare(bValue) === 1) {
        return sort.direction === 'asc' ? 1 : -1;
      }
    }

    if (sortingColumnIndex + 1 < sortingColumns.length) {
      return sortFn(a, b, sortingColumnIndex + 1);
    }

    return 0;
  };

  return sortFn;
};

exports.multiColumnSortFactory = multiColumnSortFactory;

var getPivotPreviewDevConsoleStatement = function getPivotPreviewDevConsoleStatement(request) {
  return "POST _transform/_preview\n".concat(JSON.stringify(request, null, 2), "\n");
};

exports.getPivotPreviewDevConsoleStatement = getPivotPreviewDevConsoleStatement;