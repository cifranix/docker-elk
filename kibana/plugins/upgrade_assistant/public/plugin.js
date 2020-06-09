"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpgradeAssistantUIPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _version = require("../common/version");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UpgradeAssistantUIPlugin =
/*#__PURE__*/
function () {
  function UpgradeAssistantUIPlugin(ctx) {
    _classCallCheck(this, UpgradeAssistantUIPlugin);

    this.ctx = ctx;
  }

  _createClass(UpgradeAssistantUIPlugin, [{
    key: "setup",
    value: function setup(coreSetup, _ref) {
      var cloud = _ref.cloud,
          management = _ref.management;

      var _this$ctx$config$get = this.ctx.config.get(),
          enabled = _this$ctx$config$get.enabled;

      if (!enabled) {
        return;
      }

      var appRegistrar = management.sections.getSection('elasticsearch');
      var isCloudEnabled = Boolean(cloud === null || cloud === void 0 ? void 0 : cloud.isCloudEnabled);
      appRegistrar.registerApp({
        id: 'upgrade_assistant',
        title: _i18n.i18n.translate('xpack.upgradeAssistant.appTitle', {
          defaultMessage: '{version} Upgrade Assistant',
          values: {
            version: "".concat(_version.NEXT_MAJOR_VERSION, ".0")
          }
        }),
        order: 1000,
        mount: function mount(params) {
          return _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _ref2, mountManagementSection;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return import('./application/mount_management_section');

                  case 2:
                    _ref2 = _context.sent;
                    mountManagementSection = _ref2.mountManagementSection;
                    return _context.abrupt("return", mountManagementSection(coreSetup, isCloudEnabled, params));

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      });
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return UpgradeAssistantUIPlugin;
}();

exports.UpgradeAssistantUIPlugin = UpgradeAssistantUIPlugin;