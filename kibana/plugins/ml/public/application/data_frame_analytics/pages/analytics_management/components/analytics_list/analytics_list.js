"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataFrameAnalyticsList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../common");

var _check_privilege = require("../../../../../privilege/check_privilege");

var _columns = require("./columns");

var _common2 = require("./common");

var _analytics_service = require("../../services/analytics_service");

var _expanded_row = require("./expanded_row");

var _ml_in_memory_table = require("../../../../../components/ml_in_memory_table");

var _stats_bar = require("../../../../../components/stats_bar");

var _refresh_analytics_list_button = require("../refresh_analytics_list_button");

var _create_analytics_button = require("../create_analytics_button");

var _create_analytics_flyout_wrapper = require("../create_analytics_flyout_wrapper");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getItemIdToExpandedRowMap(itemIds, dataFrameAnalytics) {
  return itemIds.reduce(function (m, analyticsId) {
    var item = dataFrameAnalytics.find(function (analytics) {
      return analytics.config.id === analyticsId;
    });

    if (item !== undefined) {
      m[analyticsId] = _react.default.createElement(_expanded_row.ExpandedRow, {
        item: item
      });
    }

    return m;
  }, {});
}

function stringMatch(str, substr) {
  return typeof str === 'string' && typeof substr === 'string' && str.toLowerCase().match(substr.toLowerCase()) === null === false;
}

var MlInMemoryTable = (0, _ml_in_memory_table.mlInMemoryTableFactory)();

