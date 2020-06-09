"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SearchProfilerUIPlugin = void 0;

var _i18n = require("@kbn/i18n");

var _operators = require("rxjs/operators");

var _public = require("../../../../src/plugins/home/public");

var _common = require("../common");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SearchProfilerUIPlugin =
/*#__PURE__*/
function () {
  function SearchProfilerUIPlugin(ctx) {
    _classCallCheck(this, SearchProfilerUIPlugin);
  }

  _createClass(SearchProfilerUIPlugin, [{
    key: "setup",
    value: function () {
      var _setup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(_ref, _ref2) {
        var http, getStartServices, devTools, home, licensing;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                http = _ref.http, getStartServices = _ref.getStartServices;
                devTools = _ref2.devTools, home = _ref2.home, licensing = _ref2.licensing;
                home.featureCatalogue.register({
                  id: _common.PLUGIN.id,
                  title: _i18n.i18n.translate('xpack.searchProfiler.registryProviderTitle', {
                    defaultMessage: 'Search Profiler'
                  }),
                  description: _i18n.i18n.translate('xpack.searchProfiler.registryProviderDescription', {
                    defaultMessage: 'Quickly check the performance of any Elasticsearch query.'
                  }),
                  icon: 'searchProfilerApp',
                  path: '/app/kibana#/dev_tools/searchprofiler',
                  showOnHomePage: false,
                  category: _public.FeatureCatalogueCategory.ADMIN
                });
                devTools.register({
                  id: 'searchprofiler',
                  title: _i18n.i18n.translate('xpack.searchProfiler.pageDisplayName', {
                    defaultMessage: 'Search Profiler'
                  }),
                  order: 5,
                  enableRouting: false,
                  mount: function () {
                    var _mount = _asyncToGenerator(
                    /*#__PURE__*/
                    regeneratorRuntime.mark(function _callee(ctx, params) {
                      var _ref3, _ref4, coreStart, notifications, i18nDep, _ref5, boot, license, _license$check, state, message, initialLicenseStatus;

                      return regeneratorRuntime.wrap(function _callee$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return getStartServices();

                            case 2:
                              _ref3 = _context.sent;
                              _ref4 = _slicedToArray(_ref3, 1);
                              coreStart = _ref4[0];
                              notifications = coreStart.notifications, i18nDep = coreStart.i18n;
                              _context.next = 8;
                              return import('./application/boot');

                            case 8:
                              _ref5 = _context.sent;
                              boot = _ref5.boot;
                              _context.next = 12;
                              return licensing.license$.pipe((0, _operators.first)()).toPromise();

                            case 12:
                              license = _context.sent;
                              _license$check = license.check(_common.PLUGIN.id, _common.PLUGIN.minimumLicenseType), state = _license$check.state, message = _license$check.message;
                              initialLicenseStatus = state === 'valid' ? {
                                valid: true
                              } : {
                                valid: false,
                                message: message
                              };
                              return _context.abrupt("return", boot({
                                http: http,
                                initialLicenseStatus: initialLicenseStatus,
                                el: params.element,
                                I18nContext: i18nDep.Context,
                                notifications: notifications.toasts
                              }));

                            case 16:
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
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function stop() {
        return _stop.apply(this, arguments);
      }

      return stop;
    }()
  }]);

  return SearchProfilerUIPlugin;
}();

exports.SearchProfilerUIPlugin = SearchProfilerUIPlugin;