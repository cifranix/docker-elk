"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = void 0;

var _i18n = require("@kbn/i18n");

var _lodash = require("lodash");

var _utils = require("../../../../src/core/utils");

var _legacy_singletons = require("./legacy_singletons");

var _register_feature = require("./register_feature");

var _metric_threshold_alert_type = require("./components/alerting/metrics/metric_threshold_alert_type");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var getMergedPlugins = function getMergedPlugins(setup, start) {
  return (0, _lodash.merge)({}, setup, start);
};

var Plugin =
/*#__PURE__*/
function () {
  function Plugin(context) {
    _classCallCheck(this, Plugin);
  }

  _createClass(Plugin, [{
    key: "setup",
    value: function setup(core, pluginsSetup) {
      var _this = this;

      (0, _register_feature.registerFeatures)(pluginsSetup.home);
      pluginsSetup.triggers_actions_ui.alertTypeRegistry.register((0, _metric_threshold_alert_type.getAlertType)());
      core.application.register({
        id: 'logs',
        title: _i18n.i18n.translate('xpack.infra.logs.pluginTitle', {
          defaultMessage: 'Logs'
        }),
        euiIconType: 'logsApp',
        order: 8001,
        appRoute: '/app/logs',
        category: _utils.DEFAULT_APP_CATEGORIES.observability,
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref, _ref2, coreStart, pluginsStart, plugins, _ref3, startApp, composeLibs, LogsRouter;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return core.getStartServices();

                  case 2:
                    _ref = _context.sent;
                    _ref2 = _slicedToArray(_ref, 2);
                    coreStart = _ref2[0];
                    pluginsStart = _ref2[1];
                    plugins = getMergedPlugins(pluginsSetup, pluginsStart);
                    _context.next = 9;
                    return _this.downloadAssets();

                  case 9:
                    _ref3 = _context.sent;
                    startApp = _ref3.startApp;
                    composeLibs = _ref3.composeLibs;
                    LogsRouter = _ref3.LogsRouter;
                    return _context.abrupt("return", startApp(composeLibs(coreStart), coreStart, plugins, params, LogsRouter, pluginsSetup.triggers_actions_ui));

                  case 14:
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
      core.application.register({
        id: 'metrics',
        title: _i18n.i18n.translate('xpack.infra.metrics.pluginTitle', {
          defaultMessage: 'Metrics'
        }),
        euiIconType: 'metricsApp',
        order: 8000,
        appRoute: '/app/metrics',
        category: _utils.DEFAULT_APP_CATEGORIES.observability,
        mount: function () {
          var _mount2 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee2(params) {
            var _ref4, _ref5, coreStart, pluginsStart, plugins, _ref6, startApp, composeLibs, MetricsRouter;

            return regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return core.getStartServices();

                  case 2:
                    _ref4 = _context2.sent;
                    _ref5 = _slicedToArray(_ref4, 2);
                    coreStart = _ref5[0];
                    pluginsStart = _ref5[1];
                    plugins = getMergedPlugins(pluginsSetup, pluginsStart);
                    _context2.next = 9;
                    return _this.downloadAssets();

                  case 9:
                    _ref6 = _context2.sent;
                    startApp = _ref6.startApp;
                    composeLibs = _ref6.composeLibs;
                    MetricsRouter = _ref6.MetricsRouter;
                    return _context2.abrupt("return", startApp(composeLibs(coreStart), coreStart, plugins, params, MetricsRouter, pluginsSetup.triggers_actions_ui));

                  case 14:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function mount(_x2) {
            return _mount2.apply(this, arguments);
          }

          return mount;
        }()
      });
      /* This exists purely to facilitate URL redirects from the old App ID ("infra"),
      to our new App IDs ("metrics" and "logs"). With version 8.0.0 we can remove this. */

      core.application.register({
        id: 'infra',
        appRoute: '/app/infra',
        title: 'infra',
        navLinkStatus: 3,
        mount: function () {
          var _mount3 = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3(params) {
            var _ref7, startLegacyApp;

            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return import('./apps/start_legacy_app');

                  case 2:
                    _ref7 = _context3.sent;
                    startLegacyApp = _ref7.startLegacyApp;
                    return _context3.abrupt("return", startLegacyApp(params));

                  case 5:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function mount(_x3) {
            return _mount3.apply(this, arguments);
          }

          return mount;
        }()
      });
    }
  }, {
    key: "start",
    value: function start(core, plugins) {
      (0, _legacy_singletons.registerStartSingleton)(core);
    }
  }, {
    key: "downloadAssets",
    value: function () {
      var _downloadAssets = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _ref8, _ref9, startApp, composeLibs, _ref9$, LogsRouter, MetricsRouter;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return Promise.all([import('./apps/start_app'), import('./compose_libs'), import('./routers')]);

              case 2:
                _ref8 = _context4.sent;
                _ref9 = _slicedToArray(_ref8, 3);
                startApp = _ref9[0].startApp;
                composeLibs = _ref9[1].composeLibs;
                _ref9$ = _ref9[2];
                LogsRouter = _ref9$.LogsRouter;
                MetricsRouter = _ref9$.MetricsRouter;
                return _context4.abrupt("return", {
                  startApp: startApp,
                  composeLibs: composeLibs,
                  LogsRouter: LogsRouter,
                  MetricsRouter: MetricsRouter
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function downloadAssets() {
        return _downloadAssets.apply(this, arguments);
      }

      return downloadAssets;
    }()
  }]);

  return Plugin;
}();

exports.Plugin = Plugin;