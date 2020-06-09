"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categorizationRoute = exports.advancedRoute = exports.populationRoute = exports.multiMetricRoute = exports.singleMetricRoute = void 0;

var _queryString = require("query-string");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _resolvers = require("../../resolvers");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _new_job = require("../../../jobs/new_job/pages/new_job");

var _new_job2 = require("../../../../../common/constants/new_job");

var _job_service = require("../../../services/job_service");

var _new_job_capabilities_service = require("../../../services/new_job_capabilities_service");

var _check_privilege = require("../../../privilege/check_privilege");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var createJobBreadcrumbs = {
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.createJobLabel', {
    defaultMessage: 'Create job'
  }),
  href: '#/jobs/new_job'
};
var baseBreadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, createJobBreadcrumbs];
var singleMetricBreadcrumbs = [].concat(baseBreadcrumbs, [{
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.singleMetricLabel', {
    defaultMessage: 'Single metric'
  }),
  href: ''
}]);
var multiMetricBreadcrumbs = [].concat(baseBreadcrumbs, [{
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.multiMetricLabel', {
    defaultMessage: 'Multi metric'
  }),
  href: ''
}]);
var populationBreadcrumbs = [].concat(baseBreadcrumbs, [{
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.populationLabel', {
    defaultMessage: 'Population'
  }),
  href: ''
}]);
var advancedBreadcrumbs = [].concat(baseBreadcrumbs, [{
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.advancedConfigurationLabel', {
    defaultMessage: 'Advanced configuration'
  }),
  href: ''
}]);
var categorizationBreadcrumbs = [].concat(baseBreadcrumbs, [{
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.categorizationLabel', {
    defaultMessage: 'Categorization'
  }),
  href: ''
}]);
var singleMetricRoute = {
  path: '/jobs/new_job/single_metric',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      jobType: _new_job2.JOB_TYPE.SINGLE_METRIC,
      deps: deps
    }));
  },
  breadcrumbs: singleMetricBreadcrumbs
};
exports.singleMetricRoute = singleMetricRoute;
var multiMetricRoute = {
  path: '/jobs/new_job/multi_metric',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      jobType: _new_job2.JOB_TYPE.MULTI_METRIC,
      deps: deps
    }));
  },
  breadcrumbs: multiMetricBreadcrumbs
};
exports.multiMetricRoute = multiMetricRoute;
var populationRoute = {
  path: '/jobs/new_job/population',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      jobType: _new_job2.JOB_TYPE.POPULATION,
      deps: deps
    }));
  },
  breadcrumbs: populationBreadcrumbs
};
exports.populationRoute = populationRoute;
var advancedRoute = {
  path: '/jobs/new_job/advanced',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      jobType: _new_job2.JOB_TYPE.ADVANCED,
      deps: deps
    }));
  },
  breadcrumbs: advancedBreadcrumbs
};
exports.advancedRoute = advancedRoute;
var categorizationRoute = {
  path: '/jobs/new_job/categorization',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      jobType: _new_job2.JOB_TYPE.CATEGORIZATION,
      deps: deps
    }));
  },
  breadcrumbs: categorizationBreadcrumbs
};
exports.categorizationRoute = categorizationRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      jobType = _ref.jobType,
      deps = _ref.deps;

  var _parse = (0, _queryString.parse)(location.search, {
    sort: false
  }),
      index = _parse.index,
      savedSearchId = _parse.savedSearchId;

  var _useResolver = (0, _use_resolver.useResolver)(index, savedSearchId, deps.config, _objectSpread({}, (0, _resolvers.basicResolvers)(deps), {
    privileges: _check_privilege.checkCreateJobsPrivilege,
    jobCaps: function jobCaps() {
      return (0, _new_job_capabilities_service.loadNewJobCapabilities)(index, savedSearchId, deps.indexPatterns);
    },
    existingJobsAndGroups: _job_service.mlJobService.getJobAndGroupIds
  })),
      context = _useResolver.context,
      results = _useResolver.results;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_new_job.Page, {
    jobType: jobType,
    existingJobsAndGroups: results.existingJobsAndGroups
  }));
};