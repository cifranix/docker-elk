"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.editFilterListRoute = exports.newFilterListRoute = void 0;

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

var MODE;

(function (MODE) {
  MODE[MODE["NEW"] = 0] = "NEW";
  MODE[MODE["EDIT"] = 1] = "EDIT";
})(MODE || (MODE = {}));

var newBreadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.SETTINGS, {
  text: _i18n.i18n.translate('xpack.ml.settings.breadcrumbs.filterLists.createLabel', {
    defaultMessage: 'Create'
  }),
  href: '#/settings/filter_lists/new'
}];
var editBreadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.SETTINGS, {
  text: _i18n.i18n.translate('xpack.ml.settings.breadcrumbs.filterLists.editLabel', {
    defaultMessage: 'Edit'
  }),
  href: '#/settings/filter_lists/edit'
}];
var newFilterListRoute = {
  path: '/settings/filter_lists/new_filter_list',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      mode: MODE.NEW,
      deps: deps
    }));
  },
  breadcrumbs: newBreadcrumbs
};
exports.newFilterListRoute = newFilterListRoute;
var editFilterListRoute = {
  path: '/settings/filter_lists/edit_filter_list/:filterId',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      mode: MODE.EDIT,
      deps: deps
    }));
  },
  breadcrumbs: editBreadcrumbs
};
exports.editFilterListRoute = editFilterListRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      mode = _ref.mode,
      deps = _ref.deps;
  var filterId;

  if (mode === MODE.EDIT) {
    var pathMatch = location.pathname.match(/.+\/(.+)$/);
    filterId = pathMatch && pathMatch.length > 1 ? pathMatch[1] : undefined;
  }

  var _useResolver = (0, _use_resolver.useResolver)(undefined, undefined, deps.config, {
    checkFullLicense: _license.checkFullLicense,
    checkGetJobsPrivilege: _check_privilege.checkGetJobsPrivilege,
    checkMlNodesAvailable: _check_ml_nodes.checkMlNodesAvailable
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
  }, _react.default.createElement(_filter_lists.EditFilterList, {
    filterId: filterId,
    canCreateFilter: canCreateFilter,
    canDeleteFilter: canDeleteFilter
  }));
};