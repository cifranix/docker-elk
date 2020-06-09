"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsSettingsPage = void 0;

var _react = _interopRequireDefault(require("react"));

var _source_configuration_settings = require("../../components/source_configuration/source_configuration_settings");

var _public = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var MetricsSettingsPage = function MetricsSettingsPage() {
  var _useKibana$services$a, _uiCapabilities$infra;

  var uiCapabilities = (_useKibana$services$a = (0, _public.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;
  return _react.default.createElement(_source_configuration_settings.SourceConfigurationSettings, {
    shouldAllowEdit: uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra = uiCapabilities.infrastructure) === null || _uiCapabilities$infra === void 0 ? void 0 : _uiCapabilities$infra.configureSource,
    displaySettings: "metrics"
  });
};

exports.MetricsSettingsPage = MetricsSettingsPage;