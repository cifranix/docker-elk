"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchStatus = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _watch_detail = require("./watch_detail");

var _watch_history = require("./watch_history");

var _breadcrumbs = require("../../../lib/breadcrumbs");

var _api = require("../../../lib/api");

var _watch_details_context = require("../watch_details_context");

var _components = require("../../../components");

var _navigation = require("../../../lib/navigation");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WATCH_EXECUTION_HISTORY_TAB = 'watchExecutionHistoryTab';
var WATCH_ACTIONS_TAB = 'watchActionsTab';
var WATCH_STATUS_TABS = [{
  id: WATCH_EXECUTION_HISTORY_TAB,
  name: _i18n.i18n.translate('xpack.watcher.sections.watchStatus.executionHistoryTabLabel', {
    defaultMessage: 'Execution history'
  })
}, {
  id: WATCH_ACTIONS_TAB,
  name: _i18n.i18n.translate('xpack.watcher.sections.watchStatus.actionsTabLabel', {
    defaultMessage: 'Action statuses'
  })
}];

var WatchStatus = function WatchStatus(_ref) {
  var id = _ref.match.params.id;

  var _useAppContext = (0, _app_context.useAppContext)(),
      setBreadcrumbs = _useAppContext.setBreadcrumbs,
      toasts = _useAppContext.toasts;

  var _useLoadWatchDetail = (0, _api.useLoadWatchDetail)(id),
      watchDetailError = _useLoadWatchDetail.error,
      watchDetail = _useLoadWatchDetail.data,
      isWatchDetailLoading = _useLoadWatchDetail.isLoading;

  var _useState = (0, _react.useState)(WATCH_EXECUTION_HISTORY_TAB),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTab = _useState2[0],
      setSelectedTab = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      isActivated = _useState4[0],
      setIsActivated = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      watchesToDelete = _useState6[0],
      setWatchesToDelete = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isTogglingActivation = _useState8[0],
      setIsTogglingActivation = _useState8[1];

  (0, _react.useEffect)(function () {
    setBreadcrumbs([_breadcrumbs.listBreadcrumb, _breadcrumbs.statusBreadcrumb]);
  }, [id, setBreadcrumbs]);
  var errorCode = (0, _components.getPageErrorCode)(watchDetailError);

  if (isWatchDetailLoading) {
    return _react.default.createElement(_components.SectionLoading, null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchStatus.loadingWatchDetailsDescription",
      defaultMessage: "Loading watch details\u2026"
    }));
  }

  if (errorCode) {
    return _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.PageError, {
      errorCode: errorCode,
      id: id
    }));
  }

  if (watchDetail) {
    var isSystemWatch = watchDetail.isSystemWatch,
        watchId = watchDetail.id,
        watchStatus = watchDetail.watchStatus,
        watchName = watchDetail.name;

    if (isActivated === undefined) {
      // Set initial value for isActivated based on the watch we just loaded.
      setIsActivated(typeof watchStatus.isActive !== 'undefined' ? watchStatus.isActive : false);
    }

    var activationButtonText = isActivated ? _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchHistory.watchTable.deactivateWatchLabel",
      defaultMessage: "Deactivate"
    }) : _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchHistory.watchTable.activateWatchLabel",
      defaultMessage: "Activate"
    });

    var toggleWatchActivation =
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var toggleActivation, _ref3, error, message;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                toggleActivation = isActivated ? _api.deactivateWatch : _api.activateWatch;
                setIsTogglingActivation(true);
                _context.next = 4;
                return toggleActivation(watchId);

              case 4:
                _ref3 = _context.sent;
                error = _ref3.error;
                setIsTogglingActivation(false);

                if (!error) {
                  _context.next = 10;
                  break;
                }

                message = isActivated ? _i18n.i18n.translate('xpack.watcher.sections.watchList.toggleActivatationErrorNotification.deactivateDescriptionText', {
                  defaultMessage: "Couldn't deactivate watch"
                }) : _i18n.i18n.translate('xpack.watcher.sections.watchList.toggleActivatationErrorNotification.activateDescriptionText', {
                  defaultMessage: "Couldn't activate watch"
                });
                return _context.abrupt("return", toasts.addDanger(message));

              case 10:
                setIsActivated(!isActivated);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function toggleWatchActivation() {
        return _ref2.apply(this, arguments);
      };
    }();

    return _react.default.createElement(_watch_details_context.WatchDetailsContext.Provider, {
      value: {
        watchDetailError: watchDetailError,
        watchDetail: watchDetail,
        isWatchDetailLoading: isWatchDetailLoading
      }
    }, _react.default.createElement(_eui.EuiPageContent, null, _react.default.createElement(_components.DeleteWatchesModal, {
      callback: function callback(deleted) {
        if (deleted) {
          (0, _navigation.goToWatchList)();
        }

        setWatchesToDelete([]);
      },
      watchesToDelete: watchesToDelete
    }), _react.default.createElement(_eui.EuiFlexGroup, {
      alignItems: "center",
      justifyContent: "spaceBetween"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiTitle, {
      size: "m"
    }, _react.default.createElement("h1", {
      "data-test-subj": "pageTitle"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchDetail.header",
      defaultMessage: "Current status for '{watch}'",
      values: {
        watch: watchName ? watchName : watchId
      }
    })))), isSystemWatch ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiToolTip, {
      content: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.watcher.sections.watchDetail.headerBadgeToolipText",
        defaultMessage: "You cannot deactivate or delete a system watch."
      })
    }, _react.default.createElement(_eui.EuiBadge, {
      color: "hollow"
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchDetail.headerBadgeText",
      defaultMessage: "System watch"
    })))) : _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiFlexGroup, {
      justifyContent: "flexEnd"
    }, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      "data-test-subj": "toggleWatchActivationButton",
      onClick: function onClick() {
        return toggleWatchActivation();
      },
      isLoading: isTogglingActivation
    }, activationButtonText)), _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiButtonEmpty, {
      "data-test-subj": "deleteWatchButton",
      onClick: function onClick() {
        setWatchesToDelete([watchId]);
      },
      color: "danger",
      disabled: false
    }, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchHistory.deleteWatchButtonLabel",
      defaultMessage: "Delete"
    })))))), _react.default.createElement(_eui.EuiSpacer, {
      size: "s"
    }), _react.default.createElement(_eui.EuiTabs, null, WATCH_STATUS_TABS.map(function (tab, index) {
      return _react.default.createElement(_eui.EuiTab, {
        onClick: function onClick() {
          setSelectedTab(tab.id);
        },
        isSelected: tab.id === selectedTab,
        key: index,
        "data-test-subj": "tab"
      }, tab.name);
    })), _react.default.createElement(_eui.EuiSpacer, {
      size: "l"
    }), selectedTab === WATCH_ACTIONS_TAB ? _react.default.createElement(_watch_detail.WatchDetail, null) : _react.default.createElement(_watch_history.WatchHistory, null)));
  }

  return null;
};

exports.WatchStatus = WatchStatus;