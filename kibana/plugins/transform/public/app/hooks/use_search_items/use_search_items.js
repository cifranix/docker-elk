"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchItems = void 0;

var _react = require("react");

var _shared_imports = require("../../../shared_imports");

var _app_dependencies = require("../../app_dependencies");

var _common = require("./common");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useSearchItems = function useSearchItems(defaultSavedObjectId) {
  var _useState = (0, _react.useState)(defaultSavedObjectId),
      _useState2 = _slicedToArray(_useState, 2),
      savedObjectId = _useState2[0],
      setSavedObjectId = _useState2[1];

  var appDeps = (0, _app_dependencies.useAppDependencies)();
  var indexPatterns = appDeps.data.indexPatterns;
  var uiSettings = appDeps.uiSettings;
  var savedObjectsClient = appDeps.savedObjects.client;
  var savedSearches = (0, _shared_imports.createSavedSearchesLoader)({
    savedObjectsClient: savedObjectsClient,
    indexPatterns: indexPatterns,
    chrome: appDeps.chrome,
    overlays: appDeps.overlays
  });

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      searchItems = _useState4[0],
      setSearchItems = _useState4[1];

  function fetchSavedObject(_x) {
    return _fetchSavedObject.apply(this, arguments);
  }

  function _fetchSavedObject() {
    _fetchSavedObject = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(id) {
      var fetchedIndexPattern, fetchedSavedSearch;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _common.loadIndexPatterns)(savedObjectsClient, indexPatterns);

            case 2:
              _context.prev = 2;
              _context.next = 5;
              return (0, _common.loadCurrentIndexPattern)(indexPatterns, id);

            case 5:
              fetchedIndexPattern = _context.sent;
              _context.next = 10;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](2);

            case 10:
              _context.prev = 10;
              _context.next = 13;
              return (0, _common.loadCurrentSavedSearch)(savedSearches, id);

            case 13:
              fetchedSavedSearch = _context.sent;
              _context.next = 18;
              break;

            case 16:
              _context.prev = 16;
              _context.t1 = _context["catch"](10);

            case 18:
              setSearchItems((0, _common.createSearchItems)(fetchedIndexPattern, fetchedSavedSearch, uiSettings));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 8], [10, 16]]);
    }));
    return _fetchSavedObject.apply(this, arguments);
  }

  (0, _react.useEffect)(function () {
    if (savedObjectId !== undefined) {
      fetchSavedObject(savedObjectId);
    } // Run this only when savedObjectId changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [savedObjectId]);
  return {
    getIndexPatternIdByTitle: _common.getIndexPatternIdByTitle,
    loadIndexPatterns: _common.loadIndexPatterns,
    searchItems: searchItems,
    setSavedObjectId: setSavedObjectId
  };
};

exports.useSearchItems = useSearchItems;