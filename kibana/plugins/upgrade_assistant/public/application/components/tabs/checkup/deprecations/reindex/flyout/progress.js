"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReindexProgress = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _types = require("../../../../../../../../common/types");

var _types2 = require("../../../../../types");

var _step_progress = require("./step_progress");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ErrorCallout = function ErrorCallout(_ref) {
  var errorMessage = _ref.errorMessage;
  return _react.default.createElement(_eui.EuiCallOut, {
    color: "danger",
    title: "There was an error"
  }, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("p", null, errorMessage)));
};

var PausedCallout = function PausedCallout() {
  return _react.default.createElement(_eui.EuiCallOut, {
    color: "warning",
    title: "This step was paused due to a Kibana restart. Click 'Resume' below to continue."
  });
};

var ReindexProgressBar = function ReindexProgressBar(_ref2) {
  var _ref2$reindexState = _ref2.reindexState,
      lastCompletedStep = _ref2$reindexState.lastCompletedStep,
      status = _ref2$reindexState.status,
      reindexTaskPercComplete = _ref2$reindexState.reindexTaskPercComplete,
      cancelLoadingState = _ref2$reindexState.cancelLoadingState,
      cancelReindex = _ref2.cancelReindex;
  var progressBar = reindexTaskPercComplete ? _react.default.createElement(_eui.EuiProgress, {
    size: "s",
    value: reindexTaskPercComplete,
    max: 1
  }) : _react.default.createElement(_eui.EuiProgress, {
    size: "s"
  });
  var cancelText;

  switch (cancelLoadingState) {
    case _types2.LoadingState.Loading:
      cancelText = _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.cancelButton.cancellingLabel",
        defaultMessage: "Cancelling\u2026"
      });
      break;

    case _types2.LoadingState.Success:
      cancelText = _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.cancelButton.cancelledLabel",
        defaultMessage: "Cancelled"
      });
      break;

    case _types2.LoadingState.Error:
      cancelText = 'Could not cancel';
      cancelText = _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.cancelButton.errorLabel",
        defaultMessage: "Could not cancel"
      });
      break;

    default:
      cancelText = _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.cancelButton.cancelLabel",
        defaultMessage: "Cancel"
      });
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: 'center'
  }, _react.default.createElement(_eui.EuiFlexItem, null, progressBar), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: cancelReindex,
    disabled: cancelLoadingState === _types2.LoadingState.Loading || status !== _types.ReindexStatus.inProgress || lastCompletedStep !== _types.ReindexStep.reindexStarted,
    isLoading: cancelLoadingState === _types2.LoadingState.Loading
  }, cancelText)));
};

var orderedSteps = Object.values(_types.ReindexStep).sort();
/**
 * Displays a list of steps in the reindex operation, the current status, a progress bar,
 * and any error messages that are encountered.
 */

