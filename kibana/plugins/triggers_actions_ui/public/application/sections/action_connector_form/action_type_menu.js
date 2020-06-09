"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionTypeMenu = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _action_connector_api = require("../../lib/action_connector_api");

var _actions_connectors_context = require("../../context/actions_connectors_context");

var _action_type_compare = require("../../lib/action_type_compare");

var _check_action_type_enabled = require("../../lib/check_action_type_enabled");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ActionTypeMenu = function ActionTypeMenu(_ref) {
  var onActionTypeChange = _ref.onActionTypeChange,
      actionTypes = _ref.actionTypes,
      setHasActionsDisabledByLicense = _ref.setHasActionsDisabledByLicense;

  var _useActionsConnectors = (0, _actions_connectors_context.useActionsConnectorsContext)(),
      http = _useActionsConnectors.http,
      toastNotifications = _useActionsConnectors.toastNotifications,
      actionTypeRegistry = _useActionsConnectors.actionTypeRegistry;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      actionTypesIndex = _useState2[0],
      setActionTypesIndex = _useState2[1];

  (0, _react.useEffect)(function () {
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var availableActionTypes, index, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, actionTypeItem, hasActionsDisabledByLicense;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(actionTypes !== null && actionTypes !== void 0)) {
                _context.next = 5;
                break;
              }

              _context.t0 = actionTypes;
              _context.next = 8;
              break;

            case 5:
              _context.next = 7;
              return (0, _action_connector_api.loadActionTypes)({
                http: http
              });

            case 7:
              _context.t0 = _context.sent;

            case 8:
              availableActionTypes = _context.t0;
              index = {};
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 13;

              for (_iterator = availableActionTypes[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                actionTypeItem = _step.value;
                index[actionTypeItem.id] = actionTypeItem;
              }

              _context.next = 21;
              break;

            case 17:
              _context.prev = 17;
              _context.t1 = _context["catch"](13);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 21:
              _context.prev = 21;
              _context.prev = 22;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 24:
              _context.prev = 24;

              if (!_didIteratorError) {
                _context.next = 27;
                break;
              }

              throw _iteratorError;

            case 27:
              return _context.finish(24);

            case 28:
              return _context.finish(21);

            case 29:
              setActionTypesIndex(index);

              if (setHasActionsDisabledByLicense) {
                hasActionsDisabledByLicense = availableActionTypes.some(function (action) {
                  return !index[action.id].enabledInLicense;
                });
                setHasActionsDisabledByLicense(hasActionsDisabledByLicense);
              }

              _context.next = 36;
              break;

            case 33:
              _context.prev = 33;
              _context.t2 = _context["catch"](0);

              if (toastNotifications) {
                toastNotifications.addDanger({
                  title: _i18n.i18n.translate('xpack.triggersActionsUI.sections.actionsConnectorsList.unableToLoadActionTypesMessage', {
                    defaultMessage: 'Unable to load action types'
                  })
                });
              }

            case 36:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 33], [13, 17, 21, 29], [22,, 24, 28]]);
    }))(); // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);
  var registeredActionTypes = Object.entries(actionTypesIndex !== null && actionTypesIndex !== void 0 ? actionTypesIndex : []).filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        id = _ref4[0],
        details = _ref4[1];

    return actionTypeRegistry.has(id) && details.enabledInConfig === true;
  }).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        id = _ref6[0],
        actionType = _ref6[1];

    var actionTypeModel = actionTypeRegistry.get(id);
    return {
      iconClass: actionTypeModel ? actionTypeModel.iconClass : '',
      selectMessage: actionTypeModel ? actionTypeModel.selectMessage : '',
      actionType: actionType,
      name: actionType.name,
      typeName: id.replace('.', '')
    };
  });
  var cardNodes = registeredActionTypes.sort(function (a, b) {
    return (0, _action_type_compare.actionTypeCompare)(a.actionType, b.actionType);
  }).map(function (item, index) {
    var checkEnabledResult = (0, _check_action_type_enabled.checkActionTypeEnabled)(item.actionType);

    var card = _react.default.createElement(_eui.EuiCard, {
      titleSize: "xs",
      "data-test-subj": "".concat(item.actionType.id, "-card"),
      icon: _react.default.createElement(_eui.EuiIcon, {
        size: "l",
        type: item.iconClass
      }),
      title: item.name,
      description: item.selectMessage,
      isDisabled: !checkEnabledResult.isEnabled,
      onClick: function onClick() {
        return onActionTypeChange(item.actionType);
      }
    });

    return _react.default.createElement(_eui.EuiFlexItem, {
      key: index
    }, checkEnabledResult.isEnabled && card, checkEnabledResult.isEnabled === false && _react.default.createElement(_eui.EuiToolTip, {
      position: "top",
      content: checkEnabledResult.message
    }, card));
  });
  return _react.default.createElement("div", {
    className: "actConnectorsListGrid"
  }, _react.default.createElement(_eui.EuiSpacer, {
    size: "s"
  }), _react.default.createElement(_eui.EuiFlexGrid, {
    gutterSize: "xl",
    columns: 3
  }, cardNodes));
};

exports.ActionTypeMenu = ActionTypeMenu;