"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlyoutCreateDrilldownAction = exports.OPEN_FLYOUT_ADD_DRILLDOWN = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _flyout_create_drilldown = require("../../components/flyout_create_drilldown");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var OPEN_FLYOUT_ADD_DRILLDOWN = 'OPEN_FLYOUT_ADD_DRILLDOWN';
exports.OPEN_FLYOUT_ADD_DRILLDOWN = OPEN_FLYOUT_ADD_DRILLDOWN;

var FlyoutCreateDrilldownAction =
/*#__PURE__*/
function () {
  function FlyoutCreateDrilldownAction(params) {
    _classCallCheck(this, FlyoutCreateDrilldownAction);

    this.params = params;

    _defineProperty(this, "type", OPEN_FLYOUT_ADD_DRILLDOWN);

    _defineProperty(this, "id", OPEN_FLYOUT_ADD_DRILLDOWN);

    _defineProperty(this, "order", 100);
  }

  _createClass(FlyoutCreateDrilldownAction, [{
    key: "getDisplayName",
    value: function getDisplayName() {
      return _i18n.i18n.translate('xpack.drilldowns.FlyoutCreateDrilldownAction.displayName', {
        defaultMessage: 'Create drilldown'
      });
    }
  }, {
    key: "getIconType",
    value: function getIconType() {
      return 'plusInCircle';
    }
  }, {
    key: "isCompatible",
    value: function () {
      var _isCompatible = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(_ref) {
        var embeddable;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embeddable = _ref.embeddable;
                return _context.abrupt("return", embeddable.getInput().viewMode === 'edit');

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
      regeneratorRuntime.mark(function _callee2(context) {
        var overlays, handle;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.params.overlays();

              case 2:
                overlays = _context2.sent;
                handle = overlays.openFlyout((0, _public.toMountPoint)(_react.default.createElement(_flyout_create_drilldown.FlyoutCreateDrilldown, {
                  context: context,
                  onClose: function onClose() {
                    return handle.close();
                  }
                })));

              case 4:
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

  return FlyoutCreateDrilldownAction;
}();

exports.FlyoutCreateDrilldownAction = FlyoutCreateDrilldownAction;