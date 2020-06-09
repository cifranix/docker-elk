"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastNotificationText = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _public = require("../../../../../../src/plugins/kibana_react/public");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var MAX_SIMPLE_MESSAGE_LENGTH = 140; // Because of the use of `toMountPoint`, `useKibanaContext` doesn't work via `useAppDependencies`.
// That's why we need to pass in `overlays` as a prop cannot get it via context.

var ToastNotificationText = function ToastNotificationText(_ref) {
  var overlays = _ref.overlays,
      text = _ref.text;

  if (typeof text === 'string' && text.length <= MAX_SIMPLE_MESSAGE_LENGTH) {
    return text;
  }

  if (_typeof(text) === 'object' && typeof text.message === 'string' && text.message.length <= MAX_SIMPLE_MESSAGE_LENGTH) {
    return text.message;
  }

  var unformattedText = text.message ? text.message : text;
  var formattedText = _typeof(unformattedText) === 'object' ? JSON.stringify(text, null, 2) : text;
  var previewText = "".concat(formattedText.substring(0, 140)).concat(formattedText.length > 140 ? ' ...' : '');

  var openModal = function openModal() {
    var modal = overlays.openModal((0, _public.toMountPoint)(_react.default.createElement(_eui.EuiModal, {
      onClose: function onClose() {
        return modal.close();
      }
    }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _i18n.i18n.translate('xpack.transform.toastText.modalTitle', {
      defaultMessage: 'Error details'
    }))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_eui.EuiCodeBlock, {
      language: "json",
      fontSize: "m",
      paddingSize: "s",
      isCopyable: true
    }, formattedText)), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
      onClick: function onClick() {
        return modal.close();
      }
    }, _i18n.i18n.translate('xpack.transform.toastText.closeModalButtonText', {
      defaultMessage: 'Close'
    }))))));
  };

  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("pre", null, previewText), _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: openModal
  }, _i18n.i18n.translate('xpack.transform.toastText.openModalButtonText', {
    defaultMessage: 'View details'
  })));
};

exports.ToastNotificationText = ToastNotificationText;