var ReindexProgress = function ReindexProgress(props) {
  var _props$reindexState = props.reindexState,
      errorMessage = _props$reindexState.errorMessage,
      indexGroup = _props$reindexState.indexGroup,
      _props$reindexState$l = _props$reindexState.lastCompletedStep,
      lastCompletedStep = _props$reindexState$l === void 0 ? -1 : _props$reindexState$l,
      status = _props$reindexState.status;

  var stepDetails = function stepDetails(thisStep) {
    var previousStep = orderedSteps[orderedSteps.indexOf(thisStep) - 1];

    if (status === _types.ReindexStatus.failed && lastCompletedStep === previousStep) {
      return {
        status: 'failed',
        children: _react.default.createElement(ErrorCallout, {
          errorMessage: errorMessage
        })
      };
    } else if (status === _types.ReindexStatus.paused && lastCompletedStep === previousStep) {
      return {
        status: 'paused',
        children: _react.default.createElement(PausedCallout, null)
      };
    } else if (status === _types.ReindexStatus.cancelled && lastCompletedStep === previousStep) {
      return {
        status: 'cancelled'
      };
    } else if (status === undefined || lastCompletedStep < previousStep) {
      return {
        status: 'incomplete'
      };
    } else if (lastCompletedStep === previousStep) {
      return {
        status: 'inProgress'
      };
    } else {
      return {
        status: 'complete'
      };
    }
  }; // The reindexing step is special because it combines the starting and complete statuses into a single UI
  // with a progress bar.


  var reindexingDocsStep = {
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.reindexingDocumentsStepTitle",
      defaultMessage: "Reindexing documents"
    })
  };

  if (status === _types.ReindexStatus.failed && (lastCompletedStep === _types.ReindexStep.newIndexCreated || lastCompletedStep === _types.ReindexStep.reindexStarted)) {
    reindexingDocsStep.status = 'failed';
    reindexingDocsStep.children = _react.default.createElement(ErrorCallout, {
      errorMessage: errorMessage
    });
  } else if (status === _types.ReindexStatus.paused && (lastCompletedStep === _types.ReindexStep.newIndexCreated || lastCompletedStep === _types.ReindexStep.reindexStarted)) {
    reindexingDocsStep.status = 'paused';
    reindexingDocsStep.children = _react.default.createElement(PausedCallout, null);
  } else if (status === _types.ReindexStatus.cancelled && (lastCompletedStep === _types.ReindexStep.newIndexCreated || lastCompletedStep === _types.ReindexStep.reindexStarted)) {
    reindexingDocsStep.status = 'cancelled';
  } else if (status === undefined || lastCompletedStep < _types.ReindexStep.newIndexCreated) {
    reindexingDocsStep.status = 'incomplete';
  } else if (lastCompletedStep === _types.ReindexStep.newIndexCreated || lastCompletedStep === _types.ReindexStep.reindexStarted) {
    reindexingDocsStep.status = 'inProgress';
    reindexingDocsStep.children = _react.default.createElement(ReindexProgressBar, props);
  } else {
    reindexingDocsStep.status = 'complete';
  }

  var steps = [_objectSpread({
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.readonlyStepTitle",
      defaultMessage: "Setting old index to read-only"
    })
  }, stepDetails(_types.ReindexStep.readonly)), _objectSpread({
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.createIndexStepTitle",
      defaultMessage: "Creating new index"
    })
  }, stepDetails(_types.ReindexStep.newIndexCreated)), reindexingDocsStep, _objectSpread({
    title: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.aliasSwapStepTitle",
      defaultMessage: "Swapping original index with alias"
    })
  }, stepDetails(_types.ReindexStep.aliasCreated))]; // If this index is part of an index group, add the approriate group services steps.

  if (indexGroup === _types.IndexGroup.ml) {
    steps.unshift(_objectSpread({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.pauseMlStepTitle",
        defaultMessage: "Pausing Machine Learning jobs"
      })
    }, stepDetails(_types.ReindexStep.indexGroupServicesStopped)));
    steps.push(_objectSpread({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.resumeMlStepTitle",
        defaultMessage: "Resuming Machine Learning jobs"
      })
    }, stepDetails(_types.ReindexStep.indexGroupServicesStarted)));
  } else if (indexGroup === _types.IndexGroup.watcher) {
    steps.unshift(_objectSpread({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.stopWatcherStepTitle",
        defaultMessage: "Stopping Watcher"
      })
    }, stepDetails(_types.ReindexStep.indexGroupServicesStopped)));
    steps.push(_objectSpread({
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.upgradeAssistant.checkupTab.reindexing.flyout.checklistStep.reindexingChecklist.resumeWatcherStepTitle",
        defaultMessage: "Resuming Watcher"
      })
    }, stepDetails(_types.ReindexStep.indexGroupServicesStarted)));
  }

  return _react.default.createElement(_step_progress.StepProgress, {
    steps: steps
  });
};

exports.ReindexProgress = ReindexProgress;