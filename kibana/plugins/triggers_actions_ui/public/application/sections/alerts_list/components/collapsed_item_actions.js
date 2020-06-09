"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CollapsedItemActionsWithApi = exports.CollapsedItemActions = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../../../app_context");

var _capabilities = require("../../../lib/capabilities");

var _with_bulk_alert_api_operations = require("../../common/components/with_bulk_alert_api_operations");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CollapsedItemActions = function CollapsedItemActions(_ref) {
  var item = _ref.item,
      onAlertChanged = _ref.onAlertChanged,
      disableAlert = _ref.disableAlert,
      enableAlert = _ref.enableAlert,
      unmuteAlert = _ref.unmuteAlert,
      muteAlert = _ref.muteAlert,
      setAlertsToDelete = _ref.setAlertsToDelete;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      capabilities = _useAppDependencies.capabilities;

  var canDelete = (0, _capabilities.hasDeleteAlertsCapability)(capabilities);
  var canSave = (0, _capabilities.hasSaveAlertsCapability)(capabilities);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var button = _react.default.createElement(_eui.EuiButtonIcon, {
    disabled: !canDelete && !canSave,
    iconType: "boxesVertical",
    onClick: function onClick() {
      return setIsPopoverOpen(!isPopoverOpen);
    },
    "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.collapsedItemActons.popoverButtonTitle', {
      defaultMessage: 'Actions'
    })
  });

  return _react.default.createElement(_eui.EuiPopover, {
    button: button,
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setIsPopoverOpen(false);
    },
    ownFocus: true,
    "data-test-subj": "collapsedItemActions"
  }, _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
    name: "enable",
    disabled: !canSave,
    checked: item.enabled,
    "data-test-subj": "enableSwitch",
    onChange:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!item.enabled) {
                _context.next = 5;
                break;
              }

              _context.next = 3;
              return disableAlert(item);

            case 3:
              _context.next = 7;
              break;

            case 5:
              _context.next = 7;
              return enableAlert(item);

            case 7:
              onAlertChanged();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertsList.collapsedItemActons.enableTitle",
      defaultMessage: "Enable"
    })
  })), _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiSwitch, {
    name: "mute",
    checked: item.muteAll,
    disabled: !(canSave && item.enabled),
    "data-test-subj": "muteSwitch",
    onChange:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!item.muteAll) {
                _context2.next = 5;
                break;
              }

              _context2.next = 3;
              return unmuteAlert(item);

            case 3:
              _context2.next = 7;
              break;

            case 5:
              _context2.next = 7;
              return muteAlert(item);

            case 7:
              onAlertChanged();

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })),
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.triggersActionsUI.sections.alertsList.collapsedItemActons.muteTitle",
      defaultMessage: "Mute"
    })
  })), _react.default.createElement(_eui.EuiPopoverFooter, null, _react.default.createElement(_eui.EuiFormRow, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    isDisabled: !canDelete,
    iconType: "trash",
    color: "text",
    "data-test-subj": "deleteAlert",
    onClick: function onClick() {
      return setAlertsToDelete([item.id]);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertsList.collapsedItemActons.deleteTitle",
    defaultMessage: "Delete"
  })))));
};

exports.CollapsedItemActions = CollapsedItemActions;
var CollapsedItemActionsWithApi = (0, _with_bulk_alert_api_operations.withBulkAlertOperations)(CollapsedItemActions);
exports.CollapsedItemActionsWithApi = CollapsedItemActionsWithApi;