"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Steps = exports.StepsUI = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _version = require("../../../../../common/version");

var _deprecation_logging_toggle = require("./deprecation_logging_toggle");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
// Leaving these here even if unused so they are picked up for i18n static analysis
// Keep this until last minor release (when next major is also released).
var WAIT_FOR_RELEASE_STEP = {
  title: _i18n.i18n.translate('xpack.upgradeAssistant.overviewTab.steps.waitForReleaseStep.stepTitle', {
    defaultMessage: 'Wait for the Elasticsearch {nextEsVersion} release',
    values: {
      nextEsVersion: "".concat(_version.NEXT_MAJOR_VERSION, ".0")
    }
  }),
  children: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
    grow: false
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.overviewTab.steps.waitForReleaseStep.stepDetail",
    defaultMessage: "Once the release is out, upgrade to the latest {currentEsMajorVersion} version, and then return here to proceed with your {nextEsMajorVersion} upgrade.",
    values: {
      currentEsMajorVersion: "".concat(_version.CURRENT_MAJOR_VERSION, ".x"),
      // use "0.x" notation to imply the last minor
      nextEsMajorVersion: "".concat(_version.NEXT_MAJOR_VERSION, ".0")
    }
  }))))
}; // Swap in this step for the one above it on the last minor release.
// @ts-ignore

var START_UPGRADE_STEP = function START_UPGRADE_STEP(isCloudEnabled) {
  return {
    title: _i18n.i18n.translate('xpack.upgradeAssistant.overviewTab.steps.startUpgradeStep.stepTitle', {
      defaultMessage: 'Start your upgrade'
    }),
    children: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
      grow: false
    }, _react.default.createElement("p", null, isCloudEnabled ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.overviewTab.steps.startUpgradeStepCloud.stepDetail.goToCloudDashboardDetail",
      defaultMessage: "Go to the Deployments section on the Elastic Cloud dashboard to start your upgrade."
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.overviewTab.steps.startUpgradeStepOnPrem.stepDetail.followInstructionsDetail",
      defaultMessage: "Follow {instructionButton} to start your upgrade.",
      values: {
        instructionButton: _react.default.createElement(_eui.EuiLink, {
          href: "https://www.elastic.co/guide/en/elasticsearch/reference/7.0/setup-upgrade.html",
          target: "_blank"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.overviewTab.steps.startUpgradeStepOnPrem.stepDetail.instructionButtonLabel",
          defaultMessage: "these instructions"
        }))
      }
    }))))
  };
};

var StepsUI = function StepsUI(_ref) {
  var checkupData = _ref.checkupData,
      setSelectedTabIndex = _ref.setSelectedTabIndex,
      intl = _ref.intl;
  var checkupDataTyped = checkupData;
  var countByType = Object.keys(checkupDataTyped).reduce(function (counts, checkupType) {
    counts[checkupType] = checkupDataTyped[checkupType].length;
    return counts;
  }, {}); // Uncomment when START_UPGRADE_STEP is in use!

  var _useAppContext = (0, _app_context.useAppContext)(),
      http = _useAppContext.http;

  return _react.default.createElement(_eui.EuiSteps, {
    className: "upgSteps",
    headingElement: "h2",
    steps: [{
      title: countByType.cluster ? intl.formatMessage({
        id: 'xpack.upgradeAssistant.overviewTab.steps.clusterStep.issuesRemainingStepTitle',
        defaultMessage: 'Check for issues with your cluster'
      }) : intl.formatMessage({
        id: 'xpack.upgradeAssistant.overviewTab.steps.clusterStep.noIssuesRemainingStepTitle',
        defaultMessage: 'Your cluster settings are ready'
      }),
      status: countByType.cluster ? 'warning' : 'complete',
      children: _react.default.createElement(_eui.EuiText, null, countByType.cluster ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.todo.todoDetail",
        defaultMessage: "Go to the {clusterTabButton} to update the deprecated settings.",
        values: {
          clusterTabButton: _react.default.createElement(_eui.EuiLink, {
            onClick: function onClick() {
              return setSelectedTabIndex(1);
            }
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.todo.clusterTabButtonLabel",
            defaultMessage: "Cluster tab"
          }))
        }
      })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.remainingIssuesDetail",
        defaultMessage: "{numIssues} issues must be resolved.",
        values: {
          numIssues: _react.default.createElement(_eui.EuiNotificationBadge, null, countByType.cluster)
        }
      }))) : _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.overviewTab.steps.clusterStep.noRemainingIssuesLabel",
        defaultMessage: "No remaining deprecated settings."
      })))
    }, {
      title: countByType.indices ? intl.formatMessage({
        id: 'xpack.upgradeAssistant.overviewTab.steps.indicesStep.issuesRemainingStepTitle',
        defaultMessage: 'Check for issues with your indices'
      }) : intl.formatMessage({
        id: 'xpack.upgradeAssistant.overviewTab.steps.indicesStep.noIssuesRemainingStepTitle',
        defaultMessage: 'Your index settings are ready'
      }),
      status: countByType.indices ? 'warning' : 'complete',
      children: _react.default.createElement(_eui.EuiText, null, countByType.indices ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.todo.todoDetail",
        defaultMessage: "Go to the {indicesTabButton} to update the deprecated settings.",
        values: {
          indicesTabButton: _react.default.createElement(_eui.EuiLink, {
            onClick: function onClick() {
              return setSelectedTabIndex(2);
            }
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.todo.indicesTabButtonLabel",
            defaultMessage: "Indices tab"
          }))
        }
      })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.remainingIssuesDetail",
        defaultMessage: "{numIssues} issues must be resolved.",
        values: {
          numIssues: _react.default.createElement(_eui.EuiNotificationBadge, null, countByType.indices)
        }
      }))) : _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.overviewTab.steps.indicesStep.noRemainingIssuesLabel",
        defaultMessage: "No remaining deprecated settings."
      })))
    }, {
      title: intl.formatMessage({
        id: 'xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.stepTitle',
        defaultMessage: 'Review the Elasticsearch deprecation logs'
      }),
      children: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiText, {
        grow: false
      }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.deprecationLogs.logsDetail",
        defaultMessage: "Read the {deprecationLogsDocButton} to see if your applications are using functionality that is not available in {nextEsVersion}. You may need to enable deprecation logging.",
        values: {
          deprecationLogsDocButton: _react.default.createElement(_eui.EuiLink, {
            href: "https://www.elastic.co/guide/en/elasticsearch/reference/7.0/logging.html#deprecation-logging",
            target: "_blank"
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.deprecationLogs.deprecationLogsDocButtonLabel",
            defaultMessage: "deprecation logs"
          })),
          nextEsVersion: "".concat(_version.NEXT_MAJOR_VERSION, ".0")
        }
      }))), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiFormRow, {
        label: intl.formatMessage({
          id: 'xpack.upgradeAssistant.overviewTab.steps.deprecationLogsStep.enableDeprecationLoggingLabel',
          defaultMessage: 'Enable deprecation logging?'
        }),
        describedByIds: ['deprecation-logging']
      }, _react.default.createElement(_deprecation_logging_toggle.DeprecationLoggingToggle, {
        http: http
      })))
    }, // Swap in START_UPGRADE_STEP on the last minor release.
    WAIT_FOR_RELEASE_STEP]
  });
};

exports.StepsUI = StepsUI;
var Steps = (0, _react2.injectI18n)(StepsUI);
exports.Steps = Steps;