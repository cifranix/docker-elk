"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchDetail = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _api = require("../../../lib/api");

var _components = require("../../../components");

var _constants = require("../../../../../common/constants");

var _watch_details_context = require("../watch_details_context");

var _app_context = require("../../../app_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WatchDetail = function WatchDetail() {
  var _useAppContext = (0, _app_context.useAppContext)(),
      toasts = _useAppContext.toasts;

  var _useContext = (0, _react.useContext)(_watch_details_context.WatchDetailsContext),
      watchDetail = _useContext.watchDetail;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      actionStatuses = _useState2[0],
      setActionStatuses = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isActionStatusLoading = _useState4[0],
      setIsActionStatusLoading = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedErrorAction = _useState6[0],
      setSelectedErrorAction = _useState6[1];

  var watchId = watchDetail.id,
      watchErrors = watchDetail.watchErrors,
      watchStatus = watchDetail.watchStatus,
      isSystemWatch = watchDetail.isSystemWatch;
  var actionErrors = watchErrors && watchErrors.actionErrors;
  var currentActionStatuses = watchStatus && watchStatus.actionStatuses;
  var hasActionErrors = actionErrors && Object.keys(actionErrors).length > 0;
  (0, _react.useEffect)(function () {
    var actionStatusesWithErrors = currentActionStatuses && currentActionStatuses.map(function (currentActionStatus) {
      var errors = actionErrors && actionErrors[currentActionStatus.id];
      return _objectSpread({}, currentActionStatus, {
        errors: errors || []
      });
    });
    setActionStatuses(actionStatusesWithErrors);
  }, [watchDetail, actionErrors, currentActionStatuses]);
  var baseColumns = [{
    field: 'id',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchDetail.watchTable.actionHeader', {
      defaultMessage: 'Name'
    }),
    sortable: true,
    truncateText: true
  }, {
    field: 'state',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchDetail.watchTable.stateHeader', {
      defaultMessage: 'State'
    }),
    sortable: true,
    truncateText: true,
    render: function render(state) {
      return _react.default.createElement(_components.WatchStatus, {
        status: state
      });
    }
  }];
  var errorColumn = {
    field: 'errors',
    name: _i18n.i18n.translate('xpack.watcher.sections.watchDetail.watchTable.errorsHeader', {
      defaultMessage: 'Errors'
    }),
    render: function render(errors, action) {
      var actionId = action.id;

      if (errors && errors.length > 0) {
        return _react.default.createElement(_eui.EuiButtonEmpty, {
          onClick: function onClick() {
            return setSelectedErrorAction(actionId);
          },
          "data-test-subj": "actionErrorsButton"
        }, _i18n.i18n.translate('xpack.watcher.sections.watchDetail.watchTable.errorsCellText', {
          defaultMessage: '{total, number} {total, plural, one {error} other {errors}}',
          values: {
            total: errors.length
          }
        }));
      }

      return _react.default.createElement(_react.Fragment, null);
    }
  };
  var actionColumn = {
    actions: [{
      available: function available(action) {
        return action.isAckable && !isSystemWatch;
      },
      render: function render(action) {
        var actionId = action.id;
        return _react.default.createElement(_eui.EuiToolTip, {
          content: _i18n.i18n.translate('xpack.watcher.sections.watchDetail.watchTable.ackActionCellTooltipTitle', {
            defaultMessage: 'Acknowledge watch action.'
          })
        }, _react.default.createElement(_eui.EuiButtonEmpty, {
          iconType: "check",
          isLoading: isActionStatusLoading,
          "data-test-subj": "acknowledgeWatchButton",
          onClick:
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee() {
            var newWatchStatus, newActionStatusesWithErrors;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    setIsActionStatusLoading(true);
                    _context.prev = 1;
                    _context.next = 4;
                    return (0, _api.ackWatchAction)(watchId, actionId);

                  case 4:
                    newWatchStatus = _context.sent;
                    newActionStatusesWithErrors = newWatchStatus.actionStatuses.map(function (newActionStatus) {
                      var errors = actionErrors && actionErrors[newActionStatus.id];
                      return _objectSpread({}, newActionStatus, {
                        errors: errors || []
                      });
                    });
                    setIsActionStatusLoading(false);
                    return _context.abrupt("return", setActionStatuses(newActionStatusesWithErrors));

                  case 10:
                    _context.prev = 10;
                    _context.t0 = _context["catch"](1);
                    setIsActionStatusLoading(false);
                    toasts.addDanger(_i18n.i18n.translate('xpack.watcher.sections.watchDetail.watchTable.ackActionErrorMessage', {
                      defaultMessage: 'Error acknowledging action {actionId}',
                      values: {
                        actionId: action.id
                      }
                    }));

                  case 14:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[1, 10]]);
          }))
        }, _react.default.createElement(_react2.FormattedMessage, {
          id: "xpack.watcher.sections.watchDetail.watchTable.ackActionCellTitle",
          defaultMessage: "Acknowledge"
        })));
      }
    }]
  };
  var columns = hasActionErrors ? [].concat(baseColumns, [errorColumn, actionColumn]) : [].concat(baseColumns, [actionColumn]);
  return _react.default.createElement("div", {
    "data-test-subj": "watchDetailSection"
  }, selectedErrorAction && _react.default.createElement(_eui.EuiFlyout, {
    size: "s",
    "aria-labelledby": "flyoutActionErrorTitle",
    "data-test-subj": "actionErrorsFlyout",
    onClose: function onClose() {
      return setSelectedErrorAction(null);
    }
  }, _react.default.createElement(_eui.EuiFlyoutHeader, {
    hasBorder: true
  }, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h2", {
    id: "flyoutActionErrorTitle",
    "data-test-subj": "title"
  }, selectedErrorAction))), _react.default.createElement(_eui.EuiFlyoutBody, null, _react.default.createElement(_eui.EuiCallOut, {
    title: _i18n.i18n.translate('xpack.watcher.sections.watchDetail.actionErrorsCalloutTitle', {
      defaultMessage: 'This action contains errors'
    }),
    color: "danger",
    iconType: "cross",
    "data-test-subj": "errorMessage"
  }, actionErrors[selectedErrorAction].length > 1 ? _react.default.createElement("ul", null, actionErrors[selectedErrorAction].map(function (actionError, errorIndex) {
    return _react.default.createElement("li", {
      key: "action-error-".concat(errorIndex)
    }, actionError.message);
  })) : _react.default.createElement("p", null, actionErrors[selectedErrorAction][0].message)))), _react.default.createElement(_eui.EuiInMemoryTable, {
    items: actionStatuses,
    itemId: "id",
    columns: columns,
    pagination: _constants.PAGINATION,
    sorting: true,
    "data-test-subj": "watchActionStatusTable",
    message: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.watcher.sections.watchDetail.watchTable.noWatchesMessage",
      defaultMessage: "No actions to show"
    })
  }));
};

exports.WatchDetail = WatchDetail;