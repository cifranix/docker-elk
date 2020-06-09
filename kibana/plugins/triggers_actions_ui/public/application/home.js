"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TriggersActionsUIHome = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _constants = require("./constants");

var _breadcrumb = require("./lib/breadcrumb");

var _doc_title = require("./lib/doc_title");

var _app_context = require("./app_context");

var _capabilities = require("./lib/capabilities");

var _actions_connectors_list = require("./sections/actions_connectors_list/components/actions_connectors_list");

var _alerts_list = require("./sections/alerts_list/components/alerts_list");

var _plugin = require("./constants/plugin");

var _health_check = require("./components/health_check");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var TriggersActionsUIHome = function TriggersActionsUIHome(_ref) {
  var section = _ref.match.params.section,
      history = _ref.history;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      chrome = _useAppDependencies.chrome,
      capabilities = _useAppDependencies.capabilities,
      setBreadcrumbs = _useAppDependencies.setBreadcrumbs,
      docLinks = _useAppDependencies.docLinks,
      http = _useAppDependencies.http;

  var canShowActions = (0, _capabilities.hasShowActionsCapability)(capabilities);
  var canShowAlerts = (0, _capabilities.hasShowAlertsCapability)(capabilities);
  var tabs = [];

  if (canShowAlerts) {
    tabs.push({
      id: 'alerts',
      name: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.home.alertsTabTitle",
        defaultMessage: "Alerts"
      })
    });
  }

  if (canShowActions) {
    tabs.push({
      id: 'connectors',
      name: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.home.connectorsTabTitle",
        defaultMessage: "Connectors"
      })
    });
  }

  var onSectionChange = function onSectionChange(newSection) {
    history.push("".concat(_constants.BASE_PATH, "/").concat(newSection));
  }; // Set breadcrumb and page title


  (0, _react.useEffect)(function () {
    setBreadcrumbs([(0, _breadcrumb.getCurrentBreadcrumb)(section || 'home')]);
    chrome.docTitle.change((0, _doc_title.getCurrentDocTitle)(section || 'home'));
  }, [section, chrome, setBreadcrumbs]);
  return _react.default.createElement(_eui.EuiPageBody, null, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h1", {
    "data-test-subj": "appTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.home.appTitle",
    defaultMessage: "Alerts and Actions"
  }), "\u2003", _react.default.createElement(_eui.EuiBetaBadge, {
    label: "Beta",
    tooltipContent: _i18n.i18n.translate('xpack.triggersActionsUI.home.betaBadgeTooltipContent', {
      defaultMessage: '{pluginName} is in beta and is subject to change. The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features.',
      values: {
        pluginName: _plugin.PLUGIN.getI18nName(_i18n.i18n)
      }
    })
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.home.sectionDescription",
    defaultMessage: "Detect conditions using alerts, and take actions using connectors."
  }))))), _react.default.createElement(_eui.EuiTabs, null, tabs.map(function (tab) {
    return _react.default.createElement(_eui.EuiTab, {
      onClick: function onClick() {
        return onSectionChange(tab.id);
      },
      isSelected: tab.id === section,
      key: tab.id,
      "data-test-subj": "".concat(tab.id, "Tab")
    }, tab.name);
  })), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_reactRouterDom.Switch, null, canShowActions && _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: _constants.routeToConnectors,
    component: function component() {
      return _react.default.createElement(_health_check.HealthCheck, {
        docLinks: docLinks,
        http: http
      }, _react.default.createElement(_actions_connectors_list.ActionsConnectorsList, null));
    }
  }), canShowAlerts && _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: _constants.routeToAlerts,
    component: function component() {
      return _react.default.createElement(_health_check.HealthCheck, {
        docLinks: docLinks,
        http: http
      }, _react.default.createElement(_alerts_list.AlertsList, null));
    }
  }))));
};

exports.TriggersActionsUIHome = TriggersActionsUIHome;