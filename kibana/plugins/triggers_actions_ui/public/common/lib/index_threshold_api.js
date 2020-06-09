"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMatchingIndicesForThresholdAlertType = getMatchingIndicesForThresholdAlertType;
exports.getThresholdAlertTypeFields = getThresholdAlertTypeFields;
exports.getThresholdAlertVisualizationData = getThresholdAlertVisualizationData;
exports.loadIndexPatterns = exports.getSavedObjectsClient = exports.setSavedObjectsClient = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var INDEX_THRESHOLD_API_ROOT = '/api/alerting_builtins/index_threshold';

function getMatchingIndicesForThresholdAlertType(_x) {
  return _getMatchingIndicesForThresholdAlertType.apply(this, arguments);
}

function _getMatchingIndicesForThresholdAlertType() {
  _getMatchingIndicesForThresholdAlertType = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref3) {
    var pattern, http, _ref4, indices;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            pattern = _ref3.pattern, http = _ref3.http;

            if (!pattern.startsWith('*')) {
              pattern = "*".concat(pattern);
            }

            if (!pattern.endsWith('*')) {
              pattern = "".concat(pattern, "*");
            }

            _context2.next = 5;
            return http.post("".concat(INDEX_THRESHOLD_API_ROOT, "/_indices"), {
              body: JSON.stringify({
                pattern: pattern
              })
            });

          case 5:
            _ref4 = _context2.sent;
            indices = _ref4.indices;
            return _context2.abrupt("return", indices);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getMatchingIndicesForThresholdAlertType.apply(this, arguments);
}

function getThresholdAlertTypeFields(_x2) {
  return _getThresholdAlertTypeFields.apply(this, arguments);
}

function _getThresholdAlertTypeFields() {
  _getThresholdAlertTypeFields = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(_ref5) {
    var indexes, http, _ref6, fields;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            indexes = _ref5.indexes, http = _ref5.http;
            _context3.next = 3;
            return http.post("".concat(INDEX_THRESHOLD_API_ROOT, "/_fields"), {
              body: JSON.stringify({
                indexPatterns: indexes
              })
            });

          case 3:
            _ref6 = _context3.sent;
            fields = _ref6.fields;
            return _context3.abrupt("return", fields);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getThresholdAlertTypeFields.apply(this, arguments);
}

var savedObjectsClient;

var setSavedObjectsClient = function setSavedObjectsClient(aSavedObjectsClient) {
  savedObjectsClient = aSavedObjectsClient;
};

exports.setSavedObjectsClient = setSavedObjectsClient;

var getSavedObjectsClient = function getSavedObjectsClient() {
  return savedObjectsClient;
};

exports.getSavedObjectsClient = getSavedObjectsClient;

var loadIndexPatterns =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref2, savedObjects;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getSavedObjectsClient().find({
              type: 'index-pattern',
              fields: ['title'],
              perPage: 10000
            });

          case 2:
            _ref2 = _context.sent;
            savedObjects = _ref2.savedObjects;
            return _context.abrupt("return", savedObjects);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadIndexPatterns() {
    return _ref.apply(this, arguments);
  };
}();

exports.loadIndexPatterns = loadIndexPatterns;

function getThresholdAlertVisualizationData(_x3) {
  return _getThresholdAlertVisualizationData.apply(this, arguments);
}

function _getThresholdAlertVisualizationData() {
  _getThresholdAlertVisualizationData = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(_ref7) {
    var model, visualizeOptions, http, timeSeriesQueryParams;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            model = _ref7.model, visualizeOptions = _ref7.visualizeOptions, http = _ref7.http;
            timeSeriesQueryParams = {
              index: model.index,
              timeField: model.timeField,
              aggType: model.aggType,
              aggField: model.aggField,
              groupBy: model.groupBy,
              termField: model.termField,
              termSize: model.termSize,
              timeWindowSize: model.timeWindowSize,
              timeWindowUnit: model.timeWindowUnit,
              dateStart: new Date(visualizeOptions.rangeFrom).toISOString(),
              dateEnd: new Date(visualizeOptions.rangeTo).toISOString(),
              interval: visualizeOptions.interval
            };
            _context4.next = 4;
            return http.post("".concat(INDEX_THRESHOLD_API_ROOT, "/_time_series_query"), {
              body: JSON.stringify(timeSeriesQueryParams)
            });

          case 4:
            return _context4.abrupt("return", _context4.sent);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getThresholdAlertVisualizationData.apply(this, arguments);
}