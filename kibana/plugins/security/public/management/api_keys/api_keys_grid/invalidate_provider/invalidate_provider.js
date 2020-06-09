"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InvalidateProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var InvalidateProvider = function InvalidateProvider(_ref) {
  var isAdmin = _ref.isAdmin,
      children = _ref.children,
      notifications = _ref.notifications,
      apiKeysAPIClient = _ref.apiKeysAPIClient;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      apiKeys = _useState2[0],
      setApiKeys = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isModalOpen = _useState4[0],
      setIsModalOpen = _useState4[1];

  var onSuccessCallback = (0, _react.useRef)(null);

  var invalidateApiKeyPrompt = function invalidateApiKeyPrompt(keys) {
    var onSuccess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {
      return undefined;
    };

    if (!keys || !keys.length) {
      throw new Error('No API key IDs specified for invalidation');
    }

    setIsModalOpen(true);
    setApiKeys(keys);
    onSuccessCallback.current = onSuccess;
  };

  var closeModal = function closeModal() {
    setIsModalOpen(false);
    setApiKeys([]);
  };

  var invalidateApiKey =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var result, error, errors, _result, itemsInvalidated, _result2, hasMultipleSuccesses, successMessage, hasMultipleErrors, errorMessage;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return apiKeysAPIClient.invalidateApiKeys(apiKeys, isAdmin);

            case 3:
              result = _context.sent;
              _context.next = 9;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              error = _context.t0;

            case 9:
              closeModal();

              if (result) {
                _result = result, itemsInvalidated = _result.itemsInvalidated;
                _result2 = result;
                errors = _result2.errors;

                // Surface success notifications
                if (itemsInvalidated && itemsInvalidated.length) {
                  hasMultipleSuccesses = itemsInvalidated.length > 1;
                  successMessage = hasMultipleSuccesses ? _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.successMultipleNotificationTitle', {
                    defaultMessage: 'Invalidated {count} API keys',
                    values: {
                      count: itemsInvalidated.length
                    }
                  }) : _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.successSingleNotificationTitle', {
                    defaultMessage: "Invalidated API key '{name}'",
                    values: {
                      name: itemsInvalidated[0].name
                    }
                  });
                  notifications.toasts.addSuccess(successMessage);

                  if (onSuccessCallback.current) {
                    onSuccessCallback.current(_toConsumableArray(itemsInvalidated));
                  }
                }
              } // Surface error notifications
              // `error` is generic server error
              // `errors` are specific errors with removing particular API keys


              if (error || errors && errors.length) {
                hasMultipleErrors = errors && errors.length > 1 || error && apiKeys.length > 1;
                errorMessage = hasMultipleErrors ? _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.errorMultipleNotificationTitle', {
                  defaultMessage: 'Error deleting {count} apiKeys',
                  values: {
                    count: errors && errors.length || apiKeys.length
                  }
                }) : _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.errorSingleNotificationTitle', {
                  defaultMessage: "Error deleting API key '{name}'",
                  values: {
                    name: errors && errors[0].name || apiKeys[0].name
                  }
                });
                notifications.toasts.addDanger(errorMessage);
              }

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    }));

    return function invalidateApiKey() {
      return _ref2.apply(this, arguments);
    };
  }();

  var renderModal = function renderModal() {
    if (!isModalOpen) {
      return null;
    }

    var isSingle = apiKeys.length === 1;
    return _react.default.createElement(_eui.EuiOverlayMask, null, _react.default.createElement(_eui.EuiConfirmModal, {
      title: isSingle ? _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.confirmModal.invalidateSingleTitle', {
        defaultMessage: "Invalidate API key '{name}'?",
        values: {
          name: apiKeys[0].name
        }
      }) : _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.confirmModal.invalidateMultipleTitle', {
        defaultMessage: 'Invalidate {count} API keys?',
        values: {
          count: apiKeys.length
        }
      }),
      onCancel: closeModal,
      onConfirm: invalidateApiKey,
      cancelButtonText: _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.confirmModal.cancelButtonLabel', {
        defaultMessage: 'Cancel'
      }),
      confirmButtonText: _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.confirmModal.confirmButtonLabel', {
        defaultMessage: 'Invalidate {count, plural, one {API key} other {API keys}}',
        values: {
          count: apiKeys.length
        }
      }),
      buttonColor: "danger",
      "data-test-subj": "invalidateApiKeyConfirmationModal"
    }, !isSingle ? _react.default.createElement(_react.Fragment, null, _react.default.createElement("p", null, _i18n.i18n.translate('xpack.security.management.apiKeys.invalidateApiKey.confirmModal.invalidateMultipleListDescription', {
      defaultMessage: 'You are about to invalidate these API keys:'
    })), _react.default.createElement("ul", null, apiKeys.map(function (_ref3) {
      var name = _ref3.name,
          id = _ref3.id;
      return _react.default.createElement("li", {
        key: id
      }, name);
    }))) : null));
  };

  return _react.default.createElement(_react.Fragment, null, children(invalidateApiKeyPrompt), renderModal());
};

exports.InvalidateProvider = InvalidateProvider;