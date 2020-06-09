"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mlCalendarService = void 0;

var _i18n = require("@kbn/i18n");

var _ml_api_service = require("./ml_api_service");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CalendarService =
/*#__PURE__*/
function () {
  function CalendarService() {
    _classCallCheck(this, CalendarService);
  }

  _createClass(CalendarService, [{
    key: "assignNewJobId",

    /**
     * Assigns a job id to the calendar.
     * @param calendar
     * @param jobId
     */
    value: function () {
      var _assignNewJobId = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(calendar, jobId) {
        var calendarId;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                calendarId = calendar.calendar_id;
                _context.prev = 1;
                _context.next = 4;
                return _ml_api_service.ml.updateCalendar(_objectSpread({}, calendar, {
                  calendarId: calendarId,
                  job_ids: [].concat(_toConsumableArray(calendar.job_ids), [jobId])
                }));

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                throw new Error(_i18n.i18n.translate('xpack.ml.calendarService.assignNewJobIdErrorMessage', {
                  defaultMessage: 'Unable to assign {jobId} to {calendarId}',
                  values: {
                    calendarId: calendarId,
                    jobId: jobId
                  }
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 6]]);
      }));

      function assignNewJobId(_x, _x2) {
        return _assignNewJobId.apply(this, arguments);
      }

      return assignNewJobId;
    }()
    /**
     * Fetches calendars by the list of ids.
     * @param calendarIds
     */

  }, {
    key: "fetchCalendarsByIds",
    value: function () {
      var _fetchCalendarsByIds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(calendarIds) {
        var calendars;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _ml_api_service.ml.calendars({
                  calendarIds: calendarIds
                });

              case 3:
                calendars = _context2.sent;
                return _context2.abrupt("return", Array.isArray(calendars) ? calendars : [calendars]);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw new Error(_i18n.i18n.translate('xpack.ml.calendarService.fetchCalendarsByIdsErrorMessage', {
                  defaultMessage: 'Unable to fetch calendars: {calendarIds}',
                  values: {
                    calendarIds: calendarIds.join(', ')
                  }
                }));

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function fetchCalendarsByIds(_x3) {
        return _fetchCalendarsByIds.apply(this, arguments);
      }

      return fetchCalendarsByIds;
    }()
  }]);

  return CalendarService;
}();

var mlCalendarService = new CalendarService();
exports.mlCalendarService = mlCalendarService;