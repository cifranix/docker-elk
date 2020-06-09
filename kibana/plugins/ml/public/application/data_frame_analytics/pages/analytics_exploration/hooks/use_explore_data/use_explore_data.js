"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useExploreData = void 0;

var _react = require("react");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _new_job_capabilities_service = require("../../../../../services/new_job_capabilities_service");

var _index_utils = require("../../../../../util/index_utils");

var _object_utils = require("../../../../../util/object_utils");

var _ml = require("../../../../../contexts/ml");

var _get_analytics = require("../../../analytics_management/services/analytics_service/get_analytics");

var _common = require("../../../../common");

var _fields = require("../../../../common/fields");

var _common2 = require("./common");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useExploreData = function useExploreData(jobId) {
  var mlContext = (0, _ml.useMlContext)();

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      indexPattern = _useState2[0],
      setIndexPattern = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      jobConfig = _useState4[0],
      setJobConfig = _useState4[1];

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      jobStatus = _useState6[0],
      setJobStatus = _useState6[1];

  var _useState7 = (0, _react.useState)(''),
      _useState8 = _slicedToArray(_useState7, 2),
      errorMessage = _useState8[0],
      setErrorMessage = _useState8[1];

  var _useState9 = (0, _react.useState)(_common.INDEX_STATUS.UNUSED),
      _useState10 = _slicedToArray(_useState9, 2),
      status = _useState10[0],
      setStatus = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      selectedFields = _useState12[0],
      setSelectedFields = _useState12[1];

  var _useState13 = (0, _react.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      tableFields = _useState14[0],
      setTableFields = _useState14[1];

  var _useState15 = (0, _react.useState)([]),
      _useState16 = _slicedToArray(_useState15, 2),
      tableItems = _useState16[0],
      setTableItems = _useState16[1];

  var _useState17 = (0, _react.useState)(0),
      _useState18 = _slicedToArray(_useState17, 2),
      rowCount = _useState18[0],
      setRowCount = _useState18[1];

  var _useState19 = (0, _react.useState)({
    pageIndex: 0,
    pageSize: 25
  }),
      _useState20 = _slicedToArray(_useState19, 2),
      pagination = _useState20[0],
      setPagination = _useState20[1];

  var _useState21 = (0, _react.useState)(_common.defaultSearchQuery),
      _useState22 = _slicedToArray(_useState21, 2),
      searchQuery = _useState22[0],
      setSearchQuery = _useState22[1];

  var _useState23 = (0, _react.useState)([]),
      _useState24 = _slicedToArray(_useState23, 2),
      sortingColumns = _useState24[0],
      setSortingColumns = _useState24[1]; // get analytics configuration


  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var analyticsConfigs, analyticsStats, stats;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _ml_api_service.ml.dataFrameAnalytics.getDataFrameAnalytics(jobId);

            case 2:
              analyticsConfigs = _context.sent;
              _context.next = 5;
              return _ml_api_service.ml.dataFrameAnalytics.getDataFrameAnalyticsStats(jobId);

            case 5:
              analyticsStats = _context.sent;
              stats = (0, _get_analytics.isGetDataFrameAnalyticsStatsResponseOk)(analyticsStats) ? analyticsStats.data_frame_analytics[0] : undefined;

              if (stats !== undefined && stats.state) {
                setJobStatus(stats.state);
              }

              if (Array.isArray(analyticsConfigs.data_frame_analytics) && analyticsConfigs.data_frame_analytics.length > 0) {
                setJobConfig(analyticsConfigs.data_frame_analytics[0]);
              }

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  }, []); // get index pattern and field caps

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var destIndex, destIndexPatternId, indexP, sourceIndex, sourceIndexPatternId;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(jobConfig !== undefined)) {
                _context2.next = 28;
                break;
              }

              _context2.prev = 1;
              destIndex = Array.isArray(jobConfig.dest.index) ? jobConfig.dest.index[0] : jobConfig.dest.index;
              destIndexPatternId = (0, _index_utils.getIndexPatternIdFromName)(destIndex) || destIndex;
              _context2.prev = 4;
              _context2.next = 7;
              return mlContext.indexPatterns.get(destIndexPatternId);

            case 7:
              indexP = _context2.sent;
              _context2.next = 13;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](4);
              indexP = undefined;

            case 13:
              if (!(indexP === undefined)) {
                _context2.next = 19;
                break;
              }

              sourceIndex = jobConfig.source.index[0];
              sourceIndexPatternId = (0, _index_utils.getIndexPatternIdFromName)(sourceIndex) || sourceIndex;
              _context2.next = 18;
              return mlContext.indexPatterns.get(sourceIndexPatternId);

            case 18:
              indexP = _context2.sent;

            case 19:
              if (!(indexP !== undefined)) {
                _context2.next = 23;
                break;
              }

              setIndexPattern(indexP);
              _context2.next = 23;
              return _new_job_capabilities_service.newJobCapsService.initializeFromIndexPattern(indexP, false, false);

            case 23:
              _context2.next = 28;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t1 = _context2["catch"](1);
              // eslint-disable-next-line
              console.log('Error loading index field data', _context2.t1);

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[1, 25], [4, 10]]);
    }))();
  }, [jobConfig && jobConfig.id]); // initialize sorting: reverse sort on outlier score column

  (0, _react.useEffect)(function () {
    if (jobConfig !== undefined) {
      setSortingColumns([{
        id: (0, _common2.getOutlierScoreFieldName)(jobConfig),
        direction: 'desc'
      }]);
    }
  }, [jobConfig && jobConfig.id]); // update data grid data

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var resultsField, sort, pageIndex, pageSize, resp, docs, newSelectedFields, flattenedFields, transformedTableItems;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(jobConfig !== undefined)) {
                _context3.next = 29;
                break;
              }

              setErrorMessage('');
              setStatus(_common.INDEX_STATUS.LOADING);
              _context3.prev = 3;
              resultsField = jobConfig.dest.results_field;
              sort = sortingColumns.map(function (column) {
                var id = column.id;
                column.id = (0, _fields.isKeywordAndTextType)(id) ? "".concat(id, ".keyword") : id;
                return column;
              }).reduce(function (s, column) {
                s[column.id] = {
                  order: column.direction
                };
                return s;
              }, {});
              pageIndex = pagination.pageIndex, pageSize = pagination.pageSize;
              _context3.next = 9;
              return _ml_api_service.ml.esSearch({
                index: jobConfig.dest.index,
                body: _objectSpread({
                  query: searchQuery,
                  from: pageIndex * pageSize,
                  size: pageSize
                }, Object.keys(sort).length > 0 ? {
                  sort: sort
                } : {})
              });

            case 9:
              resp = _context3.sent;
              setRowCount(resp.hits.total.value);
              docs = resp.hits.hits;

              if (!(docs.length === 0)) {
                _context3.next = 16;
                break;
              }

              setTableItems([]);
              setStatus(_common.INDEX_STATUS.LOADED);
              return _context3.abrupt("return");

            case 16:
              if (selectedFields.length === 0) {
                newSelectedFields = (0, _common.getDefaultSelectableFields)(docs, resultsField);
                setSelectedFields(newSelectedFields.sort().splice(0, _common.MAX_COLUMNS));
              } // Create a version of the doc's source with flattened field names.
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
              setTableFields(flattenedFields);
              setTableItems(transformedTableItems);
              setStatus(_common.INDEX_STATUS.LOADED);
              _context3.next = 29;
              break;

            case 24:
              _context3.prev = 24;
              _context3.t0 = _context3["catch"](3);

              if (_context3.t0.message !== undefined) {
                setErrorMessage(_context3.t0.message);
              } else {
                setErrorMessage(JSON.stringify(_context3.t0));
              }

              setTableItems([]);
              setStatus(_common.INDEX_STATUS.ERROR);

            case 29:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[3, 24]]);
    }))();
  }, [jobConfig && jobConfig.id, pagination, searchQuery, selectedFields, sortingColumns]);
  return {
    errorMessage: errorMessage,
    indexPattern: indexPattern,
    jobConfig: jobConfig,
    jobStatus: jobStatus,
    pagination: pagination,
    rowCount: rowCount,
    searchQuery: searchQuery,
    selectedFields: selectedFields,
    setJobConfig: setJobConfig,
    setPagination: setPagination,
    setSearchQuery: setSearchQuery,
    setSelectedFields: setSelectedFields,
    setSortingColumns: setSortingColumns,
    sortingColumns: sortingColumns,
    status: status,
    tableFields: tableFields,
    tableItems: tableItems
  };
};

exports.useExploreData = useExploreData;