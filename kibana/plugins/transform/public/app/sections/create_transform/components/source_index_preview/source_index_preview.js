"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SourceIndexPreview = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../../../../src/plugins/data/common");

var _date_utils = require("../../../../../../common/utils/date_utils");

var _object_utils = require("../../../../../../common/utils/object_utils");

var _common2 = require("../../../../common");

var _app_dependencies = require("../../../../app_dependencies");

var _common3 = require("./common");

var _use_source_index_data = require("./use_source_index_data");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var SourceIndexPreviewTitle = function SourceIndexPreviewTitle(_ref) {
  var indexPatternTitle = _ref.indexPatternTitle;
  return _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("span", null, _i18n.i18n.translate('xpack.transform.sourceIndexPreview.sourceIndexPatternTitle', {
    defaultMessage: 'Source index {indexPatternTitle}',
    values: {
      indexPatternTitle: indexPatternTitle
    }
  })));
};

var SourceIndexPreview = _react.default.memo(function (_ref2) {
  var indexPattern = _ref2.indexPattern,
      query = _ref2.query;
  var toastNotifications = (0, _app_dependencies.useToastNotifications)();
  var allFields = indexPattern.fields.map(function (f) {
    return f.name;
  });
  var indexPatternFields = allFields.filter(function (f) {
    if (indexPattern.metaFields.includes(f)) {
      return false;
    }

    var fieldParts = f.split('.');
    var lastPart = fieldParts.pop();

    if (lastPart === 'keyword' && allFields.includes(fieldParts.join('.'))) {
      return false;
    }

    return true;
  }); // Column visibility

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      visibleColumns = _useState2[0],
      setVisibleColumns = _useState2[1];

  (0, _react.useEffect)(function () {
    setVisibleColumns(indexPatternFields.splice(0, _common2.INIT_MAX_COLUMNS)); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexPatternFields.join()]);

  var _useSourceIndexData = (0, _use_source_index_data.useSourceIndexData)(indexPattern, query),
      errorMessage = _useSourceIndexData.errorMessage,
      pagination = _useSourceIndexData.pagination,
      setPagination = _useSourceIndexData.setPagination,
      setSortingColumns = _useSourceIndexData.setSortingColumns,
      rowCount = _useSourceIndexData.rowCount,
      sortingColumns = _useSourceIndexData.sortingColumns,
      status = _useSourceIndexData.status,
      data = _useSourceIndexData.tableItems; // EuiDataGrid State


  var dataGridColumns = _toConsumableArray(indexPatternFields.map(function (id) {
    var field = indexPattern.fields.getByName(id); // Built-in values are ['boolean', 'currency', 'datetime', 'numeric', 'json']
    // To fall back to the default string schema it needs to be undefined.

    var schema;

    switch (field === null || field === void 0 ? void 0 : field.type) {
      case _common.KBN_FIELD_TYPES.BOOLEAN:
        schema = 'boolean';
        break;

      case _common.KBN_FIELD_TYPES.DATE:
        schema = 'datetime';
        break;

      case _common.KBN_FIELD_TYPES.GEO_POINT:
      case _common.KBN_FIELD_TYPES.GEO_SHAPE:
        schema = 'json';
        break;

      case _common.KBN_FIELD_TYPES.NUMBER:
        schema = 'numeric';
        break;
    }

    return {
      id: id,
      schema: schema
    };
  }));

  var onSort = (0, _react.useCallback)(function (sc) {
    // Check if an unsupported column type for sorting was selected.
    var invalidSortingColumnns = sc.reduce(function (arr, current) {
      var columnType = dataGridColumns.find(function (dgc) {
        return dgc.id === current.id;
      });

      if ((columnType === null || columnType === void 0 ? void 0 : columnType.schema) === 'json') {
        arr.push(current.id);
      }

      return arr;
    }, []);

    if (invalidSortingColumnns.length === 0) {
      setSortingColumns(sc);
    } else {
      invalidSortingColumnns.forEach(function (columnId) {
        toastNotifications.addDanger(_i18n.i18n.translate('xpack.transform.sourceIndexPreview.invalidSortingColumnError', {
          defaultMessage: "The column '{columnId}' cannot be used for sorting.",
          values: {
            columnId: columnId
          }
        }));
      });
    }
  }, [dataGridColumns, setSortingColumns, toastNotifications]);
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
  }, [setPagination]);
  var renderCellValue = (0, _react.useMemo)(function () {
    return function (_ref3) {
      var rowIndex = _ref3.rowIndex,
          columnId = _ref3.columnId,
          setCellProps = _ref3.setCellProps;
      var adjustedRowIndex = rowIndex - pagination.pageIndex * pagination.pageSize;
      var cellValue = data.hasOwnProperty(adjustedRowIndex) ? (0, _object_utils.getNestedProperty)(data[adjustedRowIndex], columnId, null) : null;

      if (_typeof(cellValue) === 'object' && cellValue !== null) {
        return JSON.stringify(cellValue);
      }

      if (cellValue === undefined || cellValue === null) {
        return null;
      }

      var field = indexPattern.fields.getByName(columnId);

      if ((field === null || field === void 0 ? void 0 : field.type) === _common.KBN_FIELD_TYPES.DATE) {
        return (0, _date_utils.formatHumanReadableDateTimeSeconds)((0, _momentTimezone.default)(cellValue).unix() * 1000);
      }

      if ((field === null || field === void 0 ? void 0 : field.type) === _common.KBN_FIELD_TYPES.BOOLEAN) {
        return cellValue ? 'true' : 'false';
      }

      return cellValue;
    };
  }, [data, indexPattern.fields, pagination.pageIndex, pagination.pageSize]);

  if (status === _use_source_index_data.SOURCE_INDEX_STATUS.LOADED && data.length === 0) {
    return _react.default.createElement("div", {
      "data-test-subj": "transformSourceIndexPreview empty"
    }, _react.default.createElement(SourceIndexPreviewTitle, {
      indexPatternTitle: indexPattern.title
    }), _react.default.createElement(_eui.EuiCallOut, {
      title: _i18n.i18n.translate('xpack.transform.sourceIndexPreview.SourceIndexNoDataCalloutTitle', {
        defaultMessage: 'Empty source index query result.'
      }),
      color: "primary"
    }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.transform.sourceIndexPreview.SourceIndexNoDataCalloutBody', {
      defaultMessage: 'The query for the source index returned no results. Please make sure you have sufficient permissions, the index contains documents and your query is not too restrictive.'
    }))));
  }

  var euiCopyText = _i18n.i18n.translate('xpack.transform.sourceIndexPreview.copyClipboardTooltip', {
    defaultMessage: 'Copy Dev Console statement of the source index preview to the clipboard.'
  });

  return _react.default.createElement("div", {
    "data-test-subj": "transformSourceIndexPreview ".concat(status === _use_source_index_data.SOURCE_INDEX_STATUS.ERROR ? 'error' : 'loaded')
  }, _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(SourceIndexPreviewTitle, {
    indexPatternTitle: indexPattern.title
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiCopy, {
    beforeMessage: euiCopyText,
    textToCopy: (0, _common3.getSourceIndexDevConsoleStatement)(query, indexPattern.title)
  }, function (copy) {
    return _react.default.createElement(_eui.EuiButtonIcon, {
      onClick: copy,
      iconType: "copyClipboard",
      "aria-label": euiCopyText
    });
  }))), _react.default.createElement("div", {
    className: "transform__progress"
  }, status === _use_source_index_data.SOURCE_INDEX_STATUS.LOADING && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent"
  }), status !== _use_source_index_data.SOURCE_INDEX_STATUS.LOADING && _react.default.createElement(_eui.EuiProgress, {
    size: "xs",
    color: "accent",
    max: 1,
    value: 0
  })), status === _use_source_index_data.SOURCE_INDEX_STATUS.ERROR && _react.default.createElement("div", {
    "data-test-subj": "transformSourceIndexPreview error"
  }, _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.transform.sourceIndexPreview.sourceIndexPatternError', {
      defaultMessage: 'An error occurred loading the source index data.'
    }),
    color: "danger",
    iconType: "cross"
  }, _react.default.createElement(_eui.EuiCodeBlock, {
    language: "json",
    fontSize: "s",
    paddingSize: "s",
    isCopyable: true
  }, errorMessage)), _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  })), _react.default.createElement(_eui.EuiDataGrid, {
    "aria-label": "Source index preview",
    columns: dataGridColumns,
    columnVisibility: {
      visibleColumns: visibleColumns,
      setVisibleColumns: setVisibleColumns
    },
    gridStyle: _common2.euiDataGridStyle,
    rowCount: rowCount,
    renderCellValue: renderCellValue,
    sorting: {
      columns: sortingColumns,
      onSort: onSort
    },
    toolbarVisibility: _common2.euiDataGridToolbarSettings,
    pagination: _objectSpread({}, pagination, {
      pageSizeOptions: [5, 10, 25],
      onChangeItemsPerPage: onChangeItemsPerPage,
      onChangePage: onChangePage
    })
  }));
});

exports.SourceIndexPreview = SourceIndexPreview;