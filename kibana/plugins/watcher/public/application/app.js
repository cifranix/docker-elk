"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AppWithoutRouter = exports.App = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _watch_status = require("./sections/watch_status/components/watch_status");

var _watch_edit = require("./sections/watch_edit/components/watch_edit");

var _watch_list = require("./sections/watch_list/components/watch_list");

var _navigation = require("./lib/navigation");

var _constants = require("./constants");

var _app_context = require("./app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ShareRouter = (0, _reactRouterDom.withRouter)(function (_ref) {
  var children = _ref.children,
      history = _ref.history;
  (0, _navigation.registerRouter)({
    history: history
  });
  return children;
});

var App = function App(deps) {
  var _useState = (0, _react.useState)({
    valid: true
  }),
      _useState2 = _slicedToArray(_useState, 2),
      _useState2$ = _useState2[0],
      valid = _useState2$.valid,
      message = _useState2$.message,
      setLicenseStatus = _useState2[1];

  (0, _react.useEffect)(function () {
    var s = deps.licenseStatus$.subscribe(setLicenseStatus);
    return function () {
      return s.unsubscribe();
    };
  }, [deps.licenseStatus$]);

  if (!valid) {
    return _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.app.licenseErrorTitle",
        defaultMessage: "License error"
      }),
      color: "danger",
      iconType: "help"
    }, message, ' ', _react.default.createElement(_eui.EuiLink, {
      href: "#/management/elasticsearch/license_management/home"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.app.licenseErrorLinkText",
      defaultMessage: "Manage your license."
    })));
  }

  return _react.default.createElement(_reactRouterDom.HashRouter, null, _react.default.createElement(ShareRouter, null, _react.default.createElement(_app_context.AppContextProvider, {
    value: deps
  }, _react.default.createElement(AppWithoutRouter, null))));
}; // Export this so we can test it with a different router.


exports.App = App;

var AppWithoutRouter = function AppWithoutRouter() {
  return _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "watches"),
    component: _watch_list.WatchList
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "watches/watch/:id/status"),
    component: _watch_status.WatchStatus
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "watches/watch/:id/edit"),
    component: _watch_edit.WatchEdit
  }), _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "".concat(_constants.BASE_PATH, "watches/new-watch/:type(json|threshold)"),
    component: _watch_edit.WatchEdit
  }), _react.default.createElement(_reactRouterDom.Redirect, {
    from: _constants.BASE_PATH,
    to: "".concat(_constants.BASE_PATH, "watches")
  }));
};

exports.AppWithoutRouter = AppWithoutRouter;