"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoteClustersUIPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _breadcrumb = require("./application/services/breadcrumb");

var _documentation = require("./application/services/documentation");

var _http = require("./application/services/http");

var _ui_metric = require("./application/services/ui_metric");

var _notification = require("./application/services/notification");

var _redirect = require("./application/services/redirect");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RemoteClustersUIPlugin =
/*#__PURE__*/
function () {
  function RemoteClustersUIPlugin(initializerContext) {
    _classCallCheck(this, RemoteClustersUIPlugin);

    this.initializerContext = initializerContext;
  }

  _createClass(RemoteClustersUIPlugin, [{
    key: "setup",
    value: function setup(_ref, _ref2) {
      var toasts = _ref.notifications.toasts,
          http = _ref.http,
          getStartServices = _ref.getStartServices;
      var management = _ref2.management,
          usageCollection = _ref2.usageCollection,
          cloud = _ref2.cloud;

      var _this$initializerCont = this.initializerContext.config.get(),
          isRemoteClustersUiEnabled = _this$initializerCont.ui.enabled;

      if (isRemoteClustersUiEnabled) {
        var esSection = management.sections.getSection('elasticsearch');
        esSection.registerApp({
          id: 'remote_clusters',
          title: _i18n.i18n.translate('xpack.remoteClusters.appTitle', {
            defaultMessage: 'Remote Clusters'
          }),
          mount: function () {
            var _mount = _asyncToGenerator(
            /*#__PURE__*/
            regeneratorRuntime.mark(function _callee(_ref3) {
              var element, setBreadcrumbs, _ref4, _ref5, core, i18nContext, docLinks, fatalErrors, isCloudEnabled, _ref6, renderApp;

              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      element = _ref3.element, setBreadcrumbs = _ref3.setBreadcrumbs;
                      _context.next = 3;
                      return getStartServices();

                    case 3:
                      _ref4 = _context.sent;
                      _ref5 = _slicedToArray(_ref4, 1);
                      core = _ref5[0];
                      i18nContext = core.i18n.Context, docLinks = core.docLinks, fatalErrors = core.fatalErrors; // Initialize services

                      (0, _breadcrumb.init)(setBreadcrumbs);
                      (0, _documentation.init)(docLinks);
                      (0, _ui_metric.init)(usageCollection);
                      (0, _notification.init)(toasts, fatalErrors);
                      (0, _http.init)(http);
                      isCloudEnabled = Boolean(cloud === null || cloud === void 0 ? void 0 : cloud.isCloudEnabled);
                      _context.next = 15;
                      return import('./application');

                    case 15:
                      _ref6 = _context.sent;
                      renderApp = _ref6.renderApp;
                      return _context.abrupt("return", renderApp(element, i18nContext, {
                        isCloudEnabled: isCloudEnabled
                      }));

                    case 18:
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
    }
  }, {
    key: "start",
    value: function start(_ref7) {
      var application = _ref7.application;

      var _this$initializerCont2 = this.initializerContext.config.get(),
          isRemoteClustersUiEnabled = _this$initializerCont2.ui.enabled;

      if (isRemoteClustersUiEnabled) {
        (0, _redirect.init)(application.navigateToApp);
      }
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return RemoteClustersUIPlugin;
}();

exports.RemoteClustersUIPlugin = RemoteClustersUIPlugin;