"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLogEntryCategoriesResults = void 0;

var _react = require("react");

var _use_tracked_promise = require("../../../utils/use_tracked_promise");

var _get_top_log_entry_categories = require("./service_calls/get_top_log_entry_categories");

var _get_log_entry_category_datasets = require("./service_calls/get_log_entry_category_datasets");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogEntryCategoriesResults = function useLogEntryCategoriesResults(_ref) {
  var categoriesCount = _ref.categoriesCount,
      filteredDatasets = _ref.filteredDatasets,
      endTime = _ref.endTime,
      onGetLogEntryCategoryDatasetsError = _ref.onGetLogEntryCategoryDatasetsError,
      onGetTopLogEntryCategoriesError = _ref.onGetTopLogEntryCategoriesError,
      sourceId = _ref.sourceId,
      startTime = _ref.startTime;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      topLogEntryCategories = _useState2[0],
      setTopLogEntryCategories = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      logEntryCategoryDatasets = _useState4[0],
      setLogEntryCategoryDatasets = _useState4[1];

  var _useTrackedPromise = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'creation',
    createPromise: function () {
      var _createPromise = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _get_top_log_entry_categories.callGetTopLogEntryCategoriesAPI)(sourceId, startTime, endTime, categoriesCount, filteredDatasets);

              case 2:
                return _context.abrupt("return", _context.sent);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function createPromise() {
        return _createPromise.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(_ref2) {
      var categories = _ref2.data.categories;
      setTopLogEntryCategories(categories);
    },
    onReject: function onReject(error) {
      if (error instanceof Error && !(error instanceof _use_tracked_promise.CanceledPromiseError) && onGetTopLogEntryCategoriesError) {
        onGetTopLogEntryCategoriesError(error);
      }
    }
  }, [categoriesCount, endTime, filteredDatasets, sourceId, startTime]),
      _useTrackedPromise2 = _slicedToArray(_useTrackedPromise, 2),
      getTopLogEntryCategoriesRequest = _useTrackedPromise2[0],
      getTopLogEntryCategories = _useTrackedPromise2[1];

  var _useTrackedPromise3 = (0, _use_tracked_promise.useTrackedPromise)({
    cancelPreviousOn: 'creation',
    createPromise: function () {
      var _createPromise2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _get_log_entry_category_datasets.callGetLogEntryCategoryDatasetsAPI)(sourceId, startTime, endTime);

              case 2:
                return _context2.abrupt("return", _context2.sent);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createPromise() {
        return _createPromise2.apply(this, arguments);
      }

      return createPromise;
    }(),
    onResolve: function onResolve(_ref3) {
      var datasets = _ref3.data.datasets;
      setLogEntryCategoryDatasets(datasets);
    },
    onReject: function onReject(error) {
      if (error instanceof Error && !(error instanceof _use_tracked_promise.CanceledPromiseError) && onGetLogEntryCategoryDatasetsError) {
        onGetLogEntryCategoryDatasetsError(error);
      }
    }
  }, [categoriesCount, endTime, sourceId, startTime]),
      _useTrackedPromise4 = _slicedToArray(_useTrackedPromise3, 2),
      getLogEntryCategoryDatasetsRequest = _useTrackedPromise4[0],
      getLogEntryCategoryDatasets = _useTrackedPromise4[1];

  var isLoadingTopLogEntryCategories = (0, _react.useMemo)(function () {
    return getTopLogEntryCategoriesRequest.state === 'pending';
  }, [getTopLogEntryCategoriesRequest.state]);
  var isLoadingLogEntryCategoryDatasets = (0, _react.useMemo)(function () {
    return getLogEntryCategoryDatasetsRequest.state === 'pending';
  }, [getLogEntryCategoryDatasetsRequest.state]);
  var isLoading = (0, _react.useMemo)(function () {
    return isLoadingTopLogEntryCategories || isLoadingLogEntryCategoryDatasets;
  }, [isLoadingLogEntryCategoryDatasets, isLoadingTopLogEntryCategories]);
  return {
    getLogEntryCategoryDatasets: getLogEntryCategoryDatasets,
    getTopLogEntryCategories: getTopLogEntryCategories,
    isLoading: isLoading,
    isLoadingLogEntryCategoryDatasets: isLoadingLogEntryCategoryDatasets,
    isLoadingTopLogEntryCategories: isLoadingTopLogEntryCategories,
    logEntryCategoryDatasets: logEntryCategoryDatasets,
    topLogEntryCategories: topLogEntryCategories
  };
};

exports.useLogEntryCategoriesResults = useLogEntryCategoriesResults;