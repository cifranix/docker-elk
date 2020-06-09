"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsExplorerChartContextMenu = exports.createNodeDetailLink = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _datemath = _interopRequireDefault(require("@elastic/datemath"));

var _create_tsvb_link = require("./helpers/create_tsvb_link");

var _redirect_to_node_detail = require("../../pages/link_to/redirect_to_node_detail");

var _alert_flyout = require("../alerting/metrics/alert_flyout");

var _use_link_props = require("../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fieldToNodeType = function fieldToNodeType(source, field) {
  if (source.fields.host === field) {
    return 'host';
  }

  if (source.fields.pod === field) {
    return 'pod';
  }

  if (source.fields.container === field) {
    return 'container';
  }
};

var dateMathExpressionToEpoch = function dateMathExpressionToEpoch(dateMathExpression) {
  var roundUp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var dateObj = _datemath.default.parse(dateMathExpression, {
    roundUp: roundUp
  });

  if (!dateObj) throw new Error("\"".concat(dateMathExpression, "\" is not a valid time string"));
  return dateObj.valueOf();
};

var createNodeDetailLink = function createNodeDetailLink(nodeType, nodeId, from, to) {
  return (0, _redirect_to_node_detail.getNodeDetailUrl)({
    nodeType: nodeType,
    nodeId: nodeId,
    from: dateMathExpressionToEpoch(from),
    to: dateMathExpressionToEpoch(to, true)
  });
};

exports.createNodeDetailLink = createNodeDetailLink;

var MetricsExplorerChartContextMenu = function MetricsExplorerChartContextMenu(_ref) {
  var _uiCapabilities$visua;

  var onFilter = _ref.onFilter,
      options = _ref.options,
      series = _ref.series,
      source = _ref.source,
      timeRange = _ref.timeRange,
      uiCapabilities = _ref.uiCapabilities,
      chartOptions = _ref.chartOptions;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setPopoverState = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      flyoutVisible = _useState4[0],
      setFlyoutVisible = _useState4[1];

  var supportFiltering = options.groupBy != null && onFilter != null;
  var handleFilter = (0, _react.useCallback)(function () {
    // onFilter needs check for Typescript even though it's
    // covered by supportFiltering variable
    if (supportFiltering && onFilter) {
      onFilter("".concat(options.groupBy, ": \"").concat(series.id, "\""));
    }

    setPopoverState(false);
  }, [supportFiltering, options.groupBy, series.id, onFilter]); // Only display the "Add Filter" option if it's supported

  var filterByItem = supportFiltering ? [{
    name: _i18n.i18n.translate('xpack.infra.metricsExplorer.filterByLabel', {
      defaultMessage: 'Add filter'
    }),
    icon: 'metricsApp',
    onClick: handleFilter,
    'data-test-subj': 'metricsExplorerAction-AddFilter'
  }] : [];
  var nodeType = source && options.groupBy && fieldToNodeType(source, options.groupBy);
  var nodeDetailLinkProps = (0, _use_link_props.useLinkProps)(_objectSpread({
    app: 'metrics'
  }, nodeType ? createNodeDetailLink(nodeType, series.id, timeRange.from, timeRange.to) : {}));
  var tsvbLinkProps = (0, _use_link_props.useLinkProps)(_objectSpread({}, (0, _create_tsvb_link.createTSVBLink)(source, options, series, timeRange, chartOptions)));
  var viewNodeDetail = nodeType ? [_objectSpread({
    name: _i18n.i18n.translate('xpack.infra.metricsExplorer.viewNodeDetail', {
      defaultMessage: 'View metrics for {name}',
      values: {
        name: nodeType
      }
    }),
    icon: 'metricsApp'
  }, nodeType ? nodeDetailLinkProps : {}, {
    'data-test-subj': 'metricsExplorerAction-ViewNodeMetrics'
  })] : [];
  var openInVisualize = (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$visua = uiCapabilities.visualize) === null || _uiCapabilities$visua === void 0 ? void 0 : _uiCapabilities$visua.show) ? [_objectSpread({
    name: _i18n.i18n.translate('xpack.infra.metricsExplorer.openInTSVB', {
      defaultMessage: 'Open in Visualize'
    })
  }, tsvbLinkProps, {
    icon: 'visualizeApp',
    disabled: options.metrics.length === 0,
    'data-test-subj': 'metricsExplorerAction-OpenInTSVB'
  })] : [];
  var itemPanels = [].concat(filterByItem, openInVisualize, viewNodeDetail, [{
    name: _i18n.i18n.translate('xpack.infra.metricsExplorer.alerts.createAlertButton', {
      defaultMessage: 'Create alert'
    }),
    icon: 'bell',
    onClick: function onClick() {
      setFlyoutVisible(true);
    }
  }]); // If there are no itemPanels then there is no reason to show the actions button.

  if (itemPanels.length === 0) return null;
  var panels = [{
    id: 0,
    title: 'Actions',
    items: itemPanels
  }];

  var handleClose = function handleClose() {
    return setPopoverState(false);
  };

  var handleOpen = function handleOpen() {
    return setPopoverState(true);
  };

  var actionAriaLabel = _i18n.i18n.translate('xpack.infra.metricsExplorer.actionsLabel.aria', {
    defaultMessage: 'Actions for {grouping}',
    values: {
      grouping: series.id
    }
  });

  var actionLabel = _i18n.i18n.translate('xpack.infra.metricsExplorer.actionsLabel.button', {
    defaultMessage: 'Actions'
  });

  var button = _react.default.createElement(_eui.EuiButtonEmpty, {
    contentProps: {
      'aria-label': actionAriaLabel
    },
    onClick: handleOpen,
    size: "s",
    iconType: "arrowDown",
    iconSide: "right"
  }, actionLabel);

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPopover, {
    closePopover: handleClose,
    id: "".concat(series.id, "-popover"),
    button: button,
    isOpen: isPopoverOpen,
    panelPaddingSize: "none"
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: 0,
    panels: panels
  }), _react.default.createElement(_alert_flyout.AlertFlyout, {
    series: series,
    options: options,
    setVisible: setFlyoutVisible,
    visible: flyoutVisible
  })));
};

exports.MetricsExplorerChartContextMenu = MetricsExplorerChartContextMenu;