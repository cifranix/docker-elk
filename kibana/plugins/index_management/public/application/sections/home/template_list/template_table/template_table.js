"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TemplateTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../../common/constants");

var _components = require("../../../../components");

var _app_context = require("../../../../app_context");

var _routing = require("../../../../services/routing");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var TemplateTable = function TemplateTable(_ref) {
  var templates = _ref.templates,
      reload = _ref.reload,
      editTemplate = _ref.editTemplate,
      cloneTemplate = _ref.cloneTemplate;

  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      selection = _useState2[0],
      setSelection = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      templatesToDelete = _useState4[0],
      setTemplatesToDelete = _useState4[1];

  var columns = [{
    field: 'name',
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.nameColumnTitle', {
      defaultMessage: 'Name'
    }),
    truncateText: true,
    sortable: true,
    render: function render(name) {
      return (
        /* eslint-disable-next-line @elastic/eui/href-or-on-click */
        _react.default.createElement(_eui.EuiLink, {
          href: (0, _routing.getTemplateDetailsLink)(name, true),
          "data-test-subj": "templateDetailsLink",
          onClick: function onClick() {
            return uiMetricService.trackMetric('click', _constants.UIM_TEMPLATE_SHOW_DETAILS_CLICK);
          }
        }, name)
      );
    }
  }, {
    field: 'indexPatterns',
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.indexPatternsColumnTitle', {
      defaultMessage: 'Index patterns'
    }),
    truncateText: true,
    sortable: true,
    render: function render(indexPatterns) {
      return _react.default.createElement("strong", null, indexPatterns.join(', '));
    }
  }, {
    field: 'ilmPolicy',
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.ilmPolicyColumnTitle', {
      defaultMessage: 'ILM policy'
    }),
    truncateText: true,
    sortable: true,
    render: function render(ilmPolicy) {
      return ilmPolicy && ilmPolicy.name ? _react.default.createElement("span", {
        title: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.ilmPolicyColumnDescription', {
          defaultMessage: "'{policyName}' index lifecycle policy",
          values: {
            policyName: ilmPolicy.name
          }
        })
      }, ilmPolicy.name) : null;
    }
  }, {
    field: 'order',
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.orderColumnTitle', {
      defaultMessage: 'Order'
    }),
    truncateText: true,
    sortable: true
  }, {
    field: 'hasMappings',
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.mappingsColumnTitle', {
      defaultMessage: 'Mappings'
    }),
    truncateText: true,
    sortable: true,
    render: function render(hasMappings) {
      return hasMappings ? _react.default.createElement(_eui.EuiIcon, {
        type: "check"
      }) : null;
    }
  }, {
    field: 'hasSettings',
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.settingsColumnTitle', {
      defaultMessage: 'Settings'
    }),
    truncateText: true,
    sortable: true,
    render: function render(hasSettings) {
      return hasSettings ? _react.default.createElement(_eui.EuiIcon, {
        type: "check"
      }) : null;
    }
  }, {
    field: 'hasAliases',
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.aliasesColumnTitle', {
      defaultMessage: 'Aliases'
    }),
    truncateText: true,
    sortable: true,
    render: function render(hasAliases) {
      return hasAliases ? _react.default.createElement(_eui.EuiIcon, {
        type: "check"
      }) : null;
    }
  }, {
    name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.actionColumnTitle', {
      defaultMessage: 'Actions'
    }),
    actions: [{
      name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.actionEditText', {
        defaultMessage: 'Edit'
      }),
      isPrimary: true,
      description: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.actionEditDecription', {
        defaultMessage: 'Edit this template'
      }),
      icon: 'pencil',
      type: 'icon',
      onClick: function onClick(_ref2) {
        var name = _ref2.name;
        editTemplate(name);
      },
      enabled: function enabled(_ref3) {
        var isManaged = _ref3.isManaged;
        return !isManaged;
      }
    }, {
      type: 'icon',
      name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.actionCloneTitle', {
        defaultMessage: 'Clone'
      }),
      description: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.actionCloneDescription', {
        defaultMessage: 'Clone this template'
      }),
      icon: 'copy',
      onClick: function onClick(_ref4) {
        var name = _ref4.name;
        cloneTemplate(name);
      }
    }, {
      name: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.actionDeleteText', {
        defaultMessage: 'Delete'
      }),
      description: _i18n.i18n.translate('xpack.idxMgmt.templateList.table.actionDeleteDecription', {
        defaultMessage: 'Delete this template'
      }),
      icon: 'trash',
      color: 'danger',
      type: 'icon',
      onClick: function onClick(_ref5) {
        var name = _ref5.name;
        setTemplatesToDelete([name]);
      },
      isPrimary: true,
      enabled: function enabled(_ref6) {
        var isManaged = _ref6.isManaged;
        return !isManaged;
      }
    }]
  }];
  var pagination = {
    initialPageSize: 20,
    pageSizeOptions: [10, 20, 50]
  };
  var sorting = {
    sort: {
      field: 'name',
      direction: 'asc'
    }
  };
  var selectionConfig = {
    onSelectionChange: setSelection,
    selectable: function selectable(_ref7) {
      var isManaged = _ref7.isManaged;
      return !isManaged;
    },
    selectableMessage: function selectableMessage(selectable) {
      if (!selectable) {
        return _i18n.i18n.translate('xpack.idxMgmt.templateList.table.deleteManagedTemplateTooltip', {
          defaultMessage: 'You cannot delete a managed template.'
        });
      }

      return '';
    }
  };
  var searchConfig = {
    box: {
      incremental: true
    },
    toolsLeft: selection.length > 0 ? _react.default.createElement(_eui.EuiButton, {
      "data-test-subj": "deleteTemplatesButton",
      onClick: function onClick() {
        return setTemplatesToDelete(selection.map(function (selected) {
          return selected.name;
        }));
      },
      color: "danger"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateList.table.deleteTemplatesButtonLabel",
      defaultMessage: "Delete {count, plural, one {template} other {templates} }",
      values: {
        count: selection.length
      }
    })) : undefined,
    toolsRight: [_react.default.createElement(_eui.EuiButton, {
      color: "secondary",
      iconType: "refresh",
      onClick: reload,
      "data-test-subj": "reloadButton",
      key: "reloadButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateList.table.reloadTemplatesButtonLabel",
      defaultMessage: "Reload"
    })), _react.default.createElement(_eui.EuiButton, {
      href: "#".concat(_constants.BASE_PATH, "create_template"),
      fill: true,
      iconType: "plusInCircle",
      "data-test-subj": "createTemplateButton",
      key: "createTemplateButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateList.table.createTemplatesButtonLabel",
      defaultMessage: "Create a template"
    }))]
  };
  return _react.default.createElement(_react.Fragment, null, templatesToDelete && templatesToDelete.length > 0 ? _react.default.createElement(_components.TemplateDeleteModal, {
    callback: function callback(data) {
      if (data && data.hasDeletedTemplates) {
        reload();
      } else {
        setTemplatesToDelete([]);
      }
    },
    templatesToDelete: templatesToDelete
  }) : null, _react.default.createElement(_eui.EuiInMemoryTable, {
    items: templates || [],
    itemId: "name",
    columns: columns,
    search: searchConfig,
    sorting: sorting,
    isSelectable: true,
    selection: selectionConfig,
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
    "data-test-subj": "templateTable",
    message: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.templateList.table.noIndexTemplatesMessage",
      defaultMessage: "No index templates found"
    })
  }));
};

exports.TemplateTable = TemplateTable;