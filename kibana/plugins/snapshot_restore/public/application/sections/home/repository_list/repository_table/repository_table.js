"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepositoryTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../../common/constants");

var _components = require("../../../../components");

var _constants2 = require("../../../../constants");

var _app_context = require("../../../../app_context");

var _text = require("../../../../services/text");

var _navigation = require("../../../../services/navigation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RepositoryTable = function RepositoryTable(_ref) {
  var repositories = _ref.repositories,
      managedRepository = _ref.managedRepository,
      reload = _ref.reload,
      openRepositoryDetailsUrl = _ref.openRepositoryDetailsUrl,
      onRepositoryDeleted = _ref.onRepositoryDeleted;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n,
      uiMetricService = _useServices.uiMetricService;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedItems = _useState2[0],
      setSelectedItems = _useState2[1];

  var columns = [{
    field: 'name',
    name: i18n.translate('xpack.snapshotRestore.repositoryList.table.nameColumnTitle', {
      defaultMessage: 'Name'
    }),
    truncateText: true,
    sortable: true,
    render: function render(name) {
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiLink, {
        onClick: function onClick() {
          return uiMetricService.trackUiMetric(_constants2.UIM_REPOSITORY_SHOW_DETAILS_CLICK);
        },
        href: openRepositoryDetailsUrl(name),
        "data-test-subj": "repositoryLink"
      }, name), "\xA0\xA0", managedRepository === name ? _react.default.createElement(_eui.EuiIconTip, {
        content: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.repositoryList.table.managedRepositoryBadgeLabel",
          defaultMessage: "This is a managed repository"
        }),
        position: "right"
      }) : null);
    }
  }, {
    field: 'type',
    name: i18n.translate('xpack.snapshotRestore.repositoryList.table.typeColumnTitle', {
      defaultMessage: 'Type'
    }),
    truncateText: true,
    sortable: true,
    render: function render(type, repository) {
      if (type === _constants.REPOSITORY_TYPES.source) {
        return _text.textService.getRepositoryTypeName(type, repository.settings.delegateType);
      }

      return _text.textService.getRepositoryTypeName(type);
    }
  }, {
    field: 'actions',
    name: i18n.translate('xpack.snapshotRestore.repositoryList.table.actionsColumnTitle', {
      defaultMessage: 'Actions'
    }),
    actions: [{
      render: function render(_ref2) {
        var name = _ref2.name;
        var label = i18n.translate('xpack.snapshotRestore.repositoryList.table.actionEditTooltip', {
          defaultMessage: 'Edit'
        });
        return _react.default.createElement(_eui.EuiToolTip, {
          content: label
        }, _react.default.createElement(_eui.EuiButtonIcon, {
          "aria-label": i18n.translate('xpack.snapshotRestore.repositoryList.table.actionEditAriaLabel', {
            defaultMessage: 'Edit repository `{name}`',
            values: {
              name: name
            }
          }),
          iconType: "pencil",
          color: "primary",
          href: (0, _navigation.linkToEditRepository)(name),
          "data-test-subj": "editRepositoryButton"
        }));
      }
    }, {
      render: function render(_ref3) {
        var name = _ref3.name;
        return _react.default.createElement(_components.RepositoryDeleteProvider, null, function (deleteRepositoryPrompt) {
          var label = name !== managedRepository ? i18n.translate('xpack.snapshotRestore.repositoryList.table.actionRemoveTooltip', {
            defaultMessage: 'Remove'
          }) : i18n.translate('xpack.snapshotRestore.repositoryList.table.deleteManagedRepositoryTooltip', {
            defaultMessage: 'You cannot delete a managed repository.'
          });
          return _react.default.createElement(_eui.EuiToolTip, {
            content: label
          }, _react.default.createElement(_eui.EuiButtonIcon, {
            "aria-label": i18n.translate('xpack.snapshotRestore.repositoryList.table.actionRemoveAriaLabel', {
              defaultMessage: 'Remove repository `{name}`',
              values: {
                name: name
              }
            }),
            iconType: "trash",
            color: "danger",
            "data-test-subj": "deleteRepositoryButton",
            onClick: function onClick() {
              return deleteRepositoryPrompt([name], onRepositoryDeleted);
            },
            isDisabled: Boolean(name === managedRepository)
          }));
        });
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
    selectable: function selectable(_ref4) {
      var name = _ref4.name;
      return Boolean(name !== managedRepository);
    },
    selectableMessage: function selectableMessage(selectable) {
      if (!selectable) {
        return i18n.translate('xpack.snapshotRestore.repositoryList.table.deleteManagedRepositoryTooltip', {
          defaultMessage: 'You cannot delete a managed repository.'
        });
      }

      return '';
    }
  };
  var search = {
    toolsLeft: selectedItems.length ? _react.default.createElement(_components.RepositoryDeleteProvider, null, function (deleteRepositoryPrompt) {
      return _react.default.createElement(_eui.EuiButton, {
        onClick: function onClick() {
          return deleteRepositoryPrompt(selectedItems.map(function (repository) {
            return repository.name;
          }), onRepositoryDeleted);
        },
        color: "danger",
        "data-test-subj": "srRepositoryListBulkDeleteActionButton"
      }, selectedItems.length === 1 ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryList.table.deleteSingleRepositoryButton",
        defaultMessage: "Remove repository"
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.repositoryList.table.deleteMultipleRepositoriesButton",
        defaultMessage: "Remove repositories"
      }));
    }) : undefined,
    toolsRight: [_react.default.createElement(_eui.EuiButton, {
      key: "reloadButton",
      color: "secondary",
      iconType: "refresh",
      onClick: reload,
      "data-test-subj": "reloadButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryList.table.reloadRepositoriesButton",
      defaultMessage: "Reload"
    })), _react.default.createElement(_eui.EuiButton, {
      key: "registerRepo",
      href: (0, _navigation.linkToAddRepository)(),
      fill: true,
      iconType: "plusInCircle",
      "data-test-subj": "registerRepositoryButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.repositoryList.addRepositoryButtonLabel",
      defaultMessage: "Register a repository"
    }))],
    box: {
      incremental: true,
      schema: true
    },
    filters: [{
      type: 'field_value_selection',
      field: 'type',
      name: i18n.translate('xpack.snapshotRestore.repositoryList.table.typeFilterLabel', {
        defaultMessage: 'Type'
      }),
      multiSelect: false,
      options: Object.keys(repositories.reduce(function (typeMap, repository) {
        typeMap[repository.type] = true;
        return typeMap;
      }, {})).map(function (type) {
        return {
          value: type,
          view: _text.textService.getRepositoryTypeName(type)
        };
      })
    }]
  };
  return _react.default.createElement(_eui.EuiInMemoryTable, {
    items: repositories,
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
    cellProps: function cellProps(item, field) {
      return {
        'data-test-subj': "".concat(field.name, "_cell")
      };
    },
    "data-test-subj": "repositoryTable"
  });
};

exports.RepositoryTable = RepositoryTable;