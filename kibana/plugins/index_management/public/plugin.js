"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexMgmtUIPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _constants = require("../common/constants");

var _http = require("./application/services/http");

var _notification = require("./application/services/notification");

var _ui_metric = require("./application/services/ui_metric");

var _selectors = require("./application/store/selectors");

var _api = require("./application/services/api");

var _services = require("./services");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IndexMgmtUIPlugin =
/*#__PURE__*/
function () {
  function IndexMgmtUIPlugin() {
    _classCallCheck(this, IndexMgmtUIPlugin);

    _defineProperty(this, "uiMetricService", new _ui_metric.UiMetricService(_constants.UIM_APP_NAME));

    _defineProperty(this, "extensionsService", new _services.ExtensionsService());

    // Temporary hack to provide the service instances in module files in order to avoid a big refactor
    // For the selectors we should expose them through app dependencies and read them from there on each container component.
    (0, _selectors.setExtensionsService)(this.extensionsService);
    (0, _api.setUiMetricService)(this.uiMetricService);
  }

  _createClass(IndexMgmtUIPlugin, [{
    key: "setup",
    value: function setup(coreSetup, plugins) {
      var _this = this;

      var http = coreSetup.http,
          notifications = coreSetup.notifications;
      var usageCollection = plugins.usageCollection,
          management = plugins.management;

      _http.httpService.setup(http);

      _notification.notificationService.setup(notifications);

      this.uiMetricService.setup(usageCollection);
      management.sections.getSection('elasticsearch').registerApp({
        id: _constants.PLUGIN.id,
        title: _i18n.i18n.translate('xpack.idxMgmt.appTitle', {
          defaultMessage: 'Index Management'
        }),
        order: 1,
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
                      httpService: _http.httpService,
                      notificationService: _notification.notificationService,
                      uiMetricService: _this.uiMetricService,
                      extensionsService: _this.extensionsService
                    };
                    return _context.abrupt("return", mountManagementSection(coreSetup, usageCollection, services, params));

                  case 6:
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
      return {
        extensionsService: this.extensionsService.setup()
      };
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return IndexMgmtUIPlugin;
}();

exports.IndexMgmtUIPlugin = IndexMgmtUIPlugin;