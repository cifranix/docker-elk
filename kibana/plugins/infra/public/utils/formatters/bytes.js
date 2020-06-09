"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBytesFormatter = void 0;

var _lib = require("../../lib/lib");

var _number = require("./number");

var _LABELS, _BASES;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The labels are derived from these two Wikipedia articles.
 * https://en.wikipedia.org/wiki/Kilobit
 * https://en.wikipedia.org/wiki/Kilobyte
 */
var LABELS = (_LABELS = {}, _defineProperty(_LABELS, _lib.InfraWaffleMapDataFormat.bytesDecimal, ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']), _defineProperty(_LABELS, _lib.InfraWaffleMapDataFormat.bitsDecimal, ['bit', 'kbit', 'Mbit', 'Gbit', 'Tbit', 'Pbit', 'Ebit', 'Zbit', 'Ybit']), _defineProperty(_LABELS, _lib.InfraWaffleMapDataFormat.abbreviatedNumber, ['', 'K', 'M', 'B', 'T']), _LABELS);
var BASES = (_BASES = {}, _defineProperty(_BASES, _lib.InfraWaffleMapDataFormat.bytesDecimal, 1000), _defineProperty(_BASES, _lib.InfraWaffleMapDataFormat.bitsDecimal, 1000), _defineProperty(_BASES, _lib.InfraWaffleMapDataFormat.abbreviatedNumber, 1000), _BASES);
/*
 * This formatter always assumes you're input is bytes and the output is a string
 * in whatever format you've defined. Bytes in Format Out.
 */

var createBytesFormatter = function createBytesFormatter(format) {
  return function (bytes) {
    var labels = LABELS[format];
    var base = BASES[format];
    var value = format === _lib.InfraWaffleMapDataFormat.bitsDecimal ? bytes * 8 : bytes; // Use an exponetial equation to get the power to determine which label to use. If the power
    // is greater then the max label then use the max label.

    var power = Math.min(Math.floor(Math.log(Math.abs(value)) / Math.log(base)), labels.length - 1);

    if (power < 0) {
      return "".concat((0, _number.formatNumber)(value)).concat(labels[0]);
    }

    return "".concat((0, _number.formatNumber)(value / Math.pow(base, power))).concat(labels[power]);
  };
};

exports.createBytesFormatter = createBytesFormatter;