"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getColumns = exports.progressColumn = exports.getTaskStateBadge = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _common = require("../../../../common");

var _common2 = require("./common");

var _actions = require("./actions");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var TASK_STATE_COLOR;

(function (TASK_STATE_COLOR) {
  TASK_STATE_COLOR["analyzing"] = "primary";
  TASK_STATE_COLOR["failed"] = "danger";
  TASK_STATE_COLOR["reindexing"] = "primary";
  TASK_STATE_COLOR["started"] = "primary";
  TASK_STATE_COLOR["starting"] = "primary";
  TASK_STATE_COLOR["stopped"] = "hollow";
})(TASK_STATE_COLOR || (TASK_STATE_COLOR = {}));

var getTaskStateBadge = function getTaskStateBadge(state, failureReason) {
  var color = TASK_STATE_COLOR[state];

  if ((0, _common2.isDataFrameAnalyticsFailed)(state) && failureReason !== undefined) {
    return _react.default.createElement(_eui.EuiToolTip, {
      content: failureReason
    }, _react.default.createElement(_eui.EuiBadge, {
      className: "mlTaskStateBadge",
      color: color
    }, state));
  }

  return _react.default.createElement(_eui.EuiBadge, {
    className: "mlTaskStateBadge",
    color: color
  }, state);
};

exports.getTaskStateBadge = getTaskStateBadge;
var progressColumn = {
  name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.progress', {
    defaultMessage: 'Progress'
  }),
  sortable: function sortable(item) {
    return (0, _common2.getDataFrameAnalyticsProgress)(item.stats);
  },
  truncateText: true,
  render: function render(item) {
    var progress = (0, _common2.getDataFrameAnalyticsProgress)(item.stats);

    if (progress === undefined) {
      return null;
    } // For now all analytics jobs are batch jobs.


    var isBatchTransform = true;
    return _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      gutterSize: "xs"
    }, isBatchTransform && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: '40px'
      },
      grow: false
    }, _react.default.createElement(_eui.EuiProgress, {
      value: progress,
      max: 100,
      color: "primary",
      size: "m",
      "data-test-subj": "mlAnalyticsTableProgress"
    }, progress, "%")), _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: '35px'
      },
      grow: false
    }, _react.default.createElement(_eui.EuiText, {
      size: "xs"
    }, "".concat(progress, "%")))), !isBatchTransform && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: '40px'
      },
      grow: false
    }, (0, _common2.isDataFrameAnalyticsRunning)(item.stats.state) && _react.default.createElement(_eui.EuiProgress, {
      color: "primary",
      size: "m"
    }), (0, _common2.isDataFrameAnalyticsStopped)(item.stats.state) && _react.default.createElement(_eui.EuiProgress, {
      value: 0,
      max: 100,
      color: "primary",
      size: "m"
    })), _react.default.createElement(_eui.EuiFlexItem, {
      style: {
        width: '35px'
      },
      grow: false
    }, "\xA0")));
  },
  width: '100px',
  'data-test-subj': 'mlAnalyticsTableColumnProgress'
};
exports.progressColumn = progressColumn;

