"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _lodash = require("lodash");

var _eui = require("@elastic/eui");

var _services = require("@elastic/eui/lib/services");

var _constants = require("../../../../constants");

var _app_context = require("../../../../app_context");

var _components = require("../../../../components");

var _shards_table = require("./shards_table");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RestoreTable = _react.default.memo(function (_ref) {
  var restores = _ref.restores;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n,
      uiMetricService = _useServices.uiMetricService;

  var _useState = (0, _react.useState)({
    page: {},
    sort: {}
  }),
      _useState2 = _slicedToArray(_useState, 2),
      tableState = _useState2[0],
      setTableState = _useState2[1]; // Track expanded indices


  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      expandedIndices = _useState4[0],
      setExpandedIndices = _useState4[1];

  var getPagination = function getPagination() {
    var _tableState$page = tableState.page,
        pageIndex = _tableState$page.index,
        pageSize = _tableState$page.size;
    return {
      pageIndex: pageIndex !== null && pageIndex !== void 0 ? pageIndex : 0,
      pageSize: pageSize !== null && pageSize !== void 0 ? pageSize : 20,
      totalItemCount: restores.length,
      pageSizeOptions: [10, 20, 50]
    };
  };

  var getSorting = function getSorting() {
    var _tableState$sort = tableState.sort,
        sortField = _tableState$sort.field,
        sortDirection = _tableState$sort.direction;
    return {
      sort: {
        field: sortField !== null && sortField !== void 0 ? sortField : 'isComplete',
        direction: sortDirection !== null && sortDirection !== void 0 ? sortDirection : 'asc'
      }
    };
  };

  var getRestores = function getRestores() {
    var newRestoresList = _toConsumableArray(restores);

    var _getSorting = getSorting(),
        _getSorting$sort = _getSorting.sort,
        field = _getSorting$sort.field,
        direction = _getSorting$sort.direction;

    var _getPagination = getPagination(),
        pageIndex = _getPagination.pageIndex,
        pageSize = _getPagination.pageSize;

    var sortedRestores = (0, _lodash.sortByOrder)(newRestoresList, [field], [direction]);
    return sortedRestores.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }; // On sorting and pagination change


  var onTableChange = function onTableChange(_ref2) {
    var _ref2$page = _ref2.page,
        page = _ref2$page === void 0 ? {} : _ref2$page,
        _ref2$sort = _ref2.sort,
        sort = _ref2$sort === void 0 ? {} : _ref2$sort;
    setTableState({
      page: page,
      sort: sort
    });
  }; // Expand or collapse index details


  var toggleIndexRestoreDetails = function toggleIndexRestoreDetails(restore) {
    var index = restore.index;
    var isExpanded = Boolean(itemIdToExpandedRowMap[index]) ? false : true;

    if (isExpanded === true) {
      uiMetricService.trackUiMetric(_constants.UIM_RESTORE_LIST_EXPAND_INDEX);
    }

    setExpandedIndices(_objectSpread({}, itemIdToExpandedRowMap, _defineProperty({}, index, isExpanded)));
  };

  var itemIdToExpandedRowMap = (0, _react.useMemo)(function () {
    return restores.reduce(function (acc, restore) {
      var index = restore.index,
          shards = restore.shards;

      if (expandedIndices[index]) {
        acc[index] = _react.default.createElement(_shards_table.ShardsTable, {
          shards: shards
        });
      }

      return acc;
    }, {});
  }, [expandedIndices, restores]);
  var columns = [{
    field: 'index',
    name: i18n.translate('xpack.snapshotRestore.restoreList.table.indexColumnTitle', {
      defaultMessage: 'Index'
    }),
    truncateText: true,
    sortable: true
  }, {
    field: 'isComplete',
    name: i18n.translate('xpack.snapshotRestore.restoreList.table.statusColumnTitle', {
      defaultMessage: 'Status'
    }),
    truncateText: true,
    sortable: true,
    render: function render(isComplete) {
      return isComplete ? _react.default.createElement(_eui.EuiHealth, {
        color: "success"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.table.statusColumn.completeLabel",
        defaultMessage: "Complete"
      })) : _react.default.createElement(_eui.EuiHealth, {
        color: "warning"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.table.statusColumn.inProgressLabel",
        defaultMessage: "In progress"
      }));
    }
  }, {
    field: 'latestActivityTimeInMillis',
    name: i18n.translate('xpack.snapshotRestore.restoreList.table.lastActivityTitle', {
      defaultMessage: 'Last activity'
    }),
    truncateText: true,
    render: function render(latestActivityTimeInMillis, _ref3) {
      var isComplete = _ref3.isComplete;
      return isComplete ? _react.default.createElement(_components.FormattedDateTime, {
        epochMs: latestActivityTimeInMillis
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.table.lastActivityColumn.nowLabel",
        defaultMessage: "now"
      });
    }
  }, {
    field: 'shards',
    name: i18n.translate('xpack.snapshotRestore.restoreList.table.shardsCompletedTitle', {
      defaultMessage: 'Shards completed'
    }),
    truncateText: true,
    render: function render(shards) {
      return shards.filter(function (shard) {
        return Boolean(shard.stopTimeInMillis);
      }).length;
    }
  }, {
    field: 'shards',
    name: i18n.translate('xpack.snapshotRestore.restoreList.table.shardsInProgressTitle', {
      defaultMessage: 'Shards in progress'
    }),
    truncateText: true,
    render: function render(shards) {
      return shards.filter(function (shard) {
        return !Boolean(shard.stopTimeInMillis);
      }).length;
    }
  }, {
    align: _services.RIGHT_ALIGNMENT,
    width: '40px',
    isExpander: true,
    render: function render(item) {
      return _react.default.createElement(_eui.EuiButtonIcon, {
        onClick: function onClick() {
          return toggleIndexRestoreDetails(item);
        },
        "aria-label": itemIdToExpandedRowMap[item.index] ? 'Collapse' : 'Expand',
        iconType: itemIdToExpandedRowMap[item.index] ? 'arrowUp' : 'arrowDown'
      });
    }
  }];
  return _react.default.createElement(_eui.EuiBasicTable, {
    items: getRestores(),
    itemId: "index",
    itemIdToExpandedRowMap: itemIdToExpandedRowMap,
    isExpandable: true,
    columns: columns,
    sorting: getSorting(),
    pagination: getPagination(),
    onChange: onTableChange,
    rowProps: function rowProps(restore) {
      return {
        'data-test-subj': 'row',
        onClick: function onClick() {
          return toggleIndexRestoreDetails(restore);
        }
      };
    },
    cellProps: function cellProps() {
      return {
        'data-test-subj': 'cell'
      };
    },
    "data-test-subj": "restoresTable"
  });
});

exports.RestoreTable = RestoreTable;