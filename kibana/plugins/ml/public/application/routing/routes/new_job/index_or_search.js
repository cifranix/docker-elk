"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dataVizIndexOrSearchRoute = exports.indexOrSearchRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _resolvers = require("../../resolvers");

var _index_or_search = require("../../../jobs/new_job/pages/index_or_search");

var _breadcrumbs = require("../../breadcrumbs");

var _license = require("../../../license");

var _index_utils = require("../../../util/index_utils");

var _check_privilege = require("../../../privilege/check_privilege");

var _ml_nodes_check = require("../../../ml_nodes_check");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var MODE;

(function (MODE) {
  MODE[MODE["NEW_JOB"] = 0] = "NEW_JOB";
  MODE[MODE["DATAVISUALIZER"] = 1] = "DATAVISUALIZER";
})(MODE || (MODE = {}));

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.ANOMALY_DETECTION_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.jobsBreadcrumbs.selectIndexOrSearchLabel', {
    defaultMessage: 'Create job'
  }),
  href: ''
}];
var indexOrSearchRoute = {
  path: '/jobs/new_job/step/index_or_search',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      nextStepPath: "#/jobs/new_job/step/job_type",
      deps: deps,
      mode: MODE.NEW_JOB
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.indexOrSearchRoute = indexOrSearchRoute;
var dataVizIndexOrSearchRoute = {
  path: '/datavisualizer_index_select',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      nextStepPath: "#jobs/new_job/datavisualizer",
      deps: deps,
      mode: MODE.DATAVISUALIZER
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.dataVizIndexOrSearchRoute = dataVizIndexOrSearchRoute;

var PageWrapper = function PageWrapper(_ref) {
  var nextStepPath = _ref.nextStepPath,
      deps = _ref.deps,
      mode = _ref.mode;

  var newJobResolvers = _objectSpread({}, (0, _resolvers.basicResolvers)(deps), {
    preConfiguredJobRedirect: function preConfiguredJobRedirect() {
      return (0, _index_or_search.preConfiguredJobRedirect)(deps.indexPatterns);
    }
  });

  var dataVizResolvers = {
    checkBasicLicense: _license.checkBasicLicense,
    loadIndexPatterns: function loadIndexPatterns() {
      return (0, _index_utils.loadIndexPatterns)(deps.indexPatterns);
    },
    checkGetJobsPrivilege: _check_privilege.checkGetJobsPrivilege,
    checkMlNodesAvailable: _ml_nodes_check.checkMlNodesAvailable
  };

  var _useResolver = (0, _use_resolver.useResolver)(undefined, undefined, deps.config, mode === MODE.NEW_JOB ? newJobResolvers : dataVizResolvers),
      context = _useResolver.context;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_index_or_search.Page, {
    nextStepPath: nextStepPath
  }));
};