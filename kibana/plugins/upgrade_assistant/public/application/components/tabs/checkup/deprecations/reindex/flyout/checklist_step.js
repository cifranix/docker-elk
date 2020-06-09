"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChecklistFlyoutStep = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../../../../../../../common/types");

var _types2 = require("../../../../../types");

var _progress = require("./progress");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
var buttonLabel = function buttonLabel(status) {
  switch (status) {
    case _types.ReindexStatus.failed:
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexButton.tryAgainLabel",
        defaultMessage: "Try again"
      });

    case _types.ReindexStatus.inProgress:
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexButton.reindexingLabel",
        defaultMessage: "Reindexing\u2026"
      });

    case _types.ReindexStatus.completed:
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexButton.doneLabel",
        defaultMessage: "Done!"
      });

    case _types.ReindexStatus.paused:
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexButton.resumeLabel",
        defaultMessage: "Resume"
      });

    default:
      return _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexButton.runReindexLabel",
        defaultMessage: "Run reindex"
      });
  }
};
/**
 * Displays a flyout that shows the current reindexing status for a given index.
 */


var ChecklistFlyoutStep = function ChecklistFlyoutStep(_ref) {
  var closeFlyout = _ref.closeFlyout,
      reindexState = _ref.reindexState,
      startReindex = _ref.startReindex,
      cancelReindex = _ref.cancelReindex,
      http = _ref.http,
      renderGlobalCallouts = _ref.renderGlobalCallouts;
  var loadingState = reindexState.loadingState,
      status = reindexState.status,
      hasRequiredPrivileges = reindexState.hasRequiredPrivileges,
      reindexWarnings = reindexState.reindexWarnings;
  var loading = loadingState === _types2.LoadingState.Loading || status === _types.ReindexStatus.inProgress;
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlyoutBody, null, renderGlobalCallouts(), _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.readonlyCallout.calloutTitle",
      defaultMessage: "Index is unable to ingest, update, or delete documents while reindexing"
    }),
    color: "warning",
    iconType: "alert"
  }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.readonlyCallout.cantStopDetail",
    defaultMessage: "If you can\u2019t stop document updates or need to reindex into a new cluster, consider using a different upgrade strategy."
  })), _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.readonlyCallout.backgroundResumeDetail",
    defaultMessage: "Reindexing will continue in the background, but if Kibana shuts down or restarts you will need to return to this page to resume reindexing."
  }))), !hasRequiredPrivileges && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.insufficientPrivilegeCallout.calloutTitle",
      defaultMessage: "You do not have sufficient privileges to reindex this index"
    }),
    color: "danger",
    iconType: "alert"
  })), _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiTitle, {
    size: "xs"
  }, _react.default.createElement("h3", null, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklistTitle",
    defaultMessage: "Reindexing process"
  }))), _react.default.createElement(_progress.ReindexProgress, {
    reindexState: reindexState,
    cancelReindex: cancelReindex
  }), reindexWarnings && reindexWarnings.includes(_types.ReindexWarning.apmReindex) && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, null), _react.default.createElement(_eui.EuiCallOut, {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.apmIndexPatternCallout.calloutTitle",
      defaultMessage: "After reindexing APM indices, return to the {apmSetupLink} to reload Kibana objects. You only need to do this once.",
      values: {
        apmSetupLink: _react.default.createElement(_eui.EuiLink, {
          href: http.basePath.prepend("/app/kibana#/home/tutorial/apm"),
          target: "_blank"
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.apmIndexPatternCallout.apmSetupLinkLabel",
          defaultMessage: "APM Setup Instructions"
        }))
      }
    }),
    color: "warning",
    iconType: "alert"
  }))), _react.default.createElement(_eui.EuiFlyoutFooter, null, _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    iconType: "cross",
    onClick: closeFlyout,
    flush: "left"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.closeButtonLabel",
    defaultMessage: "Close"
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: status === _types.ReindexStatus.paused ? 'warning' : 'primary',
    iconType: status === _types.ReindexStatus.paused ? 'play' : undefined,
    onClick: startReindex,
    isLoading: loading,
    disabled: loading || status === _types.ReindexStatus.completed || !hasRequiredPrivileges
  }, buttonLabel(status))))));
};

exports.ChecklistFlyoutStep = ChecklistFlyoutStep;