"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logEntryRateModule = void 0;

var _log_analysis = require("../../../../common/log_analysis");

var _log_analysis2 = require("../../../containers/logs/log_analysis");

var _ml_get_jobs_summary_api = require("../../../containers/logs/log_analysis/api/ml_get_jobs_summary_api");

var _ml_get_module = require("../../../containers/logs/log_analysis/api/ml_get_module");

var _ml_setup_module_api = require("../../../containers/logs/log_analysis/api/ml_setup_module_api");

var _validate_indices = require("../../../containers/logs/log_analysis/api/validate_indices");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var moduleId = 'logs_ui_analysis';

var getJobIds = function getJobIds(spaceId, sourceId) {
  return _log_analysis.logEntryRateJobTypes.reduce(function (accumulatedJobIds, jobType) {
    return _objectSpread({}, accumulatedJobIds, _defineProperty({}, jobType, (0, _log_analysis.getJobId)(spaceId, sourceId, jobType)));
  }, {});
};

var getJobSummary =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(spaceId, sourceId) {
    var response, jobIds;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _ml_get_jobs_summary_api.callJobsSummaryAPI)(spaceId, sourceId, _log_analysis.logEntryRateJobTypes);

          case 2:
            response = _context.sent;
            jobIds = Object.values(getJobIds(spaceId, sourceId));
            return _context.abrupt("return", response.filter(function (jobSummary) {
              return jobIds.includes(jobSummary.id);
            }));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getJobSummary(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getModuleDefinition =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _ml_get_module.callGetMlModuleAPI)(moduleId);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getModuleDefinition() {
    return _ref2.apply(this, arguments);
  };
}();

var setUpModule =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(start, end, _ref4) {
    var spaceId, sourceId, indices, timestampField, indexNamePattern, jobOverrides;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            spaceId = _ref4.spaceId, sourceId = _ref4.sourceId, indices = _ref4.indices, timestampField = _ref4.timestampField;
            indexNamePattern = indices.join(',');
            jobOverrides = [{
              job_id: 'log-entry-rate',
              analysis_config: {
                bucket_span: "".concat(_log_analysis.bucketSpan, "ms")
              },
              data_description: {
                time_field: timestampField
              },
              custom_settings: {
                logs_source_config: {
                  indexPattern: indexNamePattern,
                  timestampField: timestampField,
                  bucketSpan: _log_analysis.bucketSpan
                }
              }
            }];
            return _context3.abrupt("return", (0, _ml_setup_module_api.callSetupMlModuleAPI)(moduleId, start, end, spaceId, sourceId, indexNamePattern, jobOverrides));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function setUpModule(_x3, _x4, _x5) {
    return _ref3.apply(this, arguments);
  };
}();

var cleanUpModule =
/*#__PURE__*/
function () {
  var _ref5 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(spaceId, sourceId) {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _log_analysis2.cleanUpJobsAndDatafeeds)(spaceId, sourceId, _log_analysis.logEntryRateJobTypes);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function cleanUpModule(_x6, _x7) {
    return _ref5.apply(this, arguments);
  };
}();

var validateSetupIndices =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(_ref7) {
    var indices, timestampField;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            indices = _ref7.indices, timestampField = _ref7.timestampField;
            _context5.next = 3;
            return (0, _validate_indices.callValidateIndicesAPI)(indices, [{
              name: timestampField,
              validTypes: ['date']
            }, {
              name: _log_analysis.partitionField,
              validTypes: ['keyword']
            }]);

          case 3:
            return _context5.abrupt("return", _context5.sent);

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function validateSetupIndices(_x8) {
    return _ref6.apply(this, arguments);
  };
}();

var logEntryRateModule = {
  moduleId: moduleId,
  jobTypes: _log_analysis.logEntryRateJobTypes,
  bucketSpan: _log_analysis.bucketSpan,
  getJobIds: getJobIds,
  getJobSummary: getJobSummary,
  getModuleDefinition: getModuleDefinition,
  setUpModule: setUpModule,
  cleanUpModule: cleanUpModule,
  validateSetupIndices: validateSetupIndices
};
exports.logEntryRateModule = logEntryRateModule;