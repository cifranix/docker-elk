"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullTimeRangeSelector = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _full_time_range_selector_service = require("./full_time_range_selector_service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Component for rendering a button which automatically sets the range of the time filter
// to the time range of data in the index(es) mapped to the supplied Kibana index pattern or query.
var FullTimeRangeSelector = function FullTimeRangeSelector(_ref) {
  var indexPattern = _ref.indexPattern,
      query = _ref.query,
      disabled = _ref.disabled,
      callback = _ref.callback;

  // wrapper around setFullTimeRange to allow for the calling of the optional callBack prop
  function setRange(_x, _x2) {
    return _setRange.apply(this, arguments);
  }

  function _setRange() {
    _setRange = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(i, q) {
      var fullTimeRange;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _full_time_range_selector_service.setFullTimeRange)(i, q);

            case 2:
              fullTimeRange = _context.sent;

              if (typeof callback === 'function') {
                callback(fullTimeRange);
              }

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _setRange.apply(this, arguments);
  }

  return _react.default.createElement(_eui.EuiButton, {
    isDisabled: disabled,
    onClick: function onClick() {
      return setRange(indexPattern, query);
    },
    "data-test-subj": "mlButtonUseFullData"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fullTimeRangeSelector.useFullDataButtonLabel",
    defaultMessage: "Use full {indexPatternTitle} data",
    values: {
      indexPatternTitle: indexPattern.title
    }
  }));
};

exports.FullTimeRangeSelector = FullTimeRangeSelector;