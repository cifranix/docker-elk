"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyRetentionSchedule = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../../../../app_context");

var _components = require("../../../../components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PolicyRetentionSchedule = function PolicyRetentionSchedule(_ref) {
  var retentionSettings = _ref.retentionSettings,
      onRetentionScheduleUpdated = _ref.onRetentionScheduleUpdated,
      isLoading = _ref.isLoading,
      error = _ref.error;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopoverOpen = _useState2[1];

  var renderRetentionPanel = function renderRetentionPanel(cronSchedule) {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceBetween",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyRetentionSchedulePanel.retentionScheduleDescription",
      defaultMessage: "The cron schedule for retaining snapshots is: {cronSchedule}.",
      values: {
        cronSchedule: _react.default.createElement("strong", null, cronSchedule)
      }
    })))), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_components.RetentionExecuteModalProvider, null, function (executeRetentionPrompt) {
      return _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.policyRetentionSchedulePanel.retentionScheduleExecuteLinkTooltip",
          defaultMessage: "Run retention now"
        })
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "play",
        onClick: function onClick() {
          return executeRetentionPrompt();
        },
        "aria-label": i18n.translate('xpack.snapshotRestore.policyRetentionSchedulePanel.retentionScheduleExecuteLinkAriaLabel', {
          defaultMessage: 'Run retention now'
        })
      }));
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_components.RetentionSettingsUpdateModalProvider, null, function (updateRetentionPrompt) {
      return _react.default.createElement(_eui.EuiToolTip, {
        position: "top",
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.policyRetentionSchedulePanel.retentionScheduleEditLinkTooltip",
          defaultMessage: "Edit retention schedule"
        })
      }, _react.default.createElement(_eui.EuiButtonIcon, {
        iconType: "pencil",
        onClick: function onClick() {
          return updateRetentionPrompt(cronSchedule, onRetentionScheduleUpdated);
        },
        "aria-label": i18n.translate('xpack.snapshotRestore.policyRetentionSchedulePanel.retentionScheduleEditLinkAriaLabel', {
          defaultMessage: 'Edit retention schedule'
        })
      }));
    })))))), _react.default.createElement(_eui.EuiSpacer, null));
  };

  var renderRetentionNotConfiguredCallout = function renderRetentionNotConfiguredCallout() {
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyRetentionSchedulePanel.noScheduleConfiguredWarningTitle",
        defaultMessage: "Retention not scheduled"
      }),
      color: "warning",
      iconType: "alert"
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyRetentionSchedulePanel.noScheduleConfiguredWarningDescription",
      defaultMessage: "One or more policies have a retention period, but no retention is scheduled."
    })), _react.default.createElement(_components.RetentionExecuteModalProvider, null, function (executeRetentionPrompt) {
      return _react.default.createElement(_components.RetentionSettingsUpdateModalProvider, null, function (updateRetentionSettingsPrompt) {
        return _react.default.createElement(_eui.EuiPopover, {
          id: "retentionActionMenu",
          button: _react.default.createElement(_eui.EuiButton, {
            "data-test-subj": "retentionActionMenuButton",
            iconSide: "right",
            color: "warning",
            onClick: function onClick() {
              return setIsPopoverOpen(!isPopoverOpen);
            },
            iconType: "arrowDown"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.policyRetentionSchedulePanel.manageRetentionButtonLabel",
            defaultMessage: "Manage retention"
          })),
          isOpen: isPopoverOpen,
          closePopover: function closePopover() {
            return setIsPopoverOpen(false);
          },
          panelPaddingSize: "none",
          withTitle: true,
          anchorPosition: "rightUp",
          repositionOnScroll: true
        }, _react.default.createElement(_eui.EuiContextMenu, {
          "data-test-subj": "retentionActionContextMenu",
          initialPanelId: 0,
          panels: [{
            id: 0,
            title: i18n.translate('xpack.snapshotRestore.policyRetentionSchedulePanel.managePanelTitle', {
              defaultMessage: 'Retention options'
            }),
            items: [{
              name: i18n.translate('xpack.snapshotRestore.policyRetentionSchedulePanel.executeButtonLabel', {
                defaultMessage: 'Run now'
              }),
              icon: 'play',
              onClick: function onClick() {
                return executeRetentionPrompt();
              }
            }, {
              name: i18n.translate('xpack.snapshotRestore.policyRetentionSchedulePanel.addButtonLabel', {
                defaultMessage: 'Schedule'
              }),
              icon: 'plusInCircle',
              onClick: function onClick() {
                return updateRetentionSettingsPrompt(undefined, onRetentionScheduleUpdated);
              }
            }]
          }]
        }));
      });
    })), _react.default.createElement(_eui.EuiSpacer, null));
  };

  if (isLoading) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiPanel, null, _react.default.createElement(_eui.EuiLoadingContent, {
      lines: 1
    })), _react.default.createElement(_eui.EuiSpacer, null));
  }

  if (error) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyRetentionSchedulePanel.errorFetchingRetentionScheduleTitle",
        defaultMessage: "Error fetching retention schedule"
      }),
      color: "danger",
      iconType: "alert"
    }, error.data && error.data.message ? _react.default.createElement("p", null, error.data.message) : null, _react.default.createElement(_eui.EuiButton, {
      iconType: "refresh",
      color: "danger",
      onClick: onRetentionScheduleUpdated
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyRetentionSchedulePanel.errorFetchingRetentionScheduleReloadButtonLabel",
      defaultMessage: "Reload"
    }))), _react.default.createElement(_eui.EuiSpacer, null));
  }

  if (retentionSettings && retentionSettings.retentionSchedule) {
    return renderRetentionPanel(retentionSettings.retentionSchedule);
  }

  return renderRetentionNotConfiguredCallout();
};

exports.PolicyRetentionSchedule = PolicyRetentionSchedule;