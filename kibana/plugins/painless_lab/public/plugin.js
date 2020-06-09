"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PainlessLabUIPlugin = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _operators = require("rxjs/operators");

var _eui = require("@elastic/eui");

var _public = require("../../../../src/plugins/home/public");

var _constants = require("../common/constants");

var _links = require("./links");

var _services = require("./services");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var PainlessLabUIPlugin =
/*#__PURE__*/
function () {
  function PainlessLabUIPlugin() {
    _classCallCheck(this, PainlessLabUIPlugin);

    _defineProperty(this, "languageService", new _services.LanguageService());
  }

  _createClass(PainlessLabUIPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref, _ref2) {
        var _this = this;

        var http, getStartServices, uiSettings, devTools, home, licensing;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                http = _ref.http, getStartServices = _ref.getStartServices, uiSettings = _ref.uiSettings;
                devTools = _ref2.devTools, home = _ref2.home, licensing = _ref2.licensing;
                home.featureCatalogue.register({
                  id: _constants.PLUGIN.id,
                  title: _i18n.i18n.translate('xpack.painlessLab.registryProviderTitle', {
                    defaultMessage: 'Painless Lab (beta)'
                  }),
                  description: _i18n.i18n.translate('xpack.painlessLab.registryProviderDescription', {
                    defaultMessage: 'Simulate and debug painless code.'
                  }),
                  icon: '',
                  path: '/app/kibana#/dev_tools/painless_lab',
                  showOnHomePage: false,
                  category: _public.FeatureCatalogueCategory.ADMIN
                });
                devTools.register({
                  id: 'painless_lab',
                  order: 7,
                  title: _react.default.createElement(_eui.EuiFlexGroup, {
                    gutterSize: "s",
                    alignItems: "center",
                    responsive: false
                  }, _react.default.createElement(_eui.EuiFlexItem, {
                    grow: false
                  }, _i18n.i18n.translate('xpack.painlessLab.displayName', {
                    defaultMessage: 'Painless Lab'
                  })), _react.default.createElement(_eui.EuiFlexItem, {
                    grow: false,
                    className: "painlessLab__betaLabelContainer"
                  }, _react.default.createElement(_eui.EuiBetaBadge, {
                    label: _i18n.i18n.translate('xpack.painlessLab.displayNameBetaLabel', {
                      defaultMessage: 'Beta'
                    }),
                    tooltipContent: _i18n.i18n.translate('xpack.painlessLab.displayNameBetaTooltipText', {
                      defaultMessage: 'This feature might change drastically in future releases'
                    })
                  }))),
                  enableRouting: false,
                  disabled: false,
                  mount: function () {
                    var _mount = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(ctx, _ref3) {
                      var element, _ref4, _ref5, core, I18nContext, notifications, docLinks, chrome, license, _license$check, state, invalidLicenseMessage, isValidLicense, _ref6, renderApp, tearDownApp;

                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              element = _ref3.element;
                              _context.next = 3;
                              return getStartServices();

                            case 3:
                              _ref4 = _context.sent;
                              _ref5 = _slicedToArray(_ref4, 1);
                              core = _ref5[0];
                              I18nContext = core.i18n.Context, notifications = core.notifications, docLinks = core.docLinks, chrome = core.chrome;

                              _this.languageService.setup();

                              _context.next = 10;
                              return licensing.license$.pipe((0, _operators.first)()).toPromise();

                            case 10:
                              license = _context.sent;
                              _license$check = license.check(_constants.PLUGIN.id, _constants.PLUGIN.minimumLicenseType), state = _license$check.state, invalidLicenseMessage = _license$check.message;
                              isValidLicense = state === 'valid';

                              if (isValidLicense) {
                                _context.next = 17;
                                break;
                              }

                              notifications.toasts.addDanger(invalidLicenseMessage);
                              window.location.hash = '/dev_tools';
                              return _context.abrupt("return", function () {});

                            case 17:
                              _context.next = 19;
                              return import('./application');

                            case 19:
                              _ref6 = _context.sent;
                              renderApp = _ref6.renderApp;
                              tearDownApp = renderApp(element, {
                                I18nContext: I18nContext,
                                http: http,
                                uiSettings: uiSettings,
                                links: (0, _links.getLinks)(docLinks),
                                chrome: chrome
                              });
                              return _context.abrupt("return", function () {
                                tearDownApp();
                              });

                            case 23:
                            case "end":
                              return _context.stop();
                          }
                        }
                      }, _callee);
                    }));

                    function mount(_x3, _x4) {
                      return _mount.apply(this, arguments);
                    }

                    return mount;
                  }()
                });

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function setup(_x, _x2) {
        return _setup.apply(this, arguments);
      }

      return setup;
    }()
  }, {
    key: "start",
    value: function () {
      var _start = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(core, plugins) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function start(_x5, _x6) {
        return _start.apply(this, arguments);
      }

      return start;
    }()
  }, {
    key: "stop",
    value: function () {
      var _stop = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                this.languageService.stop();

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }]);

  return PainlessLabUIPlugin;
}();

exports.PainlessLabUIPlugin = PainlessLabUIPlugin;