"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PivotPreview = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../../src/plugins/data/common");

var _common2 = require("../../../../common/types/common");

var _date_utils = require("../../../../common/utils/date_utils");

var _object_utils = require("../../../../common/utils/object_utils");

var _common3 = require("../../common");

var _common4 = require("./common");

var _use_pivot_preview_data = require("./use_pivot_preview_data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function sortColumns(groupByArr) {
  return function (a, b) {
    // make sure groupBy fields are always most left columns
    if (groupByArr.some(function (d) {
      return d.aggName === a;
    }) && groupByArr.some(function (d) {
      return d.aggName === b;
    })) {
      return a.localeCompare(b);
    }

    if (groupByArr.some(function (d) {
      return d.aggName === a;
    })) {
      return -1;
    }

    if (groupByArr.some(function (d) {
      return d.aggName === b;
    })) {
      return 1;
    }

    return a.localeCompare(b);
  };
}

var PreviewTitle = function PreviewTitle(_ref) {
  var previewRequest = _ref.previewRequest;

  var euiCopyText = _i18n.i18n.translate('xpack.transform.pivotPreview.copyClipboardTooltip', {
    defaultMessage: 'Copy Dev Console statement of the pivot preview to the clipboard.'
  });

  return _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.transform.pivotPreview.PivotPreviewTitle', {
    defaultMessage: 'Transform pivot preview'
  })))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiCopy, {
    beforeMessage: euiCopyText,
    textToCopy: (0, _common4.getPivotPreviewDevConsoleStatement)(previewRequest)
  }, function (copy) {
    return _react.default.createElement(_eui.EuiButtonIcon, {
      onClick: copy,
      iconType: "copyClipboard",
      "aria-label": euiCopyText
    });
  })));
};

var ErrorMessage = function ErrorMessage(_ref2) {
  var message = _ref2.message;
  return _react.default.createElement(_eui.EuiCodeBlock, {
    language: "json",
    fontSize: "s",
    paddingSize: "s",
    isCopyable: true
  }, message);
};

var defaultPagination = {
  pageIndex: 0,
  pageSize: 5
};

