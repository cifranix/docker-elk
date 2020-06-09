"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrilldownService = void 0;

var _actions = require("../actions");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DrilldownService =
/*#__PURE__*/
function () {
  function DrilldownService() {
    _classCallCheck(this, DrilldownService);

    _defineProperty(this, "registerDrilldown", function () {
      throw new Error('not implemented');
    });
  }

  _createClass(DrilldownService, [{
    key: "bootstrap",
    value: function bootstrap(core, _ref) {
      var uiActions = _ref.uiActions;

      var overlays =
      /*#__PURE__*/
      function () {
        var _ref2 = _asyncToGenerator(
        /*#__PURE__*/
        regeneratorRuntime.mark(function _callee() {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return core.getStartServices();

                case 2:
                  return _context.abrupt("return", _context.sent[0].overlays);

                case 3:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function overlays() {
          return _ref2.apply(this, arguments);
        };
      }();

      var actionFlyoutCreateDrilldown = new _actions.FlyoutCreateDrilldownAction({
        overlays: overlays
      });
      uiActions.registerAction(actionFlyoutCreateDrilldown); // uiActions.attachAction(CONTEXT_MENU_TRIGGER, actionFlyoutCreateDrilldown);

      var actionFlyoutEditDrilldown = new _actions.FlyoutEditDrilldownAction({
        overlays: overlays
      });
      uiActions.registerAction(actionFlyoutEditDrilldown); // uiActions.attachAction(CONTEXT_MENU_TRIGGER, actionFlyoutEditDrilldown);
    }
    /**
     * Convenience method to register a drilldown. (It should set-up all the
     * necessary triggers and actions.)
     */

  }]);

  return DrilldownService;
}();

exports.DrilldownService = DrilldownService;