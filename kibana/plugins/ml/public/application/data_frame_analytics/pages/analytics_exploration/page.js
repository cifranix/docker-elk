"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Page = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _navigation_menu = require("../../../components/navigation_menu");

var _outlier_exploration = require("./components/outlier_exploration");

var _regression_exploration = require("./components/regression_exploration");

var _classification_exploration = require("./components/classification_exploration");

var _analytics = require("../../common/analytics");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var Page = function Page(_ref) {
  var jobId = _ref.jobId,
      analysisType = _ref.analysisType;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_navigation_menu.NavigationMenu, {
    tabId: "data_frame_analytics"
  }), _react.default.createElement(_eui.EuiPage, {
    "data-test-subj": "mlPageDataFrameAnalyticsExploration"
  }, _react.default.createElement(_eui.EuiPageBody, {
    style: {
      maxWidth: 'calc(100% - 0px)'
    }
  }, _react.default.createElement(_eui.EuiPageContentHeader, null, _react.default.createElement(_eui.EuiPageContentHeaderSection, null, _react.default.createElement(_eui.EuiTitle, null, _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.ml.dataframe.analytics.exploration.title",
    defaultMessage: "Analytics exploration"
  }), _react.default.createElement("span", null, "\xA0"), _react.default.createElement(_eui.EuiBetaBadge, {
    label: _i18n.i18n.translate('xpack.ml.dataframe.analytics.exploration.experimentalBadgeLabel', {
      defaultMessage: 'Experimental'
    }),
    tooltipContent: _i18n.i18n.translate('xpack.ml.dataframe.analytics.exploration.experimentalBadgeTooltipContent', {
      defaultMessage: "Data frame analytics are an experimental feature. We'd love to hear your feedback."
    })
  }))))), _react.default.createElement(_eui.EuiPageContentBody, {
    style: {
      maxWidth: 'calc(100% - 0px)'
    }
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "l"
  }), analysisType === _analytics.ANALYSIS_CONFIG_TYPE.OUTLIER_DETECTION && _react.default.createElement(_outlier_exploration.OutlierExploration, {
    jobId: jobId
  }), analysisType === _analytics.ANALYSIS_CONFIG_TYPE.REGRESSION && _react.default.createElement(_regression_exploration.RegressionExploration, {
    jobId: jobId
  }), analysisType === _analytics.ANALYSIS_CONFIG_TYPE.CLASSIFICATION && _react.default.createElement(_classification_exploration.ClassificationExploration, {
    jobId: jobId
  })))));
};

exports.Page = Page;