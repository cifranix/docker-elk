"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExplorationDataGrid = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../common");

var _field_format_service = require("../../../../../services/field_format_service");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var FEATURE_INFLUENCE = 'feature_influence';
var PAGE_SIZE_OPTIONS = [5, 10, 25, 50];

var ExplorationDataGrid = function ExplorationDataGrid(_ref) {
  var colorRange = _ref.colorRange,
      columns = _ref.columns,
      indexPattern = _ref.indexPattern,
      pagination = _ref.pagination,
      resultsField = _ref.resultsField,
      rowCount = _ref.rowCount,
      selectedFields = _ref.selectedFields,
      setPagination = _ref.setPagination,
      setSelectedFields = _ref.setSelectedFields,
      setSortingColumns = _ref.setSortingColumns,
      sortingColumns = _ref.sortingColumns,
      tableItems = _ref.tableItems;
  var renderCellValue = (0, _react.useMemo)(function () {
    return function (_ref2) {
      var rowIndex = _ref2.rowIndex,
          columnId = _ref2.columnId,
          setCellProps = _ref2.setCellProps;
      var adjustedRowIndex = rowIndex - pagination.pageIndex * pagination.pageSize;
      var fullItem = tableItems[adjustedRowIndex];

      if (fullItem === undefined) {
        return null;
      }

      var format;

      if (indexPattern !== undefined) {
        format = _field_format_service.mlFieldFormatService.getFieldFormatFromIndexPattern(indexPattern, columnId, '');
      }

      var cellValue = fullItem.hasOwnProperty(columnId) && fullItem[columnId] !== undefined ? fullItem[columnId] : null;
      var split = columnId.split('.');
      var backgroundColor; // column with feature values get color coded by its corresponding influencer value

      if (fullItem["".concat(resultsField, ".").concat(FEATURE_INFLUENCE, ".").concat(columnId)] !== undefined) {
        backgroundColor = colorRange(fullItem["".concat(resultsField, ".").concat(FEATURE_INFLUENCE, ".").concat(columnId)]);
      } // column with influencer values get color coded by its own value


      if (split.length > 2 && split[0] === resultsField && split[1] === FEATURE_INFLUENCE) {
        backgroundColor = colorRange(cellValue);
      }

      if (backgroundColor !== undefined) {
        setCellProps({
          style: {
            backgroundColor: backgroundColor
          }
        });
      }

      if (format !== undefined) {
        return format.convert(cellValue, 'text');
      }

      if (typeof cellValue === 'string' || cellValue === null) {
        return cellValue;
      }

      if (typeof cellValue === 'boolean') {
        return cellValue ? 'true' : 'false';
      }

      if (_typeof(cellValue) === 'object' && cellValue !== null) {
        return JSON.stringify(cellValue);
      }

      return cellValue;
    };
  }, [resultsField, rowCount, tableItems, pagination.pageIndex, pagination.pageSize]);
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
  var onSort = (0, _react.useCallback)(function (sc) {
    return setSortingColumns(sc);
  }, [setSortingColumns]);
  return _react.default.createElement(_eui.EuiDataGrid, {
    "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analytics.exploration.dataGridAriaLabel', {
      defaultMessage: 'Outlier detection results table'
    }),
    columns: columns,
    columnVisibility: {
      visibleColumns: selectedFields,
      setVisibleColumns: setSelectedFields
    },
    gridStyle: _common.euiDataGridStyle,
    rowCount: rowCount,
    renderCellValue: renderCellValue,
    sorting: {
      columns: sortingColumns,
      onSort: onSort
    },
    toolbarVisibility: _common.euiDataGridToolbarSettings,
    pagination: _objectSpread({}, pagination, {
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      onChangeItemsPerPage: onChangeItemsPerPage,
      onChangePage: onChangePage
    })
  });
};

exports.ExplorationDataGrid = ExplorationDataGrid;