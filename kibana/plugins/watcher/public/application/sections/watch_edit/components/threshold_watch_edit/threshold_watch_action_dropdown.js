"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatchActionsDropdown = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _action = require("../../../../models/action");

var _constants = require("../../../../../../common/constants");

var _watch_context = require("../../watch_context");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var disabledMessage = _i18n.i18n.translate('xpack.watcher.sections.watchEdit.actions.disabledOptionLabel', {
  defaultMessage: 'Disabled. Configure your elasticsearch.yml.'
});

var WatchActionsDropdown = function WatchActionsDropdown(_ref) {
  var settings = _ref.settings,
      isLoading = _ref.isLoading;

  var _useContext = (0, _react.useContext)(_watch_context.WatchContext),
      addAction = _useContext.addAction;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setIsPopOverOpen = _useState2[1];

  var allActionTypes = _action.Action.getActionTypes();

  var actions = Object.entries(allActionTypes).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        type = _ref3[0],
        _ref3$ = _ref3[1],
        typeName = _ref3$.typeName,
        iconClass = _ref3$.iconClass,
        selectMessage = _ref3$.selectMessage;

    var isEnabled = settings && settings.actionTypes && settings.actionTypes[type] && typeof settings.actionTypes[type].enabled !== 'undefined' ? settings.actionTypes[type].enabled : true;
    return {
      type: type,
      typeName: typeName,
      iconClass: iconClass,
      selectMessage: selectMessage,
      isEnabled: isEnabled
    };
  });

  var button = _react.default.createElement(_eui.EuiButton, {
    "data-test-subj": "addWatchActionButton",
    iconType: "arrowDown",
    iconSide: "right",
    onClick: function onClick() {
      return setIsPopOverOpen(!isPopoverOpen);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.watcher.sections.watchEdit.actions.addActionButtonLabel",
    defaultMessage: "Add action"
  }));

  return _react.default.createElement(_eui.EuiPopover, {
    id: "watchActionPanel",
    button: button,
    isOpen: isPopoverOpen,
    closePopover: function closePopover() {
      return setIsPopOverOpen(false);
    },
    panelPaddingSize: "none",
    anchorPosition: "downLeft"
  }, _react.default.createElement(_eui.EuiContextMenuPanel, {
    items: actions.map(function (action, index) {
      var isActionDisabled = action.type === _constants.ACTION_TYPES.EMAIL && !action.isEnabled; // Currently can only fully verify email action

      var description = isActionDisabled ? disabledMessage : action.selectMessage;
      return _react.default.createElement(_eui.EuiContextMenuItem, {
        key: "".concat(action.type, "-").concat(index),
        disabled: isActionDisabled,
        "data-test-subj": "".concat(action.type, "ActionButton"),
        onClick: function onClick() {
          addAction({
            type: action.type,
            defaults: {
              isNew: true
            }
          });
          setIsPopOverOpen(false);
        }
      }, _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
        grow: false,
        className: "watcherThresholdWatchActionContextMenuItem"
      }, _react.default.createElement(_eui.EuiIcon, {
        type: action.iconClass
      })), _react.default.createElement(_eui.EuiFlexItem, {
        grow: false
      }, _react.default.createElement("strong", null, action.typeName), _react.default.createElement(_eui.EuiSpacer, {
        size: "xs"
      }), _react.default.createElement(_eui.EuiText, {
        size: "s"
      }, _react.default.createElement("p", null, description)))));
    })
  }));
};

exports.WatchActionsDropdown = WatchActionsDropdown;