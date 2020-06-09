"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaffleInventorySwitcher = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _inventory_models = require("../../../common/inventory_models");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getDisplayNameForType = function getDisplayNameForType(type) {
  var inventoryModel = (0, _inventory_models.findInventoryModel)(type);
  return inventoryModel.displayName;
};

var WaffleInventorySwitcher = function WaffleInventorySwitcher(_ref) {
  var changeNodeType = _ref.changeNodeType,
      changeGroupBy = _ref.changeGroupBy,
      changeMetric = _ref.changeMetric,
      changeAccount = _ref.changeAccount,
      changeRegion = _ref.changeRegion,
      changeCustomMetrics = _ref.changeCustomMetrics,
      nodeType = _ref.nodeType;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var closePopover = (0, _react.useCallback)(function () {
    return setIsOpen(false);
  }, []);
  var openPopover = (0, _react.useCallback)(function () {
    return setIsOpen(true);
  }, []);
  var goToNodeType = (0, _react.useCallback)(function (targetNodeType) {
    closePopover();
    changeNodeType(targetNodeType);
    changeGroupBy([]);
    changeCustomMetrics([]);
    changeAccount('');
    changeRegion('');
    var inventoryModel = (0, _inventory_models.findInventoryModel)(targetNodeType);
    changeMetric({
      type: inventoryModel.metrics.defaultSnapshot
    });
  }, [closePopover, changeNodeType, changeGroupBy, changeCustomMetrics, changeAccount, changeRegion, changeMetric]);
  var goToHost = (0, _react.useCallback)(function () {
    return goToNodeType('host');
  }, [goToNodeType]);
  var goToK8 = (0, _react.useCallback)(function () {
    return goToNodeType('pod');
  }, [goToNodeType]);
  var goToDocker = (0, _react.useCallback)(function () {
    return goToNodeType('container');
  }, [goToNodeType]);
  var goToAwsEC2 = (0, _react.useCallback)(function () {
    return goToNodeType('awsEC2');
  }, [goToNodeType]);
  var goToAwsS3 = (0, _react.useCallback)(function () {
    return goToNodeType('awsS3');
  }, [goToNodeType]);
  var goToAwsRDS = (0, _react.useCallback)(function () {
    return goToNodeType('awsRDS');
  }, [goToNodeType]);
  var goToAwsSQS = (0, _react.useCallback)(function () {
    return goToNodeType('awsSQS');
  }, [goToNodeType]);
  var panels = (0, _react.useMemo)(function () {
    return [{
      id: 'firstPanel',
      items: [{
        name: getDisplayNameForType('host'),
        onClick: goToHost
      }, {
        name: getDisplayNameForType('pod'),
        onClick: goToK8
      }, {
        name: getDisplayNameForType('container'),
        onClick: goToDocker
      }, {
        name: 'AWS',
        panel: 'awsPanel'
      }]
    }, {
      id: 'awsPanel',
      title: 'AWS',
      items: [{
        name: getDisplayNameForType('awsEC2'),
        onClick: goToAwsEC2
      }, {
        name: getDisplayNameForType('awsS3'),
        onClick: goToAwsS3
      }, {
        name: getDisplayNameForType('awsRDS'),
        onClick: goToAwsRDS
      }, {
        name: getDisplayNameForType('awsSQS'),
        onClick: goToAwsSQS
      }]
    }];
  }, [goToAwsEC2, goToAwsRDS, goToAwsS3, goToAwsSQS, goToDocker, goToHost, goToK8]);
  var selectedText = (0, _react.useMemo)(function () {
    return getDisplayNameForType(nodeType);
  }, [nodeType]);
  return _react.default.createElement(_eui.EuiFilterGroup, null, _react.default.createElement(_eui.EuiPopover, {
    id: "contextMenu",
    button: _react.default.createElement(_eui.EuiFilterButton, {
      iconType: "arrowDown",
      onClick: openPopover
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.waffle.inventoryButtonLabel",
      defaultMessage: "View: {selectedText}",
      values: {
        selectedText: selectedText
      }
    })),
    isOpen: isOpen,
    closePopover: closePopover,
    panelPaddingSize: "none",
    withTitle: true,
    anchorPosition: "downLeft"
  }, _react.default.createElement(_eui.EuiContextMenu, {
    initialPanelId: "firstPanel",
    panels: panels
  })));
};

exports.WaffleInventorySwitcher = WaffleInventorySwitcher;