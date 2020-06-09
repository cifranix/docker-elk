"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogsPageContent = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _document_title = require("../../components/document_title");

var _header = require("../../components/header");

var _help_center_content = require("../../components/help_center_content");

var _app_navigation = require("../../components/navigation/app_navigation");

var _routed_tabs = require("../../components/navigation/routed_tabs");

var _page = require("../../components/page");

var _log_analysis = require("../../containers/logs/log_analysis");

var _redirect_with_query_params = require("../../utils/redirect_with_query_params");

var _log_entry_categories = require("./log_entry_categories");

var _log_entry_rate = require("./log_entry_rate");

var _settings = require("./settings");

var _stream = require("./stream");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var LogsPageContent = function LogsPageContent() {
  var _useKibana$services$a, _uiCapabilities$logs;

  var uiCapabilities = (_useKibana$services$a = (0, _public.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;
  var logAnalysisCapabilities = (0, _log_analysis.useLogAnalysisCapabilitiesContext)();
  var streamTab = {
    app: 'logs',
    title: streamTabTitle,
    pathname: '/stream'
  };
  var logRateTab = {
    app: 'logs',
    title: logRateTabTitle,
    pathname: '/log-rate'
  };
  var logCategoriesTab = {
    app: 'logs',
    title: logCategoriesTabTitle,
    pathname: '/log-categories'
  };
  var settingsTab = {
    app: 'logs',
    title: settingsTabTitle,
    pathname: '/settings'
  };
  return _react.default.createElement(_page.ColumnarPage, null, _react.default.createElement(_document_title.DocumentTitle, {
    title: pageTitle
  }), _react.default.createElement(_help_center_content.HelpCenterContent, {
    feedbackLink: feedbackLinkUrl,
    appName: pageTitle
  }), _react.default.createElement(_header.Header, {
    breadcrumbs: [{
      text: pageTitle
    }],
    readOnlyBadge: !(uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$logs = uiCapabilities.logs) === null || _uiCapabilities$logs === void 0 ? void 0 : _uiCapabilities$logs.save)
  }), _react.default.createElement(_app_navigation.AppNavigation, {
    "aria-label": pageTitle
  }, _react.default.createElement(_routed_tabs.RoutedTabs, {
    tabs: logAnalysisCapabilities.hasLogAnalysisCapabilites ? [streamTab, logRateTab, logCategoriesTab, settingsTab] : [streamTab, settingsTab]
  })), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: streamTab.pathname,
    component: _stream.StreamPage
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: logRateTab.pathname,
    component: _log_entry_rate.LogEntryRatePage
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: logCategoriesTab.pathname,
    component: _log_entry_categories.LogEntryCategoriesPage
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: settingsTab.pathname,
    component: _settings.LogsSettingsPage
  }), _react.default.createElement(_redirect_with_query_params.RedirectWithQueryParams, {
    from: '/analysis',
    to: logRateTab.pathname,
    exact: true
  })));
};

exports.LogsPageContent = LogsPageContent;

var pageTitle = _i18n.i18n.translate('xpack.infra.header.logsTitle', {
  defaultMessage: 'Logs'
});

var streamTabTitle = _i18n.i18n.translate('xpack.infra.logs.index.streamTabTitle', {
  defaultMessage: 'Stream'
});

var logRateTabTitle = _i18n.i18n.translate('xpack.infra.logs.index.logRateBetaBadgeTitle', {
  defaultMessage: 'Log Rate'
});

var logCategoriesTabTitle = _i18n.i18n.translate('xpack.infra.logs.index.logCategoriesBetaBadgeTitle', {
  defaultMessage: 'Categories'
});

var settingsTabTitle = _i18n.i18n.translate('xpack.infra.logs.index.settingsTabTitle', {
  defaultMessage: 'Settings'
});

var feedbackLinkUrl = 'https://discuss.elastic.co/c/logs';