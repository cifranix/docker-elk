"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatcherUIPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _operators = require("rxjs/operators");

var _public = require("../../../../src/plugins/home/public");

var _constants = require("../common/constants");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var licenseToLicenseStatus = function licenseToLicenseStatus(license) {
  var _license$check = license.check(_constants.PLUGIN.ID, _constants.PLUGIN.MINIMUM_LICENSE_REQUIRED),
      state = _license$check.state,
      message = _license$check.message;

  return {
    valid: state === 'valid' && license.getFeature(_constants.PLUGIN.ID).isAvailable,
    message: message
  };
};

var WatcherUIPlugin =
/*#__PURE__*/
function () {
  function WatcherUIPlugin() {
    _classCallCheck(this, WatcherUIPlugin);
  }

  _createClass(WatcherUIPlugin, [{
    key: "setup",
    value: function setup(_ref, _ref2) {
      var notifications = _ref.notifications,
          http = _ref.http,
          uiSettings = _ref.uiSettings,
          getStartServices = _ref.getStartServices;
      var licensing = _ref2.licensing,
          management = _ref2.management,
          data = _ref2.data,
          home = _ref2.home,
          charts = _ref2.charts;
      var esSection = management.sections.getSection('elasticsearch');
      var watcherESApp = esSection.registerApp({
        id: 'watcher',
        title: _i18n.i18n.translate('xpack.watcher.sections.watchList.managementSection.watcherDisplayName', {
          defaultMessage: 'Watcher'
        }),
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(_ref3) {
            var element, setBreadcrumbs, _ref4, _ref5, core, i18nDep, docLinks, savedObjects, _ref6, boot, _ref7, TimeBuckets;

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
                    i18nDep = core.i18n, docLinks = core.docLinks, savedObjects = core.savedObjects;
                    _context.next = 9;
                    return import('./application/boot');

                  case 9:
                    _ref6 = _context.sent;
                    boot = _ref6.boot;
                    _context.next = 13;
                    return import('./legacy');

                  case 13:
                    _ref7 = _context.sent;
                    TimeBuckets = _ref7.TimeBuckets;
                    return _context.abrupt("return", boot({
                      // Skip the first license status, because that's already been used to determine
                      // whether to include Watcher.
                      licenseStatus$: licensing.license$.pipe((0, _operators.skip)(1), (0, _operators.map)(licenseToLicenseStatus)),
                      element: element,
                      toasts: notifications.toasts,
                      http: http,
                      uiSettings: uiSettings,
                      docLinks: docLinks,
                      setBreadcrumbs: setBreadcrumbs,
                      theme: charts.theme,
                      savedObjects: savedObjects.client,
                      I18nContext: i18nDep.Context,
                      createTimeBuckets: function createTimeBuckets() {
                        return new TimeBuckets(uiSettings, data);
                      }
                    }));

                  case 16:
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
      watcherESApp.disable(); // TODO: Fix the below dependency on `home` plugin inner workings
      // Because the home feature catalogue does not have enable/disable functionality we pass
      // the config in but keep a reference for enabling and disabling showing on home based on
      // license updates.

      var watcherHome = {
        id: 'watcher',
        title: 'Watcher',
        // This is a product name so we don't translate it.
        category: _public.FeatureCatalogueCategory.ADMIN,
        description: _i18n.i18n.translate('xpack.watcher.watcherDescription', {
          defaultMessage: 'Detect changes in your data by creating, managing, and monitoring alerts.'
        }),
        icon: 'watchesApp',
        path: '/app/kibana#/management/elasticsearch/watcher/watches',
        showOnHomePage: false
      };
      home.featureCatalogue.register(watcherHome);
      licensing.license$.pipe((0, _operators.first)(), (0, _operators.map)(licenseToLicenseStatus)).subscribe(function (_ref8) {
        var valid = _ref8.valid;

        if (valid) {
          watcherESApp.enable();
          watcherHome.showOnHomePage = true;
        }
      });
    }
  }, {
    key: "start",
    value: function start(core) {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return WatcherUIPlugin;
}();

exports.WatcherUIPlugin = WatcherUIPlugin;