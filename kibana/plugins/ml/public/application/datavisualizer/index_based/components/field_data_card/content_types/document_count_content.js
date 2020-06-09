"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocumentCountContent = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _document_count_chart = require("../document_count_chart");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CHART_WIDTH = 325;
var CHART_HEIGHT = 350;

var DocumentCountContent = function DocumentCountContent(_ref) {
  var config = _ref.config;
  var stats = config.stats;
  var documentCounts = stats.documentCounts,
      timeRangeEarliest = stats.timeRangeEarliest,
      timeRangeLatest = stats.timeRangeLatest;
  var chartPoints = [];

  if (documentCounts !== undefined && documentCounts.buckets !== undefined) {
    var buckets = stats.documentCounts.buckets;
    chartPoints = Object.entries(buckets).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          time = _ref3[0],
          value = _ref3[1];

      return {
        time: +time,
        value: value
      };
    });
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    gutterSize: "s"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_document_count_chart.DocumentCountChart, {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
    chartPoints: chartPoints,
    timeRangeEarliest: timeRangeEarliest,
    timeRangeLatest: timeRangeLatest
  }))), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceAround",
    gutterSize: "xs"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiText, {
    size: "xs"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.fieldDataCard.cardDocumentCount.calculatedOverAllDocumentsLabel",
    defaultMessage: "Calculated over all documents"
  })))));
};

exports.DocumentCountContent = DocumentCountContent;