"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartAction = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _analytics_service = require("../../services/analytics_service");

var _check_privilege = require("../../../../../privilege/check_privilege");

var _common = require("./common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StartAction = function StartAction(_ref) {
  var item = _ref.item;
  var canStartStopDataFrameAnalytics = (0, _check_privilege.checkPermission)('canStartStopDataFrameAnalytics');

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModalVisible = _useState2[0],
      setModalVisible = _useState2[1];

  var closeModal = function closeModal() {
    return setModalVisible(false);
  };

  var startAndCloseModal = function startAndCloseModal() {
    setModalVisible(false);
    (0, _analytics_service.startAnalytics)(item);
  };

  var openModal = function openModal() {
    return setModalVisible(true);
  };

  var buttonStartText = _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.startActionName', {
    defaultMessage: 'Start'
  }); // Disable start for analytics jobs which have completed.


  var completeAnalytics = (0, _common.isCompletedAnalyticsJob)(item.stats);

  var startButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    color: "text",
    disabled: !canStartStopDataFrameAnalytics || completeAnalytics,
    iconType: "play",
    onClick: openModal,
    "aria-label": buttonStartText,
    "data-test-sub": "mlAnalyticsJobStartButton"
  }, buttonStartText);

  if (!canStartStopDataFrameAnalytics || completeAnalytics) {
    startButton = _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: !canStartStopDataFrameAnalytics ? (0, _check_privilege.createPermissionFailureMessage)('canStartStopDataFrameAnalytics') : _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.completeBatchAnalyticsToolTip', {
        defaultMessage: '{analyticsId} is a completed analytics job and cannot be restarted.',
        values: {
          analyticsId: item.config.id
        }
      })
    }, startButton);
  }

  return _react.default.createElement(_react.Fragment, null, startButton, isModalVisible && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.startModalTitle', {
      defaultMessage: 'Start {analyticsId}',
      values: {
        analyticsId: item.config.id
      }
    }),
    onCancel: closeModal,
    onConfirm: startAndCloseModal,
    cancelButtonText: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.startModalCancelButton', {
      defaultMessage: 'Cancel'
    }),
    confirmButtonText: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.startModalStartButton', {
      defaultMessage: 'Start'
    }),
    defaultFocusedButton: _eui.EUI_MODAL_CONFIRM_BUTTON,
    buttonColor: "primary"
  }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.startModalBody', {
    defaultMessage: 'A data frame analytics job will increase search and indexing load in your cluster. Please stop the analytics job if excessive load is experienced. Are you sure you want to start this analytics job?'
  })))));
};

exports.StartAction = StartAction;