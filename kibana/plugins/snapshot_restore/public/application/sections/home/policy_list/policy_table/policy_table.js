"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../constants");

var _app_context = require("../../../../app_context");

var _components = require("../../../../components");

var _navigation = require("../../../../services/navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PolicyTable = function PolicyTable(_ref) {
  var policies = _ref.policies,
      reload = _ref.reload,
      openPolicyDetailsUrl = _ref.openPolicyDetailsUrl,
      onPolicyDeleted = _ref.onPolicyDeleted,
      onPolicyExecuted = _ref.onPolicyExecuted;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n,
      uiMetricService = _useServices.uiMetricService;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedItems = _useState2[0],
      setSelectedItems = _useState2[1];

  var columns = [{
    field: 'name',
    name: i18n.translate('xpack.snapshotRestore.policyList.table.policyNameColumnTitle', {
      defaultMessage: 'Policy'
    }),
    truncateText: true,
    sortable: true,
    render: function render(name, _ref2) {
      var inProgress = _ref2.inProgress,
          isManagedPolicy = _ref2.isManagedPolicy;
      return _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiLink, {
        onClick: function onClick() {
          return uiMetricService.trackUiMetric(_constants.UIM_POLICY_SHOW_DETAILS_CLICK);
        },
        href: openPolicyDetailsUrl(name),
        "data-test-subj": "policyLink"
      }, name), ' '), isManagedPolicy ? _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiIconTip, {
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.policyList.table.managedPolicyBadgeLabel",
          defaultMessage: "This is a managed policy"
        }),
        position: "right"
      })) : null, inProgress ? _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiToolTip, {
        content: i18n.translate('xpack.snapshotRestore.policyList.table.inProgressTooltip', {
          defaultMessage: 'Snapshot in progress'
        })
      }, _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "m"
      }))) : null);
    }
  }, {
    field: 'snapshotName',
    name: i18n.translate('xpack.snapshotRestore.policyList.table.snapshotNameColumnTitle', {
      defaultMessage: 'Snapshot name'
    }),
    sortable: true,
    render: function render(snapshotName, _ref3) {
      var lastFailure = _ref3.lastFailure,
          lastSuccess = _ref3.lastSuccess;

      // Alert user if last snapshot failed
      if (lastSuccess && lastFailure && lastFailure.time > lastSuccess.time) {
        return _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "s",
          alignItems: "center",
          className: "snapshotRestorePolicyTableSnapshotFailureContainer"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiToolTip, {
          position: "top",
          content: i18n.translate('xpack.snapshotRestore.policyList.table.lastSnapshotFailedTooltip', {
            defaultMessage: 'Last snapshot failed'
          })
        }, _react.default.createElement(_eui.EuiIcon, {
          type: "alert",
          color: "danger"
        }))), _react.default.createElement(_eui.EuiFlexItem, {
          grow: 1
        }, _react.default.createElement(_eui.EuiText, {
          size: "s"
        }, snapshotName)));
      }

      return snapshotName;
    }
  }, {
    field: 'repository',
    name: i18n.translate('xpack.snapshotRestore.policyList.table.repositoryColumnTitle', {
      defaultMessage: 'Repository'
    }),
    truncateText: true,
    sortable: true
  }, {
    field: 'schedule',
    name: i18n.translate('xpack.snapshotRestore.policyList.table.scheduleColumnTitle', {
      defaultMessage: 'Schedule'
    }),
    truncateText: true,
    sortable: true
  }, {
    field: 'retention',
    name: i18n.translate('xpack.snapshotRestore.policyList.table.retentionColumnTitle', {
      defaultMessage: 'Retention'
    }),
    render: function render(retention) {
      return retention ? _react.default.createElement(_eui.EuiIcon, {
        type: "check",
        "aria-label": i18n.translate('xpack.snapshotRestore.policyList.table.retentionColumnAriaLabel', {
          defaultMessage: 'Retention configured'
        })
      }) : null;
    }
  }, {
    field: 'nextExecutionMillis',
    name: i18n.translate('xpack.snapshotRestore.policyList.table.nextExecutionColumnTitle', {
      defaultMessage: 'Next snapshot'
    }),
    truncateText: true,
    sortable: true,
    render: function render(nextExecutionMillis) {
      return _react.default.createElement(_components.FormattedDateTime, {
        epochMs: nextExecutionMillis
      });
    }
  }, {
    name: i18n.translate('xpack.snapshotRestore.policyList.table.actionsColumnTitle', {
      defaultMessage: 'Actions'
    }),
    actions: [{
      render: function render(_ref4) {
        var name = _ref4.name,
            inProgress = _ref4.inProgress,
            isManagedPolicy = _ref4.isManagedPolicy;
        return _react.default.createElement(_eui.EuiFlexGroup, {
          gutterSize: "s"
        }, _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_components.PolicyExecuteProvider, null, function (executePolicyPrompt) {
          return _react.default.createElement(_eui.EuiToolTip, {
            content: Boolean(inProgress) ? i18n.translate('xpack.snapshotRestore.policyList.table.actionExecuteDisabledTooltip', {
              defaultMessage: 'Policy is running'
            }) : i18n.translate('xpack.snapshotRestore.policyList.table.actionExecuteTooltip', {
              defaultMessage: 'Run now'
            })
          }, _react.default.createElement(_eui.EuiButtonIcon, {
            "aria-label": i18n.translate('xpack.snapshotRestore.policyList.table.actionExecuteAriaLabel', {
              defaultMessage: "Run '{name}' immediately",
              values: {
                name: name
              }
            }),
            iconType: "play",
            color: "primary",
            "data-test-subj": "executePolicyButton",
            onClick: function onClick() {
              return executePolicyPrompt(name, onPolicyExecuted);
            },
            disabled: Boolean(inProgress)
          }));
        })), _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_eui.EuiToolTip, {
          content: i18n.translate('xpack.snapshotRestore.policyList.table.actionEditTooltip', {
            defaultMessage: 'Edit'
          })
        }, _react.default.createElement(_eui.EuiButtonIcon, {
          "aria-label": i18n.translate('xpack.snapshotRestore.policyList.table.actionEditAriaLabel', {
            defaultMessage: "Edit policy '{name}'",
            values: {
              name: name
            }
          }),
          iconType: "pencil",
          color: "primary",
          href: (0, _navigation.linkToEditPolicy)(name),
          "data-test-subj": "editPolicyButton"
        }))), _react.default.createElement(_eui.EuiFlexItem, {
          grow: false
        }, _react.default.createElement(_components.PolicyDeleteProvider, null, function (deletePolicyPrompt) {
          var label = !isManagedPolicy ? i18n.translate('xpack.snapshotRestore.policyList.table.actionDeleteTooltip', {
            defaultMessage: 'Delete'
          }) : i18n.translate('xpack.snapshotRestore.policyList.table.deleteManagedPolicyTableActionTooltip', {
            defaultMessage: 'You cannot delete a managed policy.'
          });
          return _react.default.createElement(_eui.EuiToolTip, {
            content: label
          }, _react.default.createElement(_eui.EuiButtonIcon, {
            "aria-label": i18n.translate('xpack.snapshotRestore.policyList.table.actionDeleteAriaLabel', {
              defaultMessage: "Delete policy '{name}'",
              values: {
                name: name
              }
            }),
            iconType: "trash",
            color: "danger",
            "data-test-subj": "deletePolicyButton",
            onClick: function onClick() {
              return deletePolicyPrompt([name], onPolicyDeleted);
            },
            isDisabled: isManagedPolicy
          }));
        })));
      }
    }],
    width: '100px'
  }];
  var sorting = {
    sort: {
      field: 'name',
      direction: 'asc'
    }
  };
  var pagination = {
    initialPageSize: 20,
    pageSizeOptions: [10, 20, 50]
  };
  var selection = {
    onSelectionChange: function onSelectionChange(newSelectedItems) {
      return setSelectedItems(newSelectedItems);
    },
    selectable: function selectable(_ref5) {
      var isManagedPolicy = _ref5.isManagedPolicy;
      return !isManagedPolicy;
    },
    selectableMessage: function selectableMessage(selectable) {
      if (!selectable) {
        return i18n.translate('xpack.snapshotRestore.policyList.table.deleteManagedPolicySelectTooltip', {
          defaultMessage: 'You cannot delete a managed policy.'
        });
      }

      return '';
    }
  };
  var search = {
    toolsLeft: selectedItems.length ? _react.default.createElement(_components.PolicyDeleteProvider, null, function (deletePolicyPrompt) {
      return _react.default.createElement(_eui.EuiButton, {
        onClick: function onClick() {
          return deletePolicyPrompt(selectedItems.map(function (_ref6) {
            var name = _ref6.name;
            return name;
          }), onPolicyDeleted);
        },
        color: "danger",
        "data-test-subj": "srPolicyListBulkDeleteActionButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyList.table.deletePolicyButton",
        defaultMessage: "Delete {count, plural, one {policy} other {policies}}",
        values: {
          count: selectedItems.length
        }
      }));
    }) : undefined,
    toolsRight: [_react.default.createElement(_eui.EuiButton, {
      key: "reloadPolicies",
      color: "secondary",
      iconType: "refresh",
      onClick: reload,
      "data-test-subj": "reloadButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyList.table.reloadPoliciesButton",
      defaultMessage: "Reload"
    })), _react.default.createElement(_eui.EuiButton, {
      key: "createNewPolicy",
      href: (0, _navigation.linkToAddPolicy)(),
      fill: true,
      iconType: "plusInCircle",
      "data-test-subj": "createPolicyButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyList.table.addPolicyButton",
      defaultMessage: "Create a policy"
    }))],
    box: {
      incremental: true,
      schema: true
    },
    filters: [{
      type: 'field_value_selection',
      field: 'repository',
      name: i18n.translate('xpack.snapshotRestore.policyList.table.repositoryFilterLabel', {
        defaultMessage: 'Repository'
      }),
      multiSelect: false,
      options: Object.keys(policies.reduce(function (repositoriesMap, policy) {
        repositoriesMap[policy.repository] = true;
        return repositoriesMap;
      }, {})).map(function (repository) {
        return {
          value: repository,
          view: repository
        };
      })
    }]
  };
  return _react.default.createElement(_eui.EuiInMemoryTable, {
    className: "snapshotRestore__policyTable",
    items: policies,
    itemId: "name",
    columns: columns,
    search: search,
    sorting: sorting,
    selection: selection,
    pagination: pagination,
    isSelectable: true,
    rowProps: function rowProps() {
      return {
        'data-test-subj': 'row'
      };
    },
    cellProps: function cellProps() {
      return {
        'data-test-subj': 'cell'
      };
    },
    "data-test-subj": "policyTable"
  });
};

exports.PolicyTable = PolicyTable;