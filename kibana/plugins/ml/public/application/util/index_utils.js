"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadIndexPatterns = loadIndexPatterns;
exports.loadSavedSearches = loadSavedSearches;
exports.loadSavedSearchById = loadSavedSearchById;
exports.getIndexPatterns = getIndexPatterns;
exports.getIndexPatternsContract = getIndexPatternsContract;
exports.getIndexPatternNames = getIndexPatternNames;
exports.getIndexPatternIdFromName = getIndexPatternIdFromName;
exports.getIndexPatternAndSavedSearch = getIndexPatternAndSavedSearch;
exports.getQueryFromSavedSearch = getQueryFromSavedSearch;
exports.getIndexPatternById = getIndexPatternById;
exports.getSavedSearchById = getSavedSearchById;
exports.timeBasedIndexCheck = timeBasedIndexCheck;

var _i18n = require("@kbn/i18n");

var _dependency_cache = require("./dependency_cache");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var indexPatternCache = [];
var savedSearchesCache = [];
var indexPatternsContract = null;

function loadIndexPatterns(indexPatterns) {
  indexPatternsContract = indexPatterns;
  var savedObjectsClient = (0, _dependency_cache.getSavedObjectsClient)();
  return savedObjectsClient.find({
    type: 'index-pattern',
    fields: ['id', 'title', 'type', 'fields'],
    perPage: 10000
  }).then(function (response) {
    indexPatternCache = response.savedObjects;
    return indexPatternCache;
  });
}

function loadSavedSearches() {
  var savedObjectsClient = (0, _dependency_cache.getSavedObjectsClient)();
  return savedObjectsClient.find({
    type: 'search',
    perPage: 10000
  }).then(function (response) {
    savedSearchesCache = response.savedObjects;
    return savedSearchesCache;
  });
}

function loadSavedSearchById(_x) {
  return _loadSavedSearchById.apply(this, arguments);
}

function _loadSavedSearchById() {
  _loadSavedSearchById = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(id) {
    var savedObjectsClient, ss;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            savedObjectsClient = (0, _dependency_cache.getSavedObjectsClient)();
            _context.next = 3;
            return savedObjectsClient.get('search', id);

          case 3:
            ss = _context.sent;
            return _context.abrupt("return", ss.error === undefined ? ss : null);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadSavedSearchById.apply(this, arguments);
}

function getIndexPatterns() {
  return indexPatternCache;
}

function getIndexPatternsContract() {
  return indexPatternsContract;
}

function getIndexPatternNames() {
  return indexPatternCache.map(function (i) {
    return i.attributes && i.attributes.title;
  });
}

function getIndexPatternIdFromName(name) {
  for (var j = 0; j < indexPatternCache.length; j++) {
    if (indexPatternCache[j].get('title') === name) {
      return indexPatternCache[j].id;
    }
  }

  return null;
}

function getIndexPatternAndSavedSearch(_x2) {
  return _getIndexPatternAndSavedSearch.apply(this, arguments);
}

function _getIndexPatternAndSavedSearch() {
  _getIndexPatternAndSavedSearch = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(savedSearchId) {
    var _ss$references$find;

    var resp, ss, indexPatternId;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            resp = {
              savedSearch: null,
              indexPattern: null
            };

            if (!(savedSearchId === undefined)) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", resp);

          case 3:
            _context2.next = 5;
            return loadSavedSearchById(savedSearchId);

          case 5:
            ss = _context2.sent;

            if (!(ss === null)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt("return", resp);

          case 8:
            indexPatternId = (_ss$references$find = ss.references.find(function (r) {
              return r.type === 'index-pattern';
            })) === null || _ss$references$find === void 0 ? void 0 : _ss$references$find.id;
            _context2.next = 11;
            return getIndexPatternById(indexPatternId);

          case 11:
            resp.indexPattern = _context2.sent;
            resp.savedSearch = ss;
            return _context2.abrupt("return", resp);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getIndexPatternAndSavedSearch.apply(this, arguments);
}

function getQueryFromSavedSearch(savedSearch) {
  var search = savedSearch.attributes.kibanaSavedObjectMeta;
  return JSON.parse(search.searchSourceJSON);
}

function getIndexPatternById(id) {
  if (indexPatternsContract !== null) {
    return indexPatternsContract.get(id);
  } else {
    throw new Error('Index patterns are not initialized!');
  }
}

function getSavedSearchById(id) {
  return savedSearchesCache.find(function (s) {
    return s.id === id;
  });
}
/**
 * Returns true if the index passed in is time based
 * an optional flag will trigger the display a notification at the top of the page
 * warning that the index is not time based
 */


function timeBasedIndexCheck(indexPattern) {
  var showNotification = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!indexPattern.isTimeBased()) {
    if (showNotification) {
      var toastNotifications = (0, _dependency_cache.getToastNotifications)();
      toastNotifications.addWarning({
        title: _i18n.i18n.translate('xpack.ml.indexPatternNotBasedOnTimeSeriesNotificationTitle', {
          defaultMessage: 'The index pattern {indexPatternTitle} is not based on a time series',
          values: {
            indexPatternTitle: indexPattern.title
          }
        }),
        text: _i18n.i18n.translate('xpack.ml.indexPatternNotBasedOnTimeSeriesNotificationDescription', {
          defaultMessage: 'Anomaly detection only runs over time-based indices'
        })
      });
    }

    return false;
  } else {
    return true;
  }
}