"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GraphPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _public = require("../../../../src/plugins/kibana_utils/public");

var _public2 = require("../../../../src/plugins/kibana_legacy/public");

var _toggle_nav_link = require("./services/toggle_nav_link");

var _check_license = require("../common/check_license");

var _public3 = require("../../../../src/plugins/home/public");

var _utils = require("../../../../src/core/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GraphPlugin =
/*#__PURE__*/
function () {
  function GraphPlugin(initializerContext) {
    _classCallCheck(this, GraphPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "licensing", null);
  }

  _createClass(GraphPlugin, [{
    key: "setup",
    value: function setup(core, _ref) {
      var _this = this;

      var licensing = _ref.licensing,
          home = _ref.home;
      this.licensing = licensing;

      if (home) {
        home.featureCatalogue.register({
          id: 'graph',
          title: 'Graph',
          description: _i18n.i18n.translate('xpack.graph.pluginDescription', {
            defaultMessage: 'Surface and analyze relevant relationships in your Elasticsearch data.'
          }),
          icon: 'graphApp',
          path: '/app/graph',
          showOnHomePage: true,
          category: _public3.FeatureCatalogueCategory.DATA
        });
      }

      var config = this.initializerContext.config.get();
      (0, _public2.initAngularBootstrap)();
      core.application.register({
        id: 'graph',
        title: 'Graph',
        order: 9000,
        appRoute: '/app/graph',
        euiIconType: 'graphApp',
        category: _utils.DEFAULT_APP_CATEGORIES.analyze,
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref2, _ref3, coreStart, pluginsStart, _ref4, renderApp;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return core.getStartServices();

                  case 2:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 2);
                    coreStart = _ref3[0];
                    pluginsStart = _ref3[1];
                    _context.next = 8;
                    return import('./application');

                  case 8:
                    _ref4 = _context.sent;
                    renderApp = _ref4.renderApp;
                    return _context.abrupt("return", renderApp(_objectSpread({}, params, {
                      pluginInitializerContext: _this.initializerContext,
                      licensing: licensing,
                      core: coreStart,
                      navigation: pluginsStart.navigation,
                      data: pluginsStart.data,
                      savedObjectsClient: coreStart.savedObjects.client,
                      addBasePath: core.http.basePath.prepend,
                      getBasePath: core.http.basePath.get,
                      canEditDrillDownUrls: config.canEditDrillDownUrls,
                      graphSavePolicy: config.savePolicy,
                      storage: new _public.Storage(window.localStorage),
                      capabilities: coreStart.application.capabilities.graph,
                      coreStart: coreStart,
                      chrome: coreStart.chrome,
                      config: coreStart.uiSettings,
                      toastNotifications: coreStart.notifications.toasts,
                      indexPatterns: pluginsStart.data.indexPatterns,
                      overlays: coreStart.overlays
                    })));

                  case 11:
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
    value: function start(core) {
      if (this.licensing === null) {
        throw new Error('Start called before setup');
      }

      this.licensing.license$.subscribe(function (license) {
        (0, _toggle_nav_link.toggleNavLink)((0, _check_license.checkLicense)(license), core.chrome.navLinks);
      });
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return GraphPlugin;
}();

exports.GraphPlugin = GraphPlugin;