var PivotPreview = _react.default.memo(function (_ref3) {
  var aggs = _ref3.aggs,
      groupBy = _ref3.groupBy,
      indexPatternTitle = _ref3.indexPatternTitle,
      query = _ref3.query,
      _ref3$showHeader = _ref3.showHeader,
      showHeader = _ref3$showHeader === void 0 ? true : _ref3$showHeader;

  var _usePivotPreviewData = (0, _use_pivot_preview_data.usePivotPreviewData)(indexPatternTitle, query, aggs, groupBy),
      data = _usePivotPreviewData.previewData,
      previewMappings = _usePivotPreviewData.previewMappings,
      errorMessage = _usePivotPreviewData.errorMessage,
      previewRequest = _usePivotPreviewData.previewRequest,
      status = _usePivotPreviewData.status;

  var groupByArr = (0, _common2.dictionaryToArray)(groupBy); // Filters mapping properties of type `object`, which get returned for nested field parents.

  var columnKeys = Object.keys(previewMappings.properties).filter(function (key) {
    return previewMappings.properties[key].type !== 'object';
  });
  columnKeys.sort(sortColumns(groupByArr)); // Column visibility

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      visibleColumns = _useState2[0],
      setVisibleColumns = _useState2[1];

  (0, _react.useEffect)(function () {
    setVisibleColumns(columnKeys.splice(0, _common3.INIT_MAX_COLUMNS)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnKeys.join()]);

  var _useState3 = (0, _react.useState)(defaultPagination),
      _useState4 = _slicedToArray(_useState3, 2),
      pagination = _useState4[0],
      setPagination = _useState4[1]; // Reset pagination if data changes. This is to avoid ending up with an empty table
  // when for example the user selected a page that is not available with the updated data.


  (0, _react.useEffect)(function () {
    setPagination(defaultPagination);
  }, [data.length]); // EuiDataGrid State

  var dataGridColumns = columnKeys.map(function (id) {
    var field = previewMappings.properties[id]; // Built-in values are ['boolean', 'currency', 'datetime', 'numeric', 'json']
    // To fall back to the default string schema it needs to be undefined.

    var schema;

    switch (field === null || field === void 0 ? void 0 : field.type) {
      case _common.ES_FIELD_TYPES.GEO_POINT:
      case _common.ES_FIELD_TYPES.GEO_SHAPE:
        schema = 'json';
        break;

      case _common.ES_FIELD_TYPES.BOOLEAN:
        schema = 'boolean';
        break;

      case _common.ES_FIELD_TYPES.DATE:
      case _common.ES_FIELD_TYPES.DATE_NANOS:
        schema = 'datetime';
        break;

      case _common.ES_FIELD_TYPES.BYTE:
      case _common.ES_FIELD_TYPES.DOUBLE:
      case _common.ES_FIELD_TYPES.FLOAT:
      case _common.ES_FIELD_TYPES.HALF_FLOAT:
      case _common.ES_FIELD_TYPES.INTEGER:
      case _common.ES_FIELD_TYPES.LONG:
      case _common.ES_FIELD_TYPES.SCALED_FLOAT:
      case _common.ES_FIELD_TYPES.SHORT:
        schema = 'numeric';
        break;
      // keep schema undefined for text based columns

      case _common.ES_FIELD_TYPES.KEYWORD:
      case _common.ES_FIELD_TYPES.TEXT:
        break;
    }

    return {
      id: id,
      schema: schema
    };
  });
  var onChangeItemsPerPage = (0, _react.useCallback)(function (pageSize) {
    setPagination(function (p) {
      var pageIndex = Math.floor(p.pageSize * p.pageIndex / pageSize);
      return {
        pageIndex: pageIndex,
        pageSize: pageSize
      };
    });
  }, [setPagination]);
  var onChangePage = (0, _react.useCallback)(function (pageIndex) {
    return setPagination(function (p) {
      return _objectSpread({}, p, {
        pageIndex: pageIndex
      });
    });
  }, [setPagination]); // Sorting config

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      sortingColumns = _useState6[0],
      setSortingColumns = _useState6[1];

  var onSort = (0, _react.useCallback)(function (sc) {
    return setSortingColumns(sc);
  }, [setSortingColumns]);

  if (sortingColumns.length > 0) {
    data.sort((0, _common4.multiColumnSortFactory)(sortingColumns));
  }

  var pageData = data.slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize);
  var renderCellValue = (0, _react.useMemo)(function () {
    return function (_ref4) {
      var rowIndex = _ref4.rowIndex,
          columnId = _ref4.columnId,
          setCellProps = _ref4.setCellProps;
      var adjustedRowIndex = rowIndex - pagination.pageIndex * pagination.pageSize;
      var cellValue = pageData.hasOwnProperty(adjustedRowIndex) ? (0, _object_utils.getNestedProperty)(pageData[adjustedRowIndex], columnId, null) : null;

      if (_typeof(cellValue) === 'object' && cellValue !== null) {
        return JSON.stringify(cellValue);
      }

      if (cellValue === undefined || cellValue === null) {
        return null;
      }

      if ([_common.ES_FIELD_TYPES.DATE, _common.ES_FIELD_TYPES.DATE_NANOS].includes(previewMappings.properties[columnId].type)) {
        return (0, _date_utils.formatHumanReadableDateTimeSeconds)((0, _momentTimezone.default)(cellValue).unix() * 1000);
      }

      if (previewMappings.properties[columnId].type === _common.ES_FIELD_TYPES.BOOLEAN) {
        return cellValue ? 'true' : 'false';
      }

      return cellValue;
    };
  }, [pageData, pagination.pageIndex, pagination.pageSize, previewMappings.properties]);

  if (status === _use_pivot_preview_data.PIVOT_PREVIEW_STATUS.ERROR) {
    return _react.default.createElement("div", {
      "data-test-subj": "transformPivotPreview error"
    }, _react.default.createElement(PreviewTitle, {
      previewRequest: previewRequest
    }), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.transform.pivotPreview.PivotPreviewError', {
        defaultMessage: 'An error occurred loading the pivot preview.'
      }),
      color: "danger",
      iconType: "cross"
    }, _react.default.createElement(ErrorMessage, {
      message: errorMessage
    })));
  }

  if (data.length === 0) {
    var noDataMessage = _i18n.i18n.translate('xpack.transform.pivotPreview.PivotPreviewNoDataCalloutBody', {
      defaultMessage: 'The preview request did not return any data. Please ensure the optional query returns data and that values exist for the field used by group-by and aggregation fields.'
    });

    var aggsArr = (0, _common2.dictionaryToArray)(aggs);

    if (aggsArr.length === 0 || groupByArr.length === 0) {
      noDataMessage = _i18n.i18n.translate('xpack.transform.pivotPreview.PivotPreviewIncompleteConfigCalloutBody', {
        defaultMessage: 'Please choose at least one group-by field and aggregation.'
      });
    }

    return _react.default.createElement("div", {
      "data-test-subj": "transformPivotPreview empty"
    }, _react.default.createElement(PreviewTitle, {
      previewRequest: previewRequest
    }), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.transform.pivotPreview.PivotPreviewNoDataCalloutTitle', {
        defaultMessage: 'Pivot preview not available'
      }),
      color: "primary"
    }, _react.default.createElement("p", null, noDataMessage)));
  }

  if (columnKeys.length === 0) {
    return null;
  }

  return _react.default.createElement("div", {
    "data-test-subj": "transformPivotPreview loaded"
  }, showHeader && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(PreviewTitle, {
    previewRequest: previewRequest
  }), _react.default.createElement("div", {
    className: "transform__progress"
  }, status === _use_pivot_preview_data.PIVOT_PREVIEW_STATUS.LOADING && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent"
  }), status !== _use_pivot_preview_data.PIVOT_PREVIEW_STATUS.LOADING && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    max: 1,
    value: 0
  }))), dataGridColumns.length > 0 && data.length > 0 && _react.default.createElement(_eui.EuiDataGrid, {
    "aria-label": "Source index preview",
    columns: dataGridColumns,
    columnVisibility: {
      visibleColumns: visibleColumns,
      setVisibleColumns: setVisibleColumns
    },
    gridStyle: _common3.euiDataGridStyle,
    rowCount: data.length,
    renderCellValue: renderCellValue,
    sorting: {
      columns: sortingColumns,
      onSort: onSort
    },
    toolbarVisibility: _common3.euiDataGridToolbarSettings,
    pagination: _objectSpread({}, pagination, {
      pageSizeOptions: [5, 10, 25],
      onChangeItemsPerPage: onChangeItemsPerPage,
      onChangePage: onChangePage
    })
  }));
});

exports.PivotPreview = PivotPreview;