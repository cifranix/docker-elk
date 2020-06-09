"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CategoryDetailsRow = void 0;

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../../../observability/public");

var _use_log_entry_category_examples = require("../../use_log_entry_category_examples");

var _category_example_message = require("./category_example_message");

var _category_example_messages_empty_indicator = require("./category_example_messages_empty_indicator");

var _category_example_messages_failure_indicator = require("./category_example_messages_failure_indicator");

var _category_example_messages_loading_indicator = require("./category_example_messages_loading_indicator");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  align-items: stretch;\n  flex-direction: column;\n  flex: 1 0 0%;\n  overflow: hidden;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var exampleCount = 5;

var CategoryDetailsRow = function CategoryDetailsRow(_ref) {
  var categoryId = _ref.categoryId,
      timeRange = _ref.timeRange,
      sourceId = _ref.sourceId;

  var _useLogEntryCategoryE = (0, _use_log_entry_category_examples.useLogEntryCategoryExamples)({
    categoryId: categoryId,
    endTime: timeRange.endTime,
    exampleCount: exampleCount,
    sourceId: sourceId,
    startTime: timeRange.startTime
  }),
      getLogEntryCategoryExamples = _useLogEntryCategoryE.getLogEntryCategoryExamples,
      hasFailedLoadingLogEntryCategoryExamples = _useLogEntryCategoryE.hasFailedLoadingLogEntryCategoryExamples,
      isLoadingLogEntryCategoryExamples = _useLogEntryCategoryE.isLoadingLogEntryCategoryExamples,
      logEntryCategoryExamples = _useLogEntryCategoryE.logEntryCategoryExamples;

  (0, _react.useEffect)(function () {
    getLogEntryCategoryExamples();
  }, [getLogEntryCategoryExamples]);
  return _react.default.createElement(CategoryExampleMessages, null, isLoadingLogEntryCategoryExamples ? _react.default.createElement(_category_example_messages_loading_indicator.CategoryExampleMessagesLoadingIndicator, {
    exampleCount: exampleCount
  }) : hasFailedLoadingLogEntryCategoryExamples ? _react.default.createElement(_category_example_messages_failure_indicator.CategoryExampleMessagesFailureIndicator, {
    onRetry: getLogEntryCategoryExamples
  }) : logEntryCategoryExamples.length === 0 ? _react.default.createElement(_category_example_messages_empty_indicator.CategoryExampleMessagesEmptyIndicator, {
    onReload: getLogEntryCategoryExamples
  }) : logEntryCategoryExamples.map(function (categoryExample, categoryExampleIndex) {
    return _react.default.createElement(_category_example_message.CategoryExampleMessage, {
      dataset: categoryExample.dataset,
      key: categoryExampleIndex,
      message: categoryExample.message,
      timestamp: categoryExample.timestamp
    });
  }));
};

exports.CategoryDetailsRow = CategoryDetailsRow;

var CategoryExampleMessages = _public.euiStyled.div(_templateObject());