"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RestoreList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../../../../../common/constants");

var _components = require("../../../components");

var _constants2 = require("../../../constants");

var _http = require("../../../services/http");

var _navigation = require("../../../services/navigation");

var _app_context = require("../../../app_context");

var _restore_table = require("./restore_table");

var _authorization = require("../../../lib/authorization");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ONE_SECOND_MS = 1000;
var TEN_SECONDS_MS = 10 * 1000;
var THIRTY_SECONDS_MS = 30 * 1000;
var ONE_MINUTE_MS = 60 * 1000;
var FIVE_MINUTES_MS = 5 * 60 * 1000;
var INTERVAL_OPTIONS = [TEN_SECONDS_MS, THIRTY_SECONDS_MS, ONE_MINUTE_MS, FIVE_MINUTES_MS];

var RestoreList = function RestoreList() {
  // State for tracking interval picker
  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isIntervalMenuOpen = _useState2[0],
      setIsIntervalMenuOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(INTERVAL_OPTIONS[1]),
      _useState4 = _slicedToArray(_useState3, 2),
      currentInterval = _useState4[0],
      setCurrentInterval = _useState4[1]; // Load restores


  var _useLoadRestores = (0, _http.useLoadRestores)(currentInterval),
      error = _useLoadRestores.error,
      isLoading = _useLoadRestores.isLoading,
      _useLoadRestores$data = _useLoadRestores.data,
      restores = _useLoadRestores$data === void 0 ? [] : _useLoadRestores$data,
      isInitialRequest = _useLoadRestores.isInitialRequest,
      sendRequest = _useLoadRestores.sendRequest;

  var _useServices = (0, _app_context.useServices)(),
      uiMetricService = _useServices.uiMetricService; // Track component loaded


  (0, _react.useEffect)(function () {
    uiMetricService.trackUiMetric(_constants2.UIM_RESTORE_LIST_LOAD);
  }, [uiMetricService]);
  var content;

  if (isInitialRequest) {
    if (isLoading) {
      // Because we're polling for new data, we only want to hide the list during the initial fetch.
      content = _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.loadingRestoresDescription",
        defaultMessage: "Loading restores\u2026"
      }));
    } else if (error) {
      // If we get an error while polling we don't need to show it to the user because they can still
      // work with the table.
      content = _react.default.createElement(_components.SectionError, {
        title: _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.restoreList.loadingRestoresErrorMessage",
          defaultMessage: "Error loading restores"
        }),
        error: error
      });
    }
  } else {
    if (restores && restores.length === 0) {
      content = _react.default.createElement(_eui.EuiEmptyPrompt, {
        iconType: "managementApp",
        title: _react.default.createElement("h1", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.restoreList.emptyPromptTitle",
          defaultMessage: "No restored snapshots"
        })),
        body: _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.restoreList.emptyPromptDescription",
          defaultMessage: "Go to {snapshotsLink} to start a restore.",
          values: {
            snapshotsLink: _react.default.createElement(_eui.EuiLink, {
              href: (0, _navigation.linkToSnapshots)()
            }, _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.snapshotRestore.restoreList.emptyPromptDescriptionLink",
              defaultMessage: "Snapshots"
            }))
          }
        }))),
        "data-test-subj": "emptyPrompt"
      });
    } else {
      content = _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
        alignItems: "center",
        justifyContent: "flexStart",
        gutterSize: "s"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiPopover, {
        id: "srRestoreListIntervalMenu",
        button: _react.default.createElement(_eui.EuiButtonEmpty, {
          size: "xs",
          iconType: "arrowDown",
          iconSide: "right",
          onClick: function onClick() {
            return setIsIntervalMenuOpen(!isIntervalMenuOpen);
          }
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.snapshotRestore.restoreList.intervalMenuButtonText",
          defaultMessage: "Refresh data every {interval}",
          values: {
            interval: currentInterval >= ONE_MINUTE_MS ? _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.snapshotRestore.restoreList.intervalMenu.minutesIntervalValue",
              defaultMessage: "{minutes} {minutes, plural, one {minute} other {minutes}}",
              values: {
                minutes: Math.ceil(currentInterval / ONE_MINUTE_MS)
              }
            }) : _react.default.createElement(_react2.FormattedMessage, {
              id: "xpack.snapshotRestore.restoreList.intervalMenu.secondsIntervalValue",
              defaultMessage: "{seconds} {seconds, plural, one {second} other {seconds}}",
              values: {
                seconds: Math.ceil(currentInterval / ONE_SECOND_MS)
              }
            })
          }
        })),
        isOpen: isIntervalMenuOpen,
        closePopover: function closePopover() {
          return setIsIntervalMenuOpen(false);
        },
        panelPaddingSize: "none",
        anchorPosition: "downLeft"
      }, _react.default.createElement(_eui.EuiContextMenuPanel, {
        items: INTERVAL_OPTIONS.map(function (interval) {
          return _react.default.createElement(_eui.EuiContextMenuItem, {
            key: interval,
            icon: "empty",
            onClick: function onClick() {
              sendRequest();
              setCurrentInterval(interval);
              setIsIntervalMenuOpen(false);
            }
          }, interval >= ONE_MINUTE_MS ? _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.restoreList.intervalMenu.minutesIntervalValue",
            defaultMessage: "{minutes} {minutes, plural, one {minute} other {minutes}}",
            values: {
              minutes: Math.ceil(interval / ONE_MINUTE_MS)
            }
          }) : _react.default.createElement(_react2.FormattedMessage, {
            id: "xpack.snapshotRestore.restoreList.intervalMenu.secondsIntervalValue",
            defaultMessage: "{seconds} {seconds, plural, one {second} other {seconds}}",
            values: {
              seconds: Math.ceil(interval / ONE_SECOND_MS)
            }
          }));
        })
      }))), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, isLoading ? _react.default.createElement(_eui.EuiLoadingSpinner, {
        size: "m"
      }) : null)), _react.default.createElement(_eui.EuiSpacer, {
        size: "m"
      }), _react.default.createElement(_restore_table.RestoreTable, {
        restores: restores
      }));
    }
  }

  return _react.default.createElement(_authorization.WithPrivileges, {
    privileges: _constants.APP_RESTORE_INDEX_PRIVILEGES.map(function (name) {
      return "index.".concat(name);
    })
  }, function (_ref) {
    var hasPrivileges = _ref.hasPrivileges,
        privilegesMissing = _ref.privilegesMissing;
    return hasPrivileges ? _react.default.createElement("section", {
      "data-test-subj": "restoreList"
    }, content) : _react.default.createElement(_authorization.NotAuthorizedSection, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.deniedPrivilegeTitle",
        defaultMessage: "You're missing index privileges"
      }),
      message: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.restoreList.deniedPrivilegeDescription",
        defaultMessage: "To view snapshot restore status, you must have {privilegesCount, plural, one {this index privilege} other {these index privileges}} for one or more indices: {missingPrivileges}.",
        values: {
          missingPrivileges: privilegesMissing.index.join(', '),
          privilegesCount: privilegesMissing.index.length
        }
      })
    });
  });
};

exports.RestoreList = RestoreList;