"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preConfiguredJobRedirect = preConfiguredJobRedirect;

var _job_service = require("../../../../services/job_service");

var _index_utils = require("../../../../util/index_utils");

var _new_job = require("../../../../../../common/constants/new_job");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function preConfiguredJobRedirect(_x) {
  return _preConfiguredJobRedirect.apply(this, arguments);
}

function _preConfiguredJobRedirect() {
  _preConfiguredJobRedirect = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(indexPatterns) {
    var job, redirectUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            job = _job_service.mlJobService.tempJobCloningObjects.job;

            if (!job) {
              _context.next = 15;
              break;
            }

            _context.prev = 2;
            _context.next = 5;
            return (0, _index_utils.loadIndexPatterns)(indexPatterns);

          case 5:
            redirectUrl = getWizardUrlFromCloningJob(job);
            window.location.href = "#/".concat(redirectUrl);
            return _context.abrupt("return", Promise.reject());

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", Promise.resolve());

          case 13:
            _context.next = 16;
            break;

          case 15:
            return _context.abrupt("return", Promise.resolve());

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));
  return _preConfiguredJobRedirect.apply(this, arguments);
}

function getWizardUrlFromCloningJob(job) {
  var _job$custom_settings;

  var created = job === null || job === void 0 ? void 0 : (_job$custom_settings = job.custom_settings) === null || _job$custom_settings === void 0 ? void 0 : _job$custom_settings.created_by;
  var page = '';

  switch (created) {
    case _new_job.CREATED_BY_LABEL.SINGLE_METRIC:
      page = _new_job.JOB_TYPE.SINGLE_METRIC;
      break;

    case _new_job.CREATED_BY_LABEL.MULTI_METRIC:
      page = _new_job.JOB_TYPE.MULTI_METRIC;
      break;

    case _new_job.CREATED_BY_LABEL.POPULATION:
      page = _new_job.JOB_TYPE.POPULATION;
      break;

    case _new_job.CREATED_BY_LABEL.CATEGORIZATION:
      page = _new_job.JOB_TYPE.CATEGORIZATION;
      break;

    default:
      page = _new_job.JOB_TYPE.ADVANCED;
      break;
  }

  var indexPatternId = (0, _index_utils.getIndexPatternIdFromName)(job.datafeed_config.indices.join());
  return "jobs/new_job/".concat(page, "?index=").concat(indexPatternId, "&_g=()");
}