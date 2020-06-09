"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomalyDetectionTable = exports.AnomalyDetectionListColumns = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _ml_in_memory_table = require("../../../components/ml_in_memory_table");

var _date_utils = require("../../../util/date_utils");

var _actions = require("./actions");

var _utils = require("./utils");

var _stats_bar = require("../../../components/stats_bar");

var _index = require("../../../components/job_selector/job_selector_badge/index");

var _string_utils = require("../../../util/string_utils");

var _anomaly_utils = require("../../../../../common/util/anomaly_utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MlInMemoryTable = (0, _ml_in_memory_table.mlInMemoryTableFactory)(); // Used to pass on attribute names to table columns

var AnomalyDetectionListColumns;
exports.AnomalyDetectionListColumns = AnomalyDetectionListColumns;

(function (AnomalyDetectionListColumns) {
  AnomalyDetectionListColumns["id"] = "id";
  AnomalyDetectionListColumns["maxAnomalyScore"] = "max_anomaly_score";
  AnomalyDetectionListColumns["jobIds"] = "jobIds";
  AnomalyDetectionListColumns["latestTimestamp"] = "latest_timestamp";
  AnomalyDetectionListColumns["docsProcessed"] = "docs_processed";
  AnomalyDetectionListColumns["jobsInGroup"] = "jobs_in_group";
})(AnomalyDetectionListColumns || (exports.AnomalyDetectionListColumns = AnomalyDetectionListColumns = {}));

var AnomalyDetectionTable = function AnomalyDetectionTable(_ref) {
  var items = _ref.items,
      jobsList = _ref.jobsList,
      statsBarData = _ref.statsBarData;
  var groupsList = Object.values(items);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      pageIndex = _useState2[0],
      setPageIndex = _useState2[1];

  var _useState3 = (0, _react.useState)(10),
      _useState4 = _slicedToArray(_useState3, 2),
      pageSize = _useState4[0],
      setPageSize = _useState4[1];

  var _useState5 = (0, _react.useState)(AnomalyDetectionListColumns.id),
      _useState6 = _slicedToArray(_useState5, 2),
      sortField = _useState6[0],
      setSortField = _useState6[1];

  var _useState7 = (0, _react.useState)(_ml_in_memory_table.SORT_DIRECTION.ASC),
      _useState8 = _slicedToArray(_useState7, 2),
      sortDirection = _useState8[0],
      setSortDirection = _useState8[1]; // columns: group, max anomaly, jobs in group, latest timestamp, docs processed, action to explorer


  var columns = [{
    field: AnomalyDetectionListColumns.id,
    name: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableId', {
      defaultMessage: 'Group ID'
    }),
    render: function render(id) {
      return _react.default.createElement(_index.JobSelectorBadge, {
        id: id,
        isGroup: id !== 'ungrouped'
      });
    },
    sortable: true,
    truncateText: true,
    width: '20%'
  }, {
    field: AnomalyDetectionListColumns.maxAnomalyScore,
    name: _react.default.createElement(_eui.EuiToolTip, {
      content: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableMaxScoreTooltip', {
        defaultMessage: 'Maximum score across all jobs in the group over its most recent 24 hour period'
      })
    }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableMaxScore', {
      defaultMessage: 'Max anomaly score'
    }), ' ', _react.default.createElement(_eui.EuiIcon, {
      size: "s",
      color: "subdued",
      type: "questionInCircle",
      className: "eui-alignTop"
    }))),
    sortable: true,
    render: function render(score) {
      if (score === undefined) {
        // score is not loaded yet
        return _react.default.createElement(_eui.EuiLoadingSpinner, null);
      } else if (score === null) {
        // an error occurred loading this group's score
        return _react.default.createElement(_eui.EuiToolTip, {
          content: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableMaxScoreErrorTooltip', {
            defaultMessage: 'There was a problem loading the maximum anomaly score'
          })
        }, _react.default.createElement(_eui.EuiIcon, {
          type: "alert"
        }));
      } else if (score === 0) {
        return (// @ts-ignore
          _react.default.createElement(_eui.EuiHealth, {
            color: 'transparent',
            compressed: "true"
          }, score)
        );
      } else {
        var color = (0, _anomaly_utils.getSeverityColor)(score);
        return (// @ts-ignore
          _react.default.createElement(_eui.EuiHealth, {
            color: color,
            compressed: "true"
          }, score >= 1 ? Math.floor(score) : '< 1')
        );
      }
    },
    truncateText: true,
    width: '150px'
  }, {
    field: AnomalyDetectionListColumns.jobsInGroup,
    name: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableNumJobs', {
      defaultMessage: 'Jobs in group'
    }),
    sortable: true,
    truncateText: true,
    width: '100px'
  }, {
    field: AnomalyDetectionListColumns.latestTimestamp,
    name: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableLatestTimestamp', {
      defaultMessage: 'Latest timestamp'
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
    field: AnomalyDetectionListColumns.docsProcessed,
    name: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableDocsProcessed', {
      defaultMessage: 'Docs processed'
    }),
    render: function render(docs) {
      return (0, _string_utils.toLocaleString)(docs);
    },
    textOnly: true,
    sortable: true,
    width: '20%'
  }, {
    name: _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.tableActionLabel', {
      defaultMessage: 'Actions'
    }),
    render: function render(group) {
      return _react.default.createElement(_actions.ExplorerLink, {
        jobsList: (0, _utils.getJobsFromGroup)(group, jobsList)
      });
    },
    width: '100px',
    align: 'right'
  }];

  var onTableChange = function onTableChange(_ref2) {
    var _ref2$page = _ref2.page,
        page = _ref2$page === void 0 ? {
      index: 0,
      size: 10
    } : _ref2$page,
        _ref2$sort = _ref2.sort,
        sort = _ref2$sort === void 0 ? {
      field: AnomalyDetectionListColumns.id,
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
    totalItemCount: groupsList.length,
    pageSizeOptions: [10, 20, 50],
    hidePerPageOptions: false
  };
  var sorting = {
    sort: {
      field: sortField,
      direction: sortDirection
    }
  };
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "m"
  }, _react.default.createElement("h3", null, _i18n.i18n.translate('xpack.ml.overview.anomalyDetection.panelTitle', {
    defaultMessage: 'Anomaly Detection'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "mlOverviewPanel__statsBar"
  }, _react.default.createElement(_stats_bar.StatsBar, {
    stats: statsBarData,
    dataTestSub: 'mlOverviewJobStatsBar'
  }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(MlInMemoryTable, {
    allowNeutralSort: false,
    className: "mlAnomalyDetectionTable",
    columns: columns,
    hasActions: false,
    isExpandable: false,
    isSelectable: false,
    items: groupsList,
    itemId: AnomalyDetectionListColumns.id,
    onTableChange: onTableChange,
    pagination: pagination,
    sorting: sorting,
    "data-test-subj": "mlOverviewTableAnomalyDetection"
  }));
};

exports.AnomalyDetectionTable = AnomalyDetectionTable;