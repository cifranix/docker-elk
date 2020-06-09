"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RetentionExecuteModalProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../app_context");

var _http = require("../services/http");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var RetentionExecuteModalProvider = function RetentionExecuteModalProvider(_ref) {
  var children = _ref.children;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var toastNotifications = (0, _app_context.useToastNotifications)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isModalOpen = _useState2[0],
      setIsModalOpen = _useState2[1];

  var executeRetentionPrompt = function executeRetentionPrompt() {
    setIsModalOpen(true);
  };

  var closeModal = function closeModal() {
    setIsModalOpen(false);
  };

  var executeRetention = function executeRetention() {
    (0, _http.executeRetention)().then(function (_ref2) {
      var error = _ref2.error;

      if (error) {
        var errorMessage = i18n.translate('xpack.snapshotRestore.executeRetention.errorMessage', {
          defaultMessage: 'Error running retention'
        });
        toastNotifications.addDanger(errorMessage);
      } else {
        var successMessage = i18n.translate('xpack.snapshotRestore.executeRetention.successMessage', {
          defaultMessage: 'Retention is running'
        });
        toastNotifications.addSuccess(successMessage);
      }
    });
    closeModal();
  };

  var renderModal = function renderModal() {
    if (!isModalOpen) {
      return null;
    }

    return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
      title: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.executeRetention.confirmModal.executeRetentionTitle",
        defaultMessage: "Run snapshot retention now?"
      }),
      onCancel: closeModal,
      onConfirm: executeRetention,
      cancelButtonText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.executeRetention.confirmModal.cancelButtonLabel",
        defaultMessage: "Cancel"
      }),
      confirmButtonText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.executeRetention.confirmModal.confirmButtonLabel",
        defaultMessage: "Run retention"
      }),
      "data-test-subj": "executeRetentionModal"
    }));
  };

  return _react.default.createElement(_react.default.Fragment, null, children(executeRetentionPrompt), renderModal());
};

exports.RetentionExecuteModalProvider = RetentionExecuteModalProvider;