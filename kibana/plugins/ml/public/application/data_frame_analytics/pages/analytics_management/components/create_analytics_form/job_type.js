"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JobType = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JobType = function JobType(_ref) {
  var _helpText;

  var type = _ref.type,
      setFormState = _ref.setFormState;

  var outlierHelpText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.outlierDetectionHelpText', {
    defaultMessage: 'Outlier detection jobs require a source index that is mapped as a table-like data structure and analyze only numeric and boolean fields. Use the advanced editor to add custom options to the configuration.'
  });

  var regressionHelpText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.outlierRegressionHelpText', {
    defaultMessage: 'Regression jobs analyze only numeric fields. Use the advanced editor to apply custom options, such as the prediction field name.'
  });

  var classificationHelpText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.classificationHelpText', {
    defaultMessage: 'Classification jobs require a source index that is mapped as a table-like data structure and support fields that are numeric, boolean, text, keyword, or ip. Use the advanced editor to apply custom options, such as the prediction field name.'
  });

  var helpText = (_helpText = {}, _defineProperty(_helpText, _common.ANALYSIS_CONFIG_TYPE.REGRESSION, regressionHelpText), _defineProperty(_helpText, _common.ANALYSIS_CONFIG_TYPE.OUTLIER_DETECTION, outlierHelpText), _defineProperty(_helpText, _common.ANALYSIS_CONFIG_TYPE.CLASSIFICATION, classificationHelpText), _helpText);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.create.jobTypeLabel', {
      defaultMessage: 'Job type'
    }),
    helpText: type !== undefined ? helpText[type] : ''
  }, _react.default.createElement(_eui.EuiSelect, {
    options: Object.values(_common.ANALYSIS_CONFIG_TYPE).map(function (jobType) {
      return {
        value: jobType,
        text: jobType.replace(/_/g, ' ')
      };
    }),
    value: type,
    hasNoInitialSelection: true,
    onChange: function onChange(e) {
      var value = e.target.value;
      setFormState({
        previousJobType: type,
        jobType: value,
        excludes: []
      });
    },
    "data-test-subj": "mlAnalyticsCreateJobFlyoutJobTypeSelect"
  })));
};

exports.JobType = JobType;