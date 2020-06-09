"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectorAddModal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _action_connector_form = require("./action_connector_form");

var _connector_reducer = require("./connector_reducer");

var _action_connector_api = require("../../lib/action_connector_api");

require("./connector_add_modal.scss");

var _plugin = require("../../constants/plugin");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ConnectorAddModal = function ConnectorAddModal(_ref) {
  var actionType = _ref.actionType,
      addModalVisible = _ref.addModalVisible,
      setAddModalVisibility = _ref.setAddModalVisibility,
      postSaveEventHandler = _ref.postSaveEventHandler,
      http = _ref.http,
      toastNotifications = _ref.toastNotifications,
      actionTypeRegistry = _ref.actionTypeRegistry;
  var hasErrors = false;
  var initialConnector = {
    actionTypeId: actionType.id,
    config: {},
    secrets: {}
  };

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSaving = _useState2[0],
      setIsSaving = _useState2[1];

  var _useReducer = (0, _react.useReducer)(_connector_reducer.connectorReducer, {
    connector: initialConnector
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      connector = _useReducer2[0].connector,
      dispatch = _useReducer2[1];

  var setConnector = function setConnector(value) {
    dispatch({
      command: {
        type: 'setConnector'
      },
      payload: {
        key: 'connector',
        value: value
      }
    });
  };

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      serverError = _useState4[0],
      setServerError = _useState4[1];

  var closeModal = (0, _react.useCallback)(function () {
    setAddModalVisibility(false);
    setConnector(initialConnector);
    setServerError(undefined);
  }, [initialConnector, setAddModalVisibility]);

  if (!addModalVisible) {
    return null;
  }

  var actionTypeModel = actionTypeRegistry.get(actionType.id);

  var errors = _objectSpread({}, actionTypeModel === null || actionTypeModel === void 0 ? void 0 : actionTypeModel.validateConnector(connector).errors, {}, (0, _action_connector_form.validateBaseProperties)(connector).errors);

  hasErrors = !!Object.keys(errors).find(function (errorKey) {
    return errors[errorKey].length >= 1;
  });

  var onActionConnectorSave =
  /*#__PURE__*/
  function () {
    var _ref2 = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _action_connector_api.createActionConnector)({
                http: http,
                connector: connector
              }).then(function (savedConnector) {
                if (toastNotifications) {
                  toastNotifications.addSuccess(_i18n.i18n.translate('xpack.triggersActionsUI.sections.addModalConnectorForm.updateSuccessNotificationText', {
                    defaultMessage: "Created '{connectorName}'",
                    values: {
                      connectorName: savedConnector.name
                    }
                  }));
                }

                return savedConnector;
              }).catch(function (errorRes) {
                setServerError(errorRes);
                return undefined;
              });

            case 2:
              return _context.abrupt("return", _context.sent);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onActionConnectorSave() {
      return _ref2.apply(this, arguments);
    };
  }();

  return _react.default.createElement(_eui.EuiOverlayMask, {
    className: "actConnectorModal"
  }, _react.default.createElement(_eui.EuiModal, {
    onClose: closeModal
  }, _react.default.createElement(_eui.EuiModalHeader, null, _react.default.createElement(_eui.EuiModalHeaderTitle, null, _react.default.createElement(_eui.EuiFlexGroup, {
    gutterSize: "m",
    alignItems: "center"
  }, actionTypeModel && actionTypeModel.iconClass ? _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiIcon, {
    type: actionTypeModel.iconClass,
    size: "xl"
  })) : null, _react.default.createElement(_eui.EuiFlexItem, null, _react.default.createElement(_eui.EuiTitle, {
    size: "s"
  }, _react.default.createElement("h3", {
    id: "flyoutTitle"
  }, _react.default.createElement(_react2.FormattedMessage, {
    defaultMessage: "{actionTypeName} connector",
    id: "xpack.triggersActionsUI.sections.addModalConnectorForm.flyoutTitle",
    values: {
      actionTypeName: actionType.name
    }
  }), "\u2003", _react.default.createElement(_eui.EuiBetaBadge, {
    label: "Beta",
    tooltipContent: _i18n.i18n.translate('xpack.triggersActionsUI.sections.addModalConnectorForm.betaBadgeTooltipContent', {
      defaultMessage: '{pluginName} is in beta and is subject to change. The design and code is less mature than official GA features and is being provided as-is with no warranties. Beta features are not subject to the support SLA of official GA features.',
      values: {
        pluginName: _plugin.PLUGIN.getI18nName(_i18n.i18n)
      }
    })
  }))))))), _react.default.createElement(_eui.EuiModalBody, null, _react.default.createElement(_action_connector_form.ActionConnectorForm, {
    connector: connector,
    actionTypeName: actionType.name,
    dispatch: dispatch,
    serverError: serverError,
    errors: errors,
    actionTypeRegistry: actionTypeRegistry,
    http: http
  })), _react.default.createElement(_eui.EuiModalFooter, null, _react.default.createElement(_eui.EuiButtonEmpty, {
    onClick: closeModal
  }, _i18n.i18n.translate('xpack.triggersActionsUI.sections.addModalConnectorForm.cancelButtonLabel', {
    defaultMessage: 'Cancel'
  })), _react.default.createElement(_eui.EuiButton, {
    fill: true,
    color: "secondary",
    "data-test-subj": "saveActionButtonModal",
    type: "submit",
    iconType: "check",
    isDisabled: hasErrors,
    isLoading: isSaving,
    onClick:
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var savedAction;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              setIsSaving(true);
              _context2.next = 3;
              return onActionConnectorSave();

            case 3:
              savedAction = _context2.sent;
              setIsSaving(false);

              if (savedAction) {
                if (postSaveEventHandler) {
                  postSaveEventHandler(savedAction);
                }

                closeModal();
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.sections.addModalConnectorForm.saveButtonLabel",
    defaultMessage: "Save"
  })))));
};

exports.ConnectorAddModal = ConnectorAddModal;