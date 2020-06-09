"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotPage = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _page_content = require("./page_content");

var _toolbar = require("./toolbar");

var _document_title = require("../../../components/document_title");

var _no_indices = require("../../../components/empty_states/no_indices");

var _page = require("../../../components/page");

var _source_error_page = require("../../../components/source_error_page");

var _source_loading_page = require("../../../components/source_loading_page");

var _source_configuration = require("../../../components/source_configuration");

var _source = require("../../../containers/source");

var _with_waffle_filters = require("../../../containers/waffle/with_waffle_filters");

var _with_waffle_options = require("../../../containers/waffle/with_waffle_options");

var _with_waffle_time = require("../../../containers/waffle/with_waffle_time");

var _public = require("../../../../../observability/public");

var _public2 = require("../../../../../../../src/plugins/kibana_react/public");

var _use_link_props = require("../../../hooks/use_link_props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SnapshotPage = function SnapshotPage() {
  var _useKibana$services$a, _uiCapabilities$infra;

  var uiCapabilities = (_useKibana$services$a = (0, _public2.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;

  var _useContext = (0, _react.useContext)(_source.Source.Context),
      createDerivedIndexPattern = _useContext.createDerivedIndexPattern,
      hasFailedLoadingSource = _useContext.hasFailedLoadingSource,
      isLoading = _useContext.isLoading,
      loadSourceFailureMessage = _useContext.loadSourceFailureMessage,
      loadSource = _useContext.loadSource,
      metricIndicesExist = _useContext.metricIndicesExist;

  (0, _public.useTrackPageview)({
    app: 'infra_metrics',
    path: 'inventory'
  });
  (0, _public.useTrackPageview)({
    app: 'infra_metrics',
    path: 'inventory',
    delay: 15000
  });
  var tutorialLinkProps = (0, _use_link_props.useLinkProps)({
    app: 'kibana',
    hash: '/home/tutorial_directory/metrics'
  });
  return _react.default.createElement(_page.ColumnarPage, null, _react.default.createElement(_document_title.DocumentTitle, {
    title: function title(previousTitle) {
      return _i18n.i18n.translate('xpack.infra.infrastructureSnapshotPage.documentTitle', {
        defaultMessage: '{previousTitle} | Inventory',
        values: {
          previousTitle: previousTitle
        }
      });
    }
  }), isLoading ? _react.default.createElement(_source_loading_page.SourceLoadingPage, null) : metricIndicesExist ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_with_waffle_time.WithWaffleTimeUrlState, null), _react.default.createElement(_with_waffle_filters.WithWaffleFilterUrlState, {
    indexPattern: createDerivedIndexPattern('metrics')
  }), _react.default.createElement(_with_waffle_options.WithWaffleOptionsUrlState, null), _react.default.createElement(_toolbar.SnapshotToolbar, null), _react.default.createElement(_page_content.SnapshotPageContent, null)) : hasFailedLoadingSource ? _react.default.createElement(_source_error_page.SourceErrorPage, {
    errorMessage: loadSourceFailureMessage || '',
    retry: loadSource
  }) : _react.default.createElement(_no_indices.NoIndices, {
    title: _i18n.i18n.translate('xpack.infra.homePage.noMetricsIndicesTitle', {
      defaultMessage: "Looks like you don't have any metrics indices."
    }),
    message: _i18n.i18n.translate('xpack.infra.homePage.noMetricsIndicesDescription', {
      defaultMessage: "Let's add some!"
    }),
    actions: _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiButton, _extends({}, tutorialLinkProps, {
      color: "primary",
      fill: true,
      "data-test-subj": "infrastructureViewSetupInstructionsButton"
    }), _i18n.i18n.translate('xpack.infra.homePage.noMetricsIndicesInstructionsActionLabel', {
      defaultMessage: 'View setup instructions'
    }))), (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra = uiCapabilities.infrastructure) === null || _uiCapabilities$infra === void 0 ? void 0 : _uiCapabilities$infra.configureSource) ? _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_source_configuration.ViewSourceConfigurationButton, {
      app: "metrics",
      "data-test-subj": "configureSourceButton"
    }, _i18n.i18n.translate('xpack.infra.configureSourceActionLabel', {
      defaultMessage: 'Change source configuration'
    }))) : null),
    "data-test-subj": "noMetricsIndicesPrompt"
  }));
};

exports.SnapshotPage = SnapshotPage;