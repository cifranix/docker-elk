"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertInstances = AlertInstances;
exports.alertInstanceToListItem = alertInstanceToListItem;
exports.AlertInstancesWithApi = exports.alertInstancesTableColumns = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _services = require("@elastic/eui/lib/services");

var _lodash = require("lodash");

var _react2 = require("@kbn/i18n/react");

var _with_bulk_alert_api_operations = require("../../common/components/with_bulk_alert_api_operations");

var _constants = require("../../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var alertInstancesTableColumns = function alertInstancesTableColumns(onMuteAction) {
  return [{
    field: 'instance',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.columns.instance', {
      defaultMessage: 'Instance'
    }),
    sortable: false,
    truncateText: true,
    'data-test-subj': 'alertInstancesTableCell-instance'
  }, {
    field: 'status',
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.columns.status', {
      defaultMessage: 'Status'
    }),
    render: function render(value, instance) {
      return _react.default.createElement(_eui.EuiHealth, {
        color: value.healthColor
      }, value.label);
    },
    sortable: false,
    'data-test-subj': 'alertInstancesTableCell-status'
  }, {
    field: 'start',
    render: function render(value, instance) {
      return value ? (0, _moment.default)(value).format('D MMM YYYY @ HH:mm:ss') : '';
    },
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.columns.start', {
      defaultMessage: 'Start'
    }),
    sortable: false,
    'data-test-subj': 'alertInstancesTableCell-start'
  }, {
    field: 'duration',
    align: _services.CENTER_ALIGNMENT,
    render: function render(value, instance) {
      return value ? durationAsString(_moment.default.duration(value)) : '';
    },
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.columns.duration', {
      defaultMessage: 'Duration'
    }),
    sortable: false,
    'data-test-subj': 'alertInstancesTableCell-duration'
  }, {
    field: '',
    align: _services.RIGHT_ALIGNMENT,
    name: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.columns.actions', {
      defaultMessage: 'Actions'
    }),
    render: function render(alertInstance) {
      return _react.default.createElement(_react.Fragment, null, alertInstance.isMuted ? _react.default.createElement(_eui.EuiBadge, {
        "data-test-subj": "mutedAlertInstanceLabel_".concat(alertInstance.instance)
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.triggersActionsUI.sections.alertDetails.alertInstances.mutedAlert",
        defaultMessage: "Muted"
      })) : _react.default.createElement(_react.Fragment, null), _react.default.createElement(_eui.EuiButtonToggle, {
        label: alertInstance.isMuted ? _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.actions.unmute', {
          defaultMessage: 'Unmute'
        }) : _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.actions.mute', {
          defaultMessage: 'Mute'
        }),
        "data-test-subj": "muteAlertInstanceButton_".concat(alertInstance.instance),
        iconType: alertInstance.isMuted ? 'eyeClosed' : 'eye',
        onChange: function onChange() {
          return onMuteAction(alertInstance);
        },
        isSelected: alertInstance.isMuted,
        isEmpty: true,
        isIconOnly: true
      }));
    },
    sortable: false,
    'data-test-subj': 'alertInstancesTableCell-actions'
  }];
};

exports.alertInstancesTableColumns = alertInstancesTableColumns;

function durationAsString(duration) {
  return [duration.hours(), duration.minutes(), duration.seconds()].map(function (value) {
    return (0, _lodash.padLeft)("".concat(value), 2, '0');
  }).join(':');
}

