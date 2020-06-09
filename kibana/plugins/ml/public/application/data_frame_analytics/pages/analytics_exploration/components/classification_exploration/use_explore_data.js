"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExploreData = void 0;

var _react = require("react");

var _lodash = require("lodash");

var _ml_in_memory_table = require("../../../../../components/ml_in_memory_table");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _object_utils = require("../../../../../util/object_utils");

var _new_job_capabilities_service = require("../../../../../services/new_job_capabilities_service");

var _analytics = require("../../../../common/analytics");

var _common = require("../../../../common");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useExploreData = function useExploreData(jobConfig, needsDestIndexFields, selectedFields, setSelectedFields, setDocFields, setDepVarType) {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      errorMessage = _useState2[0],
      setErrorMessage = _useState2[1];

  var _useState3 = (0, _react.useState)(_common.INDEX_STATUS.UNUSED),
      _useState4 = _slicedToArray(_useState3, 2),
      status = _useState4[0],
      setStatus = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      tableItems = _useState6[0],
      setTableItems = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = _slicedToArray(_useState7, 2),
      sortField = _useState8[0],
      setSortField = _useState8[1];

  var _useState9 = (0, _react.useState)(_ml_in_memory_table.SORT_DIRECTION.ASC),
      _useState10 = _slicedToArray(_useState9, 2),
      sortDirection = _useState10[0],
      setSortDirection = _useState10[1];

  var getDefaultSelectedFields = function getDefaultSelectedFields() {
    var fields = _new_job_capabilities_service.newJobCapsService.fields;

    if (selectedFields.length === 0 && jobConfig !== undefined) {
      var _getDefaultFieldsFrom = (0, _common.getDefaultFieldsFromJobCaps)(fields, jobConfig, needsDestIndexFields),
          defaultSelected = _getDefaultFieldsFrom.selectedFields,
          docFields = _getDefaultFieldsFrom.docFields,
          depVarType = _getDefaultFieldsFrom.depVarType;

      setDepVarType(depVarType);
      setSelectedFields(defaultSelected);
      setDocFields(docFields);
    }
  };

  var loadExploreData =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(_ref2) {
      var field, direction, searchQuery, requiresKeyword, resultsField, searchQueryClone, query, body, resp, docs, flattenedFields, transformedTableItems;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              field = _ref2.field, direction = _ref2.direction, searchQuery = _ref2.searchQuery, requiresKeyword = _ref2.requiresKeyword;

              if (!(jobConfig !== undefined)) {
                _context.next = 31;
                break;
              }

              setErrorMessage('');
              setStatus(_common.INDEX_STATUS.LOADING);
              _context.prev = 4;
              resultsField = jobConfig.dest.results_field;
              searchQueryClone = (0, _lodash.cloneDeep)(searchQuery);

              if (JSON.stringify(searchQuery) === JSON.stringify(_analytics.defaultSearchQuery)) {
                query = {
                  exists: {
                    field: resultsField
                  }
                };
              } else if ((0, _analytics.isResultsSearchBoolQuery)(searchQueryClone)) {
                if (searchQueryClone.bool.must === undefined) {
                  searchQueryClone.bool.must = [];
                }

                searchQueryClone.bool.must.push({
                  exists: {
                    field: resultsField
                  }
                });
                query = searchQueryClone;
              } else {
                query = searchQueryClone;
              }

              body = {
                query: query
              };

              if (field !== undefined) {
                body.sort = [_defineProperty({}, "".concat(field).concat(requiresKeyword ? '.keyword' : ''), {
                  order: direction
                })];
              }

              _context.next = 12;
              return _ml_api_service.ml.esSearch({
                index: jobConfig.dest.index,
                size: _common.SEARCH_SIZE,
                body: body
              });

            case 12:
              resp = _context.sent;
              setSortField(field);
              setSortDirection(direction);
              docs = resp.hits.hits;

              if (!(docs.length === 0)) {
                _context.next = 20;
                break;
              }

              setTableItems([]);
              setStatus(_common.INDEX_STATUS.LOADED);
              return _context.abrupt("return");

            case 20:
              // Create a version of the doc's source with flattened field names.
              // This avoids confusion later on if a field name has dots in its name
              // or is a nested fields when displaying it via EuiInMemoryTable.
              flattenedFields = (0, _common.getFlattenedFields)(docs[0]._source, resultsField);
              transformedTableItems = docs.map(function (doc) {
                var item = {};
                flattenedFields.forEach(function (ff) {
                  item[ff] = (0, _object_utils.getNestedProperty)(doc._source, ff);

                  if (item[ff] === undefined) {
                    // If the attribute is undefined, it means it was not a nested property
                    // but had dots in its actual name. This selects the property by its
                    // full name and assigns it to `item[ff]`.
                    item[ff] = doc._source["\"".concat(ff, "\"")];
                  }

                  if (item[ff] === undefined) {
                    var parts = ff.split('.');

                    if (parts[0] === resultsField && parts.length >= 2) {
                      parts.shift();

                      if (doc._source[resultsField] !== undefined) {
                        item[ff] = doc._source[resultsField][parts.join('.')];
                      }
                    }
                  }
                });
                return item;
              });
              setTableItems(transformedTableItems);
              setStatus(_common.INDEX_STATUS.LOADED);
              _context.next = 31;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](4);

              if (_context.t0.message !== undefined) {
                setErrorMessage(_context.t0.message);
              } else {
                setErrorMessage(JSON.stringify(_context.t0));
              }

              setTableItems([]);
              setStatus(_common.INDEX_STATUS.ERROR);

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 26]]);
    }));

    return function loadExploreData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    if (jobConfig !== undefined) {
      getDefaultSelectedFields();
    }
  }, [jobConfig && jobConfig.id]);
  return {
    errorMessage: errorMessage,
    loadExploreData: loadExploreData,
    sortField: sortField,
    sortDirection: sortDirection,
    status: status,
    tableItems: tableItems
  };
};

exports.useExploreData = useExploreData;