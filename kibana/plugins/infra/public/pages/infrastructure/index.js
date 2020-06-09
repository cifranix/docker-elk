"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrastructurePage = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _eui = require("@elastic/eui");

var _document_title = require("../../components/document_title");

var _help_center_content = require("../../components/help_center_content");

var _routed_tabs = require("../../components/navigation/routed_tabs");

var _page = require("../../components/page");

var _header = require("../../components/header");

var _use_metrics_explorer_options = require("../../containers/metrics_explorer/use_metrics_explorer_options");

var _with_metrics_explorer_options_url_state = require("../../containers/metrics_explorer/with_metrics_explorer_options_url_state");

var _with_source = require("../../containers/with_source");

var _source = require("../../containers/source");

var _metrics_explorer = require("./metrics_explorer");

var _snapshot = require("./snapshot");

var _settings = require("./settings");

var _app_navigation = require("../../components/navigation/app_navigation");

var _source_loading_page = require("../../components/source_loading_page");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _alert_dropdown = require("../../components/alerting/metrics/alert_dropdown");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var InfrastructurePage = function InfrastructurePage(_ref) {
  var _useKibana$services$a, _uiCapabilities$infra;

  var match = _ref.match;
  var uiCapabilities = (_useKibana$services$a = (0, _public.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;
  return _react.default.createElement(_source.Source.Provider, {
    sourceId: "default"
  }, _react.default.createElement(_page.ColumnarPage, null, _react.default.createElement(_document_title.DocumentTitle, {
    title: _i18n.i18n.translate('xpack.infra.homePage.documentTitle', {
      defaultMessage: 'Metrics'
    })
  }), _react.default.createElement(_help_center_content.HelpCenterContent, {
    feedbackLink: "https://discuss.elastic.co/c/metrics",
    appName: _i18n.i18n.translate('xpack.infra.header.infrastructureHelpAppName', {
      defaultMessage: 'Metrics'
    })
  }), _react.default.createElement(_header.Header, {
    breadcrumbs: [{
      text: _i18n.i18n.translate('xpack.infra.header.infrastructureTitle', {
        defaultMessage: 'Metrics'
      })
    }],
    readOnlyBadge: !(uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra = uiCapabilities.infrastructure) === null || _uiCapabilities$infra === void 0 ? void 0 : _uiCapabilities$infra.save)
  }), _react.default.createElement(_app_navigation.AppNavigation, {
    "aria-label": _i18n.i18n.translate('xpack.infra.header.infrastructureNavigationTitle', {
      defaultMessage: 'Metrics'
    })
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: 'none',
    alignItems: 'center'
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_routed_tabs.RoutedTabs, {
    tabs: [{
      app: 'metrics',
      title: _i18n.i18n.translate('xpack.infra.homePage.inventoryTabTitle', {
        defaultMessage: 'Inventory'
      }),
      pathname: '/inventory'
    }, {
      app: 'metrics',
      title: _i18n.i18n.translate('xpack.infra.homePage.metricsExplorerTabTitle', {
        defaultMessage: 'Metrics Explorer'
      }),
      pathname: '/explorer'
    }, {
      app: 'metrics',
      title: _i18n.i18n.translate('xpack.infra.homePage.settingsTabTitle', {
        defaultMessage: 'Settings'
      }),
      pathname: '/settings'
    }]
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_reactRouterDom.Route, {
    path: '/explorer',
    component: _alert_dropdown.AlertDropdown
  })))), _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    path: '/inventory',
    component: _snapshot.SnapshotPage
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: '/explorer',
    render: function render(props) {
      return _react.default.createElement(_with_source.WithSource, null, function (_ref2) {
        var configuration = _ref2.configuration,
            createDerivedIndexPattern = _ref2.createDerivedIndexPattern;
        return _react.default.createElement(_use_metrics_explorer_options.MetricsExplorerOptionsContainer.Provider, null, _react.default.createElement(_with_metrics_explorer_options_url_state.WithMetricsExplorerOptionsUrlState, null), configuration ? _react.default.createElement(_metrics_explorer.MetricsExplorerPage, _extends({
          derivedIndexPattern: createDerivedIndexPattern('metrics'),
          source: configuration
        }, props)) : _react.default.createElement(_source_loading_page.SourceLoadingPage, null));
      });
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: '/settings',
    component: _settings.MetricsSettingsPage
  }))));
};

exports.InfrastructurePage = InfrastructurePage;