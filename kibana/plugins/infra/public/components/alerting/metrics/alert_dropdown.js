"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDropdown = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _alert_flyout = require("./alert_flyout");

var _public = require("../../../../../../../src/plugins/kibana_react/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AlertDropdown = function AlertDropdown() {
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      popoverOpen = _useState2[0],
      setPopoverOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      flyoutVisible = _useState4[0],
      setFlyoutVisible = _useState4[1];

  var kibana = (0, _public.useKibana)();
  var closePopover = (0, _react.useCallback)(function () {
    setPopoverOpen(false);
  }, [setPopoverOpen]);
  var openPopover = (0, _react.useCallback)(function () {
    setPopoverOpen(true);
  }, [setPopoverOpen]);
  var menuItems = (0, _react.useMemo)(function () {
    var _kibana$services, _kibana$services$appl;

    return [_react.default.createElement(_eui.EuiContextMenuItem, {
      icon: "bell",
      key: "createLink",
      onClick: function onClick() {
        return setFlyoutVisible(true);
      }
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.alerting.createAlertButton",
      defaultMessage: "Create alert"
    })), _react.default.createElement(_eui.EuiContextMenuItem, {
      icon: "tableOfContents",
      key: "manageLink",
      href: (_kibana$services = kibana.services) === null || _kibana$services === void 0 ? void 0 : (_kibana$services$appl = _kibana$services.application) === null || _kibana$services$appl === void 0 ? void 0 : _kibana$services$appl.getUrlForApp('kibana#/management/kibana/triggersActions/alerts')
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.alerting.manageAlerts",
      defaultMessage: "Manage alerts"
    }))];
  }, [kibana.services]);
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_eui.EuiButtonEmpty, {
      iconSide: 'right',
      iconType: 'arrowDown',
      onClick: openPopover
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.infra.alerting.alertsButton",
      defaultMessage: "Alerts"
    })),
    isOpen: popoverOpen,
    closePopover: closePopover
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: menuItems
  })), _react.default.createElement(_alert_flyout.AlertFlyout, {
    setVisible: setFlyoutVisible,
    visible: flyoutVisible
  }));
};

exports.AlertDropdown = AlertDropdown;