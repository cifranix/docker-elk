"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountManagementSection = mountManagementSection;

var _public = require("../../../../../src/plugins/kibana_utils/public");

var _navigation = require("./services/navigation");

var _text = require("./services/text");

var _app = require("./app");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var localStorage = new _public.Storage(window.localStorage);

function mountManagementSection(_x, _x2) {
  return _mountManagementSection.apply(this, arguments);
}

function _mountManagementSection() {
  _mountManagementSection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(coreSetup, params) {
    var element, setBreadcrumbs, http, notifications, getStartServices, startServices, _startServices, core, plugins, chrome, docLinks, i18n, overlays, savedObjects, uiSettings, data, docTitle, appDependencies;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            element = params.element, setBreadcrumbs = params.setBreadcrumbs;
            http = coreSetup.http, notifications = coreSetup.notifications, getStartServices = coreSetup.getStartServices;
            _context.next = 4;
            return getStartServices();

          case 4:
            startServices = _context.sent;
            _startServices = _slicedToArray(startServices, 2), core = _startServices[0], plugins = _startServices[1];
            chrome = core.chrome, docLinks = core.docLinks, i18n = core.i18n, overlays = core.overlays, savedObjects = core.savedObjects, uiSettings = core.uiSettings;
            data = plugins.data;
            docTitle = chrome.docTitle; // Initialize services

            _text.textService.init();

            _navigation.docTitleService.init(docTitle.change);

            _navigation.breadcrumbService.setup(setBreadcrumbs); // AppCore/AppPlugins to be passed on as React context


            appDependencies = {
              chrome: chrome,
              data: data,
              docLinks: docLinks,
              http: http,
              i18n: i18n,
              notifications: notifications,
              overlays: overlays,
              savedObjects: savedObjects,
              storage: localStorage,
              uiSettings: uiSettings
            };
            return _context.abrupt("return", (0, _app.renderApp)(element, appDependencies));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _mountManagementSection.apply(this, arguments);
}