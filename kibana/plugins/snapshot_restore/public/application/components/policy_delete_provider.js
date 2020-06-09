"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PolicyDeleteProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _app_context = require("../app_context");

var _http = require("../services/http");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var PolicyDeleteProvider = function PolicyDeleteProvider(_ref) {
  var children = _ref.children;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var toastNotifications = (0, _app_context.useToastNotifications)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      policyNames = _useState2[0],
      setPolicyNames = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isModalOpen = _useState4[0],
      setIsModalOpen = _useState4[1];

  var onSuccessCallback = (0, _react.useRef)(null);

  var deletePolicyPrompt = function deletePolicyPrompt(names) {
    var onSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return undefined;
    };

    if (!names || !names.length) {
      throw new Error('No policy names specified for deletion');
    }

    setIsModalOpen(true);
    setPolicyNames(names);
    onSuccessCallback.current = onSuccess;
  };

  var closeModal = function closeModal() {
    setIsModalOpen(false);
    setPolicyNames([]);
  };

  var deletePolicy = function deletePolicy() {
    var policiesToDelete = _toConsumableArray(policyNames);

    (0, _http.deletePolicies)(policiesToDelete).then(function (_ref2) {
      var data = _ref2.data,
          error = _ref2.error;

      var _ref3 = data || {
        itemsDeleted: undefined,
        errors: undefined
      },
          itemsDeleted = _ref3.itemsDeleted,
          errors = _ref3.errors; // Surface success notifications


      if (itemsDeleted && itemsDeleted.length) {
        var hasMultipleSuccesses = itemsDeleted.length > 1;
        var successMessage = hasMultipleSuccesses ? i18n.translate('xpack.snapshotRestore.deletePolicy.successMultipleNotificationTitle', {
          defaultMessage: 'Deleted {count} policies',
          values: {
            count: itemsDeleted.length
          }
        }) : i18n.translate('xpack.snapshotRestore.deletePolicy.successSingleNotificationTitle', {
          defaultMessage: "Deleted policy '{name}'",
          values: {
            name: itemsDeleted[0]
          }
        });
        toastNotifications.addSuccess(successMessage);

        if (onSuccessCallback.current) {
          onSuccessCallback.current(_toConsumableArray(itemsDeleted));
        }
      } // Surface error notifications
      // `error` is generic server error
      // `data.errors` are specific errors with removing particular policy(ies)


      if (error || errors && errors.length) {
        var hasMultipleErrors = errors && errors.length > 1 || error && policiesToDelete.length > 1;
        var errorMessage = hasMultipleErrors ? i18n.translate('xpack.snapshotRestore.deletePolicy.errorMultipleNotificationTitle', {
          defaultMessage: 'Error deleting {count} policies',
          values: {
            count: errors && errors.length || policiesToDelete.length
          }
        }) : i18n.translate('xpack.snapshotRestore.deletePolicy.errorSingleNotificationTitle', {
          defaultMessage: "Error deleting policy '{name}'",
          values: {
            name: errors && errors[0].name || policiesToDelete[0]
          }
        });
        toastNotifications.addDanger(errorMessage);
      }
    });
    closeModal();
  };

  var renderModal = function renderModal() {
    if (!isModalOpen) {
      return null;
    }

    var isSingle = policyNames.length === 1;
    return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
      title: isSingle ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deletePolicy.confirmModal.deleteSingleTitle",
        defaultMessage: "Delete policy '{name}'?",
        values: {
          name: policyNames[0]
        }
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deletePolicy.confirmModal.deleteMultipleTitle",
        defaultMessage: "Delete {count} policies?",
        values: {
          count: policyNames.length
        }
      }),
      onCancel: closeModal,
      onConfirm: deletePolicy,
      cancelButtonText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deletePolicy.confirmModal.cancelButtonLabel",
        defaultMessage: "Cancel"
      }),
      confirmButtonText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deletePolicy.confirmModal.confirmButtonLabel",
        defaultMessage: "Delete {count, plural, one {policy} other {policies}}",
        values: {
          count: policyNames.length
        }
      }),
      buttonColor: "danger",
      "data-test-subj": "srdeletePolicyConfirmationModal"
    }, !isSingle ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.deletePolicy.confirmModal.deleteMultipleListDescription",
      defaultMessage: "You are about to delete these policies:"
    })), _react.default.createElement("ul", null, policyNames.map(function (name) {
      return _react.default.createElement("li", {
        key: name
      }, name);
    }))) : null));
  };

  return _react.default.createElement(_react.Fragment, null, children(deletePolicyPrompt), renderModal());
};

exports.PolicyDeleteProvider = PolicyDeleteProvider;