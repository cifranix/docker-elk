"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callSetupMlModuleAPI = void 0;

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

var callSetupMlModuleAPI =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(moduleId, start, end, spaceId, sourceId, indexPattern) {
    var jobOverrides,
        datafeedOverrides,
        response,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            jobOverrides = _args.length > 6 && _args[6] !== undefined ? _args[6] : [];
            datafeedOverrides = _args.length > 7 && _args[7] !== undefined ? _args[7] : [];
            _context.next = 4;
            return _legacy_singletons.npStart.http.fetch("/api/ml/modules/setup/".concat(moduleId), {
              method: 'POST',
              body: JSON.stringify(setupMlModuleRequestPayloadRT.encode({
                start: start,
                end: end,
                indexPatternName: indexPattern,
                prefix: (0, _log_analysis.getJobIdPrefix)(spaceId, sourceId),
                startDatafeed: true,
                jobOverrides: jobOverrides,
                datafeedOverrides: datafeedOverrides
              }))
            });

          case 4:
            response = _context.sent;
            return _context.abrupt("return", (0, _pipeable.pipe)(setupMlModuleResponsePayloadRT.decode(response), (0, _Either.fold)((0, _runtime_types.throwErrors)(_runtime_types.createPlainError), _function.identity)));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function callSetupMlModuleAPI(_x, _x2, _x3, _x4, _x5, _x6) {
    return _ref.apply(this, arguments);
  };
}();

exports.callSetupMlModuleAPI = callSetupMlModuleAPI;
var setupMlModuleTimeParamsRT = rt.partial({
  start: rt.number,
  end: rt.number
});
var setupMlModuleJobOverridesRT = rt.type({
  job_id: rt.string,
  custom_settings: _log_analysis.jobCustomSettingsRT
});
var setupMlModuleDatafeedOverridesRT = rt.object;
var setupMlModuleRequestParamsRT = rt.type({
  indexPatternName: rt.string,
  prefix: rt.string,
  startDatafeed: rt.boolean,
  jobOverrides: rt.array(setupMlModuleJobOverridesRT),
  datafeedOverrides: rt.array(setupMlModuleDatafeedOverridesRT)
});
var setupMlModuleRequestPayloadRT = rt.intersection([setupMlModuleTimeParamsRT, setupMlModuleRequestParamsRT]);
var setupErrorResponseRT = rt.type({
  msg: rt.string
});
var datafeedSetupResponseRT = rt.intersection([rt.type({
  id: rt.string,
  started: rt.boolean,
  success: rt.boolean
}), rt.partial({
  error: setupErrorResponseRT
})]);
var jobSetupResponseRT = rt.intersection([rt.type({
  id: rt.string,
  success: rt.boolean
}), rt.partial({
  error: setupErrorResponseRT
})]);
var setupMlModuleResponsePayloadRT = rt.type({
  datafeeds: rt.array(datafeedSetupResponseRT),
  jobs: rt.array(jobSetupResponseRT)
});