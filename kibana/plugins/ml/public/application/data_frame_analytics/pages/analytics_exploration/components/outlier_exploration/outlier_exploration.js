"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OutlierExploration = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _color_range_legend = require("../../../../../components/color_range_legend");

var _common = require("../../../../common");

var _columns = require("../../../analytics_management/components/analytics_list/columns");

var _use_explore_data = require("../../hooks/use_explore_data");

var _exploration_data_grid = require("../exploration_data_grid");

var _exploration_query_bar = require("../exploration_query_bar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var FEATURE_INFLUENCE = 'feature_influence';

var ExplorationTitle = function ExplorationTitle(_ref) {
  var jobId = _ref.jobId;
  return _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.exploration.jobIdTitle', {
    defaultMessage: 'Outlier detection job ID {jobId}',
    values: {
      jobId: jobId
    }
  })));
};

var getFeatureCount = function getFeatureCount(resultsField) {
  var tableItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (tableItems.length === 0) {
    return 0;
  }

  return Object.keys(tableItems[0]).filter(function (key) {
    return key.includes("".concat(resultsField, ".").concat(FEATURE_INFLUENCE, "."));
  }).length;
};

var OutlierExploration = _react.default.memo(function (_ref2) {
  var jobId = _ref2.jobId;

  var _useExploreData = (0, _use_explore_data.useExploreData)(jobId),
      errorMessage = _useExploreData.errorMessage,
      indexPattern = _useExploreData.indexPattern,
      jobConfig = _useExploreData.jobConfig,
      jobStatus = _useExploreData.jobStatus,
      pagination = _useExploreData.pagination,
      searchQuery = _useExploreData.searchQuery,
      selectedFields = _useExploreData.selectedFields,
      setPagination = _useExploreData.setPagination,
      setSearchQuery = _useExploreData.setSearchQuery,
      setSelectedFields = _useExploreData.setSelectedFields,
      setSortingColumns = _useExploreData.setSortingColumns,
      sortingColumns = _useExploreData.sortingColumns,
      rowCount = _useExploreData.rowCount,
      status = _useExploreData.status,
      tableFields = _useExploreData.tableFields,
      tableItems = _useExploreData.tableItems;

  var columns = [];

  if (jobConfig !== undefined && indexPattern !== undefined && selectedFields.length > 0 && tableItems.length > 0) {
    var resultsField = jobConfig.dest.results_field;
    var removePrefix = new RegExp("^".concat(resultsField, ".").concat(FEATURE_INFLUENCE, "."), 'g');
    columns.push.apply(columns, _toConsumableArray(tableFields.sort((0, _common.sortColumns)(tableItems[0], resultsField)).map(function (id) {
      var idWithoutPrefix = id.replace(removePrefix, '');
      var field = indexPattern.fields.getByName(idWithoutPrefix); // Built-in values are ['boolean', 'currency', 'datetime', 'numeric', 'json']
      // To fall back to the default string schema it needs to be undefined.

      var schema;

      switch (field === null || field === void 0 ? void 0 : field.type) {
        case 'date':
          schema = 'datetime';
          break;

        case 'geo_point':
          schema = 'json';
          break;

        case 'number':
          schema = 'numeric';
          break;
      }

      if (id === "".concat(resultsField, ".outlier_score")) {
        schema = 'numeric';
      }

      return {
        id: id,
        schema: schema
      };
    })));
  }

  var colorRange = (0, _color_range_legend.useColorRange)(_color_range_legend.COLOR_RANGE.BLUE, _color_range_legend.COLOR_RANGE_SCALE.INFLUENCER, jobConfig !== undefined ? getFeatureCount(jobConfig.dest.results_field, tableItems) : 1);

  if (jobConfig === undefined || indexPattern === undefined) {
    return null;
  } // if it's a searchBar syntax error leave the table visible so they can try again


  if (status === _common.INDEX_STATUS.ERROR && !errorMessage.includes('parsing_exception')) {
    return _react.default.createElement(_eui.EuiPanel, {
      grow: false
    }, _react.default.createElement(ExplorationTitle, {
      jobId: jobConfig.id
    }), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.ml.dataframe.analytics.exploration.indexError', {
        defaultMessage: 'An error occurred loading the index data.'
      }),
      color: "danger",
      iconType: "cross"
    }, _react.default.createElement("p", null, errorMessage)));
  }

  var tableError = status === _common.INDEX_STATUS.ERROR && errorMessage.includes('parsing_exception') ? errorMessage : undefined;

  if (status === _common.INDEX_STATUS.LOADED && tableItems.length === 0 && tableError === undefined) {
    tableError = _i18n.i18n.translate('xpack.ml.dataframe.analytics.exploration.noDataCalloutBody', {
      defaultMessage: 'The query for the index returned no results. Please make sure the index contains documents and your query is not too restrictive.'
    });
  }

  return _react.default.createElement(_eui.EuiPanel, {
    "data-test-subj": "mlDFAnalyticsOutlierExplorationTablePanel"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween",
    responsive: false,
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(ExplorationTitle, {
    jobId: jobConfig.id
  })), jobStatus !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("span", null, (0, _columns.getTaskStateBadge)(jobStatus)))), _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "xs"
  }), (columns.length > 0 || searchQuery !== _common.defaultSearchQuery) && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_exploration_query_bar.ExplorationQueryBar, {
    indexPattern: indexPattern,
    setSearchQuery: setSearchQuery
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_color_range_legend.ColorRangeLegend, {
    colorRange: colorRange,
    title: _i18n.i18n.translate('xpack.ml.dataframe.analytics.exploration.colorRangeLegendTitle', {
      defaultMessage: 'Feature influence score'
    })
  }))), _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), columns.length > 0 && tableItems.length > 0 && _react.default.createElement(_exploration_data_grid.ExplorationDataGrid, {
    colorRange: colorRange,
    columns: columns,
    indexPattern: indexPattern,
    pagination: pagination,
    resultsField: jobConfig.dest.results_field,
    rowCount: rowCount,
    selectedFields: selectedFields,
    setPagination: setPagination,
    setSelectedFields: setSelectedFields,
    setSortingColumns: setSortingColumns,
    sortingColumns: sortingColumns,
    tableItems: tableItems
  })));
});

exports.OutlierExploration = OutlierExploration;