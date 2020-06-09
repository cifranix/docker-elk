"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyticsJobsListRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _resolvers = require("../../resolvers");

var _analytics_management = require("../../../data_frame_analytics/pages/analytics_management");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.dataFrameAnalyticsBreadcrumbs.dataFrameListLabel', {
    defaultMessage: 'Data Frame Analytics'
  }),
  href: ''
}];
var analyticsJobsListRoute = {
  path: '/data_frame_analytics',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.analyticsJobsListRoute = analyticsJobsListRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)('', undefined, deps.config, (0, _resolvers.basicResolvers)(deps)),
      context = _useResolver.context;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_analytics_management.Page, null));
};