"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobTypeRoute = void 0;

var _queryString = require("query-string");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _resolvers = require("../../resolvers");

var _job_type = require("../../../jobs/new_job/pages/job_type");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.selectJobType', {
    defaultMessage: 'Create job'
  }),
  href: ''
}];
var jobTypeRoute = {
  path: '/jobs/new_job/step/job_type',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.jobTypeRoute = jobTypeRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      deps = _ref.deps;

  var _parse = (0, _queryString.parse)(location.search, {
    sort: false
  }),
      index = _parse.index,
      savedSearchId = _parse.savedSearchId;

  var _useResolver = (0, _use_resolver.useResolver)(index, savedSearchId, deps.config, (0, _resolvers.basicResolvers)(deps)),
      context = _useResolver.context;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_job_type.Page, null));
};