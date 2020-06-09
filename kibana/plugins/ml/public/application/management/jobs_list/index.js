"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mountApp = mountApp;

var _reactDom = _interopRequireWildcard(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _components = require("./components");

var _breadcrumbs = require("../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var renderApp = function renderApp(element, coreStart) {
  var I18nContext = coreStart.i18n.Context;

  _reactDom.default.render(_react.default.createElement(_components.JobsListPage, {
    I18nContext: I18nContext
  }), element);

  return function () {
    (0, _reactDom.unmountComponentAtNode)(element);
  };
};

function mountApp(_x, _x2) {
  return _mountApp.apply(this, arguments);
}

function _mountApp() {
  _mountApp = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(core, params) {
    var _ref, _ref2, coreStart;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return core.getStartServices();

          case 2:
            _ref = _context.sent;
            _ref2 = _slicedToArray(_ref, 1);
            coreStart = _ref2[0];
            params.setBreadcrumbs((0, _breadcrumbs.getJobsListBreadcrumbs)());
            return _context.abrupt("return", renderApp(params.element, coreStart));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _mountApp.apply(this, arguments);
}