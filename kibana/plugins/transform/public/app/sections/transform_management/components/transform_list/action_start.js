"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StartAction = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../common");

var _hooks = require("../../../../hooks");

var _authorization = require("../../../../lib/authorization");

var _common2 = require("../../../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var StartAction = function StartAction(_ref) {
  var items = _ref.items,
      forceDisable = _ref.forceDisable;
  var isBulkAction = items.length > 1;
  var canStartStopTransform = (0, _react.useContext)(_authorization.AuthorizationContext).capabilities.canStartStopTransform;
  var startTransforms = (0, _hooks.useStartTransforms)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModalVisible = _useState2[0],
      setModalVisible = _useState2[1];

  var closeModal = function closeModal() {
    return setModalVisible(false);
  };

  var startAndCloseModal = function startAndCloseModal() {
    setModalVisible(false);
    startTransforms(items);
  };

  var openModal = function openModal() {
    return setModalVisible(true);
  };

  var buttonStartText = _i18n.i18n.translate('xpack.transform.transformList.startActionName', {
    defaultMessage: 'Start'
  }); // Disable start for batch transforms which have completed.


  var completedBatchTransform = items.some(function (i) {
    return (0, _common2.isCompletedBatchTransform)(i);
  }); // Disable start action if one of the transforms is already started or trying to restart will throw error

  var startedTransform = items.some(function (i) {
    return i.stats.state === _common.TRANSFORM_STATE.STARTED;
  });
  var startedTransformMessage;
  var completedBatchTransformMessage;

  if (isBulkAction === true) {
    startedTransformMessage = _i18n.i18n.translate('xpack.transform.transformList.startedTransformBulkToolTip', {
      defaultMessage: 'One or more transforms are already started.'
    });
    completedBatchTransformMessage = _i18n.i18n.translate('xpack.transform.transformList.completeBatchTransformBulkActionToolTip', {
      defaultMessage: 'One or more transforms are completed batch transforms and cannot be restarted.'
    });
  } else {
    startedTransformMessage = _i18n.i18n.translate('xpack.transform.transformList.startedTransformToolTip', {
      defaultMessage: '{transformId} is already started.',
      values: {
        transformId: items[0] && items[0].config.id
      }
    });
    completedBatchTransformMessage = _i18n.i18n.translate('xpack.transform.transformList.completeBatchTransformToolTip', {
      defaultMessage: '{transformId} is a completed batch transform and cannot be restarted.',
      values: {
        transformId: items[0] && items[0].config.id
      }
    });
  }

  var actionIsDisabled = !canStartStopTransform || completedBatchTransform || startedTransform;

  var startButton = _react.default.createElement(_eui.EuiButtonEmpty, {
    size: "xs",
    color: "text",
    disabled: forceDisable === true || actionIsDisabled,
    iconType: "play",
    onClick: openModal,
    "aria-label": buttonStartText
  }, buttonStartText);

  if (actionIsDisabled) {
    var content;

    if (!canStartStopTransform) {
      content = (0, _authorization.createCapabilityFailureMessage)('canStartStopTransform');
    } else if (completedBatchTransform) {
      content = completedBatchTransformMessage;
    } else if (startedTransform) {
      content = startedTransformMessage;
    }

    startButton = _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: content
    }, startButton);
  }

  var bulkStartModalTitle = _i18n.i18n.translate('xpack.transform.transformList.bulkStartModalTitle', {
    defaultMessage: 'Start {count} {count, plural, one {transform} other {transforms}}?',
    values: {
      count: items && items.length
    }
  });

  var startModalTitle = _i18n.i18n.translate('xpack.transform.transformList.startModalTitle', {
    defaultMessage: 'Start {transformId}',
    values: {
      transformId: items[0] && items[0].config.id
    }
  });

  return _react.default.createElement(_react.Fragment, null, startButton, isModalVisible && _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    title: isBulkAction === true ? bulkStartModalTitle : startModalTitle,
    onCancel: closeModal,
    onConfirm: startAndCloseModal,
    cancelButtonText: _i18n.i18n.translate('xpack.transform.transformList.startModalCancelButton', {
      defaultMessage: 'Cancel'
    }),
    confirmButtonText: _i18n.i18n.translate('xpack.transform.transformList.startModalStartButton', {
      defaultMessage: 'Start'
    }),
    defaultFocusedButton: _eui.EUI_MODAL_CONFIRM_BUTTON,
    buttonColor: "primary"
  }, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.transform.transformList.startModalBody', {
    defaultMessage: 'A transform will increase search and indexing load in your cluster. Please stop the transform if excessive load is experienced. Are you sure you want to start {count, plural, one {this} other {these}} {count} {count, plural, one {transform} other {transforms}}?',
    values: {
      count: items.length
    }
  })))));
};

exports.StartAction = StartAction;