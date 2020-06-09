"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderApp = void 0;

var _angular = _interopRequireDefault(require("angular"));

var _angular2 = require("@kbn/i18n/angular");

require("../../../../webpackShims/ace");

require("angular-sanitize");

var _app = require("./app");

var _check_license = require("../common/check_license");

var _public = require("../../../../src/plugins/kibana_legacy/public");

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var renderApp = function renderApp(_ref) {
  var appBasePath = _ref.appBasePath,
      element = _ref.element,
      deps = _objectWithoutProperties(_ref, ["appBasePath", "element"]);

  var graphAngularModule = createLocalAngularModule(deps.navigation);
  (0, _public.configureAppAngularModule)(graphAngularModule, {
    core: deps.core,
    env: deps.pluginInitializerContext.env
  }, true);
  var licenseSubscription = deps.licensing.license$.subscribe(function (license) {
    var info = (0, _check_license.checkLicense)(license);
    var licenseAllowsToShowThisPage = info.showAppLink && info.enableAppLink;

    if (!licenseAllowsToShowThisPage) {
      var newUrl = (0, _public.addAppRedirectMessageToUrl)(deps.addBasePath('/app/kibana'), info.message);
      window.location.href = newUrl;
    }
  });
  (0, _app.initGraphApp)(graphAngularModule, deps);
  var $injector = mountGraphApp(appBasePath, element);
  return function () {
    licenseSubscription.unsubscribe();
    $injector.get('$rootScope').$destroy();
  };
};

exports.renderApp = renderApp;

var mainTemplate = function mainTemplate(basePath) {
  return "<div ng-view class=\"kbnLocalApplicationWrapper\">\n  <base href=\"".concat(basePath, "\" />\n</div>\n");
};

var moduleName = 'app/graph';
var thirdPartyAngularDependencies = ['ngSanitize', 'ngRoute', 'react', 'ui.bootstrap', 'ui.ace'];

function mountGraphApp(appBasePath, element) {
  var mountpoint = document.createElement('div');
  mountpoint.setAttribute('class', 'kbnLocalApplicationWrapper'); // eslint-disable-next-line

  mountpoint.innerHTML = mainTemplate(appBasePath); // bootstrap angular into detached element and attach it later to
  // make angular-within-angular possible

  var $injector = _angular.default.bootstrap(mountpoint, [moduleName]);

  element.appendChild(mountpoint);
  element.setAttribute('class', 'kbnLocalApplicationWrapper');
  return $injector;
}

function createLocalAngularModule(navigation) {
  createLocalI18nModule();
  createLocalTopNavModule(navigation);

  var graphAngularModule = _angular.default.module(moduleName, [].concat(thirdPartyAngularDependencies, ['graphI18n', 'graphTopNav']));

  return graphAngularModule;
}

function createLocalTopNavModule(navigation) {
  _angular.default.module('graphTopNav', ['react']).directive('kbnTopNav', _public.createTopNavDirective).directive('kbnTopNavHelper', (0, _public.createTopNavHelper)(navigation.ui));
}

function createLocalI18nModule() {
  _angular.default.module('graphI18n', []).provider('i18n', _angular2.I18nProvider).filter('i18n', _angular2.i18nFilter).directive('i18nId', _angular2.i18nDirective);
}