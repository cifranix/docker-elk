"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TopCategoriesTable = void 0;

var _eui = require("@elastic/eui");

var _numeral = _interopRequireDefault(require("@elastic/numeral"));

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _reactUse = require("react-use");

var _public = require("../../../../../../../observability/public");

var _basic_table = require("../../../../../components/basic_table");

var _anomaly_severity_indicator_list = require("./anomaly_severity_indicator_list");

var _category_details_row = require("./category_details_row");

var _category_expression = require("./category_expression");

var _datasets_action_list = require("./datasets_action_list");

var _datasets_list = require("./datasets_list");

var _log_entry_count_sparkline = require("./log_entry_count_sparkline");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  &.euiTableRow--topAligned .euiTableRowCell {\n    vertical-align: top;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var TopCategoriesTable = (0, _public.euiStyled)(function (_ref) {
  var categorizationJobId = _ref.categorizationJobId,
      className = _ref.className,
      sourceId = _ref.sourceId,
      timeRange = _ref.timeRange,
      topCategories = _ref.topCategories;

  var _useSet = (0, _reactUse.useSet)(new Set()),
      _useSet2 = _slicedToArray(_useSet, 2),
      expandedCategories = _useSet2[0],
      _useSet2$ = _useSet2[1],
      expandCategory = _useSet2$.add,
      collapseCategory = _useSet2$.remove;

  var columns = (0, _react.useMemo)(function () {
    return createColumns(timeRange, categorizationJobId, expandedCategories, expandCategory, collapseCategory);
  }, [categorizationJobId, collapseCategory, expandCategory, expandedCategories, timeRange]);
  var expandedRowContentsById = (0, _react.useMemo)(function () {
    return _toConsumableArray(expandedCategories).reduce(function (aggregatedCategoryRows, categoryId) {
      return _objectSpread({}, aggregatedCategoryRows, _defineProperty({}, categoryId, _react.default.createElement(_category_details_row.CategoryDetailsRow, {
        categoryId: categoryId,
        sourceId: sourceId,
        timeRange: timeRange
      })));
    }, {});
  }, [expandedCategories, sourceId, timeRange]);
  return _react.default.createElement(_eui.EuiBasicTable, {
    columns: columns,
    itemIdToExpandedRowMap: expandedRowContentsById,
    itemId: "categoryId",
    items: topCategories,
    rowProps: {
      className: "".concat(className, " euiTableRow--topAligned")
    }
  });
})(_templateObject());
exports.TopCategoriesTable = TopCategoriesTable;

var createColumns = function createColumns(timeRange, categorizationJobId, expandedCategories, expandCategory, collapseCategory) {
  return [{
    align: 'right',
    field: 'logEntryCount',
    name: _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.countColumnTitle', {
      defaultMessage: 'Message count'
    }),
    render: function render(logEntryCount) {
      return (0, _numeral.default)(logEntryCount).format('0,0');
    },
    width: '120px'
  }, {
    field: 'histograms',
    name: _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.trendColumnTitle', {
      defaultMessage: 'Trend'
    }),
    render: function render(histograms, item) {
      return _react.default.createElement(_log_entry_count_sparkline.LogEntryCountSparkline, {
        currentCount: item.logEntryCount,
        histograms: histograms,
        timeRange: timeRange
      });
    },
    width: '220px'
  }, {
    field: 'regularExpression',
    name: _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.categoryColumnTitle', {
      defaultMessage: 'Category'
    }),
    truncateText: true,
    render: function render(regularExpression) {
      return _react.default.createElement(_category_expression.RegularExpressionRepresentation, {
        regularExpression: regularExpression
      });
    }
  }, {
    field: 'datasets',
    name: _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.datasetColumnTitle', {
      defaultMessage: 'Datasets'
    }),
    render: function render(datasets) {
      return _react.default.createElement(_datasets_list.DatasetsList, {
        datasets: datasets
      });
    },
    width: '200px'
  }, {
    align: 'right',
    field: 'maximumAnomalyScore',
    name: _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.maximumAnomalyScoreColumnTitle', {
      defaultMessage: 'Maximum anomaly score'
    }),
    render: function render(_maximumAnomalyScore, item) {
      return _react.default.createElement(_anomaly_severity_indicator_list.AnomalySeverityIndicatorList, {
        datasets: item.datasets
      });
    },
    width: '160px'
  }, {
    actions: [{
      render: function render(category) {
        return _react.default.createElement(_datasets_action_list.DatasetActionsList, {
          categorizationJobId: categorizationJobId,
          categoryId: category.categoryId,
          datasets: category.datasets,
          timeRange: timeRange
        });
      }
    }],
    width: '40px'
  }, {
    align: 'right',
    isExpander: true,
    render: function render(item) {
      return _react.default.createElement(_basic_table.RowExpansionButton, {
        isExpanded: expandedCategories.has(item.categoryId),
        item: item.categoryId,
        onCollapse: collapseCategory,
        onExpand: expandCategory
      });
    },
    width: '40px'
  }];
};