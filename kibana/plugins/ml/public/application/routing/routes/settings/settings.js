"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.settingsRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _kibana = require("../../../contexts/kibana");

var _license = require("../../../license");

var _check_privilege = require("../../../privilege/check_privilege");

var _check_ml_nodes = require("../../../ml_nodes_check/check_ml_nodes");

var _settings = require("../../../settings");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.SETTINGS];
var settingsRoute = {
  path: '/settings',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.settingsRoute = settingsRoute;

var PageWrapper = function PageWrapper(_ref) {
  var deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)(undefined, undefined, deps.config, {
    checkFullLicense: _license.checkFullLicense,
    checkGetJobsPrivilege: _check_privilege.checkGetJobsPrivilege,
    getMlNodeCount: _check_ml_nodes.getMlNodeCount
  }),
      context = _useResolver.context;

  (0, _kibana.useTimefilter)({
    timeRangeSelector: false,
    autoRefreshSelector: false
  });
  var canGetFilters = (0, _check_privilege.checkPermission)('canGetFilters');
  var canGetCalendars = (0, _check_privilege.checkPermission)('canGetCalendars');
  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_settings.Settings, {
    canGetCalendars: canGetCalendars,
    canGetFilters: canGetFilters
  }));
};