function AlertInstances(_ref) {
  var alert = _ref.alert,
      _ref$alertState$alert = _ref.alertState.alertInstances,
      alertInstances = _ref$alertState$alert === void 0 ? {} : _ref$alertState$alert,
      muteAlertInstance = _ref.muteAlertInstance,
      unmuteAlertInstance = _ref.unmuteAlertInstance,
      requestRefresh = _ref.requestRefresh,
      _ref$durationEpoch = _ref.durationEpoch,
      durationEpoch = _ref$durationEpoch === void 0 ? Date.now() : _ref$durationEpoch;

  var _useState = (0, _react.useState)({
    index: 0,
    size: _constants.DEFAULT_SEARCH_PAGE_SIZE
  }),
      _useState2 = _slicedToArray(_useState, 2),
      pagination = _useState2[0],
      setPagination = _useState2[1];

  var mergedAlertInstances = [].concat(_toConsumableArray(Object.entries(alertInstances).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        instanceId = _ref3[0],
        instance = _ref3[1];

    return alertInstanceToListItem(durationEpoch, alert, instanceId, instance);
  })), _toConsumableArray((0, _lodash.difference)(alert.mutedInstanceIds, Object.keys(alertInstances)).map(function (instanceId) {
    return alertInstanceToListItem(durationEpoch, alert, instanceId);
  })));
  var pageOfAlertInstances = getPage(mergedAlertInstances, pagination);

  var onMuteAction =
  /*#__PURE__*/
  function () {
    var _ref4 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(instance) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return instance.isMuted ? unmuteAlertInstance(alert, instance.instance) : muteAlertInstance(alert, instance.instance);

            case 2:
              requestRefresh();

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onMuteAction(_x) {
      return _ref4.apply(this, arguments);
    };
  }();

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("input", {
    type: "hidden",
    "data-test-subj": "alertInstancesDurationEpoch",
    name: "alertInstancesDurationEpoch",
    value: durationEpoch
  }), _react.default.createElement(_eui.EuiBasicTable, {
    items: pageOfAlertInstances,
    pagination: {
      pageIndex: pagination.index,
      pageSize: pagination.size,
      totalItemCount: mergedAlertInstances.length
    },
    onChange: function onChange(_ref5) {
      var changedPage = _ref5.page;
      setPagination(changedPage);
    },
    rowProps: function rowProps() {
      return {
        'data-test-subj': 'alert-instance-row'
      };
    },
    cellProps: function cellProps() {
      return {
        'data-test-subj': 'cell'
      };
    },
    columns: alertInstancesTableColumns(onMuteAction),
    "data-test-subj": "alertInstancesList"
  }));
}

var AlertInstancesWithApi = (0, _with_bulk_alert_api_operations.withBulkAlertOperations)(AlertInstances);
exports.AlertInstancesWithApi = AlertInstancesWithApi;

function getPage(items, pagination) {
  return (0, _lodash.chunk)(items, pagination.size)[pagination.index] || [];
}

var ACTIVE_LABEL = _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.status.active', {
  defaultMessage: 'Active'
});

var INACTIVE_LABEL = _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertDetails.alertInstancesList.status.inactive', {
  defaultMessage: 'Inactive'
});

var durationSince = function durationSince(durationEpoch, startTime) {
  return startTime ? durationEpoch - startTime : 0;
};

function alertInstanceToListItem(durationEpoch, alert, instanceId, instance) {
  var _instance$meta, _instance$meta$lastSc, _ref6, _instance$meta2, _instance$meta2$lastS, _instance$meta2$lastS2;

  var isMuted = alert.mutedInstanceIds.findIndex(function (muted) {
    return muted === instanceId;
  }) >= 0;
  return {
    instance: instanceId,
    status: instance ? {
      label: ACTIVE_LABEL,
      healthColor: 'primary'
    } : {
      label: INACTIVE_LABEL,
      healthColor: 'subdued'
    },
    start: instance === null || instance === void 0 ? void 0 : (_instance$meta = instance.meta) === null || _instance$meta === void 0 ? void 0 : (_instance$meta$lastSc = _instance$meta.lastScheduledActions) === null || _instance$meta$lastSc === void 0 ? void 0 : _instance$meta$lastSc.date,
    duration: durationSince(durationEpoch, (_ref6 = instance === null || instance === void 0 ? void 0 : (_instance$meta2 = instance.meta) === null || _instance$meta2 === void 0 ? void 0 : (_instance$meta2$lastS = _instance$meta2.lastScheduledActions) === null || _instance$meta2$lastS === void 0 ? void 0 : (_instance$meta2$lastS2 = _instance$meta2$lastS.date) === null || _instance$meta2$lastS2 === void 0 ? void 0 : _instance$meta2$lastS2.getTime()) !== null && _ref6 !== void 0 ? _ref6 : 0),
    isMuted: isMuted
  };
}