"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupGetValueSuggestions = void 0;

var _lodash = require("lodash");

var _escape_kuery = require("./lib/escape_kuery");

var _services = require("../../../services");

var _public = require("../../../../../../../src/plugins/data/public");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var wrapAsSuggestions = function wrapAsSuggestions(start, end, query, values) {
  return values.filter(function (value) {
    return value.toLowerCase().includes(query.toLowerCase());
  }).map(function (value) {
    return {
      type: _public.QuerySuggestionTypes.Value,
      text: "".concat(value, " "),
      start: start,
      end: end
    };
  });
};

var setupGetValueSuggestions = function setupGetValueSuggestions(core) {
  return (
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref2, _ref3) {
        var indexPatterns, boolFilter, signal, start, end, prefix, suffix, fieldName, nestedPath, allFields, fullFieldName, fields, query, _getAutocompleteServi, getValueSuggestions, data;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                indexPatterns = _ref2.indexPatterns, boolFilter = _ref2.boolFilter, signal = _ref2.signal;
                start = _ref3.start, end = _ref3.end, prefix = _ref3.prefix, suffix = _ref3.suffix, fieldName = _ref3.fieldName, nestedPath = _ref3.nestedPath;
                allFields = (0, _lodash.flatten)(indexPatterns.map(function (indexPattern) {
                  return indexPattern.fields.map(function (field) {
                    return _objectSpread({}, field, {
                      indexPattern: indexPattern
                    });
                  });
                }));
                fullFieldName = nestedPath ? "".concat(nestedPath, ".").concat(fieldName) : fieldName;
                fields = allFields.filter(function (field) {
                  return field.name === fullFieldName;
                });
                query = "".concat(prefix).concat(suffix).trim();
                _getAutocompleteServi = (0, _services.getAutocompleteService)(), getValueSuggestions = _getAutocompleteServi.getValueSuggestions;
                _context.next = 9;
                return Promise.all(fields.map(function (field) {
                  return getValueSuggestions({
                    indexPattern: field.indexPattern,
                    field: field,
                    query: query,
                    boolFilter: boolFilter,
                    signal: signal
                  }).then(function (valueSuggestions) {
                    var quotedValues = valueSuggestions.map(function (value) {
                      return typeof value === 'string' ? "\"".concat((0, _escape_kuery.escapeQuotes)(value), "\"") : "".concat(value);
                    });
                    return wrapAsSuggestions(start, end, query, quotedValues);
                  });
                }));

              case 9:
                data = _context.sent;
                return _context.abrupt("return", (0, _lodash.flatten)(data));

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }()
  );
};

exports.setupGetValueSuggestions = setupGetValueSuggestions;