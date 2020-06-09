"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessDeniedRoute = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _router = require("../router");

var _use_resolver = require("../use_resolver");

var _access_denied = require("../../access_denied");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var breadcrumbs = [{
  text: _i18n.i18n.translate('xpack.ml.accessDeniedLabel', {
    defaultMessage: 'Access denied'
  }),
  href: ''
}];
var accessDeniedRoute = {
  path: '/access-denied',
  render: function render(props, deps) {
    return _react.default.createElement(PageWrapper, _extends({}, props, {
      deps: deps
    }));
  },
  breadcrumbs: breadcrumbs
};
exports.accessDeniedRoute = accessDeniedRoute;

var PageWrapper = function PageWrapper(_ref) {
  var deps = _ref.deps;

  var _useResolver = (0, _use_resolver.useResolver)(undefined, undefined, deps.config, {}),
      context = _useResolver.context;

  return _react.default.createElement(_router.PageLoader, {
    context: context
  }, _react.default.createElement(_access_denied.Page, null));
};