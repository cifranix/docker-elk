"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _public = require("../../../../../src/plugins/kibana_utils/public");

var _public2 = require("../../../../../src/plugins/kibana_react/public");

var _dependency_cache = require("./util/dependency_cache");

var _license = require("./license");

var _routing = require("./routing");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var localStorage = new _public.Storage(window.localStorage);

var App = function App(_ref) {
  var coreStart = _ref.coreStart,
      deps = _ref.deps;
  var pageDeps = {
    indexPatterns: deps.data.indexPatterns,
    config: coreStart.uiSettings,
    setBreadcrumbs: coreStart.chrome.setBreadcrumbs
  };

  var services = _objectSpread({
    appName: 'ML',
    data: deps.data,
    security: deps.security,
    licenseManagement: deps.licenseManagement,
    storage: localStorage
  }, coreStart);

  var I18nContext = coreStart.i18n.Context;
  return _react.default.createElement(I18nContext, null, _react.default.createElement(_public2.KibanaContextProvider, {
    services: services
  }, _react.default.createElement(_routing.MlRouter, {
    pageDeps: pageDeps
  })));
};

var renderApp = function renderApp(coreStart, deps, appMountParams) {
  (0, _dependency_cache.setDependencyCache)({
    indexPatterns: deps.data.indexPatterns,
    timefilter: deps.data.query.timefilter,
    fieldFormats: deps.data.fieldFormats,
    autocomplete: deps.data.autocomplete,
    config: coreStart.uiSettings,
    chrome: coreStart.chrome,
    docLinks: coreStart.docLinks,
    toastNotifications: coreStart.notifications.toasts,
    overlays: coreStart.overlays,
    recentlyAccessed: coreStart.chrome.recentlyAccessed,
    basePath: coreStart.http.basePath,
    savedObjectsClient: coreStart.savedObjects.client,
    application: coreStart.application,
    http: coreStart.http,
    security: deps.security,
    urlGenerators: deps.share.urlGenerators
  });
  var mlLicense = (0, _license.setLicenseCache)(deps.licensing);
  appMountParams.onAppLeave(function (actions) {
    return actions.default();
  });

  _reactDom.default.render(_react.default.createElement(App, {
    coreStart: coreStart,
    deps: deps
  }), appMountParams.element);

  return function () {
    mlLicense.unsubscribe();
    (0, _dependency_cache.clearCache)();

    _reactDom.default.unmountComponentAtNode(appMountParams.element);
  };
};

exports.renderApp = renderApp;