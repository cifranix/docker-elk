"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _layouts = require("../../../../common/inventory_models/layouts");

var _loading = require("../../../components/loading");

var _empty_states = require("../../../components/empty_states");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var PageBody = function PageBody(_ref) {
  var loading = _ref.loading,
      refetch = _ref.refetch,
      type = _ref.type,
      metrics = _ref.metrics,
      onChangeRangeTime = _ref.onChangeRangeTime,
      isLiveStreaming = _ref.isLiveStreaming,
      stopLiveStreaming = _ref.stopLiveStreaming;

  if (loading) {
    return _react.default.createElement(_loading.InfraLoadingPanel, {
      height: "100vh",
      width: "auto",
      text: _i18n.i18n.translate('xpack.infra.metrics.loadingNodeDataText', {
        defaultMessage: 'Loading data'
      })
    });
  } else if (!loading && metrics && metrics.length === 0) {
    return _react.default.createElement(_empty_states.NoData, {
      titleText: _i18n.i18n.translate('xpack.infra.metrics.emptyViewTitle', {
        defaultMessage: 'There is no data to display.'
      }),
      bodyText: _i18n.i18n.translate('xpack.infra.metrics.emptyViewDescription', {
        defaultMessage: 'Try adjusting your time or filter.'
      }),
      refetchText: _i18n.i18n.translate('xpack.infra.metrics.refetchButtonLabel', {
        defaultMessage: 'Check for new data'
      }),
      onRefetch: refetch,
      testString: "metricsEmptyViewState"
    });
  }

  var Layout = (0, _layouts.findLayout)(type);
  return _react.default.createElement(Layout, {
    metrics: metrics,
    onChangeRangeTime: onChangeRangeTime,
    isLiveStreaming: isLiveStreaming,
    stopLiveStreaming: stopLiveStreaming
  });
};

exports.PageBody = PageBody;