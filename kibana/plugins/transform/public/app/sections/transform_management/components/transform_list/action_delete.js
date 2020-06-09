"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteAction = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../common");

var _hooks = require("../../../../hooks");

var _authorization = require("../../../../lib/authorization");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DeleteAction = function DeleteAction(_ref) {
  var items = _ref.items,
      forceDisable = _ref.forceDisable;
  var isBulkAction = items.length > 1;
  var disabled = items.some(function (i) {
    return i.stats.state !== _common.TRANSFORM_STATE.STOPPED;
  });
  var canDeleteTransform = (0, _react.useContext)(_authorization.AuthorizationContext).capabilities.canDeleteTransform;
  var deleteTransforms = (0, _hooks.useDeleteTransforms)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModalVisible = _useState2[0],
      setModalVisible = _useState2[1];

  var closeModal = function closeModal() {
    return setModalVisible(false);
  };

  var deleteAndCloseModal = function deleteAndCloseModal() {
    setModalVisible(false);
    deleteTransforms(items);
  };

  var openModal = function openModal() {
    return setModalVisible(true);
  };

  var buttonDeleteText = _i18n.i18n.translate('xpack.transform.transformList.deleteActionName', {
    defaultMessage: 'Delete'
  });

  var bulkDeleteButtonDisabledText = _i18n.i18n.translate('xpack.transform.transformList.deleteBulkActionDisabledToolTipContent', {
    defaultMessage: 'One or more selected transforms must be stopped in order to be deleted.'
  });

  var deleteButtonDisabledText = _i18n.i18n.translate('xpack.transform.transformList.deleteActionDisabledToolTipContent', {
    defaultMessage: 'Stop the transform in order to delete it.'
  });

  var bulkDeleteModalTitle = _i18n.i18n.translate('xpack.transform.transformList.bulkDeleteModalTitle', {
    defaultMessage: 'Delete {count} {count, plural, one {transform} other {transforms}}?',
    values: {
      count: items.length
    }
  });

  var deleteModalTitle = _i18n.i18n.translate('xpack.transform.transformList.deleteModalTitle', {
    defaultMessage: 'Delete {transformId}',
    values: {
      transformId: items[0] && items[0].config.id
    }
  });

  var bulkDeleteModalMessage = _i18n.i18n.translate('xpack.transform.transformList.bulkDeleteModalBody', {
    defaultMessage: "Are you sure you want to delete {count, plural, one {this} other {these}} {count} {count, plural, one {transform} other {transforms}}? The transform's destination index and optional Kibana index pattern will not be deleted.",
    values: {
      count: items.length
    }
  });

  var deleteModalMessage = _i18n.i18n.translate('xpack.transform.transformList.deleteModalBody', {
    defaultMessage: "Are you sure you want to delete this transform? The transform's destination index and optional Kibana index pattern will not be deleted."
  });

  var deleteButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    color: "text",
    disabled: forceDisable === true || disabled || !canDeleteTransform,
    iconType: "trash",
    onClick: openModal,
    "aria-label": buttonDeleteText
  }, buttonDeleteText);

  if (disabled || !canDeleteTransform) {
    var content;

    if (disabled) {
      content = isBulkAction === true ? bulkDeleteButtonDisabledText : deleteButtonDisabledText;
    } else {
      content = (0, _authorization.createCapabilityFailureMessage)('canDeleteTransform');
    }

    deleteButton = _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: content
    }, deleteButton);
  }

  return _react.default.createElement(_react.Fragment, null, deleteButton, isModalVisible && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: isBulkAction === true ? bulkDeleteModalTitle : deleteModalTitle,
    onCancel: closeModal,
    onConfirm: deleteAndCloseModal,
    cancelButtonText: _i18n.i18n.translate('xpack.transform.transformList.deleteModalCancelButton', {
      defaultMessage: 'Cancel'
    }),
    confirmButtonText: _i18n.i18n.translate('xpack.transform.transformList.deleteModalDeleteButton', {
      defaultMessage: 'Delete'
    }),
    defaultFocusedButton: _eui.EUI_MODAL_CONFIRM_BUTTON,
    buttonColor: "danger"
  }, _react.default.createElement("p", null, isBulkAction === true ? bulkDeleteModalMessage : deleteModalMessage))));
};

exports.DeleteAction = DeleteAction;