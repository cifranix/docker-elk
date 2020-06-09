"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyticsTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _ml_in_memory_table = require("../../../components/ml_in_memory_table");

var _analytics = require("../../../data_frame_analytics/common/analytics");

var _common = require("../../../data_frame_analytics/pages/analytics_management/components/analytics_list/common");

var _columns = require("../../../data_frame_analytics/pages/analytics_management/components/analytics_list/columns");

var _actions = require("../../../data_frame_analytics/pages/analytics_management/components/analytics_list/actions");

var _date_utils = require("../../../util/date_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MlInMemoryTable = (0, _ml_in_memory_table.mlInMemoryTableFactory)();

var AnalyticsTable = function AnalyticsTable(_ref) {
  var items = _ref.items;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      pageIndex = _useState2[0],
      setPageIndex = _useState2[1];

  var _useState3 = (0, _react.useState)(10),
      _useState4 = _slicedToArray(_useState3, 2),
      pageSize = _useState4[0],
      setPageSize = _useState4[1];

  var _useState5 = (0, _react.useState)(_common.DataFrameAnalyticsListColumn.id),
      _useState6 = _slicedToArray(_useState5, 2),
      sortField = _useState6[0],
      setSortField = _useState6[1];

  var _useState7 = (0, _react.useState)(_ml_in_memory_table.SORT_DIRECTION.ASC),
      _useState8 = _slicedToArray(_useState7, 2),
      sortDirection = _useState8[0],
      setSortDirection = _useState8[1]; // id, type, status, progress, created time, view icon


  var columns = [{
    field: _common.DataFrameAnalyticsListColumn.id,
    name: _i18n.i18n.translate('xpack.ml.overview.analyticsList.id', {
      defaultMessage: 'ID'
    }),
    sortable: true,
    truncateText: true,
    width: '20%'
  }, {
    name: _i18n.i18n.translate('xpack.ml.overview.analyticsList.type', {
      defaultMessage: 'Type'
    }),
    sortable: function sortable(item) {
      return (0, _analytics.getAnalysisType)(item.config.analysis);
    },
    truncateText: true,
    render: function render(item) {
      return _react.default.createElement(_eui.EuiBadge, {
        color: "hollow"
      }, (0, _analytics.getAnalysisType)(item.config.analysis));
    },
    width: '150px'
  }, {
    name: _i18n.i18n.translate('xpack.ml.overview.analyticsList.status', {
      defaultMessage: 'Status'
    }),
    sortable: function sortable(item) {
      return item.stats.state;
    },
    truncateText: true,
    render: function render(item) {
      return (0, _columns.getTaskStateBadge)(item.stats.state, item.stats.failure_reason);
    },
    width: '100px'
  }, _columns.progressColumn, {
    field: _common.DataFrameAnalyticsListColumn.configCreateTime,
    name: _i18n.i18n.translate('xpack.ml.overview.analyticsList.reatedTimeColumnName', {
      defaultMessage: 'Creation time'
    }),
    dataType: 'date',
    render: function render(time) {
      return (0, _date_utils.formatHumanReadableDateTimeSeconds)(time);
    },
    textOnly: true,
    truncateText: true,
    sortable: true,
    width: '20%'
  }, {
    name: _i18n.i18n.translate('xpack.ml.overview.analyticsList.tableActionLabel', {
      defaultMessage: 'Actions'
    }),
    actions: [_actions.AnalyticsViewAction],
    width: '100px'
  }];

  var onTableChange = function onTableChange(_ref2) {
    var _ref2$page = _ref2.page,
        page = _ref2$page === void 0 ? {
      index: 0,
      size: 10
    } : _ref2$page,
        _ref2$sort = _ref2.sort,
        sort = _ref2$sort === void 0 ? {
      field: _common.DataFrameAnalyticsListColumn.id,
      direction: _ml_in_memory_table.SORT_DIRECTION.ASC
    } : _ref2$sort;
    var index = page.index,
        size = page.size;
    setPageIndex(index);
    setPageSize(size);
    var field = sort.field,
        direction = sort.direction;
    setSortField(field);
    setSortDirection(direction);
  };

  var pagination = {
    initialPageIndex: pageIndex,
    initialPageSize: pageSize,
    totalItemCount: items.length,
    pageSizeOptions: [10, 20, 50],
    hidePerPageOptions: false
  };
  var sorting = {
    sort: {
      field: sortField,
      direction: sortDirection
    }
  };
  return _react.default.createElement(MlInMemoryTable, {
    allowNeutralSort: false,
    className: "mlAnalyticsTable",
    columns: columns,
    hasActions: false,
    isExpandable: false,
    isSelectable: false,
    items: items,
    itemId: _common.DataFrameAnalyticsListColumn.id,
    onTableChange: onTableChange,
    pagination: pagination,
    sorting: sorting,
    "data-test-subj": "mlOverviewTableAnalytics"
  });
};

exports.AnalyticsTable = AnalyticsTable;