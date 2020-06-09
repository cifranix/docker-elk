"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeFieldOptions = exports.getTimeOptions = void 0;

var _get_time_unit_label = require("./get_time_unit_label");

var _constants = require("../constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getTimeOptions = function getTimeOptions(unitSize) {
  return Object.entries(_constants.TIME_UNITS).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        _key = _ref2[0],
        value = _ref2[1];

    return {
      text: (0, _get_time_unit_label.getTimeUnitLabel)(value, unitSize),
      value: value
    };
  });
};

exports.getTimeOptions = getTimeOptions;

var getTimeFieldOptions = function getTimeFieldOptions(fields) {
  var options = [];
  fields.forEach(function (field) {
    if (field.type === 'date') {
      options.push({
        text: field.name,
        value: field.name
      });
    }
  });
  return options;
};

exports.getTimeFieldOptions = getTimeFieldOptions;