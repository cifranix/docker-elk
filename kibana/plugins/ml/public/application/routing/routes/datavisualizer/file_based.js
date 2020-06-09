"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileBasedRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../../router");

var _use_resolver = require("../../use_resolver");

var _file_based = require("../../../datavisualizer/file_based");

var _license = require("../../../license");

var _check_privilege = require("../../../privilege/check_privilege");

var _index_utils = require("../../../util/index_utils");

var _breadcrumbs = require("../../breadcrumbs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [_breadcrumbs.ML_BREADCRUMB, _breadcrumbs.DATA_VISUALIZER_BREADCRUMB, {
  text: _i18n.i18n.translate('xpack.ml.dataVisualizer.fileBasedLabel', {
    defaultMessage: 'File'
  }),
  href: ''
}];
var fileBasedRoute = {
  path: '/filedatavisualizer',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.fileBasedRoute = fileBasedRoute;

var PageWrapper = function PageWrapper(_ref) {
  var location = _ref.location,
      deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)('', undefined, deps.config, {
    checkBasicLicense: _license.checkBasicLicense,
    loadIndexPatterns: function loadIndexPatterns() {
      return (0, _index_utils.loadIndexPatterns)(deps.indexPatterns);
    },
    checkFindFileStructurePrivilege: _check_privilege.checkFindFileStructurePrivilege
  }),
      context = _useResolver.context;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_file_based.FileDataVisualizerPage, {
    kibanaConfig: deps.config
  }));
};