"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopDatafeedsResponsePayloadRT = exports.stopDatafeedsRequestPayloadRT = exports.getJobDeletionTasksResponsePayloadRT = exports.deleteJobsResponsePayloadRT = exports.deleteJobsRequestPayloadRT = exports.callStopDatafeeds = exports.callGetJobDeletionTasks = exports.callDeleteJobs = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _pipeable = require("fp-ts/lib/pipeable");

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _legacy_singletons = require("../../../../legacy_singletons");

var _log_analysis = require("../../../../../common/log_analysis");

var _runtime_types = require("../../../../../common/runtime_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var callDeleteJobs =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(spaceId, sourceId, jobTypes) {
    var deleteJobsResponse;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _legacy_singletons.npStart.http.fetch('/api/ml/jobs/delete_jobs', {
              method: 'POST',
              body: JSON.stringify(deleteJobsRequestPayloadRT.encode({
                jobIds: jobTypes.map(function (jobType) {
                  return (0, _log_analysis.getJobId)(spaceId, sourceId, jobType);
                })
              }))
            });

          case 2:
            deleteJobsResponse = _context.sent;
            return _context.abrupt("return", (0, _pipeable.pipe)(deleteJobsResponsePayloadRT.decode(deleteJobsResponse), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function callDeleteJobs(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.callDeleteJobs = callDeleteJobs;

var callGetJobDeletionTasks =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var jobDeletionTasksResponse;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _legacy_singletons.npStart.http.fetch('/api/ml/jobs/deleting_jobs_tasks');

          case 2:
            jobDeletionTasksResponse = _context2.sent;
            return _context2.abrupt("return", (0, _pipeable.pipe)(getJobDeletionTasksResponsePayloadRT.decode(jobDeletionTasksResponse), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity)));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function callGetJobDeletionTasks() {
    return _ref2.apply(this, arguments);
  };
}();

exports.callGetJobDeletionTasks = callGetJobDeletionTasks;

var callStopDatafeeds =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(spaceId, sourceId, jobTypes) {
    var stopDatafeedResponse;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _legacy_singletons.npStart.http.fetch('/api/ml/jobs/stop_datafeeds', {
              method: 'POST',
              body: JSON.stringify(stopDatafeedsRequestPayloadRT.encode({
                datafeedIds: jobTypes.map(function (jobType) {
                  return (0, _log_analysis.getDatafeedId)(spaceId, sourceId, jobType);
                })
              }))
            });

          case 2:
            stopDatafeedResponse = _context3.sent;
            return _context3.abrupt("return", (0, _pipeable.pipe)(stopDatafeedsResponsePayloadRT.decode(stopDatafeedResponse), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity)));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function callStopDatafeeds(_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.callStopDatafeeds = callStopDatafeeds;
var deleteJobsRequestPayloadRT = rt.type({
  jobIds: rt.array(rt.string)
});
exports.deleteJobsRequestPayloadRT = deleteJobsRequestPayloadRT;
var deleteJobsResponsePayloadRT = rt.record(rt.string, rt.type({
  deleted: rt.boolean
}));
exports.deleteJobsResponsePayloadRT = deleteJobsResponsePayloadRT;
var getJobDeletionTasksResponsePayloadRT = rt.type({
  jobIds: rt.array(rt.string)
});
exports.getJobDeletionTasksResponsePayloadRT = getJobDeletionTasksResponsePayloadRT;
var stopDatafeedsRequestPayloadRT = rt.type({
  datafeedIds: rt.array(rt.string)
});
exports.stopDatafeedsRequestPayloadRT = stopDatafeedsRequestPayloadRT;
var stopDatafeedsResponsePayloadRT = rt.record(rt.string, rt.type({
  stopped: rt.boolean
}));
exports.stopDatafeedsResponsePayloadRT = stopDatafeedsResponsePayloadRT;