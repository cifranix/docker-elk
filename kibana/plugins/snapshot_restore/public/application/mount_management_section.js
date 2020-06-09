"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountManagementSection = mountManagementSection;

var _i18n = require("@kbn/i18n");

var _http = require("./services/http");

var _navigation = require("./services/navigation");

var _documentation = require("./services/documentation");

var _ = require(".");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mountManagementSection(_x, _x2, _x3, _x4) {
  return _mountManagementSection.apply(this, arguments);
}

function _mountManagementSection() {
  _mountManagementSection = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(coreSetup, services, config, params) {
    var element, setBreadcrumbs, _ref, _ref2, core, docLinks, docTitle, appDependencies;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            element = params.element, setBreadcrumbs = params.setBreadcrumbs;
            _context.next = 3;
            return coreSetup.getStartServices();

          case 3:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            core = _ref2[0];
            docLinks = core.docLinks, docTitle = core.chrome.docTitle;

            _navigation.docTitleService.setup(docTitle.change);

            _navigation.breadcrumbService.setup(setBreadcrumbs);

            _documentation.documentationLinksService.setup(docLinks);

            appDependencies = {
              core: core,
              config: config,
              services: {
                httpService: _http.httpService,
                uiMetricService: services.uiMetricService,
                i18n: _i18n.i18n
              }
            };
            return _context.abrupt("return", (0, _.renderApp)(element, appDependencies));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _mountManagementSection.apply(this, arguments);
}