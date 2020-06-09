"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwIfAbsent = throwIfAbsent;
exports.throwIfIsntContained = throwIfIsntContained;

var _lodash = require("lodash");

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
function throwIfAbsent(message) {
  return function (value) {
    if (value === undefined || value === null) {
      throw new Error(message);
    }

    return value;
  };
}

function throwIfIsntContained(requiredValues, message, valueExtractor) {
  var toError = typeof message === 'function' ? message : (0, _lodash.constant)(message);
  return function (values) {
    var availableValues = new Set(values.map(valueExtractor));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = requiredValues.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _value = _step.value;

        if (!availableValues.has(_value)) {
          throw new Error(toError(_value));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return values;
  };
}