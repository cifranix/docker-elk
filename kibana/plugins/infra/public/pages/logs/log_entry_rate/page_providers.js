"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryRatePageProviders = void 0;

var _react = _interopRequireDefault(require("react"));

var _source = require("../../../containers/source");

var _use_kibana_space_id = require("../../../utils/use_kibana_space_id");

var _use_log_entry_rate_module = require("./use_log_entry_rate_module");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogEntryRatePageProviders = function LogEntryRatePageProviders(_ref) {
  var children = _ref.children;

  var _useSourceContext = (0, _source.useSourceContext)(),
      sourceId = _useSourceContext.sourceId,
      source = _useSourceContext.source;

  var spaceId = (0, _use_kibana_space_id.useKibanaSpaceId)();
  return _react.default.createElement(_use_log_entry_rate_module.LogEntryRateModuleProvider, {
    indexPattern: source ? source.configuration.logAlias : '',
    sourceId: sourceId,
    spaceId: spaceId,
    timestampField: source ? source.configuration.fields.timestamp : ''
  }, children);
};

exports.LogEntryRatePageProviders = LogEntryRatePageProviders;