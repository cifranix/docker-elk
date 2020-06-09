"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActions = exports.AnalyticsViewAction = void 0;

var _react = _interopRequireDefault(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _check_privilege = require("../../../../../privilege/check_privilege");

var _analytics = require("../../../../common/analytics");

var _action_clone = require("./action_clone");

var _common = require("./common");

var _analytics_service = require("../../services/analytics_service");

var _action_start = require("./action_start");

var _action_delete = require("./action_delete");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var AnalyticsViewAction = {
  isPrimary: true,
  render: function render(item) {
    var analysisType = (0, _analytics.getAnalysisType)(item.config.analysis);
    var isDisabled = !(0, _analytics.isRegressionAnalysis)(item.config.analysis) && !(0, _analytics.isOutlierAnalysis)(item.config.analysis) && !(0, _analytics.isClassificationAnalysis)(item.config.analysis);
    var url = (0, _common.getResultsUrl)(item.id, analysisType);
    return _react.default.createElement(_eui.EuiButtonEmpty, {
      isDisabled: isDisabled,
      onClick: function onClick() {
        return window.location.href = url;
      },
      size: "xs",
      color: "text",
      iconType: "visTable",
      "aria-label": _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.viewAriaLabel', {
        defaultMessage: 'View'
      }),
      "data-test-subj": "mlAnalyticsJobViewButton"
    }, _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.viewActionName', {
      defaultMessage: 'View'
    }));
  }
};
exports.AnalyticsViewAction = AnalyticsViewAction;

var getActions = function getActions(createAnalyticsForm) {
  var canStartStopDataFrameAnalytics = (0, _check_privilege.checkPermission)('canStartStopDataFrameAnalytics');
  return [AnalyticsViewAction, {
    render: function render(item) {
      if (!(0, _common.isDataFrameAnalyticsRunning)(item.stats.state)) {
        return _react.default.createElement(_action_start.StartAction, {
          item: item
        });
      }

      var buttonStopText = _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.stopActionName', {
        defaultMessage: 'Stop'
      });

      var stopButton = _react.default.createElement(_eui.EuiButtonEmpty, {
        size: "xs",
        color: "text",
        disabled: !canStartStopDataFrameAnalytics,
        iconType: "stop",
        onClick: function onClick() {
          return (0, _analytics_service.stopAnalytics)(item);
        },
        "aria-label": buttonStopText,
        "data-test-sub": "mlAnalyticsJobStopButton"
      }, buttonStopText);

      if (!canStartStopDataFrameAnalytics) {
        return _react.default.createElement(_eui.EuiToolTip, {
          position: "top",
          content: (0, _check_privilege.createPermissionFailureMessage)('canStartStopDataFrameAnalytics')
        }, stopButton);
      }

      return stopButton;
    }
  }, {
    render: function render(item) {
      return _react.default.createElement(_action_delete.DeleteAction, {
        item: item
      });
    }
  }, {
    render: function render(item) {
      return _react.default.createElement(_action_clone.CloneAction, {
        item: item,
        createAnalyticsForm: createAnalyticsForm
      });
    }
  }];
};

exports.getActions = getActions;