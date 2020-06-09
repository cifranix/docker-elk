"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyToSpaceFlyoutFooter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CopyToSpaceFlyoutFooter = function CopyToSpaceFlyoutFooter(props) {
  var copyInProgress = props.copyInProgress,
      initialCopyFinished = props.initialCopyFinished,
      copyResult = props.copyResult,
      retries = props.retries;
  var summarizedResults = {
    successCount: 0,
    overwriteConflictCount: 0,
    conflictCount: 0,
    unresolvableErrorCount: 0
  };

  if (copyResult) {
    summarizedResults = Object.entries(copyResult).reduce(function (acc, result) {
      var _result = _slicedToArray(result, 2),
          spaceId = _result[0],
          spaceResult = _result[1];

      var overwriteCount = (retries[spaceId] || []).filter(function (c) {
        return c.overwrite;
      }).length;
      return {
        loading: false,
        successCount: acc.successCount + spaceResult.importCount,
        overwriteConflictCount: acc.overwriteConflictCount + overwriteCount,
        conflictCount: acc.conflictCount + spaceResult.failedImports.filter(function (i) {
          return i.error.type === 'conflict';
        }).length - overwriteCount,
        unresolvableErrorCount: acc.unresolvableErrorCount + spaceResult.failedImports.filter(function (i) {
          return i.error.type !== 'conflict';
        }).length
      };
    }, summarizedResults);
  }

  var getButton = function getButton() {
    var actionButton;

    if (initialCopyFinished) {
      var hasPendingOverwrites = summarizedResults.overwriteConflictCount > 0;
      var buttonText = hasPendingOverwrites ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.finishPendingOverwritesCopyToSpacesButton",
        defaultMessage: "Overwrite {overwriteCount} objects",
        values: {
          overwriteCount: summarizedResults.overwriteConflictCount
        }
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.finishCopyToSpacesButton",
        defaultMessage: "Finish"
      });
      actionButton = _react.default.createElement(_eui.EuiButton, {
        fill: true,
        isLoading: props.conflictResolutionInProgress,
        "aria-live": "assertive",
        "aria-label": props.conflictResolutionInProgress ? _i18n.i18n.translate('xpack.spaces.management.copyToSpace.inProgressButtonLabel', {
          defaultMessage: 'Copy is in progress. Please wait.'
        }) : _i18n.i18n.translate('xpack.spaces.management.copyToSpace.finishedButtonLabel', {
          defaultMessage: 'Copy finished.'
        }),
        onClick: function onClick() {
          return props.onCopyFinish();
        },
        "data-test-subj": "cts-finish-button"
      }, buttonText);
    } else {
      actionButton = _react.default.createElement(_eui.EuiButton, {
        fill: true,
        isLoading: copyInProgress,
        onClick: function onClick() {
          return props.onCopyStart();
        },
        "data-test-subj": "cts-initiate-button",
        disabled: props.numberOfSelectedSpaces === 0 || copyInProgress
      }, props.numberOfSelectedSpaces > 0 ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.copyToSpacesButton",
        defaultMessage: "Copy to {spaceCount} {spaceCount, plural, one {space} other {spaces}}",
        values: {
          spaceCount: props.numberOfSelectedSpaces
        }
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.spaces.management.copyToSpace.disabledCopyToSpacesButton",
        defaultMessage: "Copy"
      }));
    }

    return _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "flexEnd"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, actionButton));
  };

  if (!copyInProgress) {
    return getButton();
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiStat, {
    "data-test-subj": "cts-summary-success-count",
    title: summarizedResults.successCount,
    titleSize: "s",
    titleColor: initialCopyFinished ? 'secondary' : 'subdued',
    isLoading: !initialCopyFinished,
    textAlign: "center",
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpaceFlyoutFooter.successCount",
      defaultMessage: "Copied"
    })
  })), summarizedResults.overwriteConflictCount > 0 && _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiStat, {
    "data-test-subj": "cts-summary-overwrite-count",
    title: summarizedResults.overwriteConflictCount,
    titleSize: "s",
    titleColor: summarizedResults.overwriteConflictCount > 0 ? 'primary' : 'subdued',
    isLoading: !initialCopyFinished,
    textAlign: "center",
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpaceFlyoutFooter.pendingCount",
      defaultMessage: "Pending"
    })
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiStat, {
    "data-test-subj": "cts-summary-conflict-count",
    title: summarizedResults.conflictCount,
    titleSize: "s",
    titleColor: summarizedResults.conflictCount > 0 ? 'primary' : 'subdued',
    isLoading: !initialCopyFinished,
    textAlign: "center",
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpaceFlyoutFooter.conflictCount",
      defaultMessage: "Skipped"
    })
  })), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiStat, {
    "data-test-subj": "cts-summary-error-count",
    title: summarizedResults.unresolvableErrorCount,
    titleSize: "s",
    titleColor: summarizedResults.unresolvableErrorCount > 0 ? 'danger' : 'subdued',
    isLoading: !initialCopyFinished,
    textAlign: "center",
    description: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.spaces.management.copyToSpaceFlyoutFooter.errorCount",
      defaultMessage: "Errors"
    })
  }))), _react.default.createElement(_eui.EuiHorizontalRule, null), getButton());
};

exports.CopyToSpaceFlyoutFooter = CopyToSpaceFlyoutFooter;