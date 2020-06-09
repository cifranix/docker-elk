"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotDetails = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _components = require("../../../../components");

var _app_context = require("../../../../app_context");

var _constants = require("../../../../constants");

var _http = require("../../../../services/http");

var _navigation = require("../../../../services/navigation");

var _tabs = require("./tabs");

var _panelTypeToUiMetricM;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TAB_SUMMARY = 'summary';
var TAB_FAILURES = 'failures';
var panelTypeToUiMetricMap = (_panelTypeToUiMetricM = {}, _defineProperty(_panelTypeToUiMetricM, TAB_SUMMARY, _constants.UIM_SNAPSHOT_DETAIL_PANEL_SUMMARY_TAB), _defineProperty(_panelTypeToUiMetricM, TAB_FAILURES, _constants.UIM_SNAPSHOT_DETAIL_PANEL_FAILED_INDICES_TAB), _panelTypeToUiMetricM);

var SnapshotDetails = function SnapshotDetails(_ref) {
  var repositoryName = _ref.repositoryName,
      snapshotId = _ref.snapshotId,
      onClose = _ref.onClose,
      onSnapshotDeleted = _ref.onSnapshotDeleted;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n,
      uiMetricService = _useServices.uiMetricService;

  var _useLoadSnapshot = (0, _http.useLoadSnapshot)(repositoryName, snapshotId),
      error = _useLoadSnapshot.error,
      snapshotDetails = _useLoadSnapshot.data;

  var _useState = (0, _react.useState)(TAB_SUMMARY),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1]; // Reset tab when we look at a different snapshot.


  (0, _react.useEffect)(function () {
    setActiveTab(TAB_SUMMARY);
  }, [repositoryName, snapshotId]);
  var tabs;
  var content;

  if (snapshotDetails) {
    var _ref2 = snapshotDetails,
        indexFailures = _ref2.indexFailures,
        snapshotState = _ref2.state;
    var tabOptions = [{
      id: TAB_SUMMARY,
      name: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotDetails.summaryTabTitle",
        defaultMessage: "Summary"
      })
    }, {
      id: TAB_FAILURES,
      name: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotDetails.failuresTabTitle",
        defaultMessage: "Failed indices ({failuresCount})",
        values: {
          failuresCount: indexFailures.length
        }
      })
    }];
    tabs = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiTabs, null, tabOptions.map(function (tab) {
      return _react.default.createElement(_eui.EuiTab, {
        onClick: function onClick() {
          uiMetricService.trackUiMetric(panelTypeToUiMetricMap[tab.id]);
          setActiveTab(tab.id);
        },
        isSelected: tab.id === activeTab,
        key: tab.id,
        "data-test-subj": "tab"
      }, tab.name);
    })));

    if (activeTab === TAB_SUMMARY) {
      content = _react.default.createElement(_tabs.TabSummary, {
        snapshotDetails: snapshotDetails
      });
    } else if (activeTab === TAB_FAILURES) {
      content = _react.default.createElement(_tabs.TabFailures, {
        snapshotState: snapshotState,
        indexFailures: indexFailures
      });
    }
  } else if (error) {
    var notFound = error.status === 404;
    var errorObject = notFound ? {
      data: {
        error: i18n.translate('xpack.snapshotRestore.snapshotDetails.errorSnapshotNotFound', {
          defaultMessage: "Either the snapshot '{snapshotId}' doesn't exist in the repository '{repositoryName}' or the repository doesn't exist.",
          values: {
            snapshotId: snapshotId,
            repositoryName: repositoryName
          }
        })
      }
    } : error;
    content = _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotDetails.errorLoadingRepositoryTitle",
        defaultMessage: "Error loading repository"
      }),
      error: errorObject
    });
  } else {
    // Assume the content is loading.
    content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.snapshotDetails.loadingSnapshotDescription",
      defaultMessage: "Loading snapshot\u2026"
    }));
  }

  var renderFooter = function renderFooter() {
    return _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "spaceBetween",
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      iconType: "cross",
      flush: "left",
      onClick: onClose,
      "data-test-subj": "closeButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.snapshotDetails.closeButtonLabel",
      defaultMessage: "Close"
    }))), snapshotDetails ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_components.SnapshotDeleteProvider, null, function (deleteSnapshotPrompt) {
      return _react.default.createElement(_eui.EuiButtonEmpty, {
        color: "danger",
        "data-test-subj": "srSnapshotDetailsDeleteActionButton",
        onClick: function onClick() {
          return deleteSnapshotPrompt([{
            repository: repositoryName,
            snapshot: snapshotId
          }], onSnapshotDeleted);
        },
        isDisabled: snapshotDetails.managedRepository && snapshotDetails.isLastSuccessfulSnapshot,
        title: snapshotDetails.managedRepository && snapshotDetails.isLastSuccessfulSnapshot ? i18n.translate('xpack.snapshotRestore.snapshotDetails.deleteManagedRepositorySnapshotButtonTitle', {
          defaultMessage: 'You cannot delete the last successful snapshot stored in a managed repository.'
        }) : undefined
      }, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.snapshotDetails.deleteButtonLabel",
        defaultMessage: "Delete"
      }));
    })), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButton, {
      href: (0, _navigation.linkToRestoreSnapshot)(repositoryName, snapshotId),
      fill: true,
      color: "primary",
      isDisabled: snapshotDetails.state !== _constants.SNAPSHOT_STATE.SUCCESS && snapshotDetails.state !== _constants.SNAPSHOT_STATE.PARTIAL
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.snapshotDetails.restoreButtonLabel",
      defaultMessage: "Restore"
    }))))) : null);
  };

  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    "data-test-subj": "snapshotDetail",
    "aria-labelledby": "srSnapshotDetailsFlyoutTitle",
    size: "m",
    maxWidth: 550
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiText, null, _react.default.createElement("h2", {
    id: "srSnapshotDetailsFlyoutTitle",
    "data-test-subj": "detailTitle"
  }, snapshotId), _react.default.createElement("p", null, _react.default.createElement("small", null, _react.default.createElement(_eui.EuiLink, {
    href: (0, _navigation.linkToRepository)(repositoryName),
    "data-test-subj": "repositoryLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.snapshotDetails.repositoryTitle",
    defaultMessage: "'{repositoryName}' repository",
    values: {
      repositoryName: repositoryName
    }
  }))))), tabs), _react.default.createElement(_eui.EuiFlyoutBody, {
    "data-test-subj": "content"
  }, content), _react.default.createElement(_eui.EuiFlyoutFooter, null, renderFooter()));
};

exports.SnapshotDetails = SnapshotDetails;