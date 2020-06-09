"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricDetail = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../observability/public");

var _document_title = require("../../components/document_title");

var _header = require("../../components/header");

var _page = require("../../components/page");

var _with_metrics_time = require("./containers/with_metrics_time");

var _page_providers = require("./page_providers");

var _use_metadata = require("../../containers/metadata/use_metadata");

var _source = require("../../containers/source");

var _loading = require("../../components/loading");

var _inventory_models = require("../../../common/inventory_models");

var _node_details_page = require("./components/node_details_page");

var _public2 = require("../../../../../../src/plugins/kibana_react/public");

var _use_link_props = require("../../hooks/use_link_props");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  overflow: auto;\n  background-color: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var DetailPageContent = (0, _public.euiStyled)(_page.PageContent)(_templateObject(), function (props) {
  return props.theme.eui.euiColorLightestShade;
});
var MetricDetail = (0, _page_providers.withMetricPageProviders)((0, _public.withTheme)(function (_ref) {
  var _useKibana$services$a;

  var match = _ref.match,
      theme = _ref.theme;
  var uiCapabilities = (_useKibana$services$a = (0, _public2.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities;
  var nodeId = match.params.node;
  var nodeType = match.params.type;
  var inventoryModel = (0, _inventory_models.findInventoryModel)(nodeType);

  var _useContext = (0, _react.useContext)(_source.Source.Context),
      sourceId = _useContext.sourceId;

  var _useMetadata = (0, _use_metadata.useMetadata)(nodeId, nodeType, inventoryModel.requiredMetrics, sourceId),
      name = _useMetadata.name,
      filteredRequiredMetrics = _useMetadata.filteredRequiredMetrics,
      metadataLoading = _useMetadata.loading,
      cloudId = _useMetadata.cloudId,
      metadata = _useMetadata.metadata;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      sideNav = _useState2[0],
      setSideNav = _useState2[1];

  var addNavItem = _react.default.useCallback(function (item) {
    if (!sideNav.some(function (n) {
      return n.id === item.id;
    })) {
      setSideNav([item].concat(_toConsumableArray(sideNav)));
    }
  }, [sideNav]);

  var metricsLinkProps = (0, _use_link_props.useLinkProps)({
    app: 'metrics',
    pathname: '/'
  });
  var breadcrumbs = [_objectSpread({}, metricsLinkProps, {
    text: _i18n.i18n.translate('xpack.infra.header.infrastructureTitle', {
      defaultMessage: 'Metrics'
    })
  }), {
    text: name
  }];

  if (metadataLoading && !filteredRequiredMetrics.length) {
    return _react.default.createElement(_loading.InfraLoadingPanel, {
      height: "100vh",
      width: "100%",
      text: _i18n.i18n.translate('xpack.infra.metrics.loadingNodeDataText', {
        defaultMessage: 'Loading data'
      })
    });
  }

  return _react.default.createElement(_with_metrics_time.WithMetricsTime, null, function (_ref2) {
    var _uiCapabilities$infra;

    var timeRange = _ref2.timeRange,
        parsedTimeRange = _ref2.parsedTimeRange,
        setTimeRange = _ref2.setTimeRange,
        refreshInterval = _ref2.refreshInterval,
        setRefreshInterval = _ref2.setRefreshInterval,
        isAutoReloading = _ref2.isAutoReloading,
        setAutoReload = _ref2.setAutoReload,
        triggerRefresh = _ref2.triggerRefresh;
    return _react.default.createElement(_page.ColumnarPage, null, _react.default.createElement(_header.Header, {
      breadcrumbs: breadcrumbs,
      readOnlyBadge: !(uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$infra = uiCapabilities.infrastructure) === null || _uiCapabilities$infra === void 0 ? void 0 : _uiCapabilities$infra.save)
    }), _react.default.createElement(_with_metrics_time.WithMetricsTimeUrlState, null), _react.default.createElement(_document_title.DocumentTitle, {
      title: _i18n.i18n.translate('xpack.infra.metricDetailPage.documentTitle', {
        defaultMessage: 'Infrastructure | Metrics | {name}',
        values: {
          name: name
        }
      })
    }), _react.default.createElement(DetailPageContent, {
      "data-test-subj": "infraMetricsPage"
    }, metadata ? _react.default.createElement(_node_details_page.NodeDetailsPage, {
      name: name,
      requiredMetrics: filteredRequiredMetrics,
      sourceId: sourceId,
      timeRange: timeRange,
      parsedTimeRange: parsedTimeRange,
      nodeType: nodeType,
      nodeId: nodeId,
      cloudId: cloudId,
      metadataLoading: metadataLoading,
      isAutoReloading: isAutoReloading,
      refreshInterval: refreshInterval,
      sideNav: sideNav,
      metadata: metadata,
      addNavItem: addNavItem,
      setRefreshInterval: setRefreshInterval,
      setAutoReload: setAutoReload,
      triggerRefresh: triggerRefresh,
      setTimeRange: setTimeRange
    }) : null));
  });
}));
exports.MetricDetail = MetricDetail;