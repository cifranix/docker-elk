"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomTimeRangeBadge = exports.CUSTOM_TIME_RANGE_BADGE = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _public = require("../../../../src/plugins/ui_actions/public");

var _customize_time_range_modal = require("./customize_time_range_modal");

var _does_inherit_time_range = require("./does_inherit_time_range");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CUSTOM_TIME_RANGE_BADGE = 'CUSTOM_TIME_RANGE_BADGE';
exports.CUSTOM_TIME_RANGE_BADGE = CUSTOM_TIME_RANGE_BADGE;

function hasTimeRange(embeddable) {
  return embeddable.getInput().timeRange !== undefined;
}

var CustomTimeRangeBadge =
/*#__PURE__*/
function () {
  function CustomTimeRangeBadge(_ref) {
    var openModal = _ref.openModal,
        dateFormat = _ref.dateFormat,
        commonlyUsedRanges = _ref.commonlyUsedRanges;

    _classCallCheck(this, CustomTimeRangeBadge);

    _defineProperty(this, "type", CUSTOM_TIME_RANGE_BADGE);

    _defineProperty(this, "id", CUSTOM_TIME_RANGE_BADGE);

    _defineProperty(this, "order", 7);

    _defineProperty(this, "openModal", void 0);

    _defineProperty(this, "dateFormat", void 0);

    _defineProperty(this, "commonlyUsedRanges", void 0);

    this.openModal = openModal;
    this.dateFormat = dateFormat;
    this.commonlyUsedRanges = commonlyUsedRanges;
  }

  _createClass(CustomTimeRangeBadge, [{
    key: "getDisplayName",
    value: function getDisplayName(_ref2) {
      var embeddable = _ref2.embeddable;
      return (0, _eui.prettyDuration)(embeddable.getInput().timeRange.from, embeddable.getInput().timeRange.to, _eui.commonDurationRanges, this.dateFormat);
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'calendar';
    }
  }, {
    key: "isCompatible",
    value: function () {
      var _isCompatible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref3) {
        var embeddable;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embeddable = _ref3.embeddable;
                return _context.abrupt("return", Boolean(embeddable && hasTimeRange(embeddable) && !(0, _does_inherit_time_range.doesInheritTimeRange)(embeddable)));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function isCompatible(_x) {
        return _isCompatible.apply(this, arguments);
      }

      return isCompatible;
    }()
  }, {
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref4) {
        var embeddable, isCompatible, modalSession;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                embeddable = _ref4.embeddable;
                _context2.next = 3;
                return this.isCompatible({
                  embeddable: embeddable
                });

              case 3:
                isCompatible = _context2.sent;

                if (isCompatible) {
                  _context2.next = 6;
                  break;
                }

                throw new _public.IncompatibleActionError();

              case 6:
                // Only here for typescript
                if (hasTimeRange(embeddable)) {
                  modalSession = this.openModal(_react.default.createElement(_customize_time_range_modal.CustomizeTimeRangeModal, {
                    onClose: function onClose() {
                      return modalSession.close();
                    },
                    embeddable: embeddable,
                    dateFormat: this.dateFormat,
                    commonlyUsedRanges: this.commonlyUsedRanges
                  }));
                }

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function execute(_x2) {
        return _execute.apply(this, arguments);
      }

      return execute;
    }()
  }]);

  return CustomTimeRangeBadge;
}();

exports.CustomTimeRangeBadge = CustomTimeRangeBadge;