var getColumns = function getColumns(expandedRowItemIds, setExpandedRowItemIds) {
  var isManagementTable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var isMlEnabledInSpace = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var createAnalyticsForm = arguments.length > 4 ? arguments[4] : undefined;
  var actions = isManagementTable === true ? [_actions.AnalyticsViewAction] : (0, _actions.getActions)(createAnalyticsForm);

  function toggleDetails(item) {
    var index = expandedRowItemIds.indexOf(item.config.id);

    if (index !== -1) {
      expandedRowItemIds.splice(index, 1);
      setExpandedRowItemIds(_toConsumableArray(expandedRowItemIds));
    } else {
      expandedRowItemIds.push(item.config.id);
    } // spread to a new array otherwise the component wouldn't re-render


    setExpandedRowItemIds(_toConsumableArray(expandedRowItemIds));
  } // update possible column types to something like (FieldDataColumn | ComputedColumn | ActionsColumn)[] when they have been added to EUI


  var columns = [{
    name: _react.default.createElement(_eui.EuiScreenReaderOnly, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.ml.dataframe.analyticsList.showDetailsColumn.screenReaderDescription",
      defaultMessage: "This column contains clickable controls for showing more details on each job"
    }))),
    align: _eui.RIGHT_ALIGNMENT,
    width: '40px',
    isExpander: true,
    render: function render(item) {
      return _react.default.createElement(_eui.EuiButtonIcon, {
        onClick: function onClick() {
          return toggleDetails(item);
        },
        "aria-label": expandedRowItemIds.includes(item.config.id) ? _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.rowCollapse', {
          defaultMessage: 'Hide details for {analyticsId}',
          values: {
            analyticsId: item.config.id
          }
        }) : _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.rowExpand', {
          defaultMessage: 'Show details for {analyticsId}',
          values: {
            analyticsId: item.config.id
          }
        }),
        iconType: expandedRowItemIds.includes(item.config.id) ? 'arrowUp' : 'arrowDown'
      });
    },
    'data-test-subj': 'mlAnalyticsTableRowDetailsToggle'
  }, {
    field: _common2.DataFrameAnalyticsListColumn.id,
    name: 'ID',
    sortable: true,
    truncateText: true,
    'data-test-subj': 'mlAnalyticsTableColumnId',
    scope: 'row'
  }, {
    field: _common2.DataFrameAnalyticsListColumn.description,
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.description', {
      defaultMessage: 'Description'
    }),
    sortable: true,
    truncateText: true,
    'data-test-subj': 'mlAnalyticsTableColumnJobDescription'
  }, {
    field: _common2.DataFrameAnalyticsListColumn.configSourceIndex,
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.sourceIndex', {
      defaultMessage: 'Source index'
    }),
    sortable: true,
    truncateText: true,
    'data-test-subj': 'mlAnalyticsTableColumnSourceIndex'
  }, {
    field: _common2.DataFrameAnalyticsListColumn.configDestIndex,
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.destinationIndex', {
      defaultMessage: 'Destination index'
    }),
    sortable: true,
    truncateText: true,
    'data-test-subj': 'mlAnalyticsTableColumnDestIndex'
  }, {
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.type', {
      defaultMessage: 'Type'
    }),
    sortable: function sortable(item) {
      return (0, _common.getAnalysisType)(item.config.analysis);
    },
    truncateText: true,
    render: function render(item) {
      return _react.default.createElement(_eui.EuiBadge, {
        color: "hollow"
      }, (0, _common.getAnalysisType)(item.config.analysis));
    },
    width: '150px',
    'data-test-subj': 'mlAnalyticsTableColumnType'
  }, {
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.status', {
      defaultMessage: 'Status'
    }),
    sortable: function sortable(item) {
      return item.stats.state;
    },
    truncateText: true,
    render: function render(item) {
      return getTaskStateBadge(item.stats.state, item.stats.failure_reason);
    },
    width: '100px',
    'data-test-subj': 'mlAnalyticsTableColumnStatus'
  }, // For now there is batch mode only so we hide this column for now.

  /*
  {
    name: i18n.translate('xpack.ml.dataframe.analyticsList.mode', { defaultMessage: 'Mode' }),
    sortable: (item: DataFrameAnalyticsListRow) => item.mode,
    truncateText: true,
    render(item: DataFrameAnalyticsListRow) {
      const mode = item.mode;
      const color = 'hollow';
      return <EuiBadge color={color}>{mode}</EuiBadge>;
    },
    width: '100px',
  },
  */
  progressColumn, {
    name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.tableActionLabel', {
      defaultMessage: 'Actions'
    }),
    actions: actions,
    width: isManagementTable === true ? '100px' : '150px'
  }];

  if (isManagementTable === true) {
    // insert before last column
    columns.splice(columns.length - 1, 0, {
      name: _i18n.i18n.translate('xpack.ml.jobsList.analyticsSpacesLabel', {
        defaultMessage: 'Spaces'
      }),
      render: function render() {
        return _react.default.createElement(_eui.EuiBadge, {
          color: 'hollow'
        }, 'all');
      },
      width: '75px'
    }); // Remove actions if Ml not enabled in current space

    if (isMlEnabledInSpace === false) {
      columns.pop();
    }
  }

  return columns;
};

exports.getColumns = getColumns;