"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFullTimeRange = setFullTimeRange;
exports.getTimeFilterRange = getTimeFilterRange;

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _dependency_cache = require("../../util/dependency_cache");

var _ml_api_service = require("../../services/ml_api_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function setFullTimeRange(_x, _x2) {
  return _setFullTimeRange.apply(this, arguments);
}

function _setFullTimeRange() {
  _setFullTimeRange = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(indexPattern, query) {
    var timefilter, resp, toastNotifications;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            timefilter = (0, _dependency_cache.getTimefilter)();
            _context.next = 4;
            return _ml_api_service.ml.getTimeFieldRange({
              index: indexPattern.title,
              timeFieldName: indexPattern.timeFieldName,
              query: query
            });

          case 4:
            resp = _context.sent;
            timefilter.setTime({
              from: (0, _moment.default)(resp.start.epoch).toISOString(),
              to: (0, _moment.default)(resp.end.epoch).toISOString()
            });
            return _context.abrupt("return", resp);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            toastNotifications = (0, _dependency_cache.getToastNotifications)();
            toastNotifications.addDanger(_i18n.i18n.translate('xpack.ml.fullTimeRangeSelector.errorSettingTimeRangeNotification', {
              defaultMessage: 'An error occurred setting the time range.'
            }));
            return _context.abrupt("return", _context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _setFullTimeRange.apply(this, arguments);
}

function getTimeFilterRange() {
  var timefilter = (0, _dependency_cache.getTimefilter)();

  var fromMoment = _datemath.default.parse(timefilter.getTime().from);

  var toMoment = _datemath.default.parse(timefilter.getTime().to);

  var from = fromMoment !== undefined ? fromMoment.valueOf() : 0;
  var to = toMoment !== undefined ? toMoment.valueOf() : 0;
  return {
    to: to,
    from: from
  };
}