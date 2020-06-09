"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteAnalytics = void 0;

var _i18n = require("@kbn/i18n");

var _dependency_cache = require("../../../../../util/dependency_cache");

var _ml_api_service = require("../../../../../services/ml_api_service");

var _common = require("../../../../common");

var _common2 = require("../../components/analytics_list/common");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var deleteAnalytics =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(d) {
    var toastNotifications;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            toastNotifications = (0, _dependency_cache.getToastNotifications)();
            _context.prev = 1;

            if (!(0, _common2.isDataFrameAnalyticsFailed)(d.stats.state)) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return _ml_api_service.ml.dataFrameAnalytics.stopDataFrameAnalytics(d.config.id, true);

          case 5:
            _context.next = 7;
            return _ml_api_service.ml.dataFrameAnalytics.deleteDataFrameAnalytics(d.config.id);

          case 7:
            toastNotifications.addSuccess(_i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteAnalyticsSuccessMessage', {
              defaultMessage: 'Request to delete data frame analytics {analyticsId} acknowledged.',
              values: {
                analyticsId: d.config.id
              }
            }));
            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](1);
            toastNotifications.addDanger(_i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteAnalyticsErrorMessage', {
              defaultMessage: 'An error occurred deleting the data frame analytics {analyticsId}: {error}',
              values: {
                analyticsId: d.config.id,
                error: JSON.stringify(_context.t0)
              }
            }));

          case 13:
            _common.refreshAnalyticsList$.next(_common.REFRESH_ANALYTICS_LIST_STATE.REFRESH);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 10]]);
  }));

  return function deleteAnalytics(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.deleteAnalytics = deleteAnalytics;