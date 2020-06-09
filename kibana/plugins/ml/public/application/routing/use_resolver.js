"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResolver = void 0;

var _react = require("react");

var _index_utils = require("../util/index_utils");

var _new_job_utils = require("../jobs/new_job/utils/new_job_utils");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useResolver = function useResolver(indexPatternId, savedSearchId, config, resolvers) {
  var funcNames = Object.keys(resolvers); // Object.entries gets this wrong?!

  var funcs = Object.values(resolvers); // Object.entries gets this wrong?!

  var tempResults = funcNames.reduce(function (p, c) {
    p[c] = {};
    return p;
  }, {});

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      context = _useState2[0],
      setContext = _useState2[1];

  var _useState3 = (0, _react.useState)(tempResults),
      _useState4 = _slicedToArray(_useState3, 2),
      results = _useState4[0],
      setResults = _useState4[1];

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res, _ref2, indexPattern, savedSearch, _createSearchItems, combinedQuery;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return Promise.all(funcs.map(function (r) {
                return r();
              }));

            case 3:
              res = _context.sent;
              res.forEach(function (r, i) {
                return tempResults[funcNames[i]] = r;
              });
              setResults(tempResults);

              if (!(indexPatternId !== undefined || savedSearchId !== undefined)) {
                _context.next = 24;
                break;
              }

              if (!(savedSearchId !== undefined)) {
                _context.next = 13;
                break;
              }

              _context.next = 10;
              return (0, _index_utils.getIndexPatternAndSavedSearch)(savedSearchId);

            case 10:
              _context.t0 = _context.sent;
              _context.next = 17;
              break;

            case 13:
              _context.next = 15;
              return (0, _index_utils.getIndexPatternById)(indexPatternId);

            case 15:
              _context.t1 = _context.sent;
              _context.t0 = {
                savedSearch: null,
                indexPattern: _context.t1
              };

            case 17:
              _ref2 = _context.t0;
              indexPattern = _ref2.indexPattern;
              savedSearch = _ref2.savedSearch;
              _createSearchItems = (0, _new_job_utils.createSearchItems)(config, indexPattern, savedSearch), combinedQuery = _createSearchItems.combinedQuery;
              setContext({
                combinedQuery: combinedQuery,
                currentIndexPattern: indexPattern,
                currentSavedSearch: savedSearch,
                indexPatterns: (0, _index_utils.getIndexPatternsContract)(),
                kibanaConfig: config
              });
              _context.next = 25;
              break;

            case 24:
              setContext({});

            case 25:
              _context.next = 29;
              break;

            case 27:
              _context.prev = 27;
              _context.t2 = _context["catch"](0);

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 27]]);
    }))();
  }, []);
  return {
    context: context,
    results: results
  };
};

exports.useResolver = useResolver;