"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterListRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _kibana = require("../../../contexts/kibana");

var _license = require("../../../license");

var _check_privilege = require("../../../privilege/check_privilege");

var _check_ml_nodes = require("../../../ml_nodes_check/check_ml_nodes");

var _filter_lists = require("../../../settings/filter_lists");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.SETTINGS, {
  text: _i18n.i18n.translate('xpack.ml.settings.breadcrumbs.filterListsLabel', {
    defaultMessage: 'Filter lists'
  }),
  href: '#/settings/filter_lists'
}];
var filterListRoute = {
  path: '/settings/filter_lists',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.filterListRoute = filterListRoute;

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
  var canCreateFilter = (0, _check_privilege.checkPermission)('canCreateFilter');
  var canDeleteFilter = (0, _check_privilege.checkPermission)('canDeleteFilter');
  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_filter_lists.FilterLists, {
    canCreateFilter: canCreateFilter,
    canDeleteFilter: canDeleteFilter
  }));
};