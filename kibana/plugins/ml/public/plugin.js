"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MlPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _management = require("./application/management");

var _dependency_cache = require("./application/util/dependency_cache");

var _app = require("../common/constants/app");

var _register_feature = require("./register_feature");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MlPlugin =
/*#__PURE__*/
function () {
  function MlPlugin() {
    _classCallCheck(this, MlPlugin);
  }

  _createClass(MlPlugin, [{
    key: "setup",
    value: function setup(core, pluginsSetup) {
      core.application.register({
        id: _app.PLUGIN_ID,
        title: _i18n.i18n.translate('xpack.ml.plugin.title', {
          defaultMessage: 'Machine Learning'
        }),
        order: 30,
        euiIconType: _app.PLUGIN_ICON,
        appRoute: '/app/ml',
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(params) {
            var _ref, _ref2, coreStart, pluginsStart, _ref3, renderApp;

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
                    _context.next = 8;
                    return import('./application/app');

                  case 8:
                    _ref3 = _context.sent;
                    renderApp = _ref3.renderApp;
                    return _context.abrupt("return", renderApp(coreStart, {
                      data: pluginsStart.data,
                      share: pluginsStart.share,
                      security: pluginsSetup.security,
                      licensing: pluginsSetup.licensing,
                      management: pluginsSetup.management,
                      usageCollection: pluginsSetup.usageCollection,
                      licenseManagement: pluginsSetup.licenseManagement,
                      home: pluginsSetup.home
                    }, {
                      element: params.element,
                      appBasePath: params.appBasePath,
                      onAppLeave: params.onAppLeave,
                      history: params.history
                    }));

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
      (0, _register_feature.registerFeature)(pluginsSetup.home);
      (0, _management.initManagementSection)(pluginsSetup, core);
      return {};
    }
  }, {
    key: "start",
    value: function start(core, deps) {
      (0, _dependency_cache.setDependencyCache)({
        docLinks: core.docLinks,
        basePath: core.http.basePath,
        http: core.http,
        i18n: core.i18n
      });
      return {};
    }
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return MlPlugin;
}();

exports.MlPlugin = MlPlugin;