"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexBasedRoute = void 0;

var _queryString = require("query-string");

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _index_based = require("../../../datavisualizer/index_based");

var _license = require("../../../license");

var _check_privilege = require("../../../privilege/check_privilege");

var _index_utils = require("../../../util/index_utils");

var _ml_nodes_check = require("../../../ml_nodes_check");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.DATA_VISUALIZER_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.dataFrameAnalyticsBreadcrumbs.indexLabel', {
    defaultMessage: 'Index'
  }),
  href: ''
}];
var indexBasedRoute = {
  path: '/jobs/new_job/datavisualizer',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.indexBasedRoute = indexBasedRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      deps = _ref.deps;

  var _parse = (0, _queryString.parse)(location.search, {
    sort: false
  }),
      index = _parse.index,
      savedSearchId = _parse.savedSearchId;

  var _useResolver = (0, _use_resolver.useResolver)(index, savedSearchId, deps.config, {
    checkBasicLicense: _license.checkBasicLicense,
    loadIndexPatterns: function loadIndexPatterns() {
      return (0, _index_utils.loadIndexPatterns)(deps.indexPatterns);
    },
    checkGetJobsPrivilege: _check_privilege.checkGetJobsPrivilege,
    checkMlNodesAvailable: _ml_nodes_check.checkMlNodesAvailable
  }),
      context = _useResolver.context;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_index_based.Page, null));
};