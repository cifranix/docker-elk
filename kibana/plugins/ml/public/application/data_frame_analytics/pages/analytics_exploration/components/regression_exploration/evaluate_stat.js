"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvaluateStat = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var meanSquaredErrorText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.meanSquaredErrorText', {
  defaultMessage: 'Mean squared error'
});

var rSquaredText = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.rSquaredText', {
  defaultMessage: 'R squared'
});

var meanSquaredErrorTooltipContent = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.meanSquaredErrorTooltipContent', {
  defaultMessage: 'Measures how well the regression analysis model is performing. Mean squared sum of the difference between true and predicted values.'
});

var rSquaredTooltipContent = _i18n.i18n.translate('xpack.ml.dataframe.analytics.regressionExploration.rSquaredTooltipContent', {
  defaultMessage: 'Represents the goodness of fit. Measures how well the observed outcomes are replicated by the model.'
});

var EvaluateStat = function EvaluateStat(_ref) {
  var isLoading = _ref.isLoading,
      isMSE = _ref.isMSE,
      title = _ref.title,
      dataTestSubj = _ref.dataTestSubj;
  return _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "xs",
    "data-test-subj": dataTestSubj
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiStat, {
    reverse: true,
    isLoading: isLoading,
    title: title,
    description: isMSE ? meanSquaredErrorText : rSquaredText,
    titleSize: "xxs"
  })), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIconTip, {
    anchorClassName: "mlDataFrameAnalyticsRegression__evaluateStat",
    content: isMSE ? meanSquaredErrorTooltipContent : rSquaredTooltipContent
  })));
};

exports.EvaluateStat = EvaluateStat;