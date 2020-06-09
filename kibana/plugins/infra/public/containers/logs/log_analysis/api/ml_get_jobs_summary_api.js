"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchJobStatusResponsePayloadRT = exports.jobSummaryRT = exports.fetchJobStatusRequestPayloadRT = exports.callJobsSummaryAPI = void 0;

var _Either = require("fp-ts/lib/Either");

var _function = require("fp-ts/lib/function");

var _pipeable = require("fp-ts/lib/pipeable");

var rt = _interopRequireWildcard(require("io-ts"));

var _legacy_singletons = require("../../../../legacy_singletons");

var _log_analysis = require("../../../../../common/log_analysis");

var _runtime_types = require("../../../../../common/runtime_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var callJobsSummaryAPI =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(spaceId, sourceId, jobTypes) {
    var response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _legacy_singletons.npStart.http.fetch('/api/ml/jobs/jobs_summary', {
              method: 'POST',
              body: JSON.stringify(fetchJobStatusRequestPayloadRT.encode({
                jobIds: jobTypes.map(function (jobType) {
                  return (0, _log_analysis.getJobId)(spaceId, sourceId, jobType);
                })
              }))
            });

          case 2:
            response = _context.sent;
            return _context.abrupt("return", (0, _pipeable.pipe)(fetchJobStatusResponsePayloadRT.decode(response), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity)));

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function callJobsSummaryAPI(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.callJobsSummaryAPI = callJobsSummaryAPI;
var fetchJobStatusRequestPayloadRT = rt.type({
  jobIds: rt.array(rt.string)
});
exports.fetchJobStatusRequestPayloadRT = fetchJobStatusRequestPayloadRT;
var datafeedStateRT = rt.keyof({
  started: null,
  stopped: null,
  stopping: null,
  '': null
});
var jobStateRT = rt.keyof({
  closed: null,
  closing: null,
  deleting: null,
  failed: null,
  opened: null,
  opening: null
});
var jobSummaryRT = rt.intersection([rt.type({
  id: rt.string,
  jobState: jobStateRT
}), rt.partial({
  datafeedIndices: rt.array(rt.string),
  datafeedState: datafeedStateRT,
  fullJob: rt.partial({
    custom_settings: _log_analysis.jobCustomSettingsRT,
    finished_time: rt.number
  })
})]);
exports.jobSummaryRT = jobSummaryRT;
var fetchJobStatusResponsePayloadRT = rt.array(jobSummaryRT);
exports.fetchJobStatusResponsePayloadRT = fetchJobStatusResponsePayloadRT;