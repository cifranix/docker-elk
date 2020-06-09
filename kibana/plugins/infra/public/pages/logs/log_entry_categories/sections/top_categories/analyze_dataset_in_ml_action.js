"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnalyzeCategoryDatasetInMlAction = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _log_analysis_results = require("../../../../../components/logging/log_analysis_results");

var _use_link_props = require("../../../../../hooks/use_link_props");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var AnalyzeCategoryDatasetInMlAction = function AnalyzeCategoryDatasetInMlAction(_ref) {
  var categorizationJobId = _ref.categorizationJobId,
      categoryId = _ref.categoryId,
      dataset = _ref.dataset,
      timeRange = _ref.timeRange;
  var linkProps = (0, _use_link_props.useLinkProps)((0, _log_analysis_results.getEntitySpecificSingleMetricViewerLink)(categorizationJobId, timeRange, {
    'event.dataset': dataset,
    mlcategory: "".concat(categoryId)
  }));
  return _react.default.createElement(_eui.EuiToolTip, {
    content: analyseCategoryDatasetInMlTooltipDescription,
    delay: "long"
  }, _react.default.createElement(_eui.EuiButtonIcon, _extends({
    "aria-label": analyseCategoryDatasetInMlButtonLabel,
    iconType: "machineLearningApp",
    "data-test-subj": "analyzeCategoryDatasetInMlButton"
  }, linkProps)));
};

exports.AnalyzeCategoryDatasetInMlAction = AnalyzeCategoryDatasetInMlAction;

var analyseCategoryDatasetInMlButtonLabel = _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.analyzeCategoryInMlButtonLabel', {
  defaultMessage: 'Analyze in ML'
});

var analyseCategoryDatasetInMlTooltipDescription = _i18n.i18n.translate('xpack.infra.logs.logEntryCategories.analyzeCategoryInMlTooltipDescription', {
  defaultMessage: 'Analyze this category in the ML app.'
});