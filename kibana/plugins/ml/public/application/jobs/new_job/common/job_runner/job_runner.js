"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobRunner = void 0;

var _rxjs = require("rxjs");

var _ml_api_service = require("../../../../services/ml_api_service");

var _job_service = require("../../../../services/job_service");

var _states = require("../../../../../../common/constants/states");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var REFRESH_INTERVAL_MS = 100;
var TARGET_PROGRESS_DELTA = 2;
var REFRESH_RATE_ADJUSTMENT_DELAY_MS = 2000;

var JobRunner =
/*#__PURE__*/
function () {
  function JobRunner(jobCreator) {
    _classCallCheck(this, JobRunner);

    _defineProperty(this, "_jobId", void 0);

    _defineProperty(this, "_datafeedId", void 0);

    _defineProperty(this, "_start", 0);

    _defineProperty(this, "_end", 0);

    _defineProperty(this, "_datafeedState", _states.DATAFEED_STATE.STOPPED);

    _defineProperty(this, "_refreshInterval", REFRESH_INTERVAL_MS);

    _defineProperty(this, "_progress$", void 0);

    _defineProperty(this, "_percentageComplete", 0);

    _defineProperty(this, "_stopRefreshPoll", void 0);

    _defineProperty(this, "_subscribers", void 0);

    _defineProperty(this, "_datafeedStartTime", 0);

    _defineProperty(this, "_performRefreshRateAdjustment", false);

    this._jobId = jobCreator.jobId;
    this._datafeedId = jobCreator.datafeedId;
    this._start = jobCreator.start;
    this._end = jobCreator.end;
    this._percentageComplete = 0;
    this._stopRefreshPoll = jobCreator.stopAllRefreshPolls;
    this._progress$ = new _rxjs.BehaviorSubject(this._percentageComplete);
    this._subscribers = jobCreator.subscribers;
  }

  _createClass(JobRunner, [{
    key: "resetInterval",
    value: function resetInterval() {
      this._refreshInterval = REFRESH_INTERVAL_MS;
    }
  }, {
    key: "openJob",
    value: function () {
      var _openJob = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _job_service.mlJobService.openJob(this._jobId);

              case 3:
                _context.next = 8;
                break;

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 5]]);
      }));

      function openJob() {
        return _openJob.apply(this, arguments);
      }

      return openJob;
    }() // start the datafeed and then start polling for progress
    // the complete percentage is added to an observable
    // so all pre-subscribed listeners can follow along.

  }, {
    key: "_startDatafeed",
    value: function () {
      var _startDatafeed2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(start, end, pollProgress) {
        var _this = this;

        var subscriptions, _ref, started, check;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                this._datafeedStartTime = Date.now(); // link the _subscribers list from the JobCreator
                // to the progress BehaviorSubject.

                subscriptions = pollProgress === true ? this._subscribers.map(function (s) {
                  return _this._progress$.subscribe(s);
                }) : [];
                _context4.next = 5;
                return this.openJob();

              case 5:
                _context4.next = 7;
                return _job_service.mlJobService.startDatafeed(this._datafeedId, this._jobId, start, end);

              case 7:
                _ref = _context4.sent;
                started = _ref.started;
                this._datafeedState = _states.DATAFEED_STATE.STARTED;
                this._percentageComplete = 0;

                check =
                /*#__PURE__*/
                function () {
                  var _ref2 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee3() {
                    var _ref3, isRunning, prog, isJobClosed, progress;

                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return _this.getProgress();

                          case 2:
                            _ref3 = _context3.sent;
                            isRunning = _ref3.isRunning;
                            prog = _ref3.progress;
                            isJobClosed = _ref3.isJobClosed;
                            // if the progress has reached 100% but the job is still running,
                            // dial the progress back to 99 to avoid any post creation buttons from
                            // appearing as they only rely on the progress.
                            progress = prog === 100 && (isRunning === true || isJobClosed === false) ? prog - 1 : prog;

                            _this._adjustRefreshInterval(progress);

                            _this._percentageComplete = progress;

                            _this._progress$.next(_this._percentageComplete);

                            if ((isRunning === true || isJobClosed === false) && _this._stopRefreshPoll.stop === false) {
                              setTimeout(
                              /*#__PURE__*/
                              _asyncToGenerator(
                              /*#__PURE__*/
                              regeneratorRuntime.mark(function _callee2() {
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                  while (1) {
                                    switch (_context2.prev = _context2.next) {
                                      case 0:
                                        _context2.next = 2;
                                        return check();

                                      case 2:
                                      case "end":
                                        return _context2.stop();
                                    }
                                  }
                                }, _callee2);
                              })), _this._refreshInterval);
                            } else {
                              // job has finished running, set progress to 100%
                              // it may be lower than 100 on completion as the progress
                              // is calculated based on latest_record_timestamp which may be earlier
                              // than the end date supplied to the datafeed
                              _this._progress$.next(100); // unsubscribe everyone


                              subscriptions.forEach(function (s) {
                                return s.unsubscribe();
                              });
                            }

                          case 11:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function check() {
                    return _ref2.apply(this, arguments);
                  };
                }(); // wait for the first check to run and then return success.
                // all subsequent checks will update the observable


                if (!(pollProgress === true)) {
                  _context4.next = 15;
                  break;
                }

                _context4.next = 15;
                return check();

              case 15:
                return _context4.abrupt("return", started);

              case 18:
                _context4.prev = 18;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 21:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 18]]);
      }));

      function _startDatafeed(_x, _x2, _x3) {
        return _startDatafeed2.apply(this, arguments);
      }

      return _startDatafeed;
    }()
  }, {
    key: "_adjustRefreshInterval",
    value: function _adjustRefreshInterval(progress) {
      if (this._performRefreshRateAdjustment === false) {
        // for the first couple of seconds of the job running, don't
        // adjust the refresh interval
        var timeDeltaMs = Date.now() - this._datafeedStartTime;

        if (timeDeltaMs > REFRESH_RATE_ADJUSTMENT_DELAY_MS) {
          this._performRefreshRateAdjustment = true;
        } else {
          return;
        }
      }

      var progressDelta = progress - this._percentageComplete;

      if (progressDelta !== 0) {
        // adjust the refresh interval so that it produces a change in percentage
        // that is close to the target
        this._refreshInterval = Math.floor(this._refreshInterval * (TARGET_PROGRESS_DELTA / progressDelta)); // don't let the interval fall below the initial default.

        if (this._refreshInterval < REFRESH_INTERVAL_MS) {
          this._refreshInterval = REFRESH_INTERVAL_MS;
        }
      }
    }
  }, {
    key: "startDatafeed",
    value: function () {
      var _startDatafeed3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._startDatafeed(this._start, this._end, true);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function startDatafeed() {
        return _startDatafeed3.apply(this, arguments);
      }

      return startDatafeed;
    }()
  }, {
    key: "startDatafeedInRealTime",
    value: function () {
      var _startDatafeedInRealTime = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(continueJob) {
        var start;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // if continuing a job, set the start to be the end date
                start = continueJob ? this._end : this._start;
                _context6.next = 3;
                return this._startDatafeed(start, undefined, false);

              case 3:
                return _context6.abrupt("return", _context6.sent);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function startDatafeedInRealTime(_x4) {
        return _startDatafeedInRealTime.apply(this, arguments);
      }

      return startDatafeedInRealTime;
    }()
  }, {
    key: "getProgress",
    value: function () {
      var _getProgress = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7() {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return _ml_api_service.ml.jobs.getLookBackProgress(this._jobId, this._start, this._end);

              case 2:
                return _context7.abrupt("return", _context7.sent);

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getProgress() {
        return _getProgress.apply(this, arguments);
      }

      return getProgress;
    }()
  }, {
    key: "subscribeToProgress",
    value: function subscribeToProgress(func) {
      this._progress$.subscribe(func);
    }
  }, {
    key: "isRunning",
    value: function () {
      var _isRunning = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8() {
        var _ref5, isRunning;

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this.getProgress();

              case 2:
                _ref5 = _context8.sent;
                isRunning = _ref5.isRunning;
                return _context8.abrupt("return", isRunning);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function isRunning() {
        return _isRunning.apply(this, arguments);
      }

      return isRunning;
    }()
  }, {
    key: "datafeedState",
    get: function get() {
      return this._datafeedState;
    }
  }, {
    key: "refreshInterval",
    set: function set(v) {
      this._refreshInterval = v;
    }
  }]);

  return JobRunner;
}();

exports.JobRunner = JobRunner;