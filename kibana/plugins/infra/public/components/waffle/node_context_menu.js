"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeContextMenu = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _link_to = require("../../pages/link_to");

var _create_uptime_link = require("./lib/create_uptime_link");

var _inventory_models = require("../../../common/inventory_models");

var _public = require("../../../../../../src/plugins/kibana_react/public");

var _public2 = require("../../../../observability/public");

var _use_link_props = require("../../hooks/use_link_props");

var _alert_flyout = require("../alerting/metrics/alert_flyout");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var NodeContextMenu = function NodeContextMenu(_ref) {
  var _useKibana$services$a, _uiCapabilities$logs;

  var options = _ref.options,
      currentTime = _ref.currentTime,
      children = _ref.children,
      node = _ref.node,
      isPopoverOpen = _ref.isPopoverOpen,
      closePopover = _ref.closePopover,
      nodeType = _ref.nodeType,
      popoverPosition = _ref.popoverPosition;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      flyoutVisible = _useState2[0],
      setFlyoutVisible = _useState2[1];

  var inventoryModel = (0, _inventory_models.findInventoryModel)(nodeType);
  var nodeDetailFrom = currentTime - inventoryModel.metrics.defaultTimeRangeInSeconds * 1000;
  var uiCapabilities = (_useKibana$services$a = (0, _public.useKibana)().services.application) === null || _useKibana$services$a === void 0 ? void 0 : _useKibana$services$a.capabilities; // Due to the changing nature of the fields between APM and this UI,
  // We need to have some exceptions until 7.0 & ECS is finalized. Reference
  // #26620 for the details for these fields.
  // TODO: This is tech debt, remove it after 7.0 & ECS migration.

  var apmField = nodeType === 'host' ? 'host.hostname' : inventoryModel.fields.id;
  var showDetail = inventoryModel.crosslinkSupport.details;
  var showLogsLink = inventoryModel.crosslinkSupport.logs && node.id && (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : (_uiCapabilities$logs = uiCapabilities.logs) === null || _uiCapabilities$logs === void 0 ? void 0 : _uiCapabilities$logs.show);
  var showAPMTraceLink = inventoryModel.crosslinkSupport.apm && (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : uiCapabilities.apm) && (uiCapabilities === null || uiCapabilities === void 0 ? void 0 : uiCapabilities.apm.show);
  var showUptimeLink = inventoryModel.crosslinkSupport.uptime && (['pod', 'container'].includes(nodeType) || node.ip);
  var inventoryId = (0, _react2.useMemo)(function () {
    if (nodeType === 'host') {
      if (node.ip) {
        return {
          label: _react2.default.createElement(_eui.EuiCode, null, "host.ip"),
          value: node.ip
        };
      }
    } else {
      if (options.fields) {
        var _findInventoryFields = (0, _inventory_models.findInventoryFields)(nodeType, options.fields),
            id = _findInventoryFields.id;

        return {
          label: _react2.default.createElement(_eui.EuiCode, null, id),
          value: node.id
        };
      }
    }

    return {
      label: '',
      value: ''
    };
  }, [nodeType, node.ip, node.id, options.fields]);
  var nodeLogsMenuItemLinkProps = (0, _use_link_props.useLinkProps)(_objectSpread({
    app: 'logs'
  }, (0, _link_to.getNodeLogsUrl)({
    nodeType: nodeType,
    nodeId: node.id,
    time: currentTime
  })));
  var nodeDetailMenuItemLinkProps = (0, _use_link_props.useLinkProps)(_objectSpread({}, (0, _link_to.getNodeDetailUrl)({
    nodeType: nodeType,
    nodeId: node.id,
    from: nodeDetailFrom,
    to: currentTime
  })));
  var apmTracesMenuItemLinkProps = (0, _use_link_props.useLinkProps)({
    app: 'apm',
    hash: 'traces',
    search: {
      kuery: "".concat(apmField, ":\"").concat(node.id, "\"")
    }
  });
  var uptimeMenuItemLinkProps = (0, _use_link_props.useLinkProps)((0, _create_uptime_link.createUptimeLink)(options, nodeType, node));

  var nodeLogsMenuItem = _objectSpread({
    label: _i18n.i18n.translate('xpack.infra.nodeContextMenu.viewLogsName', {
      defaultMessage: '{inventoryName} logs',
      values: {
        inventoryName: inventoryModel.singularDisplayName
      }
    })
  }, nodeLogsMenuItemLinkProps, {
    'data-test-subj': 'viewLogsContextMenuItem',
    isDisabled: !showLogsLink
  });

  var nodeDetailMenuItem = _objectSpread({
    label: _i18n.i18n.translate('xpack.infra.nodeContextMenu.viewMetricsName', {
      defaultMessage: '{inventoryName} metrics',
      values: {
        inventoryName: inventoryModel.singularDisplayName
      }
    })
  }, nodeDetailMenuItemLinkProps, {
    isDisabled: !showDetail
  });

  var apmTracesMenuItem = _objectSpread({
    label: _i18n.i18n.translate('xpack.infra.nodeContextMenu.viewAPMTraces', {
      defaultMessage: '{inventoryName} APM traces',
      values: {
        inventoryName: inventoryModel.singularDisplayName
      }
    })
  }, apmTracesMenuItemLinkProps, {
    'data-test-subj': 'viewApmTracesContextMenuItem',
    isDisabled: !showAPMTraceLink
  });

  var uptimeMenuItem = _objectSpread({
    label: _i18n.i18n.translate('xpack.infra.nodeContextMenu.viewUptimeLink', {
      defaultMessage: '{inventoryName} in Uptime',
      values: {
        inventoryName: inventoryModel.singularDisplayName
      }
    })
  }, uptimeMenuItemLinkProps, {
    isDisabled: !showUptimeLink
  });

  return _react2.default.createElement(_react2.default.Fragment, null, _react2.default.createElement(_public2.ActionMenu, {
    closePopover: closePopover,
    id: "".concat(node.pathId, "-popover"),
    isOpen: isPopoverOpen,
    button: children,
    anchorPosition: popoverPosition
  }, _react2.default.createElement("div", {
    style: {
      maxWidth: 300
    },
    "data-test-subj": "nodeContextMenu"
  }, _react2.default.createElement(_public2.Section, null, _react2.default.createElement(_public2.SectionTitle, null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.nodeContextMenu.title",
    defaultMessage: "{inventoryName} details",
    values: {
      inventoryName: inventoryModel.singularDisplayName
    }
  })), inventoryId.label && _react2.default.createElement(_public2.SectionSubtitle, null, _react2.default.createElement("div", {
    style: {
      wordBreak: 'break-all'
    }
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.nodeContextMenu.description",
    defaultMessage: "View details for {label} {value}",
    values: {
      label: inventoryId.label,
      value: inventoryId.value
    }
  }))), _react2.default.createElement(_public2.SectionLinks, null, _react2.default.createElement(_public2.SectionLink, _extends({
    "data-test-subj": "viewLogsContextMenuItem"
  }, nodeLogsMenuItem)), _react2.default.createElement(_public2.SectionLink, nodeDetailMenuItem), _react2.default.createElement(_public2.SectionLink, _extends({
    "data-test-subj": "viewApmTracesContextMenuItem"
  }, apmTracesMenuItem)), _react2.default.createElement(_public2.SectionLink, uptimeMenuItem))))), _react2.default.createElement(_alert_flyout.AlertFlyout, {
    options: {
      filterQuery: "".concat(nodeType, ": ").concat(node.id)
    },
    setVisible: setFlyoutVisible,
    visible: flyoutVisible
  }));
};

exports.NodeContextMenu = NodeContextMenu;