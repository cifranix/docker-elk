"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SnapshotDeleteProvider = void 0;

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

var SnapshotDeleteProvider = function SnapshotDeleteProvider(_ref) {
  var children = _ref.children;

  var _useServices = (0, _app_context.useServices)(),
      i18n = _useServices.i18n;

  var toastNotifications = (0, _app_context.useToastNotifications)();

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      snapshotIds = _useState2[0],
      setSnapshotIds = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isModalOpen = _useState4[0],
      setIsModalOpen = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isDeleting = _useState6[0],
      setIsDeleting = _useState6[1];

  var onSuccessCallback = (0, _react.useRef)(null);

  var deleteSnapshotPrompt = function deleteSnapshotPrompt(ids) {
    var onSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return undefined;
    };

    if (!ids || !ids.length) {
      throw new Error('No snapshot IDs specified for deletion');
    }

    setIsModalOpen(true);
    setSnapshotIds(ids);
    onSuccessCallback.current = onSuccess;
  };

  var closeModal = function closeModal() {
    setIsModalOpen(false);
    setSnapshotIds([]);
  };

  var deleteSnapshot = function deleteSnapshot() {
    var snapshotsToDelete = _toConsumableArray(snapshotIds);

    setIsDeleting(true);
    (0, _http.deleteSnapshots)(snapshotsToDelete).then(function (_ref2) {
      var data = _ref2.data,
          error = _ref2.error;

      var _ref3 = data || {
        itemsDeleted: undefined,
        errors: undefined
      },
          itemsDeleted = _ref3.itemsDeleted,
          errors = _ref3.errors; // Wait until request is done to close modal; deleting snapshots take longer due to their sequential nature


      closeModal();
      setIsDeleting(false); // Surface success notifications

      if (itemsDeleted && itemsDeleted.length) {
        var hasMultipleSuccesses = itemsDeleted.length > 1;
        var successMessage = hasMultipleSuccesses ? i18n.translate('xpack.snapshotRestore.deleteSnapshot.successMultipleNotificationTitle', {
          defaultMessage: 'Deleted {count} snapshots',
          values: {
            count: itemsDeleted.length
          }
        }) : i18n.translate('xpack.snapshotRestore.deleteSnapshot.successSingleNotificationTitle', {
          defaultMessage: "Deleted snapshot '{name}'",
          values: {
            name: itemsDeleted[0].snapshot
          }
        });
        toastNotifications.addSuccess(successMessage);

        if (onSuccessCallback.current) {
          onSuccessCallback.current(_toConsumableArray(itemsDeleted));
        }
      } // Surface error notifications
      // `error` is generic server error
      // `data.errors` are specific errors with removing particular snapshot(s)


      if (error || errors && errors.length) {
        var hasMultipleErrors = errors && errors.length > 1 || error && snapshotsToDelete.length > 1;
        var errorMessage = hasMultipleErrors ? i18n.translate('xpack.snapshotRestore.deleteSnapshot.errorMultipleNotificationTitle', {
          defaultMessage: 'Error deleting {count} snapshots',
          values: {
            count: errors && errors.length || snapshotsToDelete.length
          }
        }) : i18n.translate('xpack.snapshotRestore.deleteSnapshot.errorSingleNotificationTitle', {
          defaultMessage: "Error deleting snapshot '{name}'",
          values: {
            name: errors && errors[0].id.snapshot || snapshotsToDelete[0].snapshot
          }
        });
        toastNotifications.addDanger(errorMessage);
      }
    });
  };

  var renderModal = function renderModal() {
    if (!isModalOpen) {
      return null;
    }

    var isSingle = snapshotIds.length === 1;
    return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
      title: isSingle ? _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.deleteSingleTitle",
        defaultMessage: "Delete snapshot '{name}'?",
        values: {
          name: snapshotIds[0].snapshot
        }
      }) : _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.deleteMultipleTitle",
        defaultMessage: "Delete {count} snapshots?",
        values: {
          count: snapshotIds.length
        }
      }),
      onCancel: closeModal,
      onConfirm: deleteSnapshot,
      cancelButtonText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.cancelButtonLabel",
        defaultMessage: "Cancel"
      }),
      confirmButtonText: _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.confirmButtonLabel",
        defaultMessage: "Delete {count, plural, one {snapshot} other {snapshots}}",
        values: {
          count: snapshotIds.length
        }
      }),
      confirmButtonDisabled: isDeleting,
      buttonColor: "danger",
      "data-test-subj": "srdeleteSnapshotConfirmationModal"
    }, !isSingle ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.deleteMultipleListDescription",
      defaultMessage: "You are about to delete these snapshots:"
    })), _react.default.createElement("ul", null, snapshotIds.map(function (_ref4) {
      var snapshot = _ref4.snapshot,
          repository = _ref4.repository;
      return _react.default.createElement("li", {
        key: "".concat(repository, "/").concat(snapshot)
      }, snapshot);
    }))) : null, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.deleteMultipleDescription",
      defaultMessage: "Restore operations associated with {count, plural, one {this snapshot} other {these snapshots}} will stop.",
      values: {
        count: snapshotIds.length
      }
    })), !isSingle && isDeleting ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiCallOut, {
      color: "warning",
      title: _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexGroup, {
        gutterSize: "s",
        alignItems: "center"
      }, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement(_eui.EuiLoadingSpinner, null)), _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_react2.FormattedMessage, {
        id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.deletingCalloutTitle",
        defaultMessage: "Deleting snapshots"
      }))))
    }, _react.default.createElement("p", null, _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.snapshotRestore.deleteSnapshot.confirmModal.deletingCalloutDescription",
      defaultMessage: "This may take a few minutes."
    })))) : null));
  };

  return _react.default.createElement(_react.Fragment, null, children(deleteSnapshotPrompt), renderModal());
};

exports.SnapshotDeleteProvider = SnapshotDeleteProvider;