"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAction = void 0;

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

var DeleteAction = function DeleteAction(_ref) {
  var item = _ref.item;
  var disabled = (0, _common.isDataFrameAnalyticsRunning)(item.stats.state);
  var canDeleteDataFrameAnalytics = (0, _check_privilege.checkPermission)('canDeleteDataFrameAnalytics');

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModalVisible = _useState2[0],
      setModalVisible = _useState2[1];

  var closeModal = function closeModal() {
    return setModalVisible(false);
  };

  var deleteAndCloseModal = function deleteAndCloseModal() {
    setModalVisible(false);
    (0, _analytics_service.deleteAnalytics)(item);
  };

  var openModal = function openModal() {
    return setModalVisible(true);
  };

  var buttonDeleteText = _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteActionName', {
    defaultMessage: 'Delete'
  });

  var deleteButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    "data-test-subj": "mlAnalyticsJobDeleteButton",
    size: "xs",
    color: "text",
    disabled: disabled || !canDeleteDataFrameAnalytics,
    iconType: "trash",
    onClick: openModal,
    "aria-label": buttonDeleteText,
    style: {
      padding: 0
    }
  }, buttonDeleteText);

  if (disabled || !canDeleteDataFrameAnalytics) {
    deleteButton = _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: disabled ? _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteActionDisabledToolTipContent', {
        defaultMessage: 'Stop the data frame analytics in order to delete it.'
      }) : (0, _check_privilege.createPermissionFailureMessage)('canStartStopDataFrameAnalytics')
    }, deleteButton);
  }

  return _react.default.createElement(_react.Fragment, null, deleteButton, isModalVisible && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteModalTitle', {
      defaultMessage: 'Delete {analyticsId}',
      values: {
        analyticsId: item.config.id
      }
    }),
    onCancel: closeModal,
    onConfirm: deleteAndCloseModal,
    cancelButtonText: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteModalCancelButton', {
      defaultMessage: 'Cancel'
    }),
    confirmButtonText: _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteModalDeleteButton', {
      defaultMessage: 'Delete'
    }),
    defaultFocusedButton: _eui.EUI_MODAL_CONFIRM_BUTTON,
    buttonColor: "danger"
  }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.ml.dataframe.analyticsList.deleteModalBody', {
    defaultMessage: "Are you sure you want to delete this analytics job? The analytics job's destination index and optional Kibana index pattern will not be deleted."
  })))));
};

exports.DeleteAction = DeleteAction;