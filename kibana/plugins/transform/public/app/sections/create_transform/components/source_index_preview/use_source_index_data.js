"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSourceIndexData = exports.SOURCE_INDEX_STATUS = void 0;

var _react = require("react");

var _common = require("../../../../common");

var _use_api = require("../../../../hooks/use_api");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SOURCE_INDEX_STATUS;
exports.SOURCE_INDEX_STATUS = SOURCE_INDEX_STATUS;

(function (SOURCE_INDEX_STATUS) {
  SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["UNUSED"] = 0] = "UNUSED";
  SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["LOADING"] = 1] = "LOADING";
  SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["LOADED"] = 2] = "LOADED";
  SOURCE_INDEX_STATUS[SOURCE_INDEX_STATUS["ERROR"] = 3] = "ERROR";
})(SOURCE_INDEX_STATUS || (exports.SOURCE_INDEX_STATUS = SOURCE_INDEX_STATUS = {}));

var isErrorResponse = function isErrorResponse(arg) {
  var _arg$body, _arg$body2;

  return (arg === null || arg === void 0 ? void 0 : (_arg$body = arg.body) === null || _arg$body === void 0 ? void 0 : _arg$body.error) !== undefined && (arg === null || arg === void 0 ? void 0 : (_arg$body2 = arg.body) === null || _arg$body2 === void 0 ? void 0 : _arg$body2.message) !== undefined;
}; // The types specified in `@types/elasticsearch` are out of date and still have `total: number`.


var defaultPagination = {
  pageIndex: 0,
  pageSize: 5
};

var useSourceIndexData = function useSourceIndexData(indexPattern, query) {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      errorMessage = _useState2[0],
      setErrorMessage = _useState2[1];

  var _useState3 = (0, _react.useState)(SOURCE_INDEX_STATUS.UNUSED),
      _useState4 = _slicedToArray(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = (0, _react.useState)(defaultPagination),
      _useState6 = _slicedToArray(_useState5, 2),
      pagination = _useState6[0],
      setPagination = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      sortingColumns = _useState8[0],
      setSortingColumns = _useState8[1];

  var _useState9 = (0, _react.useState)(0),
      _useState10 = _slicedToArray(_useState9, 2),
      rowCount = _useState10[0],
      setRowCount = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      tableItems = _useState12[0],
      setTableItems = _useState12[1];

  var api = (0, _use_api.useApi)();
  (0, _react.useEffect)(function () {
    setPagination(defaultPagination);
  }, [query]);

  var getSourceIndexData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var sort, esSearchRequest, resp, docs;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setErrorMessage('');
              setStatus(SOURCE_INDEX_STATUS.LOADING);
              sort = sortingColumns.reduce(function (s, column) {
                s[column.id] = {
                  order: column.direction
                };
                return s;
              }, {});
              esSearchRequest = {
                index: indexPattern.title,
                body: _objectSpread({
                  // Instead of using the default query (`*`), fall back to a more efficient `match_all` query.
                  query: (0, _common.isDefaultQuery)(query) ? _common.matchAllQuery : query,
                  from: pagination.pageIndex * pagination.pageSize,
                  size: pagination.pageSize
                }, Object.keys(sort).length > 0 ? {
                  sort: sort
                } : {})
              };
              _context.prev = 4;
              _context.next = 7;
              return api.esSearch(esSearchRequest);

            case 7:
              resp = _context.sent;
              docs = resp.hits.hits.map(function (d) {
                return d._source;
              });
              setRowCount(resp.hits.total.value);
              setTableItems(docs);
              setStatus(SOURCE_INDEX_STATUS.LOADED);
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](4);

              if (isErrorResponse(_context.t0)) {
                setErrorMessage("".concat(_context.t0.body.error, ": ").concat(_context.t0.body.message));
              } else {
                setErrorMessage(JSON.stringify(_context.t0, null, 2));
              }

              setStatus(SOURCE_INDEX_STATUS.ERROR);

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 14]]);
    }));

    return function getSourceIndexData() {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    getSourceIndexData(); // custom comparison
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexPattern.title, JSON.stringify([query, pagination, sortingColumns])]);
  return {
    errorMessage: errorMessage,
    pagination: pagination,
    setPagination: setPagination,
    setSortingColumns: setSortingColumns,
    rowCount: rowCount,
    sortingColumns: sortingColumns,
    status: status,
    tableItems: tableItems
  };
};

exports.useSourceIndexData = useSourceIndexData;