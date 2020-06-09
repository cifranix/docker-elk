"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddMessageVariables = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

require("./add_message_variables.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AddMessageVariables = function AddMessageVariables(_ref) {
  var messageVariables = _ref.messageVariables,
      paramsProperty = _ref.paramsProperty,
      onSelectEventHandler = _ref.onSelectEventHandler;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVariablesPopoverOpen = _useState2[0],
      setIsVariablesPopoverOpen = _useState2[1];

  var getMessageVariables = function getMessageVariables() {
    return messageVariables === null || messageVariables === void 0 ? void 0 : messageVariables.map(function (variable, i) {
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        key: variable,
        "data-test-subj": "variableMenuButton-".concat(i),
        icon: "empty",
        onClick: function onClick() {
          onSelectEventHandler(variable);
          setIsVariablesPopoverOpen(false);
        }
      }, "{{".concat(variable, "}}"));
    });
  };

  var addVariableButtonTitle = _i18n.i18n.translate('xpack.triggersActionsUI.components.addMessageVariables.addVariableTitle', {
    defaultMessage: 'Add alert variable'
  });

  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_eui.EuiButtonIcon, {
      "data-test-subj": "".concat(paramsProperty, "AddVariableButton"),
      title: addVariableButtonTitle,
      onClick: function onClick() {
        return setIsVariablesPopoverOpen(true);
      },
      iconType: "indexOpen",
      "aria-label": _i18n.i18n.translate('xpack.triggersActionsUI.components.addMessageVariables.addVariablePopoverButton', {
        defaultMessage: 'Add variable'
      })
    }),
    isOpen: isVariablesPopoverOpen,
    closePopover: function closePopover() {
      return setIsVariablesPopoverOpen(false);
    },
    panelPaddingSize: "none",
    anchorPosition: "downLeft"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    className: "messageVariablesPanel",
    items: getMessageVariables()
  }));
};

exports.AddMessageVariables = AddMessageVariables;