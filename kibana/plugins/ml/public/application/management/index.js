"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initManagementSection = initManagementSection;

var _i18n = require("@kbn/i18n");

var _operators = require("rxjs/operators");

var _app = require("../../../common/constants/app");

var _license = require("../../../common/license");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function initManagementSection(pluginsSetup, core) {
  var licensing = pluginsSetup.licensing.license$.pipe((0, _operators.take)(1));
  licensing.subscribe(function (license) {
    var management = pluginsSetup.management;

    if (management !== undefined && license.check(_app.PLUGIN_ID, _license.MINIMUM_FULL_LICENSE).state === 'valid') {
      var mlSection = management.sections.register({
        id: _app.PLUGIN_ID,
        title: _i18n.i18n.translate('xpack.ml.management.mlTitle', {
          defaultMessage: 'Machine Learning'
        }),
        order: 100,
        icon: _app.PLUGIN_ICON
      });
      mlSection.registerApp({
        id: 'jobsListLink',
        title: _i18n.i18n.translate('xpack.ml.management.jobsListTitle', {
          defaultMessage: 'Jobs list'
        }),
        order: 10,
        mount: function mount(params) {
          return _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var _ref, mountApp;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return import('./jobs_list');

                  case 2:
                    _ref = _context.sent;
                    mountApp = _ref.mountApp;
                    return _context.abrupt("return", mountApp(core, params));

                  case 5:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      });
    }
  });
}