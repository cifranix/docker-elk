"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeleteProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var DeleteProvider = function DeleteProvider(_ref) {
  var roleMappingsAPI = _ref.roleMappingsAPI,
      children = _ref.children,
      notifications = _ref.notifications;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      roleMappings = _useState2[0],
      setRoleMappings = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isModalOpen = _useState4[0],
      setIsModalOpen = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isDeleteInProgress = _useState6[0],
      setIsDeleteInProgress = _useState6[1];

  var onSuccessCallback = (0, _react.useRef)(null);

  var deleteRoleMappingsPrompt = function deleteRoleMappingsPrompt(roleMappingsToDelete) {
    var onSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return undefined;
    };

    if (!roleMappingsToDelete || !roleMappingsToDelete.length) {
      throw new Error('No Role Mappings specified for delete');
    }

    setIsModalOpen(true);
    setRoleMappings(roleMappingsToDelete);
    onSuccessCallback.current = onSuccess;
  };

  var closeModal = function closeModal() {
    setIsModalOpen(false);
    setRoleMappings([]);
  };

  var deleteRoleMappings =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var result, successfulDeletes, erroredDeletes, hasMultipleSuccesses, successMessage, hasMultipleErrors, errorMessage;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setIsDeleteInProgress(true);
              _context.prev = 1;
              _context.next = 4;
              return roleMappingsAPI.deleteRoleMappings(roleMappings.map(function (rm) {
                return rm.name;
              }));

            case 4:
              result = _context.sent;
              _context.next = 12;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);
              notifications.toasts.addError(_context.t0, {
                title: _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.unknownError', {
                  defaultMessage: 'Error deleting role mappings'
                })
              });
              setIsDeleteInProgress(false);
              return _context.abrupt("return");

            case 12:
              setIsDeleteInProgress(false);
              closeModal();
              successfulDeletes = result.filter(function (res) {
                return res.success;
              });
              erroredDeletes = result.filter(function (res) {
                return !res.success;
              }); // Surface success notifications

              if (successfulDeletes.length > 0) {
                hasMultipleSuccesses = successfulDeletes.length > 1;
                successMessage = hasMultipleSuccesses ? _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.successMultipleNotificationTitle', {
                  defaultMessage: 'Deleted {count} role mappings',
                  values: {
                    count: successfulDeletes.length
                  }
                }) : _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.successSingleNotificationTitle', {
                  defaultMessage: "Deleted role mapping '{name}'",
                  values: {
                    name: successfulDeletes[0].name
                  }
                });
                notifications.toasts.addSuccess({
                  title: successMessage,
                  'data-test-subj': 'deletedRoleMappingSuccessToast'
                });

                if (onSuccessCallback.current) {
                  onSuccessCallback.current(successfulDeletes.map(function (_ref3) {
                    var name = _ref3.name;
                    return name;
                  }));
                }
              } // Surface error notifications


              if (erroredDeletes.length > 0) {
                hasMultipleErrors = erroredDeletes.length > 1;
                errorMessage = hasMultipleErrors ? _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.errorMultipleNotificationTitle', {
                  defaultMessage: 'Error deleting {count} role mappings',
                  values: {
                    count: erroredDeletes.length
                  }
                }) : _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.errorSingleNotificationTitle', {
                  defaultMessage: "Error deleting role mapping '{name}'",
                  values: {
                    name: erroredDeletes[0].name
                  }
                });
                notifications.toasts.addDanger(errorMessage);
              }

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 7]]);
    }));

    return function deleteRoleMappings() {
      return _ref2.apply(this, arguments);
    };
  }();

  var renderModal = function renderModal() {
    if (!isModalOpen) {
      return null;
    }

    var isSingle = roleMappings.length === 1;
    return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
      title: isSingle ? _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.confirmModal.deleteSingleTitle', {
        defaultMessage: "Delete role mapping '{name}'?",
        values: {
          name: roleMappings[0].name
        }
      }) : _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.confirmModal.deleteMultipleTitle', {
        defaultMessage: 'Delete {count} role mappings?',
        values: {
          count: roleMappings.length
        }
      }),
      onCancel: closeModal,
      onConfirm: deleteRoleMappings,
      cancelButtonText: _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.confirmModal.cancelButtonLabel', {
        defaultMessage: 'Cancel'
      }),
      confirmButtonText: _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.confirmModal.confirmButtonLabel', {
        defaultMessage: 'Delete {count, plural, one {role mapping} other {role mappings}}',
        values: {
          count: roleMappings.length
        }
      }),
      confirmButtonDisabled: isDeleteInProgress,
      buttonColor: "danger",
      "data-test-subj": "deleteRoleMappingConfirmationModal"
    }, !isSingle ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.security.management.roleMappings.deleteRoleMapping.confirmModal.deleteMultipleListDescription', {
      defaultMessage: 'You are about to delete these role mappings:'
    })), _react.default.createElement("ul", null, roleMappings.map(function (_ref4) {
      var name = _ref4.name;
      return _react.default.createElement("li", {
        key: name
      }, name);
    }))) : null));
  };

  return _react.default.createElement(_react.Fragment, null, children(deleteRoleMappingsPrompt), renderModal());
};

exports.DeleteProvider = DeleteProvider;