"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LicenseManagementUIPlugin = void 0;

var _operators = require("rxjs/operators");

var _constants = require("../common/constants");

var _breadcrumbs = require("./application/breadcrumbs");

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

var LicenseManagementUIPlugin =
/*#__PURE__*/
function () {
  function LicenseManagementUIPlugin(initializerContext) {
    _classCallCheck(this, LicenseManagementUIPlugin);

    this.initializerContext = initializerContext;

    _defineProperty(this, "breadcrumbService", new _breadcrumbs.BreadcrumbService());
  }

  _createClass(LicenseManagementUIPlugin, [{
    key: "setup",
    value: function setup(coreSetup, plugins) {
      var _this = this;

      var config = this.initializerContext.config.get();

      if (!config.ui.enabled) {
        // No need to go any further
        return {
          enabled: false
        };
      }

      var getStartServices = coreSetup.getStartServices;
      var management = plugins.management,
          telemetry = plugins.telemetry,
          licensing = plugins.licensing;
      management.sections.getSection('elasticsearch').registerApp({
        id: _constants.PLUGIN.id,
        title: _constants.PLUGIN.title,
        order: 99,
        mount: function () {
          var _mount = _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee(_ref) {
            var element, setBreadcrumbs, _ref2, _ref3, core, initialLicense, docLinks, ELASTIC_WEBSITE_URL, DOC_LINK_VERSION, esBase, appDocLinks, appDependencies, _ref4, renderApp;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    element = _ref.element, setBreadcrumbs = _ref.setBreadcrumbs;
                    _context.next = 3;
                    return getStartServices();

                  case 3:
                    _ref2 = _context.sent;
                    _ref3 = _slicedToArray(_ref2, 1);
                    core = _ref3[0];
                    _context.next = 8;
                    return plugins.licensing.license$.pipe((0, _operators.first)()).toPromise();

                  case 8:
                    initialLicense = _context.sent;
                    // Setup documentation links
                    docLinks = core.docLinks;
                    ELASTIC_WEBSITE_URL = docLinks.ELASTIC_WEBSITE_URL, DOC_LINK_VERSION = docLinks.DOC_LINK_VERSION;
                    esBase = "".concat(ELASTIC_WEBSITE_URL, "guide/en/elasticsearch/reference/").concat(DOC_LINK_VERSION);
                    appDocLinks = {
                      security: "".concat(esBase, "/security-settings.html")
                    }; // Setup services

                    _this.breadcrumbService.setup(setBreadcrumbs);

                    appDependencies = {
                      core: core,
                      config: config,
                      plugins: {
                        licensing: licensing,
                        telemetry: telemetry
                      },
                      services: {
                        breadcrumbService: _this.breadcrumbService
                      },
                      store: {
                        initialLicense: initialLicense
                      },
                      docLinks: appDocLinks
                    };
                    _context.next = 17;
                    return import('./application');

                  case 17:
                    _ref4 = _context.sent;
                    renderApp = _ref4.renderApp;
                    return _context.abrupt("return", renderApp(element, appDependencies));

                  case 20:
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
        enabled: true
      };
    }
  }, {
    key: "start",
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }]);

  return LicenseManagementUIPlugin;
}();

exports.LicenseManagementUIPlugin = LicenseManagementUIPlugin;