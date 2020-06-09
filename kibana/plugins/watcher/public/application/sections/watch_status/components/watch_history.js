"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchHistory = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../common/constants");

var _components = require("../../../components");

var _api = require("../../../lib/api");

var _watch_details_context = require("../watch_details_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var watchHistoryTimeSpanOptions = [{
  value: 'now-1h',
  text: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.timeSpan.1h', {
    defaultMessage: 'Last one hour'
  })
}, {
  value: 'now-24h',
  text: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.timeSpan.24h', {
    defaultMessage: 'Last 24 hours'
  })
}, {
  value: 'now-7d',
  text: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.timeSpan.7d', {
    defaultMessage: 'Last 7 days'
  })
}, {
  value: 'now-30d',
  text: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.timeSpan.30d', {
    defaultMessage: 'Last 30 days'
  })
}, {
  value: 'now-6M',
  text: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.timeSpan.6M', {
    defaultMessage: 'Last 6 months'
  })
}, {
  value: 'now-1y',
  text: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.timeSpan.1y', {
    defaultMessage: 'Last 1 year'
  })
}];

var WatchHistory = function WatchHistory() {
  var _useContext = (0, _react.useContext)(_watch_details_context.WatchDetailsContext),
      loadedWatch = _useContext.watchDetail;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      isActivated = _useState2[0],
      setIsActivated = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      detailWatchId = _useState4[0],
      setDetailWatchId = _useState4[1];

  var _useState5 = (0, _react.useState)(watchHistoryTimeSpanOptions[0].value),
      _useState6 = _slicedToArray(_useState5, 2),
      watchHistoryTimeSpan = _useState6[0],
      setWatchHistoryTimeSpan = _useState6[1];

  if (isActivated === undefined) {
    // Set initial value for isActivated based on the watch we just loaded.
    var isActive = loadedWatch.watchStatus && loadedWatch.watchStatus.isActive || false;
    setIsActivated(isActive);
  }

  var _useLoadWatchHistory = (0, _api.useLoadWatchHistory)(loadedWatch.id, watchHistoryTimeSpan),
      historyError = _useLoadWatchHistory.error,
      history = _useLoadWatchHistory.data,
      isLoading = _useLoadWatchHistory.isLoading;

  var _useLoadWatchHistoryD = (0, _api.useLoadWatchHistoryDetail)(detailWatchId),
      watchHistoryDetailsError = _useLoadWatchHistoryD.error,
      watchHistoryDetails = _useLoadWatchHistoryD.data;

  var executionDetail = watchHistoryDetails ? JSON.stringify(watchHistoryDetails.details, null, 2) : '';

  if (historyError) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchHistory.watchExecutionErrorTitle",
        defaultMessage: "Error loading execution history"
      }),
      error: historyError
    }));
  }

  var columns = [{
    field: 'startTime',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.watchTable.startTimeHeader', {
      defaultMessage: 'Trigger time'
    }),
    sortable: true,
    truncateText: true,
    render: function render(startTime, item) {
      var formattedDate = startTime.format();
      return _react.default.createElement(_eui.EuiLink, {
        "data-test-subj": "watchStartTimeColumn-".concat(formattedDate),
        onClick: function onClick() {
          return setDetailWatchId(item.id);
        }
      }, formattedDate);
    }
  }, {
    field: 'watchStatus.state',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.watchTable.stateHeader', {
      defaultMessage: 'State'
    }),
    sortable: true,
    truncateText: true,
    render: function render(state) {
      return _react.default.createElement(_components.WatchStatus, {
        status: state
      });
    }
  }, {
    field: 'watchStatus.comment',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.watchTable.commentHeader', {
      defaultMessage: 'Comment'
    }),
    sortable: true,
    truncateText: true
  }];

  var onTimespanChange = function onTimespanChange(e) {
    var timespan = e.target.value;
    setWatchHistoryTimeSpan(timespan);
  };

  var flyout;

  if (detailWatchId !== undefined) {
    if (watchHistoryDetailsError) {
      flyout = _react.default.createElement(_eui.EuiFlyout, {
        "data-test-subj": "watchHistoryErrorDetailFlyout",
        onClose: function onClose() {
          return setDetailWatchId(undefined);
        },
        "aria-labelledby": "watchHistoryErrorDetailsFlyoutTitle",
        maxWidth: 600
      }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", {
        "data-test-subj": "title"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchHistory.watchHistoryDetail.errorTitle",
        defaultMessage: "Execution details"
      })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_components.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.watcher.sections.watchHistory.watchHistoryDetailsErrorTitle",
          defaultMessage: "Error loading execution details"
        }),
        error: watchHistoryDetailsError,
        "data-test-subj": "errorMessage"
      })));
    }

    if (watchHistoryDetails !== undefined) {
      var detailColumns = [{
        field: 'id',
        name: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.watchActionStatusTable.id', {
          defaultMessage: 'Name'
        }),
        sortable: true,
        truncateText: true
      }, {
        field: 'state',
        name: _i18n.i18n.translate('xpack.watcher.sections.watchHistory.watchActionStatusTable.state', {
          defaultMessage: 'State'
        }),
        sortable: true,
        truncateText: true,
        render: function render(state) {
          return _react.default.createElement(_components.WatchStatus, {
            status: state
          });
        }
      }];
      flyout = _react.default.createElement(_eui.EuiFlyout, {
        "data-test-subj": "watchHistoryDetailFlyout",
        onClose: function onClose() {
          return setDetailWatchId(undefined);
        },
        "aria-labelledby": "watchHistoryDetailsFlyoutTitle",
        maxWidth: 600
      }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, {
        size: "s"
      }, _react.default.createElement("h3", {
        "data-test-subj": "title"
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchHistory.watchHistoryDetail.title",
        defaultMessage: "Executed on {date}",
        values: {
          date: watchHistoryDetails.startTime
        }
      })))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchHistory.watchHistoryDetail.actionsTitle",
        defaultMessage: "Actions"
      }))), _react.default.createElement(_eui.EuiInMemoryTable, {
        items: watchHistoryDetails.watchStatus.actionStatuses,
        itemId: "id",
        columns: detailColumns,
        message: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.watcher.sections.watchHistory.watchTable.noWatchesMessage",
          defaultMessage: "No current status to show"
        }),
        "data-test-subj": "watchActionsTable"
      }), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTitle, {
        size: "xs"
      }, _react.default.createElement("h4", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchHistory.watchHistoryDetail.jsonTitle",
        defaultMessage: "JSON"
      }))), _react.default.createElement(_eui.EuiSpacer, {
        size: "s"
      }), _react.default.createElement(_eui.EuiCodeBlock, {
        language: "json"
      }, executionDetail)));
    }
  }

  return _react.default.createElement("div", {
    "data-test-subj": "watchHistorySection"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s",
    justifyContent: "flexStart",
    alignItems: "center"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    options: watchHistoryTimeSpanOptions,
    value: watchHistoryTimeSpan,
    onChange: onTimespanChange,
    "aria-label": _i18n.i18n.translate('xpack.watcher.sections.watchHistory.changeTimespanSelectAriaLabel', {
      defaultMessage: 'Change timespan of watch history'
    })
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiInMemoryTable, {
    items: history || [],
    columns: columns,
    pagination: _constants.PAGINATION,
    sorting: true,
    loading: isLoading,
    "data-test-subj": "watchHistoryTable",
    message: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchHistory.watchTable.noCurrentStatus",
      defaultMessage: "No execution history to show"
    })
  }), flyout);
};

exports.WatchHistory = WatchHistory;