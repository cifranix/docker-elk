"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TransformList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../common");

var _common2 = require("../../../../common");

var _authorization = require("../../../../lib/authorization");

var _create_transform_button = require("../create_transform_button");

var _refresh_transform_list_button = require("../refresh_transform_list_button");

var _columns = require("./columns");

var _action_delete = require("./action_delete");

var _action_start = require("./action_start");

var _action_stop = require("./action_stop");

var _expanded_row = require("./expanded_row");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getItemIdToExpandedRowMap(itemIds, transforms) {
  return itemIds.reduce(function (m, transformId) {
    var item = transforms.find(function (transform) {
      return transform.config.id === transformId;
    });

    if (item !== undefined) {
      m[transformId] = _react.default.createElement(_expanded_row.ExpandedRow, {
        item: item
      });
    }

    return m;
  }, {});
}

function stringMatch(str, substr) {
  return typeof str === 'string' && typeof substr === 'string' && str.toLowerCase().match(substr.toLowerCase()) === null === false;
}

var TransformList = function TransformList(_ref) {
  var errorMessage = _ref.errorMessage,
      isInitialized = _ref.isInitialized,
      onCreateTransform = _ref.onCreateTransform,
      transforms = _ref.transforms,
      transformsLoading = _ref.transformsLoading;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoading = _useState2[0],
      setIsLoading = _useState2[1];

  var _useRefreshTransformL = (0, _common2.useRefreshTransformList)({
    isLoading: setIsLoading
  }),
      refresh = _useRefreshTransformL.refresh;

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      filterActive = _useState4[0],
      setFilterActive = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      filteredTransforms = _useState6[0],
      setFilteredTransforms = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      expandedRowItemIds = _useState8[0],
      setExpandedRowItemIds = _useState8[1];

  var _useState9 = (0, _react.useState)([]),
      _useState10 = _slicedToArray(_useState9, 2),
      transformSelection = _useState10[0],
      setTransformSelection = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isActionsMenuOpen = _useState12[0],
      setIsActionsMenuOpen = _useState12[1];

  var _useState13 = (0, _react.useState)(undefined),
      _useState14 = _slicedToArray(_useState13, 2),
      searchError = _useState14[0],
      setSearchError = _useState14[1];

  var _useState15 = (0, _react.useState)(0),
      _useState16 = _slicedToArray(_useState15, 2),
      pageIndex = _useState16[0],
      setPageIndex = _useState16[1];

  var _useState17 = (0, _react.useState)(10),
      _useState18 = _slicedToArray(_useState17, 2),
      pageSize = _useState18[0],
      setPageSize = _useState18[1];

  var _useState19 = (0, _react.useState)(_common2.TRANSFORM_LIST_COLUMN.ID),
      _useState20 = _slicedToArray(_useState19, 2),
      sortField = _useState20[0],
      setSortField = _useState20[1];

  var _useState21 = (0, _react.useState)('asc'),
      _useState22 = _slicedToArray(_useState21, 2),
      sortDirection = _useState22[0],
      setSortDirection = _useState22[1];

  var _useContext = (0, _react.useContext)(_authorization.AuthorizationContext),
      capabilities = _useContext.capabilities;

  var disabled = !capabilities.canCreateTransform || !capabilities.canPreviewTransform || !capabilities.canStartStopTransform;

  var onQueryChange = function onQueryChange(_ref2) {
    var query = _ref2.query,
        error = _ref2.error;

    if (error) {
      setSearchError(error.message);
    } else {
      var clauses = [];

      if (query && query.ast !== undefined && query.ast.clauses !== undefined) {
        clauses = query.ast.clauses;
      }

      if (clauses.length > 0) {
        setFilterActive(true);
        filterTransforms(clauses);
      } else {
        setFilterActive(false);
      }

      setSearchError(undefined);
    }
  };

  var filterTransforms = function filterTransforms(clauses) {
    setIsLoading(true); // keep count of the number of matches we make as we're looping over the clauses
    // we only want to return transforms which match all clauses, i.e. each search term is ANDed
    // { transform-one:  { transform: { id: transform-one, config: {}, state: {}, ... }, count: 0 }, transform-two: {...} }

    var matches = transforms.reduce(function (p, c) {
      p[c.id] = {
        transform: c,
        count: 0
      };
      return p;
    }, {});
    clauses.forEach(function (c) {
      // the search term could be negated with a minus, e.g. -bananas
      var bool = c.match === 'must';
      var ts = [];

      if (c.type === 'term') {
        // filter term based clauses, e.g. bananas
        // match on ID and description
        // if the term has been negated, AND the matches
        if (bool === true) {
          ts = transforms.filter(function (transform) {
            return stringMatch(transform.id, c.value) === bool || stringMatch(transform.config.description, c.value) === bool;
          });
        } else {
          ts = transforms.filter(function (transform) {
            return stringMatch(transform.id, c.value) === bool && stringMatch(transform.config.description, c.value) === bool;
          });
        }
      } else {
        // filter other clauses, i.e. the mode and status filters
        if (Array.isArray(c.value)) {
          // the status value is an array of string(s) e.g. ['failed', 'stopped']
          ts = transforms.filter(function (transform) {
            return c.value.includes(transform.stats.state);
          });
        } else {
          ts = transforms.filter(function (transform) {
            return transform.mode === c.value;
          });
        }
      }

      ts.forEach(function (t) {
        return matches[t.id].count++;
      });
    }); // loop through the matches and return only transforms which have match all the clauses

    var filtered = Object.values(matches).filter(function (m) {
      return (m && m.count) >= clauses.length;
    }).map(function (m) {
      return m.transform;
    });
    setFilteredTransforms(filtered);
    setIsLoading(false);
  }; // Before the transforms have been loaded for the first time, display the loading indicator only.
  // Otherwise a user would see 'No transforms found' during the initial loading.


  if (!isInitialized) {
    return null;
  }

  if (typeof errorMessage !== 'undefined') {
    return _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.transform.list.errorPromptTitle', {
        defaultMessage: 'An error occurred getting the transform list.'
      }),
      color: "danger",
      iconType: "alert"
    }, _react.default.createElement("pre", null, JSON.stringify(errorMessage)));
  }

  if (transforms.length === 0) {
    return _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.transform.list.emptyPromptTitle', {
        defaultMessage: 'No transforms found'
      })),
      actions: [_react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: onCreateTransform,
        isDisabled: disabled,
        "data-test-subj": "transformCreateFirstButton"
      }, _i18n.i18n.translate('xpack.transform.list.emptyPromptButtonText', {
        defaultMessage: 'Create your first transform'
      }))],
      "data-test-subj": "transformNoTransformsFound"
    });
  }

  var columns = (0, _columns.getColumns)(expandedRowItemIds, setExpandedRowItemIds, transformSelection);
  var sorting = {
    sort: {
      field: sortField,
      direction: sortDirection
    }
  };
  var itemIdToExpandedRowMap = getItemIdToExpandedRowMap(expandedRowItemIds, transforms);
  var pagination = {
    initialPageIndex: pageIndex,
    initialPageSize: pageSize,
    totalItemCount: transforms.length,
    pageSizeOptions: [10, 20, 50],
    hidePerPageOptions: false
  };
  var bulkActionMenuItems = [_react.default.createElement("div", {
    key: "startAction",
    className: "transform__BulkActionItem"
  }, _react.default.createElement(_action_start.StartAction, {
    items: transformSelection
  })), _react.default.createElement("div", {
    key: "stopAction",
    className: "transform__BulkActionItem"
  }, _react.default.createElement(_action_stop.StopAction, {
    items: transformSelection
  })), _react.default.createElement("div", {
    key: "deleteAction",
    className: "transform__BulkActionItem"
  }, _react.default.createElement(_action_delete.DeleteAction, {
    items: transformSelection
  }))];

  var renderToolsLeft = function renderToolsLeft() {
    var buttonIcon = _react.default.createElement(_eui.EuiButtonIcon, {
      size: "s",
      iconType: "gear",
      color: "text",
      onClick: function onClick() {
        setIsActionsMenuOpen(true);
      },
      "aria-label": _i18n.i18n.translate('xpack.transform.multiTransformActionsMenu.managementActionsAriaLabel', {
        defaultMessage: 'Management actions'
      })
    });

    var bulkActionIcon = _react.default.createElement(_eui.EuiPopover, {
      key: "bulkActionIcon",
      id: "transformBulkActionsMenu",
      button: buttonIcon,
      isOpen: isActionsMenuOpen,
      closePopover: function closePopover() {
        return setIsActionsMenuOpen(false);
      },
      panelPaddingSize: "none",
      anchorPosition: "rightUp"
    }, bulkActionMenuItems);

    return [_react.default.createElement(_eui.EuiTitle, {
      key: "selectedText",
      size: "s"
    }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.transform.multiTransformActionsMenu.transformsCount', {
      defaultMessage: '{count} {count, plural, one {transform} other {transforms}} selected',
      values: {
        count: transformSelection.length
      }
    }))), _react.default.createElement("div", {
      key: "bulkActionsBorder",
      className: "transform__BulkActionsBorder"
    }), bulkActionIcon];
  };

  var renderToolsRight = function renderToolsRight() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "m",
      justifyContent: "spaceAround"
    }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_refresh_transform_list_button.RefreshTransformListButton, {
      onClick: refresh,
      isLoading: isLoading
    })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_create_transform_button.CreateTransformButton, {
      onClick: onCreateTransform
    })));
  };

  var search = {
    toolsLeft: transformSelection.length > 0 ? renderToolsLeft() : undefined,
    toolsRight: renderToolsRight(),
    onChange: onQueryChange,
    box: {
      incremental: true
    },
    filters: [{
      type: 'field_value_selection',
      field: 'state.state',
      name: _i18n.i18n.translate('xpack.transform.statusFilter', {
        defaultMessage: 'Status'
      }),
      multiSelect: 'or',
      options: Object.values(_common.TRANSFORM_STATE).map(function (val) {
        return {
          value: val,
          name: val,
          view: (0, _columns.getTaskStateBadge)(val)
        };
      })
    }, {
      type: 'field_value_selection',
      field: 'mode',
      name: _i18n.i18n.translate('xpack.transform.modeFilter', {
        defaultMessage: 'Mode'
      }),
      multiSelect: false,
      options: Object.values(_common2.TRANSFORM_MODE).map(function (val) {
        return {
          value: val,
          name: val,
          view: _react.default.createElement(_eui.EuiBadge, {
            className: "transform__TaskModeBadge",
            color: "hollow"
          }, val)
        };
      })
    }]
  };

  var onTableChange = function onTableChange(_ref3) {
    var _ref3$page = _ref3.page,
        page = _ref3$page === void 0 ? {
      index: 0,
      size: 10
    } : _ref3$page,
        _ref3$sort = _ref3.sort,
        sort = _ref3$sort === void 0 ? {
      field: _common2.TRANSFORM_LIST_COLUMN.ID,
      direction: 'asc'
    } : _ref3$sort;
    var index = page.index,
        size = page.size;
    setPageIndex(index);
    setPageSize(size);
    var field = sort.field,
        direction = sort.direction;
    setSortField(field);
    setSortDirection(direction);
  };

  var selection = {
    onSelectionChange: function onSelectionChange(selected) {
      return setTransformSelection(selected);
    }
  };
  return _react.default.createElement("div", {
    "data-test-subj": "transformListTableContainer"
  }, _react.default.createElement(_eui.EuiInMemoryTable, {
    allowNeutralSort: false,
    className: "transform__TransformTable",
    columns: columns,
    error: searchError,
    hasActions: false,
    isExpandable: true,
    isSelectable: false,
    items: filterActive ? filteredTransforms : transforms,
    itemId: _common2.TRANSFORM_LIST_COLUMN.ID,
    itemIdToExpandedRowMap: itemIdToExpandedRowMap,
    loading: isLoading || transformsLoading,
    onTableChange: onTableChange,
    pagination: pagination,
    rowProps: function rowProps(item) {
      return {
        'data-test-subj': "transformListRow row-".concat(item.id)
      };
    },
    selection: selection,
    sorting: sorting,
    search: search,
    "data-test-subj": "transformListTable ".concat(isLoading || transformsLoading ? 'loading' : 'loaded')
  }));
};

exports.TransformList = TransformList;