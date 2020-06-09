"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedirectToHostDetailViaIP = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _i18n = require("@kbn/i18n");

var _with_metrics_time = require("../metrics/containers/with_metrics_time");

var _use_host_ip_to_name = require("./use_host_ip_to_name");

var _query_params = require("./query_params");

var _loading_page = require("../../components/loading_page");

var _error = require("../error");

var _source = require("../../containers/source/source");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var RedirectToHostDetailViaIP = function RedirectToHostDetailViaIP(_ref) {
  var hostIp = _ref.match.params.hostIp,
      location = _ref.location;

  var _useSource = (0, _source.useSource)({
    sourceId: 'default'
  }),
      source = _useSource.source;

  var _useHostIpToName = (0, _use_host_ip_to_name.useHostIpToName)(hostIp, source && source.configuration && source.configuration.metricAlias || null),
      error = _useHostIpToName.error,
      name = _useHostIpToName.name;

  if (error) {
    return _react.default.createElement(_error.Error, {
      message: _i18n.i18n.translate('xpack.infra.linkTo.hostWithIp.error', {
        defaultMessage: 'Host not found with IP address "{hostIp}".',
        values: {
          hostIp: hostIp
        }
      })
    });
  }

  var searchString = (0, _with_metrics_time.replaceMetricTimeInQueryString)((0, _query_params.getFromFromLocation)(location), (0, _query_params.getToFromLocation)(location))('');

  if (name) {
    return _react.default.createElement(_reactRouterDom.Redirect, {
      to: "/detail/host/".concat(name, "?").concat(searchString)
    });
  }

  return _react.default.createElement(_loading_page.LoadingPage, {
    message: _i18n.i18n.translate('xpack.infra.linkTo.hostWithIp.loading', {
      defaultMessage: 'Loading host with IP address "{hostIp}".',
      values: {
        hostIp: hostIp
      }
    })
  });
};

exports.RedirectToHostDetailViaIP = RedirectToHostDetailViaIP;