var DataFrameAnalyticsList = function DataFrameAnalyticsList(_ref) {
  var _ref$isManagementTabl = _ref.isManagementTable,
      isManagementTable = _ref$isManagementTabl === void 0 ? false : _ref$isManagementTabl,
      _ref$isMlEnabledInSpa = _ref.isMlEnabledInSpace,
      isMlEnabledInSpace = _ref$isMlEnabledInSpa === void 0 ? true : _ref$isMlEnabledInSpa,
      _ref$blockRefresh = _ref.blockRefresh,
      blockRefresh = _ref$blockRefresh === void 0 ? false : _ref$blockRefresh,
      createAnalyticsForm = _ref.createAnalyticsForm;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isInitialized = _useState2[0],
      setIsInitialized = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isLoading = _useState4[0],
      setIsLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      filterActive = _useState6[0],
      setFilterActive = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      analytics = _useState8[0],
      setAnalytics = _useState8[1];

  var _useState9 = (0, _react.useState)(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      analyticsStats = _useState10[0],
      setAnalyticsStats = _useState10[1];

  var _useState11 = (0, _react.useState)([]),
      _useState12 = _slicedToArray(_useState11, 2),
      filteredAnalytics = _useState12[0],
      setFilteredAnalytics = _useState12[1];

  var _useState13 = (0, _react.useState)([]),
      _useState14 = _slicedToArray(_useState13, 2),
      expandedRowItemIds = _useState14[0],
      setExpandedRowItemIds = _useState14[1];

  var _useState15 = (0, _react.useState)(undefined),
      _useState16 = _slicedToArray(_useState15, 2),
      errorMessage = _useState16[0],
      setErrorMessage = _useState16[1];

  var _useState17 = (0, _react.useState)(undefined),
      _useState18 = _slicedToArray(_useState17, 2),
      searchError = _useState18[0],
      setSearchError = _useState18[1];

  var _useState19 = (0, _react.useState)(0),
      _useState20 = _slicedToArray(_useState19, 2),
      pageIndex = _useState20[0],
      setPageIndex = _useState20[1];

  var _useState21 = (0, _react.useState)(10),
      _useState22 = _slicedToArray(_useState21, 2),
      pageSize = _useState22[0],
      setPageSize = _useState22[1];

  var _useState23 = (0, _react.useState)(_common2.DataFrameAnalyticsListColumn.id),
      _useState24 = _slicedToArray(_useState23, 2),
      sortField = _useState24[0],
      setSortField = _useState24[1];

  var _useState25 = (0, _react.useState)(_ml_in_memory_table.SORT_DIRECTION.ASC),
      _useState26 = _slicedToArray(_useState25, 2),
      sortDirection = _useState26[0],
      setSortDirection = _useState26[1];

  var disabled = !(0, _check_privilege.checkPermission)('canCreateDataFrameAnalytics') || !(0, _check_privilege.checkPermission)('canStartStopDataFrameAnalytics');
  var getAnalytics = (0, _analytics_service.getAnalyticsFactory)(setAnalytics, setAnalyticsStats, setErrorMessage, setIsInitialized, blockRefresh); // Subscribe to the refresh observable to trigger reloading the analytics list.

  (0, _common.useRefreshAnalyticsList)({
    isLoading: setIsLoading,
    onRefresh: function onRefresh() {
      return getAnalytics(true);
    }
  });

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
        filterAnalytics(clauses);
      } else {
        setFilterActive(false);
      }

      setSearchError(undefined);
    }
  };

  var filterAnalytics = function filterAnalytics(clauses) {
    setIsLoading(true); // keep count of the number of matches we make as we're looping over the clauses
    // we only want to return analytics which match all clauses, i.e. each search term is ANDed
    // { analytics-one:  { analytics: { id: analytics-one, config: {}, state: {}, ... }, count: 0 }, analytics-two: {...} }

    var matches = analytics.reduce(function (p, c) {
      p[c.id] = {
        analytics: c,
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
        // match on id and description
        // if the term has been negated, AND the matches
        if (bool === true) {
          ts = analytics.filter(function (d) {
            return stringMatch(d.id, c.value) === bool;
          } // ||
          // stringMatch(d.config.description, c.value) === bool
          );
        } else {
          ts = analytics.filter(function (d) {
            return stringMatch(d.id, c.value) === bool;
          } // &&
          // stringMatch(d.config.description, c.value) === bool
          );
        }
      } else {
        // filter other clauses, i.e. the mode and status filters
        if (Array.isArray(c.value)) {
          // the status value is an array of string(s) e.g. ['failed', 'stopped']
          ts = analytics.filter(function (d) {
            return c.value.includes(d.stats.state);
          });
        } else {
          ts = analytics.filter(function (d) {
            return d.mode === c.value;
          });
        }
      }

      ts.forEach(function (t) {
        return matches[t.id].count++;
      });
    }); // loop through the matches and return only analytics which have match all the clauses

    var filtered = Object.values(matches).filter(function (m) {
      return (m && m.count) >= clauses.length;
    }).map(function (m) {
      return m.analytics;
    });
    var pageStart = pageIndex * pageSize;

    if (pageStart >= filtered.length && filtered.length !== 0) {
      // if the page start is larger than the number of items due to
      // filters being applied, calculate a new page start
      pageStart = Math.floor((filtered.length - 1) / pageSize) * pageSize;
      setPageIndex(pageStart / pageSize);
    }

    setFilteredAnalytics(filtered);
    setIsLoading(false);
  }; // Before the analytics have been loaded for the first time, display the loading indicator only.
  // Otherwise a user would see 'No data frame analytics found' during the initial loading.


  if (!isInitialized) {
    return _react.default.createElement(_ml_in_memory_table.ProgressBar, {
      isLoading: isLoading
    });
  }

  if (typeof errorMessage !== 'undefined') {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ml_in_memory_table.ProgressBar, {
      isLoading: isLoading
    }), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.ml.dataFrame.analyticsList.errorPromptTitle', {
        defaultMessage: 'An error occurred getting the data frame analytics list.'
      }),
      color: "danger",
      iconType: "alert"
    }, _react.default.createElement("pre", null, JSON.stringify(errorMessage))));
  }

  if (analytics.length === 0) {
    return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_ml_in_memory_table.ProgressBar, {
      isLoading: isLoading
    }), _react.default.createElement(_eui.EuiEmptyPrompt, {
      title: _react.default.createElement("h2", null, _i18n.i18n.translate('xpack.ml.dataFrame.analyticsList.emptyPromptTitle', {
        defaultMessage: 'No data frame analytics jobs found'
      })),
      actions: !isManagementTable && createAnalyticsForm ? [_react.default.createElement(_eui.EuiButtonEmpty, {
        onClick: createAnalyticsForm.actions.openModal,
        isDisabled: disabled,
        "data-test-subj": "mlAnalyticsCreateFirstButton"
      }, _i18n.i18n.translate('xpack.ml.dataFrame.analyticsList.emptyPromptButtonText', {
        defaultMessage: 'Create your first data frame analytics job'
      }))] : [],
      "data-test-subj": "mlNoDataFrameAnalyticsFound"
    }), !isManagementTable && createAnalyticsForm && _react.default.createElement(_create_analytics_flyout_wrapper.CreateAnalyticsFlyoutWrapper, createAnalyticsForm));
  }

  var columns = (0, _columns.getColumns)(expandedRowItemIds, setExpandedRowItemIds, isManagementTable, isMlEnabledInSpace, createAnalyticsForm);
  var sorting = {
    sort: {
      field: sortField,
      direction: sortDirection
    }
  };
  var itemIdToExpandedRowMap = getItemIdToExpandedRowMap(expandedRowItemIds, analytics);
  var pagination = {
    initialPageIndex: pageIndex,
    initialPageSize: pageSize,
    totalItemCount: analytics.length,
    pageSizeOptions: [10, 20, 50],
    hidePerPageOptions: false
  };
  var search = {
    onChange: onQueryChange,
    box: {
      incremental: true
    },
    filters: [{
      type: 'field_value_selection',
      field: 'state.state',
      name: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.statusFilter', {
        defaultMessage: 'Status'
      }),
      multiSelect: 'or',
      options: Object.values(_common2.DATA_FRAME_TASK_STATE).map(function (val) {
        return {
          value: val,
          name: val,
          view: (0, _columns.getTaskStateBadge)(val)
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
      field: _common2.DataFrameAnalyticsListColumn.id,
      direction: _ml_in_memory_table.SORT_DIRECTION.ASC
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

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, analyticsStats && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_stats_bar.StatsBar, {
    stats: analyticsStats,
    dataTestSub: 'mlAnalyticsStatsBar'
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_refresh_analytics_list_button.RefreshAnalyticsListButton, null)), !isManagementTable && createAnalyticsForm && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_create_analytics_button.CreateAnalyticsButton, createAnalyticsForm))))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement("div", {
    "data-test-subj": "mlAnalyticsTableContainer"
  }, _react.default.createElement(MlInMemoryTable, {
    allowNeutralSort: false,
    className: "mlAnalyticsTable",
    columns: columns,
    error: searchError,
    hasActions: false,
    isExpandable: true,
    isSelectable: false,
    items: filterActive ? filteredAnalytics : analytics,
    itemId: _common2.DataFrameAnalyticsListColumn.id,
    itemIdToExpandedRowMap: itemIdToExpandedRowMap,
    onTableChange: onTableChange,
    pagination: pagination,
    sorting: sorting,
    search: search,
    "data-test-subj": isLoading ? 'mlAnalyticsTable loading' : 'mlAnalyticsTable loaded',
    rowProps: function rowProps(item) {
      return {
        'data-test-subj': "mlAnalyticsTableRow row-".concat(item.id)
      };
    }
  })), !isManagementTable && (createAnalyticsForm === null || createAnalyticsForm === void 0 ? void 0 : createAnalyticsForm.state.isModalVisible) && _react.default.createElement(_create_analytics_flyout_wrapper.CreateAnalyticsFlyoutWrapper, createAnalyticsForm));
};

exports.DataFrameAnalyticsList = DataFrameAnalyticsList;