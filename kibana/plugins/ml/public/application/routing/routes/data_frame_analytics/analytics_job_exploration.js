"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.analyticsJobExplorationRoute = void 0;

var _queryString = require("query-string");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _risonNode = require("rison-node");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _resolvers = require("../../resolvers");

var _analytics_exploration = require("../../../data_frame_analytics/pages/analytics_exploration");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.dataFrameAnalyticsBreadcrumbs.dataFrameExplorationLabel', {
    defaultMessage: 'Data Frame Analytics'
  }),
  href: ''
}];
var analyticsJobExplorationRoute = {
  path: '/data_frame_analytics/exploration',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.analyticsJobExplorationRoute = analyticsJobExplorationRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)('', undefined, deps.config, (0, _resolvers.basicResolvers)(deps)),
      context = _useResolver.context;

  var _parse = (0, _queryString.parse)(location.search, {
    sort: false
  }),
      _g = _parse._g;

  var globalState = null;

  try {
    globalState = (0, _risonNode.decode)(_g);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Could not parse global state');
    window.location.href = '#data_frame_analytics';
  }

  var jobId = globalState.ml.jobId;
  var analysisType = globalState.ml.analysisType;
  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_analytics_exploration.Page, {
    jobId: jobId,
    analysisType: analysisType
  }));
};