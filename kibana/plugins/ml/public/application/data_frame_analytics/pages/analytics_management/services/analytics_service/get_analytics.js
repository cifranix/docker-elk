"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInitialAnalyticsStats = getInitialAnalyticsStats;
exports.getAnalyticsJobsStats = getAnalyticsJobsStats;
exports.getAnalyticsFactory = exports.isGetDataFrameAnalyticsStatsResponseOk = void 0;

var _i18n = require("@kbn/i18n");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _common = require("../../../../common");

var _common2 = require("../../components/analytics_list/common");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var isGetDataFrameAnalyticsStatsResponseOk = function isGetDataFrameAnalyticsStatsResponseOk(arg) {
  return {}.hasOwnProperty.call(arg, 'count') && {}.hasOwnProperty.call(arg, 'data_frame_analytics') && Array.isArray(arg.data_frame_analytics);
};

exports.isGetDataFrameAnalyticsStatsResponseOk = isGetDataFrameAnalyticsStatsResponseOk;

/**
 * Gets initial object for analytics stats.
 */
function getInitialAnalyticsStats() {
  return {
    total: {
      label: _i18n.i18n.translate('xpack.ml.overview.statsBar.totalAnalyticsLabel', {
        defaultMessage: 'Total analytics jobs'
      }),
      value: 0,
      show: true
    },
    started: {
      label: _i18n.i18n.translate('xpack.ml.overview.statsBar.runningAnalyticsLabel', {
        defaultMessage: 'Running'
      }),
      value: 0,
      show: true
    },
    stopped: {
      label: _i18n.i18n.translate('xpack.ml.overview.statsBar.stoppedAnalyticsLabel', {
        defaultMessage: 'Stopped'
      }),
      value: 0,
      show: true
    },
    failed: {
      label: _i18n.i18n.translate('xpack.ml.overview.statsBar.failedAnalyticsLabel', {
        defaultMessage: 'Failed'
      }),
      value: 0,
      show: false
    }
  };
}
/**
 * Gets analytics jobs stats formatted for the stats bar.
 */


function getAnalyticsJobsStats(analyticsStats) {
  var resultStats = analyticsStats.data_frame_analytics.reduce(function (acc, _ref) {
    var state = _ref.state;

    if ((0, _common2.isDataFrameAnalyticsFailed)(state)) {
      acc.failed.value = ++acc.failed.value;
    } else if ((0, _common2.isDataFrameAnalyticsRunning)(state)) {
      acc.started.value = ++acc.started.value;
    } else if ((0, _common2.isDataFrameAnalyticsStopped)(state)) {
      acc.stopped.value = ++acc.stopped.value;
    }

    return acc;
  }, getInitialAnalyticsStats());
  resultStats.failed.show = resultStats.failed.value > 0;
  resultStats.total.value = analyticsStats.count;
  return resultStats;
}

var getAnalyticsFactory = function getAnalyticsFactory(setAnalytics, setAnalyticsStats, setErrorMessage, setIsInitialized, blockRefresh) {
  var concurrentLoads = 0;

  var getAnalytics =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var forceRefresh,
          analyticsConfigs,
          analyticsStats,
          analyticsStatsResult,
          tableRows,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              forceRefresh = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;

              if (!(forceRefresh === true || blockRefresh === false)) {
                _context.next = 35;
                break;
              }

              _common.refreshAnalyticsList$.next(_common.REFRESH_ANALYTICS_LIST_STATE.LOADING);

              concurrentLoads++;

              if (!(concurrentLoads > 1)) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return");

            case 6:
              _context.prev = 6;
              _context.next = 9;
              return _ml_api_service.ml.dataFrameAnalytics.getDataFrameAnalytics();

            case 9:
              analyticsConfigs = _context.sent;
              _context.next = 12;
              return _ml_api_service.ml.dataFrameAnalytics.getDataFrameAnalyticsStats();

            case 12:
              analyticsStats = _context.sent;
              analyticsStatsResult = isGetDataFrameAnalyticsStatsResponseOk(analyticsStats) ? getAnalyticsJobsStats(analyticsStats) : undefined;
              tableRows = analyticsConfigs.data_frame_analytics.reduce(function (reducedtableRows, config) {
                var stats = isGetDataFrameAnalyticsStatsResponseOk(analyticsStats) ? analyticsStats.data_frame_analytics.find(function (d) {
                  return config.id === d.id;
                }) : undefined; // A newly created analytics job might not have corresponding stats yet.
                // If that's the case we just skip the job and don't add it to the analytics jobs list yet.

                if (!(0, _common2.isDataFrameAnalyticsStats)(stats)) {
                  return reducedtableRows;
                } // Table with expandable rows requires `id` on the outer most level


                reducedtableRows.push({
                  config: config,
                  id: config.id,
                  checkpointing: {},
                  mode: _common2.DATA_FRAME_MODE.BATCH,
                  stats: stats
                });
                return reducedtableRows;
              }, []);
              setAnalytics(tableRows);
              setAnalyticsStats(analyticsStatsResult);
              setErrorMessage(undefined);
              setIsInitialized(true);

              _common.refreshAnalyticsList$.next(_common.REFRESH_ANALYTICS_LIST_STATE.IDLE);

              _context.next = 30;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](6);

              // An error is followed immediately by setting the state to idle.
              // This way we're able to treat ERROR as a one-time-event like REFRESH.
              _common.refreshAnalyticsList$.next(_common.REFRESH_ANALYTICS_LIST_STATE.ERROR);

              _common.refreshAnalyticsList$.next(_common.REFRESH_ANALYTICS_LIST_STATE.IDLE);

              setAnalytics([]);
              setAnalyticsStats(undefined);
              setErrorMessage(_context.t0);
              setIsInitialized(true);

            case 30:
              concurrentLoads--;

              if (!(concurrentLoads > 0)) {
                _context.next = 35;
                break;
              }

              concurrentLoads = 0;
              getAnalytics(true);
              return _context.abrupt("return");

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[6, 22]]);
    }));

    return function getAnalytics() {
      return _ref2.apply(this, arguments);
    };
  }();

  return getAnalytics;
};

exports.getAnalyticsFactory = getAnalyticsFactory;