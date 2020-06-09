"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appRootRoute = exports.overviewRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _reactRouterDom = require("react-router-dom");

var _router = require("../router");

var _use_resolver = require("../use_resolver");

var _overview = require("../../overview");

var _license = require("../../license");

var _check_privilege = require("../../privilege/check_privilege");

var _ml_nodes_check = require("../../ml_nodes_check");

var _ml_server_info = require("../../services/ml_server_info");

var _kibana = require("../../contexts/kibana");

var _breadcrumbs = require("../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.overview.overviewLabel', {
    defaultMessage: 'Overview'
  }),
  href: '#/overview'
}];
var overviewRoute = {
  path: '/overview',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.overviewRoute = overviewRoute;

var PageWrapper = function PageWrapper(_ref) {
  var deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)(undefined, undefined, deps.config, {
    checkFullLicense: _license.checkFullLicense,
    checkGetJobsPrivilege: _check_privilege.checkGetJobsPrivilege,
    getMlNodeCount: _ml_nodes_check.getMlNodeCount,
    loadMlServerInfo: _ml_server_info.loadMlServerInfo
  }),
      context = _useResolver.context;

  (0, _kibana.useTimefilter)({
    timeRangeSelector: false,
    autoRefreshSelector: false
  });
  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_overview.OverviewPage, null));
};

var appRootRoute = {
  path: '/',
  render: function render() {
    return _react.default.createElement(Page, null);
  },
  breadcrumbs: []
};
exports.appRootRoute = appRootRoute;

var Page = function Page() {
  return _react.default.createElement(_reactRouterDom.Redirect, {
    to: "/overview"
  });
};