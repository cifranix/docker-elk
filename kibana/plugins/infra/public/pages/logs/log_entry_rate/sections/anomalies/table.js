"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnomaliesTable = void 0;

var _eui = require("@elastic/eui");

var _services = require("@elastic/eui/lib/services");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _reactUse = require("react-use");

var _public = require("../../../../../../../observability/public");

var _log_analysis = require("../../../../../../common/log_analysis");

var _basic_table = require("../../../../../components/basic_table");

var _expanded_row = require("./expanded_row");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & .euiTable {\n    table-layout: auto;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

var partitionColumnName = _i18n.i18n.translate('xpack.infra.logs.analysis.anomaliesTablePartitionColumnName', {
  defaultMessage: 'Partition'
});

var maxAnomalyScoreColumnName = _i18n.i18n.translate('xpack.infra.logs.analysis.anomaliesTableMaxAnomalyScoreColumnName', {
  defaultMessage: 'Max anomaly score'
});

var AnomaliesTable = function AnomaliesTable(_ref) {
  var results = _ref.results,
      timeRange = _ref.timeRange,
      setTimeRange = _ref.setTimeRange,
      jobId = _ref.jobId;
  var tableItems = (0, _react.useMemo)(function () {
    return Object.entries(results.partitionBuckets).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      return {
        // The real ID
        partitionId: key,
        // Note: EUI's table expanded rows won't work with a key of '' in itemIdToExpandedRowMap, so we have to use the friendly name here
        partitionName: (0, _log_analysis.getFriendlyNameForPartitionId)(key),
        topAnomalyScore: (0, _log_analysis.formatAnomalyScore)(value.topAnomalyScore)
      };
    });
  }, [results]);

  var _useSet = (0, _reactUse.useSet)(new Set()),
      _useSet2 = _slicedToArray(_useSet, 2),
      expandedDatasetIds = _useSet2[0],
      _useSet2$ = _useSet2[1],
      expandDataset = _useSet2$.add,
      collapseDataset = _useSet2$.remove;

  var expandedDatasetRowContents = (0, _react.useMemo)(function () {
    return _toConsumableArray(expandedDatasetIds).reduce(function (aggregatedDatasetRows, datasetId) {
      return _objectSpread({}, aggregatedDatasetRows, _defineProperty({}, (0, _log_analysis.getFriendlyNameForPartitionId)(datasetId), _react.default.createElement(_expanded_row.AnomaliesTableExpandedRow, {
        partitionId: datasetId,
        results: results,
        setTimeRange: setTimeRange,
        timeRange: timeRange,
        jobId: jobId
      })));
    }, {});
  }, [expandedDatasetIds, jobId, results, setTimeRange, timeRange]);

  var _useState = (0, _react.useState)({
    sort: {
      field: 'topAnomalyScore',
      direction: 'desc'
    }
  }),
      _useState2 = _slicedToArray(_useState, 2),
      sorting = _useState2[0],
      setSorting = _useState2[1];

  var handleTableChange = (0, _react.useCallback)(function (_ref4) {
    var _ref4$sort = _ref4.sort,
        sort = _ref4$sort === void 0 ? {} : _ref4$sort;
    var field = sort.field,
        direction = sort.direction;
    setSorting({
      sort: {
        field: field,
        direction: direction
      }
    });
  }, [setSorting]);
  var sortedTableItems = (0, _react.useMemo)(function () {
    var sortedItems = [];

    if (sorting.sort.field === 'partitionName') {
      sortedItems = tableItems.sort(function (a, b) {
        return a.partitionId > b.partitionId ? 1 : -1;
      });
    } else if (sorting.sort.field === 'topAnomalyScore') {
      sortedItems = tableItems.sort(function (a, b) {
        return a.topAnomalyScore - b.topAnomalyScore;
      });
    }

    return sorting.sort.direction === 'asc' ? sortedItems : sortedItems.reverse();
  }, [tableItems, sorting]);
  var columns = (0, _react.useMemo)(function () {
    return [{
      field: 'partitionName',
      name: partitionColumnName,
      sortable: true,
      truncateText: true
    }, {
      field: 'topAnomalyScore',
      name: maxAnomalyScoreColumnName,
      sortable: true,
      truncateText: true,
      dataType: 'number'
    }, {
      align: _services.RIGHT_ALIGNMENT,
      width: '40px',
      isExpander: true,
      render: function render(item) {
        return _react.default.createElement(_basic_table.RowExpansionButton, {
          isExpanded: expandedDatasetIds.has(item.partitionId),
          item: item.partitionId,
          onExpand: expandDataset,
          onCollapse: collapseDataset
        });
      }
    }];
  }, [collapseDataset, expandDataset, expandedDatasetIds]);
  return _react.default.createElement(StyledEuiBasicTable, {
    items: sortedTableItems,
    itemId: "partitionName",
    itemIdToExpandedRowMap: expandedDatasetRowContents,
    isExpandable: true,
    hasActions: true,
    columns: columns,
    sorting: sorting,
    onChange: handleTableChange
  });
};

exports.AnomaliesTable = AnomaliesTable;
var StyledEuiBasicTable = (0, _public.euiStyled)(_eui.EuiBasicTable)(_templateObject()); // eslint-disable-line @typescript-eslint/no-explicit-any