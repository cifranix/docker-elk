"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFormatter = exports.FORMATTERS = void 0;

var _mustache = _interopRequireDefault(require("mustache"));

var _lib = require("../../lib/lib");

var _bytes = require("./bytes");

var _number = require("./number");

var _percent = require("./percent");

var _high_precision = require("./high_precision");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var FORMATTERS = {
  number: _number.formatNumber,
  // Because the implimentation for formatting large numbers is the same as formatting
  // bytes we are re-using the same code, we just format the number using the abbreviated number format.
  abbreviatedNumber: (0, _bytes.createBytesFormatter)(_lib.InfraWaffleMapDataFormat.abbreviatedNumber),
  // bytes in bytes formatted string out
  bytes: (0, _bytes.createBytesFormatter)(_lib.InfraWaffleMapDataFormat.bytesDecimal),
  // bytes in bits formatted string out
  bits: (0, _bytes.createBytesFormatter)(_lib.InfraWaffleMapDataFormat.bitsDecimal),
  percent: _percent.formatPercent,
  highPercision: _high_precision.formatHighPercision
};
exports.FORMATTERS = FORMATTERS;

var createFormatter = function createFormatter(format) {
  var template = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '{{value}}';
  return function (val) {
    if (val == null) {
      return '';
    }

    var fmtFn = FORMATTERS[format];
    var value = fmtFn(Number(val));
    return _mustache.default.render(template, {
      value: value
    });
  };
};

exports.createFormatter = createFormatter;