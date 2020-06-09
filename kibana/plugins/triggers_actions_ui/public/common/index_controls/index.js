"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstFieldOption = exports.getFields = exports.getIndexOptions = exports.getIndexPatterns = void 0;

var _i18n = require("@kbn/i18n");

var _index_threshold_api = require("../lib/index_threshold_api");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getIndexPatterns =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var indexPatternObjects;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(0, _index_threshold_api.getSavedObjectsClient)()) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return (0, _index_threshold_api.loadIndexPatterns)();

          case 3:
            indexPatternObjects = _context.sent;
            return _context.abrupt("return", indexPatternObjects.map(function (indexPattern) {
              return indexPattern.attributes.title;
            }));

          case 5:
            return _context.abrupt("return", []);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getIndexPatterns() {
    return _ref.apply(this, arguments);
  };
}();

exports.getIndexPatterns = getIndexPatterns;

var getIndexOptions =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(http, pattern, indexPatternsParam) {
    var options, matchingIndices, matchingIndexPatterns, matchingOptions;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = [];

            if (pattern) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", options);

          case 3:
            _context2.next = 5;
            return (0, _index_threshold_api.getMatchingIndicesForThresholdAlertType)({
              pattern: pattern,
              http: http
            });

          case 5:
            matchingIndices = _context2.sent;
            matchingIndexPatterns = indexPatternsParam.filter(function (anIndexPattern) {
              return anIndexPattern.includes(pattern);
            });

            if (matchingIndices.length || matchingIndexPatterns.length) {
              matchingOptions = _.uniq([].concat(_toConsumableArray(matchingIndices), _toConsumableArray(matchingIndexPatterns)));
              options.push({
                label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.indicesAndIndexPatternsLabel', {
                  defaultMessage: 'Based on your index patterns'
                }),
                options: matchingOptions.map(function (match) {
                  return {
                    label: match,
                    value: match
                  };
                })
              });
            }

            options.push({
              label: _i18n.i18n.translate('xpack.triggersActionsUI.components.builtinActionTypes.indexAction.chooseLabel', {
                defaultMessage: 'Choose…'
              }),
              options: [{
                value: pattern,
                label: pattern
              }]
            });
            return _context2.abrupt("return", options);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getIndexOptions(_x, _x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getIndexOptions = getIndexOptions;

var getFields =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(http, indexes) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _index_threshold_api.getThresholdAlertTypeFields)({
              indexes: indexes,
              http: http
            });

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getFields(_x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getFields = getFields;
var firstFieldOption = {
  text: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertAdd.threshold.timeFieldOptionLabel', {
    defaultMessage: 'Select a field'
  }),
  value: ''
};
exports.firstFieldOption = firstFieldOption;