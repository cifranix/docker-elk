"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotRestoreUIPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../common/constants");

var _http = require("./application/services/http");

var _text = require("./application/services/text");

var _services = require("./application/services");

var _constants2 = require("./application/constants");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SnapshotRestoreUIPlugin =
/*#__PURE__*/
function () {
  function SnapshotRestoreUIPlugin(initializerContext) {
    _classCallCheck(this, SnapshotRestoreUIPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "uiMetricService", new _services.UiMetricService(_constants2.UIM_APP_NAME));

    // Temporary hack to provide the service instances in module files in order to avoid a big refactor
    (0, _http.setUiMetricService)(this.uiMetricService);
  }

  _createClass(SnapshotRestoreUIPlugin, [{
    key: "setup",
    value: function setup(coreSetup, plugins) {
      var _this = this;

      var config = this.initializerContext.config.get();
      var http = coreSetup.http;
      var management = plugins.management,
          usageCollection = plugins.usageCollection; // Initialize services

      this.uiMetricService.setup(usageCollection);

      _text.textService.setup(_i18n.i18n);

      _http.httpService.setup(http);

      management.sections.getSection('elasticsearch').registerApp({
        id: _constants.PLUGIN.id,
        title: _i18n.i18n.translate('xpack.snapshotRestore.appTitle', {
          defaultMessage: 'Snapshot and Restore'
        }),
        order: 7,
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref, mountManagementSection, services;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return import('./application/mount_management_section');

                  case 2:
                    _ref = _context.sent;
                    mountManagementSection = _ref.mountManagementSection;
                    services = {
                      uiMetricService: _this.uiMetricService
                    };
                    _context.next = 7;
                    return mountManagementSection(coreSetup, services, config, params);

                  case 7:
                    return _context.abrupt("return", _context.sent);

                  case 8:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function mount(_x) {
            return _mount.apply(this, arguments);
          }

          return mount;
        }()
      });
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return SnapshotRestoreUIPlugin;
}();

exports.SnapshotRestoreUIPlugin = SnapshotRestoreUIPlugin;