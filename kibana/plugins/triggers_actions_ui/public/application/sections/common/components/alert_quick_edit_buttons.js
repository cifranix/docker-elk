"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertQuickEditButtonsWithApi = exports.AlertQuickEditButtons = void 0;

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../../../app_context");

var _with_bulk_alert_api_operations = require("./with_bulk_alert_api_operations");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AlertQuickEditButtons = function AlertQuickEditButtons(_ref) {
  var selectedItems = _ref.selectedItems,
      _ref$onPerformingActi = _ref.onPerformingAction,
      onPerformingAction = _ref$onPerformingActi === void 0 ? noop : _ref$onPerformingActi,
      _ref$onActionPerforme = _ref.onActionPerformed,
      onActionPerformed = _ref$onActionPerforme === void 0 ? noop : _ref$onActionPerforme,
      muteAlerts = _ref.muteAlerts,
      unmuteAlerts = _ref.unmuteAlerts,
      enableAlerts = _ref.enableAlerts,
      disableAlerts = _ref.disableAlerts,
      setAlertsToDelete = _ref.setAlertsToDelete;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      toastNotifications = _useAppDependencies.toastNotifications;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isMutingAlerts = _useState2[0],
      setIsMutingAlerts = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isUnmutingAlerts = _useState4[0],
      setIsUnmutingAlerts = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isEnablingAlerts = _useState6[0],
      setIsEnablingAlerts = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isDisablingAlerts = _useState8[0],
      setIsDisablingAlerts = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isDeletingAlerts = _useState10[0],
      setIsDeletingAlerts = _useState10[1];

  var allAlertsMuted = selectedItems.every(isAlertMuted);
  var allAlertsDisabled = selectedItems.every(isAlertDisabled);
  var isPerformingAction = isMutingAlerts || isUnmutingAlerts || isEnablingAlerts || isDisablingAlerts || isDeletingAlerts;

  function onmMuteAllClick() {
    return _onmMuteAllClick.apply(this, arguments);
  }

  function _onmMuteAllClick() {
    _onmMuteAllClick = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              onPerformingAction();
              setIsMutingAlerts(true);
              _context.prev = 2;
              _context.next = 5;
              return muteAlerts(selectedItems);

            case 5:
              _context.next = 10;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](2);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.failedToMuteAlertsMessage', {
                  defaultMessage: 'Failed to mute alert(s)'
                })
              });

            case 10:
              _context.prev = 10;
              setIsMutingAlerts(false);
              onActionPerformed();
              return _context.finish(10);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 7, 10, 14]]);
    }));
    return _onmMuteAllClick.apply(this, arguments);
  }

  function onUnmuteAllClick() {
    return _onUnmuteAllClick.apply(this, arguments);
  }

  function _onUnmuteAllClick() {
    _onUnmuteAllClick = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              onPerformingAction();
              setIsUnmutingAlerts(true);
              _context2.prev = 2;
              _context2.next = 5;
              return unmuteAlerts(selectedItems);

            case 5:
              _context2.next = 10;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](2);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.failedToUnmuteAlertsMessage', {
                  defaultMessage: 'Failed to unmute alert(s)'
                })
              });

            case 10:
              _context2.prev = 10;
              setIsUnmutingAlerts(false);
              onActionPerformed();
              return _context2.finish(10);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[2, 7, 10, 14]]);
    }));
    return _onUnmuteAllClick.apply(this, arguments);
  }

  function onEnableAllClick() {
    return _onEnableAllClick.apply(this, arguments);
  }

  function _onEnableAllClick() {
    _onEnableAllClick = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              onPerformingAction();
              setIsEnablingAlerts(true);
              _context3.prev = 2;
              _context3.next = 5;
              return enableAlerts(selectedItems);

            case 5:
              _context3.next = 10;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](2);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.failedToEnableAlertsMessage', {
                  defaultMessage: 'Failed to enable alert(s)'
                })
              });

            case 10:
              _context3.prev = 10;
              setIsEnablingAlerts(false);
              onActionPerformed();
              return _context3.finish(10);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[2, 7, 10, 14]]);
    }));
    return _onEnableAllClick.apply(this, arguments);
  }

  function onDisableAllClick() {
    return _onDisableAllClick.apply(this, arguments);
  }

  function _onDisableAllClick() {
    _onDisableAllClick = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              onPerformingAction();
              setIsDisablingAlerts(true);
              _context4.prev = 2;
              _context4.next = 5;
              return disableAlerts(selectedItems);

            case 5:
              _context4.next = 10;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](2);
              toastNotifications.addDanger({
                title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.failedToDisableAlertsMessage', {
                  defaultMessage: 'Failed to disable alert(s)'
                })
              });

            case 10:
              _context4.prev = 10;
              setIsDisablingAlerts(false);
              onActionPerformed();
              return _context4.finish(10);

            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 7, 10, 14]]);
    }));
    return _onDisableAllClick.apply(this, arguments);
  }

  function deleteSelectedItems() {
    return _deleteSelectedItems.apply(this, arguments);
  }

  function _deleteSelectedItems() {
    _deleteSelectedItems = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              onPerformingAction();
              setIsDeletingAlerts(true);

              try {
                setAlertsToDelete(selectedItems.map(function (selected) {
                  return selected.id;
                }));
              } catch (e) {
                toastNotifications.addDanger({
                  title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.failedToDeleteAlertsMessage', {
                    defaultMessage: 'Failed to delete alert(s)'
                  })
                });
              } finally {
                setIsDeletingAlerts(false);
                onActionPerformed();
              }

            case 3:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));
    return _deleteSelectedItems.apply(this, arguments);
  }

  return _react.default.createElement(_react.Fragment, null, !allAlertsMuted && _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onmMuteAllClick,
    isLoading: isMutingAlerts,
    isDisabled: isPerformingAction,
    "data-test-subj": "muteAll"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.muteAllTitle",
    defaultMessage: "Mute"
  })), allAlertsMuted && _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onUnmuteAllClick,
    isLoading: isUnmutingAlerts,
    isDisabled: isPerformingAction,
    "data-test-subj": "unmuteAll"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.unmuteAllTitle",
    defaultMessage: "Unmute"
  })), allAlertsDisabled && _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onEnableAllClick,
    isLoading: isEnablingAlerts,
    isDisabled: isPerformingAction,
    "data-test-subj": "enableAll"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.enableAllTitle",
    defaultMessage: "Enable"
  })), !allAlertsDisabled && _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: onDisableAllClick,
    isLoading: isDisablingAlerts,
    isDisabled: isPerformingAction,
    "data-test-subj": "disableAll"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.disableAllTitle",
    defaultMessage: "Disable"
  })), _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: deleteSelectedItems,
    isLoading: isDeletingAlerts,
    isDisabled: isPerformingAction,
    "data-test-subj": "deleteAll"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.alertsList.bulkActionPopover.deleteAllTitle",
    defaultMessage: "Delete"
  })));
};

exports.AlertQuickEditButtons = AlertQuickEditButtons;
var AlertQuickEditButtonsWithApi = (0, _with_bulk_alert_api_operations.withBulkAlertOperations)(AlertQuickEditButtons);
exports.AlertQuickEditButtonsWithApi = AlertQuickEditButtonsWithApi;

function isAlertDisabled(alert) {
  return alert.enabled === false;
}

function isAlertMuted(alert) {
  return alert.muteAll === true;
}

function noop() {}