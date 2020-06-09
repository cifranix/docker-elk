"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../constants");

var _app_context = require("../../../../app_context");

var _navigation = require("../../../../services/navigation");

var _components = require("../../../../components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getLastSuccessfulManagedSnapshot = function getLastSuccessfulManagedSnapshot(snapshots) {
  var successfulSnapshots = snapshots.filter(function (_ref) {
    var state = _ref.state,
        repository = _ref.repository,
        managedRepository = _ref.managedRepository;
    return repository === managedRepository && state === 'SUCCESS';
  }).sort(function (a, b) {
    return +new Date(b.endTime) - +new Date(a.endTime);
  });
  return successfulSnapshots[0];
};

var SnapshotTable = function SnapshotTable(_ref2) {
  var snapshots = _ref2.snapshots,
      repositories = _ref2.repositories,
      reload = _ref2.reload,
      openSnapshotDetailsUrl = _ref2.openSnapshotDetailsUrl,
      onSnapshotDeleted = _ref2.onSnapshotDeleted,
      repositoryFilter = _ref2.repositoryFilter,
      policyFilter = _ref2.policyFilter;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n,
      uiMetricService = _useServices.uiMetricService;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedItems = _useState2[0],
      setSelectedItems = _useState2[1];

  var lastSuccessfulManagedSnapshot = getLastSuccessfulManagedSnapshot(snapshots);
  var columns = [{
    field: 'snapshot',
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.snapshotColumnTitle', {
      defaultMessage: 'Snapshot'
    }),
    truncateText: true,
    sortable: true,
    render: function render(snapshotId, snapshot) {
      return (
        /* eslint-disable-next-line @elastic/eui/href-or-on-click */
        _react.default.createElement(_eui.EuiLink, {
          onClick: function onClick() {
            return uiMetricService.trackUiMetric(_constants.UIM_SNAPSHOT_SHOW_DETAILS_CLICK);
          },
          href: openSnapshotDetailsUrl(snapshot.repository, snapshotId),
          "data-test-subj": "snapshotLink"
        }, snapshotId)
      );
    }
  }, {
    field: 'repository',
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.repositoryColumnTitle', {
      defaultMessage: 'Repository'
    }),
    truncateText: true,
    sortable: true,
    render: function render(repositoryName) {
      return _react.default.createElement(_eui.EuiLink, {
        href: (0, _navigation.linkToRepository)(repositoryName),
        "data-test-subj": "repositoryLink"
      }, repositoryName);
    }
  }, {
    field: 'indices',
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.indicesColumnTitle', {
      defaultMessage: 'Indices'
    }),
    truncateText: true,
    sortable: true,
    width: '100px',
    render: function render(indices) {
      return indices.length;
    }
  }, {
    field: 'shards.total',
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.shardsColumnTitle', {
      defaultMessage: 'Shards'
    }),
    truncateText: true,
    sortable: true,
    width: '100px',
    render: function render(totalShards) {
      return totalShards;
    }
  }, {
    field: 'shards.failed',
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.failedShardsColumnTitle', {
      defaultMessage: 'Failed shards'
    }),
    truncateText: true,
    sortable: true,
    width: '100px',
    render: function render(failedShards) {
      return failedShards;
    }
  }, {
    field: 'startTimeInMillis',
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.startTimeColumnTitle', {
      defaultMessage: 'Date created'
    }),
    truncateText: true,
    sortable: true,
    render: function render(startTimeInMillis) {
      return _react.default.createElement(_components.DataPlaceholder, {
        data: startTimeInMillis
      }, _react.default.createElement(_components.FormattedDateTime, {
        epochMs: startTimeInMillis
      }));
    }
  }, {
    field: 'durationInMillis',
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.durationColumnTitle', {
      defaultMessage: 'Duration'
    }),
    truncateText: true,
    sortable: true,
    width: '100px',
    render: function render(durationInMillis, _ref3) {
      var state = _ref3.state;

      if (state === _constants.SNAPSHOT_STATE.IN_PROGRESS) {
        return _react.default.createElement(_eui.EuiLoadingSpinner, {
          size: "m"
        });
      }

      return _react.default.createElement(_components.DataPlaceholder, {
        data: durationInMillis
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.table.durationColumnValueLabel",
        defaultMessage: "{seconds}s",
        values: {
          seconds: Math.ceil(durationInMillis / 1000)
        }
      }));
    }
  }, {
    name: i18n.translate('xpack.snapshotRestore.snapshotList.table.actionsColumnTitle', {
      defaultMessage: 'Actions'
    }),
    actions: [{
      render: function render(_ref4) {
        var snapshot = _ref4.snapshot,
            repository = _ref4.repository,
            state = _ref4.state;
        var canRestore = state === _constants.SNAPSHOT_STATE.SUCCESS || state === _constants.SNAPSHOT_STATE.PARTIAL;
        var label = canRestore ? i18n.translate('xpack.snapshotRestore.snapshotList.table.actionRestoreTooltip', {
          defaultMessage: 'Restore'
        }) : state === _constants.SNAPSHOT_STATE.IN_PROGRESS ? i18n.translate('xpack.snapshotRestore.snapshotList.table.actionRestoreDisabledInProgressTooltip', {
          defaultMessage: "Can't restore in-progress snapshot"
        }) : i18n.translate('xpack.snapshotRestore.snapshotList.table.actionRestoreDisabledInvalidTooltip', {
          defaultMessage: "Can't restore invalid snapshot"
        });
        return _react.default.createElement(_eui.EuiToolTip, {
          content: label
        }, _react.default.createElement(_eui.EuiButtonIcon, {
          "aria-label": i18n.translate('xpack.snapshotRestore.snapshotList.table.actionRestoreAriaLabel', {
            defaultMessage: 'Store snapshot `{name}`',
            values: {
              name: snapshot
            }
          }),
          iconType: "importAction",
          color: "primary",
          "data-test-subj": "srsnapshotListRestoreActionButton",
          href: (0, _navigation.linkToRestoreSnapshot)(repository, snapshot),
          isDisabled: !canRestore
        }));
      }
    }, {
      render: function render(_ref5) {
        var snapshot = _ref5.snapshot,
            repository = _ref5.repository;
        return _react.default.createElement(_components.SnapshotDeleteProvider, null, function (deleteSnapshotPrompt) {
          var isDeleteDisabled = Boolean(lastSuccessfulManagedSnapshot) ? snapshot === lastSuccessfulManagedSnapshot.snapshot : false;
          var label = isDeleteDisabled ? i18n.translate('xpack.snapshotRestore.snapshotList.table.deleteManagedRepositorySnapshotTooltip', {
            defaultMessage: 'You must store the last successful snapshot in a managed repository.'
          }) : i18n.translate('xpack.snapshotRestore.snapshotList.table.actionDeleteTooltip', {
            defaultMessage: 'Delete'
          });
          return _react.default.createElement(_eui.EuiToolTip, {
            content: label
          }, _react.default.createElement(_eui.EuiButtonIcon, {
            "aria-label": i18n.translate('xpack.snapshotRestore.snapshotList.table.actionDeleteAriaLabel', {
              defaultMessage: "Delete snapshot '{name}'",
              values: {
                name: snapshot
              }
            }),
            iconType: "trash",
            color: "danger",
            "data-test-subj": "srsnapshotListDeleteActionButton",
            onClick: function onClick() {
              return deleteSnapshotPrompt([{
                snapshot: snapshot,
                repository: repository
              }], onSnapshotDeleted);
            },
            isDisabled: isDeleteDisabled
          }));
        });
      }
    }],
    width: '100px'
  }]; // By default, we'll display the most recent snapshots at the top of the table.

  var sorting = {
    sort: {
      field: 'startTimeInMillis',
      direction: 'desc'
    }
  };
  var pagination = {
    initialPageSize: 20,
    pageSizeOptions: [10, 20, 50]
  };
  var searchSchema = {
    fields: {
      repository: {
        type: 'string'
      },
      policyName: {
        type: 'string'
      }
    }
  };
  var selection = {
    onSelectionChange: function onSelectionChange(newSelectedItems) {
      return setSelectedItems(newSelectedItems);
    },
    selectable: function selectable(_ref6) {
      var snapshot = _ref6.snapshot;
      return Boolean(lastSuccessfulManagedSnapshot) ? snapshot !== lastSuccessfulManagedSnapshot.snapshot : true;
    },
    selectableMessage: function selectableMessage(selectable) {
      if (!selectable) {
        return i18n.translate('xpack.snapshotRestore.snapshotList.table.deleteManagedRepositorySnapshotDescription', {
          defaultMessage: 'You must retain the last successful snapshot in a managed repository.'
        });
      }

      return '';
    }
  };
  var search = {
    toolsLeft: selectedItems.length ? _react.default.createElement(_components.SnapshotDeleteProvider, null, function (deleteSnapshotPrompt) {
      return _react.default.createElement(_eui.EuiButton, {
        onClick: function onClick() {
          return deleteSnapshotPrompt(selectedItems.map(function (_ref7) {
            var snapshot = _ref7.snapshot,
                repository = _ref7.repository;
            return {
              snapshot: snapshot,
              repository: repository
            };
          }), onSnapshotDeleted);
        },
        color: "danger",
        "data-test-subj": "srSnapshotListBulkDeleteActionButton"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotList.table.deleteSnapshotButton",
        defaultMessage: "Delete {count, plural, one {snapshot} other {snapshots}}",
        values: {
          count: selectedItems.length
        }
      }));
    }) : undefined,
    toolsRight: _react.default.createElement(_eui.EuiButton, {
      color: "secondary",
      iconType: "refresh",
      onClick: reload,
      "data-test-subj": "reloadButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.snapshotList.table.reloadSnapshotsButton",
      defaultMessage: "Reload"
    })),
    box: {
      incremental: true,
      schema: searchSchema
    },
    filters: [{
      type: 'field_value_selection',
      field: 'repository',
      name: i18n.translate('xpack.snapshotRestore.snapshotList.table.repositoryFilterLabel', {
        defaultMessage: 'Repository'
      }),
      multiSelect: false,
      options: repositories.map(function (repository) {
        return {
          value: repository,
          view: repository
        };
      })
    }],
    defaultQuery: policyFilter ? _eui.Query.parse("policyName=\"".concat(policyFilter, "\""), {
      schema: _objectSpread({}, searchSchema, {
        strict: true
      })
    }) : repositoryFilter ? _eui.Query.parse("repository=\"".concat(repositoryFilter, "\""), {
      schema: _objectSpread({}, searchSchema, {
        strict: true
      })
    }) : ''
  };
  return _react.default.createElement(_eui.EuiInMemoryTable, {
    items: snapshots,
    itemId: "uuid",
    columns: columns,
    search: search,
    sorting: sorting,
    isSelectable: true,
    selection: selection,
    pagination: pagination,
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
    "data-test-subj": "snapshotTable"
  });
};

exports.SnapshotTable = SnapshotTable;