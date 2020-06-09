"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkViewOrCreateRoute = exports.recognizeRoute = void 0;

var _queryString = require("query-string");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _resolvers = require("../../resolvers");

var _recognize = require("../../../jobs/new_job/recognize");

var _resolvers2 = require("../../../jobs/new_job/recognize/resolvers");

var _job_service = require("../../../services/job_service");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.selectIndexOrSearchLabelRecognize', {
    defaultMessage: 'Select index or search'
  }),
  href: ''
}];
var recognizeRoute = {
  path: '/jobs/new_job/recognize',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.recognizeRoute = recognizeRoute;
var checkViewOrCreateRoute = {
  path: '/modules/check_view_or_create',
  render: function render(props, deps) {
    return _react.default.createElement(CheckViewOrCreateWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: []
};
exports.checkViewOrCreateRoute = checkViewOrCreateRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      deps = _ref.deps;

  var _parse = (0, _queryString.parse)(location.search, {
    sort: false
  }),
      id = _parse.id,
      index = _parse.index,
      savedSearchId = _parse.savedSearchId;

  var _useResolver = (0, _use_resolver.useResolver)(index, savedSearchId, deps.config, _objectSpread({}, (0, _resolvers.basicResolvers)(deps), {
    existingJobsAndGroups: _job_service.mlJobService.getJobAndGroupIds
  })),
      context = _useResolver.context,
      results = _useResolver.results;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_recognize.Page, {
    moduleId: id,
    existingGroupIds: results.existingJobsAndGroups.groupIds
  }));
};

var CheckViewOrCreateWrapper = function CheckViewOrCreateWrapper(_ref2) {
  var location = _ref2.location,
      deps = _ref2.deps;

  var _parse2 = (0, _queryString.parse)(location.search, {
    sort: false
  }),
      moduleId = _parse2.id,
      indexPatternId = _parse2.index; // the single resolver checkViewOrCreateJobs redirects only. so will always reject


  (0, _use_resolver.useResolver)(undefined, undefined, deps.config, {
    checkViewOrCreateJobs: function checkViewOrCreateJobs() {
      return (0, _resolvers2.checkViewOrCreateJobs)(moduleId, indexPatternId);
    }
  });
  return null;
};