"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReportingNotifierStreamHandler = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _operators = require("rxjs/operators");

var _i18n = require("@kbn/i18n");

var _constants = require("../../constants");

var _components = require("../components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function updateStored(jobIds) {
  sessionStorage.setItem(_constants.JOB_COMPLETION_NOTIFICATIONS_SESSION_KEY, JSON.stringify(jobIds));
}

function summarizeJob(src) {
  return {
    id: src._id,
    status: src._source.status,
    title: src._source.payload.title,
    type: src._source.payload.type,
    maxSizeReached: src._source.output.max_size_reached,
    csvContainsFormulas: src._source.output.csv_contains_formulas
  };
}

var ReportingNotifierStreamHandler =
/*#__PURE__*/
function () {
  function ReportingNotifierStreamHandler(notifications, apiClient) {
    _classCallCheck(this, ReportingNotifierStreamHandler);

    this.notifications = notifications;
    this.apiClient = apiClient;
  }
  /*
   * Use Kibana Toast API to show our messages
   */


  _createClass(ReportingNotifierStreamHandler, [{
    key: "showNotifications",
    value: function showNotifications(_ref) {
      var _this = this;

      var completedJobs = _ref.completed,
          failedJobs = _ref.failed;

      var showNotificationsAsync =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, job, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _job, _ref3, content;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  // notifications with download link
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 3;

                  for (_iterator = completedJobs[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    job = _step.value;

                    if (job.csvContainsFormulas) {
                      _this.notifications.toasts.addWarning((0, _components.getWarningFormulasToast)(job, _this.apiClient.getManagementLink, _this.apiClient.getDownloadLink));
                    } else if (job.maxSizeReached) {
                      _this.notifications.toasts.addWarning((0, _components.getWarningMaxSizeToast)(job, _this.apiClient.getManagementLink, _this.apiClient.getDownloadLink));
                    } else {
                      _this.notifications.toasts.addSuccess((0, _components.getSuccessToast)(job, _this.apiClient.getManagementLink, _this.apiClient.getDownloadLink));
                    }
                  } // no download link available


                  _context.next = 11;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = _context.t0;

                case 11:
                  _context.prev = 11;
                  _context.prev = 12;

                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }

                case 14:
                  _context.prev = 14;

                  if (!_didIteratorError) {
                    _context.next = 17;
                    break;
                  }

                  throw _iteratorError;

                case 17:
                  return _context.finish(14);

                case 18:
                  return _context.finish(11);

                case 19:
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  _context.prev = 22;
                  _iterator2 = failedJobs[Symbol.iterator]();

                case 24:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    _context.next = 34;
                    break;
                  }

                  _job = _step2.value;
                  _context.next = 28;
                  return _this.apiClient.getContent(_job.id);

                case 28:
                  _ref3 = _context.sent;
                  content = _ref3.content;

                  _this.notifications.toasts.addDanger((0, _components.getFailureToast)(content, _job, _this.apiClient.getManagementLink));

                case 31:
                  _iteratorNormalCompletion2 = true;
                  _context.next = 24;
                  break;

                case 34:
                  _context.next = 40;
                  break;

                case 36:
                  _context.prev = 36;
                  _context.t1 = _context["catch"](22);
                  _didIteratorError2 = true;
                  _iteratorError2 = _context.t1;

                case 40:
                  _context.prev = 40;
                  _context.prev = 41;

                  if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                    _iterator2.return();
                  }

                case 43:
                  _context.prev = 43;

                  if (!_didIteratorError2) {
                    _context.next = 46;
                    break;
                  }

                  throw _iteratorError2;

                case 46:
                  return _context.finish(43);

                case 47:
                  return _context.finish(40);

                case 48:
                  return _context.abrupt("return", {
                    completed: completedJobs,
                    failed: failedJobs
                  });

                case 49:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[3, 7, 11, 19], [12,, 14, 18], [22, 36, 40, 48], [41,, 43, 47]]);
        }));

        return function showNotificationsAsync() {
          return _ref2.apply(this, arguments);
        };
      }();

      return Rx.from(showNotificationsAsync()); // convert Promise to Observable, for the convenience of the main stream
    }
    /*
     * An observable that finds jobs that are known to be "processing" (stored in
     * session storage) but have non-processing job status on the server
     */

  }, {
    key: "findChangedStatusJobs",
    value: function findChangedStatusJobs(storedJobs) {
      var _this2 = this;

      return Rx.from(this.apiClient.findForJobIds(storedJobs)).pipe((0, _operators.map)(function (jobs) {
        var completedJobs = [];
        var failedJobs = [];
        var pending = []; // add side effects to storage

        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = jobs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var job = _step3.value;
            var jobId = job._id,
                jobStatus = job._source.status;

            if (storedJobs.includes(jobId)) {
              if (jobStatus === _constants.JOB_STATUS_COMPLETED) {
                completedJobs.push(summarizeJob(job));
              } else if (jobStatus === _constants.JOB_STATUS_FAILED) {
                failedJobs.push(summarizeJob(job));
              } else {
                pending.push(jobId);
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        updateStored(pending); // refresh the storage of pending job IDs, minus completed and failed job IDs

        return {
          completed: completedJobs,
          failed: failedJobs
        };
      }), (0, _operators.catchError)(function (err) {
        // show connection refused toast
        _this2.notifications.toasts.addDanger((0, _components.getGeneralErrorToast)(_i18n.i18n.translate('xpack.reporting.publicNotifier.httpErrorMessage', {
          defaultMessage: 'Could not check Reporting job status!'
        }), err)); // prettier-ignore


        window.console.error(err);
        return Rx.of({
          completed: [],
          failed: []
        }); // log the error and resume
      }));
    }
  }]);

  return ReportingNotifierStreamHandler;
}();

exports.ReportingNotifierStreamHandler = ReportingNotifierStreamHandler;