"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResultsTable = void 0;

var _react = _interopRequireWildcard(require("react"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _public = require("../../../../../../../../../../src/plugins/data/public");

var _field_format_service = require("../../../../../services/field_format_service");

var _ml_in_memory_table = require("../../../../../components/ml_in_memory_table");

var _date_utils = require("../../../../../util/date_utils");

var _fields = require("../../../../common/fields");

var _common = require("../../../../common");

var _columns = require("../../../analytics_management/components/analytics_list/columns");

var _use_explore_data = require("./use_explore_data");

var _regression_exploration = require("./regression_exploration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var PAGE_SIZE_OPTIONS = [5, 10, 25, 50];
var MlInMemoryTableBasic = (0, _ml_in_memory_table.mlInMemoryTableBasicFactory)();

var showingDocs = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.documentsShownHelpText', {
  defaultMessage: 'Showing documents for which predictions exist'
});

var showingFirstDocs = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.firstDocumentsShownHelpText', {
  defaultMessage: 'Showing first {searchSize} documents for which predictions exist',
  values: {
    searchSize: _common.SEARCH_SIZE
  }
});

var ResultsTable = _react.default.memo(function (_ref) {
  var indexPattern = _ref.indexPattern,
      jobConfig = _ref.jobConfig,
      jobStatus = _ref.jobStatus,
      setEvaluateSearchQuery = _ref.setEvaluateSearchQuery;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      pageIndex = _useState2[0],
      setPageIndex = _useState2[1];

  var _useState3 = (0, _react.useState)(25),
      _useState4 = _slicedToArray(_useState3, 2),
      pageSize = _useState4[0],
      setPageSize = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedFields = _useState6[0],
      setSelectedFields = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      docFields = _useState8[0],
      setDocFields = _useState8[1];

  var _useState9 = (0, _react.useState)(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      depVarType = _useState10[0],
      setDepVarType = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isColumnsPopoverVisible = _useState12[0],
      setColumnsPopoverVisible = _useState12[1];

  var _useState13 = (0, _react.useState)(_common.defaultSearchQuery),
      _useState14 = _slicedToArray(_useState13, 2),
      searchQuery = _useState14[0],
      setSearchQuery = _useState14[1];

  var _useState15 = (0, _react.useState)(undefined),
      _useState16 = _slicedToArray(_useState15, 2),
      searchError = _useState16[0],
      setSearchError = _useState16[1];

  var _useState17 = (0, _react.useState)(undefined),
      _useState18 = _slicedToArray(_useState17, 2),
      searchString = _useState18[0],
      setSearchString = _useState18[1];

  var predictedFieldName = (0, _common.getPredictedFieldName)(jobConfig.dest.results_field, jobConfig.analysis);
  var dependentVariable = (0, _common.getDependentVar)(jobConfig.analysis);

  function toggleColumnsPopover() {
    setColumnsPopoverVisible(!isColumnsPopoverVisible);
  }

  function closeColumnsPopover() {
    setColumnsPopoverVisible(false);
  }

  function toggleColumn(column) {
    if (tableItems.length > 0 && jobConfig !== undefined) {
      // spread to a new array otherwise the component wouldn't re-render
      setSelectedFields(_toConsumableArray((0, _fields.toggleSelectedField)(selectedFields, column, jobConfig.dest.results_field, depVarType)));
    }
  }

  var needsDestIndexFields = indexPattern && indexPattern.title === jobConfig.source.index[0];

  var _useExploreData = (0, _use_explore_data.useExploreData)(jobConfig, needsDestIndexFields, selectedFields, setSelectedFields, setDocFields, setDepVarType),
      errorMessage = _useExploreData.errorMessage,
      loadExploreData = _useExploreData.loadExploreData,
      sortField = _useExploreData.sortField,
      sortDirection = _useExploreData.sortDirection,
      status = _useExploreData.status,
      tableItems = _useExploreData.tableItems;

  var columns = selectedFields.sort(function (_ref2, _ref3) {
    var a = _ref2.name;
    var b = _ref3.name;
    return (0, _fields.sortRegressionResultsFields)(a, b, jobConfig);
  }).map(function (field) {
    var type = field.type;
    var format;

    if (indexPattern !== undefined) {
      format = _field_format_service.mlFieldFormatService.getFieldFormatFromIndexPattern(indexPattern, field.id, '');
    }

    var isNumber = type !== undefined && (_fields.BASIC_NUMERICAL_TYPES.has(type) || _fields.EXTENDED_NUMERICAL_TYPES.has(type));

    var column = {
      field: field.name,
      name: field.name,
      sortable: true,
      truncateText: true
    };

    var render = function render(d, fullItem) {
      if (format !== undefined) {
        d = format.convert(d, 'text');
        return d;
      }

      if (Array.isArray(d) && d.every(function (item) {
        return typeof item === 'string';
      })) {
        // If the cells data is an array of strings, return as a comma separated list.
        // The list will get limited to 5 items with `…` at the end if there's more in the original array.
        return "".concat(d.slice(0, 5).join(', ')).concat(d.length > 5 ? ', …' : '');
      } else if (Array.isArray(d)) {
        // If the cells data is an array of e.g. objects, display a 'array' badge with a
        // tooltip that explains that this type of field is not supported in this table.
        return _react.default.createElement(_eui.EuiToolTip, {
          content: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.indexArrayToolTipContent', {
            defaultMessage: 'The full content of this array based column cannot be displayed.'
          })
        }, _react.default.createElement(_eui.EuiBadge, null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.indexArrayBadgeContent', {
          defaultMessage: 'array'
        })));
      }

      return d;
    };

    if (isNumber) {
      column.dataType = 'number';
      column.render = render;
    } else if (typeof type !== 'undefined') {
      switch (type) {
        case _public.ES_FIELD_TYPES.BOOLEAN:
          column.dataType = _public.ES_FIELD_TYPES.BOOLEAN;

          column.render = function (d) {
            return d ? 'true' : 'false';
          };

          break;

        case _public.ES_FIELD_TYPES.DATE:
          column.align = 'right';

          if (format !== undefined) {
            column.render = render;
          } else {
            column.render = function (d) {
              if (d !== undefined) {
                return (0, _date_utils.formatHumanReadableDateTimeSeconds)((0, _momentTimezone.default)(d).unix() * 1000);
              }

              return d;
            };
          }

          break;

        default:
          column.render = render;
          break;
      }
    } else {
      column.render = render;
    }

    return column;
  });
  var docFieldsCount = docFields.length;
  (0, _react.useEffect)(function () {
    if (jobConfig !== undefined && columns.length > 0 && selectedFields.length > 0 && sortField !== undefined && sortDirection !== undefined && selectedFields.some(function (field) {
      return field.name === sortField;
    })) {
      var field = sortField; // If sorting by predictedField use dependentVar type

      if (predictedFieldName === sortField) {
        field = dependentVariable;
      }

      var requiresKeyword = (0, _fields.isKeywordAndTextType)(field);
      loadExploreData({
        field: sortField,
        direction: sortDirection,
        searchQuery: searchQuery,
        requiresKeyword: requiresKeyword
      });
    }
  }, [JSON.stringify(searchQuery)]);
  (0, _react.useEffect)(function () {
    // By default set sorting to descending on the prediction field (`<dependent_varible or prediction_field_name>_prediction`).
    // if that's not available sort ascending on the first column. Check if the current sorting field is still available.
    if (jobConfig !== undefined && columns.length > 0 && selectedFields.length > 0 && !selectedFields.some(function (field) {
      return field.name === sortField;
    })) {
      var predictedFieldSelected = selectedFields.some(function (field) {
        return field.name === predictedFieldName;
      }); // CHECK IF keyword suffix is needed (if predicted field is selected we have to check the dependent variable type)

      var sortByField = predictedFieldSelected ? dependentVariable : selectedFields[0].name;
      var requiresKeyword = (0, _fields.isKeywordAndTextType)(sortByField);
      sortByField = predictedFieldSelected ? predictedFieldName : sortByField;
      var direction = predictedFieldSelected ? _ml_in_memory_table.SORT_DIRECTION.DESC : _ml_in_memory_table.SORT_DIRECTION.ASC;
      loadExploreData({
        field: sortByField,
        direction: direction,
        searchQuery: searchQuery,
        requiresKeyword: requiresKeyword
      });
    }
  }, [jobConfig, columns.length, selectedFields.length, sortField, sortDirection, tableItems.length]);
  var sorting = false;
  var onTableChange;

  if (columns.length > 0 && sortField !== '' && sortField !== undefined) {
    sorting = {
      sort: {
        field: sortField,
        direction: sortDirection
      }
    };

    onTableChange = function onTableChange(_ref4) {
      var _ref4$page = _ref4.page,
          page = _ref4$page === void 0 ? {
        index: 0,
        size: 10
      } : _ref4$page,
          _ref4$sort = _ref4.sort,
          sort = _ref4$sort === void 0 ? {
        field: sortField,
        direction: sortDirection
      } : _ref4$sort;
      var index = page.index,
          size = page.size;
      setPageIndex(index);
      setPageSize(size);

      if (sort.field !== sortField || sort.direction !== sortDirection) {
        var field = sort.field; // If sorting by predictedField use depVar for type check

        if (predictedFieldName === sort.field) {
          field = dependentVariable;
        }

        loadExploreData(_objectSpread({}, sort, {
          searchQuery: searchQuery,
          requiresKeyword: (0, _fields.isKeywordAndTextType)(field)
        }));
      }
    };
  }

  var pagination = {
    initialPageIndex: pageIndex,
    initialPageSize: pageSize,
    totalItemCount: tableItems.length,
    pageSizeOptions: PAGE_SIZE_OPTIONS,
    hidePerPageOptions: false
  };

  var onQueryChange = function onQueryChange(_ref5) {
    var query = _ref5.query,
        error = _ref5.error;

    if (error) {
      setSearchError(error.message);
    } else {
      try {
        var esQueryDsl = _eui.Query.toESQuery(query);

        setSearchQuery(esQueryDsl);
        setSearchString(query.text);
        setSearchError(undefined); // set query for use in evaluate panel

        setEvaluateSearchQuery(esQueryDsl);
      } catch (e) {
        setSearchError(e.toString());
      }
    }
  };

  var search = {
    onChange: onQueryChange,
    defaultQuery: searchString,
    box: {
      incremental: false,
      placeholder: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.searchBoxPlaceholder', {
        defaultMessage: 'E.g. avg>0.5'
      })
    },
    filters: [{
      type: 'field_value_toggle_group',
      field: "".concat(jobConfig.dest.results_field, ".is_training"),
      items: [{
        value: false,
        name: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.isTestingLabel', {
          defaultMessage: 'Testing'
        })
      }, {
        value: true,
        name: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.isTrainingLabel', {
          defaultMessage: 'Training'
        })
      }]
    }]
  };

  if (jobConfig === undefined) {
    return null;
  } // if it's a searchBar syntax error leave the table visible so they can try again


  if (status === _common.INDEX_STATUS.ERROR && !errorMessage.includes('parsing_exception')) {
    return _react.default.createElement(_eui.EuiPanel, {
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      gutterSize: "s"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_regression_exploration.ExplorationTitle, {
      jobId: jobConfig.id
    })), jobStatus !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement("span", null, (0, _columns.getTaskStateBadge)(jobStatus)))), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.indexError', {
        defaultMessage: 'An error occurred loading the index data.'
      }),
      color: "danger",
      iconType: "cross"
    }, _react.default.createElement("p", null, errorMessage)));
  }

  var tableError = status === _common.INDEX_STATUS.ERROR && errorMessage.includes('parsing_exception') ? errorMessage : searchError;
  return _react.default.createElement(_eui.EuiPanel, {
    grow: false,
    "data-test-subj": "mlDFAnalyticsRegressionExplorationTablePanel"
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_regression_exploration.ExplorationTitle, {
    jobId: jobConfig.id
  })), jobStatus !== undefined && _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement("span", null, (0, _columns.getTaskStateBadge)(jobStatus))))), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "xs",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    style: {
      textAlign: 'right'
    }
  }, docFieldsCount > _common.MAX_COLUMNS && _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.fieldSelection', {
    defaultMessage: '{selectedFieldsLength, number} of {docFieldsCount, number} {docFieldsCount, plural, one {field} other {fields}} selected',
    values: {
      selectedFieldsLength: selectedFields.length,
      docFieldsCount: docFieldsCount
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "s"
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "popover",
    button: _react.default.createElement(_eui.EuiButtonIcon, {
      iconType: "gear",
      onClick: toggleColumnsPopover,
      "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.selectColumnsAriaLabel', {
        defaultMessage: 'Select columns'
      })
    }),
    isOpen: isColumnsPopoverVisible,
    closePopover: closeColumnsPopover,
    ownFocus: true
  }, _react.default.createElement(_eui.EuiPopoverTitle, null, _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.selectFieldsPopoverTitle', {
    defaultMessage: 'Select fields'
  })), _react.default.createElement("div", {
    style: {
      maxHeight: '400px',
      overflowY: 'scroll'
    }
  }, docFields.map(function (_ref6) {
    var name = _ref6.name;
    return _react.default.createElement(_eui.EuiCheckbox, {
      id: name,
      key: name,
      label: name,
      checked: selectedFields.some(function (field) {
        return field.name === name;
      }),
      onChange: function onChange() {
        return toggleColumn(name);
      },
      disabled: selectedFields.some(function (field) {
        return field.name === name;
      }) && selectedFields.length === 1
    });
  })))))))), status === _common.INDEX_STATUS.LOADING && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent"
  }), status !== _common.INDEX_STATUS.LOADING && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    max: 1,
    value: 0
  }), (columns.length > 0 || searchQuery !== _common.defaultSearchQuery) && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    helpText: tableItems.length === _common.SEARCH_SIZE ? showingFirstDocs : showingDocs
  }, _react.default.createElement(_react.Fragment, null)), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(MlInMemoryTableBasic, {
    allowNeutralSort: false,
    columns: columns,
    compressed: true,
    hasActions: false,
    isSelectable: false,
    items: tableItems,
    onTableChange: onTableChange,
    pagination: pagination,
    responsive: false,
    search: search,
    error: tableError,
    sorting: sorting
  })));
});

exports.ResultsTable = ResultsTable;