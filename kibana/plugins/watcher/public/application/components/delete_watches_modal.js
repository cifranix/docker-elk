"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteWatchesModal = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireDefault(require("react"));

var _api = require("../lib/api");

var _app_context = require("../app_context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DeleteWatchesModal = function DeleteWatchesModal(_ref) {
  var watchesToDelete = _ref.watchesToDelete,
      callback = _ref.callback;

  var _useAppContext = (0, _app_context.useAppContext)(),
      toasts = _useAppContext.toasts;

  var numWatchesToDelete = watchesToDelete.length;

  if (!numWatchesToDelete) {
    return null;
  }

  var confirmModalText = _i18n.i18n.translate('xpack.watcher.deleteSelectedWatchesConfirmModal.descriptionText', {
    defaultMessage: "You can't recover {numWatchesToDelete, plural, one {a deleted watch} other {deleted watches}}.",
    values: {
      numWatchesToDelete: numWatchesToDelete
    }
  });

  var confirmButtonText = _i18n.i18n.translate('xpack.watcher.deleteSelectedWatchesConfirmModal.deleteButtonLabel', {
    defaultMessage: 'Delete {numWatchesToDelete, plural, one {watch} other {# watches}} ',
    values: {
      numWatchesToDelete: numWatchesToDelete
    }
  });

  var cancelButtonText = _i18n.i18n.translate('xpack.watcher.deleteSelectedWatchesConfirmModal.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  });

  return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
    buttonColor: "danger",
    "data-test-subj": "deleteWatchesConfirmation",
    title: confirmButtonText,
    onCancel: function onCancel() {
      return callback();
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
              return (0, _api.deleteWatches)(watchesToDelete);

            case 2:
              _ref3 = _context.sent;
              successes = _ref3.successes;
              errors = _ref3.errors;
              numSuccesses = successes.length;
              numErrors = errors.length;
              callback(successes);

              if (numSuccesses > 0) {
                toasts.addSuccess(_i18n.i18n.translate('xpack.watcher.sections.watchList.deleteSelectedWatchesSuccessNotification.descriptionText', {
                  defaultMessage: 'Deleted {numSuccesses, number} {numSuccesses, plural, one {watch} other {watches}}',
                  values: {
                    numSuccesses: numSuccesses
                  }
                }));
              }

              if (numErrors > 0) {
                toasts.addDanger(_i18n.i18n.translate('xpack.watcher.sections.watchList.deleteSelectedWatchesErrorNotification.descriptionText', {
                  defaultMessage: 'Failed to delete {numErrors, number} {numErrors, plural, one {watch} other {watches}}',
                  values: {
                    numErrors: numErrors
                  }
                }));
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

exports.DeleteWatchesModal = DeleteWatchesModal;