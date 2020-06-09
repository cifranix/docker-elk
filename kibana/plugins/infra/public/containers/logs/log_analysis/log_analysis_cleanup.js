"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanUpJobsAndDatafeeds = void 0;

var _log_analysis = require("../../../../common/log_analysis");

var _ml_cleanup = require("./api/ml_cleanup");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cleanUpJobsAndDatafeeds =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(spaceId, sourceId, jobTypes) {
    var _err$res;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _ml_cleanup.callStopDatafeeds)(spaceId, sourceId, jobTypes);

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);

            if (!((_context.t0 === null || _context.t0 === void 0 ? void 0 : (_err$res = _context.t0.res) === null || _err$res === void 0 ? void 0 : _err$res.status) !== 404)) {
              _context.next = 9;
              break;
            }

            throw _context.t0;

          case 9:
            _context.next = 11;
            return deleteJobs(spaceId, sourceId, jobTypes);

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));

  return function cleanUpJobsAndDatafeeds(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.cleanUpJobsAndDatafeeds = cleanUpJobsAndDatafeeds;

var deleteJobs =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(spaceId, sourceId, jobTypes) {
    var deleteJobsResponse;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _ml_cleanup.callDeleteJobs)(spaceId, sourceId, jobTypes);

          case 2:
            deleteJobsResponse = _context2.sent;
            _context2.next = 5;
            return waitUntilJobsAreDeleted(spaceId, sourceId, jobTypes);

          case 5:
            return _context2.abrupt("return", deleteJobsResponse);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteJobs(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var waitUntilJobsAreDeleted =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(spaceId, sourceId, jobTypes) {
    var moduleJobIds, _ref4, jobIdsBeingDeleted, needToWait;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            moduleJobIds = jobTypes.map(function (jobType) {
              return (0, _log_analysis.getJobId)(spaceId, sourceId, jobType);
            });

          case 1:
            if (!true) {
              _context3.next = 15;
              break;
            }

            _context3.next = 4;
            return (0, _ml_cleanup.callGetJobDeletionTasks)();

          case 4:
            _ref4 = _context3.sent;
            jobIdsBeingDeleted = _ref4.jobIds;
            needToWait = jobIdsBeingDeleted.some(function (jobId) {
              return moduleJobIds.includes(jobId);
            });

            if (!needToWait) {
              _context3.next = 12;
              break;
            }

            _context3.next = 10;
            return timeout(1000);

          case 10:
            _context3.next = 13;
            break;

          case 12:
            return _context3.abrupt("return", true);

          case 13:
            _context3.next = 1;
            break;

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function waitUntilJobsAreDeleted(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var timeout = function timeout(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};