"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exampleMessageColumnConfigurations = exports.CategoryExampleMessage = exports.exampleTimestampFormat = exports.exampleMessageScale = void 0;

var _react = _interopRequireWildcard(require("react"));

var _log_analysis = require("../../../../../../common/log_analysis");

var _log_text_stream = require("../../../../../components/logging/log_text_stream");

var _columnWidths;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var exampleMessageScale = 'medium';
exports.exampleMessageScale = exampleMessageScale;
var exampleTimestampFormat = 'dateTime';
exports.exampleTimestampFormat = exampleTimestampFormat;

var CategoryExampleMessage = function CategoryExampleMessage(_ref) {
  var dataset = _ref.dataset,
      message = _ref.message,
      timestamp = _ref.timestamp;
  // the dataset must be encoded for the field column and the empty value must
  // be turned into a user-friendly value
  var encodedDatasetFieldValue = (0, _react.useMemo)(function () {
    return JSON.stringify((0, _log_analysis.getFriendlyNameForPartitionId)(dataset));
  }, [dataset]);
  return _react.default.createElement(_log_text_stream.LogEntryRowWrapper, {
    scale: exampleMessageScale
  }, _react.default.createElement(_log_text_stream.LogEntryColumn, columnWidths[timestampColumnId], _react.default.createElement(_log_text_stream.LogEntryTimestampColumn, {
    format: exampleTimestampFormat,
    isHighlighted: false,
    isHovered: false,
    time: timestamp
  })), _react.default.createElement(_log_text_stream.LogEntryColumn, columnWidths[messageColumnId], _react.default.createElement(_log_text_stream.LogEntryMessageColumn, {
    columnValue: {
      columnId: messageColumnId,
      message: [{
        field: 'message',
        value: message,
        highlights: []
      }]
    },
    highlights: noHighlights,
    isHovered: false,
    isHighlighted: false,
    isActiveHighlight: false,
    wrapMode: "none"
  })), _react.default.createElement(_log_text_stream.LogEntryColumn, columnWidths[datasetColumnId], _react.default.createElement(_log_text_stream.LogEntryFieldColumn, {
    columnValue: {
      columnId: datasetColumnId,
      field: 'event.dataset',
      value: encodedDatasetFieldValue,
      highlights: []
    },
    highlights: noHighlights,
    isHovered: false,
    isHighlighted: false,
    isActiveHighlight: false,
    wrapMode: "none"
  })));
};

exports.CategoryExampleMessage = CategoryExampleMessage;
var noHighlights = [];
var timestampColumnId = 'category-example-timestamp-column';
var messageColumnId = 'category-examples-message-column';
var datasetColumnId = 'category-examples-dataset-column';
var columnWidths = (_columnWidths = {}, _defineProperty(_columnWidths, timestampColumnId, {
  growWeight: 0,
  shrinkWeight: 0,
  // w_count + w_trend - w_padding = 120 px + 220 px - 8 px
  baseWidth: '332px'
}), _defineProperty(_columnWidths, messageColumnId, {
  growWeight: 1,
  shrinkWeight: 0,
  baseWidth: '0%'
}), _defineProperty(_columnWidths, datasetColumnId, {
  growWeight: 0,
  shrinkWeight: 0,
  // w_dataset + w_max_anomaly + w_expand - w_padding = 200 px + 160 px + 40 px + 40 px - 8 px
  baseWidth: '432px'
}), _columnWidths);
var exampleMessageColumnConfigurations = [{
  timestampColumn: {
    id: timestampColumnId
  }
}, {
  messageColumn: {
    id: messageColumnId
  }
}, {
  fieldColumn: {
    field: 'event.dataset',
    id: datasetColumnId
  }
}];
exports.exampleMessageColumnConfigurations = exampleMessageColumnConfigurations;