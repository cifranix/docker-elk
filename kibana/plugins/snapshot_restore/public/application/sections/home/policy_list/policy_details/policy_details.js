"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyDetails = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../../../../app_context");

var _constants = require("../../../../constants");

var _http = require("../../../../services/http");

var _navigation = require("../../../../services/navigation");

var _components = require("../../../../components");

var _tabs = require("./tabs");

var _tabToUiMetricMap;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TAB_SUMMARY = 'summary';
var TAB_HISTORY = 'success';
var tabToUiMetricMap = (_tabToUiMetricMap = {}, _defineProperty(_tabToUiMetricMap, TAB_SUMMARY, _constants.UIM_POLICY_DETAIL_PANEL_SUMMARY_TAB), _defineProperty(_tabToUiMetricMap, TAB_HISTORY, _constants.UIM_POLICY_DETAIL_PANEL_HISTORY_TAB), _tabToUiMetricMap);

var PolicyDetails = function PolicyDetails(_ref) {
  var policyName = _ref.policyName,
      onClose = _ref.onClose,
      onPolicyDeleted = _ref.onPolicyDeleted,
      onPolicyExecuted = _ref.onPolicyExecuted;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n,
      uiMetricService = _useServices.uiMetricService;

  var _useLoadPolicy = (0, _http.useLoadPolicy)(policyName),
      error = _useLoadPolicy.error,
      policyDetails = _useLoadPolicy.data,
      reload = _useLoadPolicy.sendRequest;

  var _useState = (0, _react.useState)(TAB_SUMMARY),
      _useState2 = _slicedToArray(_useState, 2),
      activeTab = _useState2[0],
      setActiveTab = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPopoverOpen = _useState4[0],
      setIsPopoverOpen = _useState4[1]; // Reset tab when we look at a different policy


  (0, _react.useEffect)(function () {
    setActiveTab(TAB_SUMMARY);
  }, [policyName]);
  var tabOptions = [{
    id: TAB_SUMMARY,
    name: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.summaryTabTitle",
      defaultMessage: "Summary"
    })
  }, {
    id: TAB_HISTORY,
    name: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.historyTabTitle",
      defaultMessage: "History"
    })
  }];

  var renderTabs = function renderTabs() {
    return _react.default.createElement(_eui.EuiTabs, null, tabOptions.map(function (tab) {
      return _react.default.createElement(_eui.EuiTab, {
        onClick: function onClick() {
          uiMetricService.trackUiMetric(tabToUiMetricMap[tab.id]);
          setActiveTab(tab.id);
        },
        isSelected: tab.id === activeTab,
        key: tab.id,
        "data-test-subj": "tab"
      }, tab.name);
    }));
  };

  var renderBody = function renderBody() {
    if (policyDetails) {
      var policy = policyDetails.policy;

      switch (activeTab) {
        case TAB_HISTORY:
          return _react.default.createElement(_tabs.TabHistory, {
            policy: policy
          });

        default:
          return _react.default.createElement(_tabs.TabSummary, {
            policy: policy
          });
      }
    }

    if (error) {
      return renderError();
    }

    return renderLoading();
  };

  var renderLoading = function renderLoading() {
    return _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.loadingPolicyDescription",
      defaultMessage: "Loading policy\u2026"
    }));
  };

  var renderError = function renderError() {
    var notFound = error.status === 404;
    var errorObject = notFound ? {
      data: {
        error: i18n.translate('xpack.snapshotRestore.policyDetails.policyNotFoundErrorMessage', {
          defaultMessage: "The policy '{name}' does not exist.",
          values: {
            name: policyName
          }
        })
      }
    } : error;
    return _react.default.createElement(_components.SectionError, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.policyDetails.loadingPolicyErrorTitle",
        defaultMessage: "Error loading policy"
      }),
      error: errorObject
    });
  };

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
      "data-test-subj": "srPolicyDetailsFlyoutCloseButton"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.policyDetails.closeButtonLabel",
      defaultMessage: "Close"
    }))), policyDetails ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_components.PolicyExecuteProvider, null, function (executePolicyPrompt) {
      return _react.default.createElement(_components.PolicyDeleteProvider, null, function (deletePolicyPrompt) {
        return _react.default.createElement(_eui.EuiPopover, {
          id: "policyActionMenu",
          button: _react.default.createElement(_eui.EuiButton, {
            "data-test-subj": "policyActionMenuButton",
            iconSide: "right",
            onClick: function onClick() {
              return setIsPopoverOpen(!isPopoverOpen);
            },
            iconType: "arrowDown",
            fill: true
          }, _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.policyDetails.manageButtonLabel",
            defaultMessage: "Manage policy"
          })),
          isOpen: isPopoverOpen,
          closePopover: function closePopover() {
            return setIsPopoverOpen(false);
          },
          panelPaddingSize: "none",
          withTitle: true,
          anchorPosition: "rightUp",
          repositionOnScroll: true
        }, _react.default.createElement(_eui.EuiContextMenu, {
          "data-test-subj": "policyActionContextMenu",
          initialPanelId: 0,
          panels: [{
            id: 0,
            title: i18n.translate('xpack.snapshotRestore.policyDetails.managePanelTitle', {
              defaultMessage: 'Policy options'
            }),
            items: [{
              name: i18n.translate('xpack.snapshotRestore.policyDetails.executeButtonLabel', {
                defaultMessage: 'Run now'
              }),
              icon: 'play',
              onClick: function onClick() {
                executePolicyPrompt(policyName, function () {
                  return (// Wait a little bit for policy to execute before reloading policy table
                    // and policy details so that History tab information is updated with
                    // results of the execution
                    setTimeout(function () {
                      onPolicyExecuted();
                      reload();
                    }, 2000)
                  );
                });
              },
              disabled: Boolean(policyDetails.policy.inProgress)
            }, {
              name: i18n.translate('xpack.snapshotRestore.policyDetails.editButtonLabel', {
                defaultMessage: 'Edit'
              }),
              icon: 'pencil',
              href: (0, _navigation.linkToEditPolicy)(policyName)
            }, {
              name: i18n.translate('xpack.snapshotRestore.policyDetails.deleteButtonLabel', {
                defaultMessage: 'Delete'
              }),
              icon: 'trash',
              disabled: policyDetails.policy.isManagedPolicy,
              onClick: function onClick() {
                return deletePolicyPrompt([policyName], onPolicyDeleted);
              }
            }]
          }]
        }));
      });
    })) : null);
  };

  return _react.default.createElement(_eui.EuiFlyout, {
    onClose: onClose,
    "data-test-subj": "policyDetail",
    "aria-labelledby": "srPolicyDetailsFlyoutTitle",
    size: "m",
    maxWidth: 550
  }, _react.default.createElement(_eui.EuiFlyoutHeader, null, _react.default.createElement(_eui.EuiTitle, {
    size: "m"
  }, _react.default.createElement("h2", {
    id: "srPolicyDetailsFlyoutTitle",
    "data-test-subj": "title"
  }, policyName, ' ', _react.default.createElement(_eui.EuiButtonIcon, {
    iconType: "refresh",
    color: "subdued",
    "aria-label": i18n.translate('xpack.snapshotRestore.policyDetails.reloadButtonAriaLabel', {
      defaultMessage: 'Reload'
    }),
    onClick: function onClick() {
      return reload();
    }
  }))), policyDetails && policyDetails.policy && policyDetails.policy.inProgress ? _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_components.SectionLoading, {
    inline: true,
    size: "s"
  }, _react.default.createElement(_eui.EuiLink, {
    href: (0, _navigation.linkToSnapshot)(policyDetails.policy.repository, policyDetails.policy.inProgress.snapshotName),
    "data-test-subj": "inProgressSnapshotLink"
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.snapshotRestore.policyDetails.inProgressSnapshotLinkText",
    defaultMessage: "'{snapshotName}' in progress",
    values: {
      snapshotName: policyDetails.policy.inProgress.snapshotName
    }
  })))) : null, renderTabs()), _react.default.createElement(_eui.EuiFlyoutBody, {
    "data-test-subj": "content"
  }, renderBody()), _react.default.createElement(_eui.EuiFlyoutFooter, null, renderFooter()));
};

exports.PolicyDetails = PolicyDetails;