"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteModalConfirmation = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _app_context = require("../app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DeleteModalConfirmation = function DeleteModalConfirmation(_ref) {
  var idsToDelete = _ref.idsToDelete,
      apiDeleteCall = _ref.apiDeleteCall,
      onDeleted = _ref.onDeleted,
      _onCancel = _ref.onCancel,
      onErrors = _ref.onErrors,
      singleTitle = _ref.singleTitle,
      multipleTitle = _ref.multipleTitle;

  var _useAppDependencies = (0, _app_context.useAppDependencies)(),
      http = _useAppDependencies.http,
      toastNotifications = _useAppDependencies.toastNotifications;

  var numIdsToDelete = idsToDelete.length;

  if (!numIdsToDelete) {
    return null;
  }

  var confirmModalText = _i18n.i18n.translate('xpack.triggersActionsUI.deleteSelectedIdsConfirmModal.descriptionText', {
    defaultMessage: "You can't recover {numIdsToDelete, plural, one {a deleted {singleTitle}} other {deleted {multipleTitle}}}.",
    values: {
      numIdsToDelete: numIdsToDelete,
      singleTitle: singleTitle,
      multipleTitle: multipleTitle
    }
  });

  var confirmButtonText = _i18n.i18n.translate('xpack.triggersActionsUI.deleteSelectedIdsConfirmModal.deleteButtonLabel', {
    defaultMessage: 'Delete {numIdsToDelete, plural, one {{singleTitle}} other {# {multipleTitle}}} ',
    values: {
      numIdsToDelete: numIdsToDelete,
      singleTitle: singleTitle,
      multipleTitle: multipleTitle
    }
  });

  var cancelButtonText = _i18n.i18n.translate('xpack.triggersActionsUI.deleteSelectedIdsConfirmModal.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  });

  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    buttonColor: "danger",
    "data-test-subj": "deleteIdsConfirmation",
    title: confirmButtonText,
    onCancel: function onCancel() {
      return _onCancel();
    },
    onConfirm:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var _ref3, successes, errors, numSuccesses, numErrors;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return apiDeleteCall({
                ids: idsToDelete,
                http: http
              });

            case 2:
              _ref3 = _context.sent;
              successes = _ref3.successes;
              errors = _ref3.errors;
              numSuccesses = successes.length;
              numErrors = errors.length;
              onDeleted(successes);

              if (numSuccesses > 0) {
                toastNotifications.addSuccess(_i18n.i18n.translate('xpack.triggersActionsUI.components.deleteSelectedIdsSuccessNotification.descriptionText', {
                  defaultMessage: 'Deleted {numSuccesses, number} {numSuccesses, plural, one {{singleTitle}} other {{multipleTitle}}}',
                  values: {
                    numSuccesses: numSuccesses,
                    singleTitle: singleTitle,
                    multipleTitle: multipleTitle
                  }
                }));
              }

              if (numErrors > 0) {
                toastNotifications.addDanger(_i18n.i18n.translate('xpack.triggersActionsUI.components.deleteSelectedIdsErrorNotification.descriptionText', {
                  defaultMessage: 'Failed to delete {numErrors, number} {numErrors, plural, one {{singleTitle}} other {{multipleTitle}}}',
                  values: {
                    numErrors: numErrors,
                    singleTitle: singleTitle,
                    multipleTitle: multipleTitle
                  }
                }));
                onErrors();
              }

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })),
    cancelButtonText: cancelButtonText,
    confirmButtonText: confirmButtonText
  }, confirmModalText));
};

exports.DeleteModalConfirmation = DeleteModalConfirmation;