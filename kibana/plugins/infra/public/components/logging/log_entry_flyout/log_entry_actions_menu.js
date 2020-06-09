"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogEntryActionsMenu = void 0;

var rt = _interopRequireWildcard(require("io-ts"));

var _eui = require("@elastic/eui");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _use_visibility_state = require("../../../utils/use_visibility_state");

var _ExternalLinks = require("../../../../../../legacy/plugins/apm/public/components/shared/Links/apm/ExternalLinks");

var _use_link_props = require("../../../hooks/use_link_props");

var _runtime_types = require("../../../../common/runtime_types");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var UPTIME_FIELDS = ['container.id', 'host.ip', 'kubernetes.pod.uid'];

var LogEntryActionsMenu = function LogEntryActionsMenu(_ref) {
  var logItem = _ref.logItem;

  var _useVisibilityState = (0, _use_visibility_state.useVisibilityState)(false),
      hide = _useVisibilityState.hide,
      isVisible = _useVisibilityState.isVisible,
      show = _useVisibilityState.show;

  var apmLinkDescriptor = (0, _react2.useMemo)(function () {
    return getAPMLink(logItem);
  }, [logItem]);
  var uptimeLinkDescriptor = (0, _react2.useMemo)(function () {
    return getUptimeLink(logItem);
  }, [logItem]);
  var uptimeLinkProps = (0, _use_link_props.useLinkProps)(_objectSpread({
    app: 'uptime'
  }, uptimeLinkDescriptor ? uptimeLinkDescriptor : {}));
  var apmLinkProps = (0, _use_link_props.useLinkProps)(_objectSpread({
    app: 'apm'
  }, apmLinkDescriptor ? apmLinkDescriptor : {}));
  var menuItems = (0, _react2.useMemo)(function () {
    return [_react2.default.createElement(_eui.EuiContextMenuItem, _extends({
      "data-test-subj": "logEntryActionsMenuItem uptimeLogEntryActionsMenuItem",
      disabled: !uptimeLinkDescriptor,
      icon: "uptimeApp",
      key: "uptimeLink"
    }, uptimeLinkProps), _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logEntryActionsMenu.uptimeActionLabel",
      defaultMessage: "View status in Uptime"
    })), _react2.default.createElement(_eui.EuiContextMenuItem, _extends({
      "data-test-subj": "logEntryActionsMenuItem apmLogEntryActionsMenuItem",
      disabled: !apmLinkDescriptor,
      icon: "apmApp",
      key: "apmLink"
    }, apmLinkProps), _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logEntryActionsMenu.apmActionLabel",
      defaultMessage: "View in APM"
    }))];
  }, [uptimeLinkDescriptor, apmLinkDescriptor, apmLinkProps, uptimeLinkProps]);
  var hasMenuItems = (0, _react2.useMemo)(function () {
    return menuItems.length > 0;
  }, [menuItems]);
  return _react2.default.createElement(_eui.EuiPopover, {
    anchorPosition: "downRight",
    button: _react2.default.createElement(_eui.EuiButtonEmpty, {
      "data-test-subj": "logEntryActionsMenuButton",
      disabled: !hasMenuItems,
      iconSide: "right",
      iconType: "arrowDown",
      onClick: show
    }, _react2.default.createElement(_react.FormattedMessage, {
      id: "xpack.infra.logEntryActionsMenu.buttonLabel",
      defaultMessage: "Actions"
    })),
    closePopover: hide,
    id: "logEntryActionsMenu",
    isOpen: isVisible,
    panelPaddingSize: "none"
  }, _react2.default.createElement(_eui.EuiContextMenuPanel, {
    items: menuItems
  }));
};

exports.LogEntryActionsMenu = LogEntryActionsMenu;

var getUptimeLink = function getUptimeLink(logItem) {
  var searchExpressions = logItem.fields.filter(function (_ref2) {
    var field = _ref2.field,
        value = _ref2.value;
    return value != null && UPTIME_FIELDS.includes(field);
  }).reduce(function (acc, fieldItem) {
    var field = fieldItem.field,
        value = fieldItem.value;

    try {
      var parsedValue = (0, _runtime_types.decodeOrThrow)(rt.array(rt.string))(JSON.parse(value));
      return acc.concat(parsedValue.map(function (val) {
        return "".concat(field, ":").concat(val);
      }));
    } catch (e) {
      return acc.concat(["".concat(field, ":").concat(value)]);
    }
  }, []);

  if (searchExpressions.length === 0) {
    return undefined;
  }

  return {
    app: 'uptime',
    hash: '/',
    search: {
      search: "".concat(searchExpressions.join(' or '))
    }
  };
};

var getAPMLink = function getAPMLink(logItem) {
  var traceIdEntry = logItem.fields.find(function (_ref3) {
    var field = _ref3.field,
        value = _ref3.value;
    return value != null && field === 'trace.id';
  });

  if (!traceIdEntry) {
    return undefined;
  }

  var timestampField = logItem.fields.find(function (_ref4) {
    var field = _ref4.field;
    return field === '@timestamp';
  });
  var timestamp = timestampField ? timestampField.value : null;

  var _ref5 = timestamp ? function () {
    var from = new Date(timestamp);
    var to = new Date(timestamp);
    from.setMinutes(from.getMinutes() - 10);
    to.setMinutes(to.getMinutes() + 10);
    return {
      rangeFrom: from.toISOString(),
      rangeTo: to.toISOString()
    };
  }() : {
    rangeFrom: 'now-1y',
    rangeTo: 'now'
  },
      rangeFrom = _ref5.rangeFrom,
      rangeTo = _ref5.rangeTo;

  return {
    app: 'apm',
    hash: (0, _ExternalLinks.getTraceUrl)({
      traceId: traceIdEntry.value,
      rangeFrom: rangeFrom,
      rangeTo: rangeTo
    })
  };
};