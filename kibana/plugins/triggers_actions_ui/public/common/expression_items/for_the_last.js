"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForLastExpression = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _get_time_unit_label = require("../lib/get_time_unit_label");

var _get_time_options = require("../lib/get_time_options");

var _components = require("./components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ForLastExpression = function ForLastExpression(_ref) {
  var timeWindowSize = _ref.timeWindowSize,
      _ref$timeWindowUnit = _ref.timeWindowUnit,
      timeWindowUnit = _ref$timeWindowUnit === void 0 ? 's' : _ref$timeWindowUnit,
      errors = _ref.errors,
      onChangeWindowSize = _ref.onChangeWindowSize,
      onChangeWindowUnit = _ref.onChangeWindowUnit,
      popupPosition = _ref.popupPosition;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      alertDurationPopoverOpen = _useState2[0],
      setAlertDurationPopoverOpen = _useState2[1];

  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_eui.EuiExpression, {
      description: _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.forTheLast.descriptionLabel', {
        defaultMessage: 'for the last'
      }),
      value: "".concat(timeWindowSize, " ").concat((0, _get_time_unit_label.getTimeUnitLabel)(timeWindowUnit, (timeWindowSize !== null && timeWindowSize !== void 0 ? timeWindowSize : '').toString())),
      isActive: alertDurationPopoverOpen,
      onClick: function onClick() {
        setAlertDurationPopoverOpen(true);
      },
      color: timeWindowSize ? 'secondary' : 'danger'
    }),
    isOpen: alertDurationPopoverOpen,
    closePopover: function closePopover() {
      setAlertDurationPopoverOpen(false);
    },
    ownFocus: true,
    withTitle: true,
    anchorPosition: popupPosition !== null && popupPosition !== void 0 ? popupPosition : 'downLeft'
  }, _react.default.createElement("div", null, _react.default.createElement(_components.ClosablePopoverTitle, {
    onClose: function onClose() {
      return setAlertDurationPopoverOpen(false);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.common.expressionItems.forTheLast.popoverTitle",
    defaultMessage: "For the last"
  })), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    isInvalid: errors.timeWindowSize.length > 0 && timeWindowSize !== undefined,
    error: errors.timeWindowSize
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    "data-test-subj": "timeWindowSizeNumber",
    isInvalid: errors.timeWindowSize.length > 0 && timeWindowSize !== undefined,
    min: 0,
    value: timeWindowSize || '',
    onChange: function onChange(e) {
      var value = e.target.value;
      var timeWindowSizeVal = value !== '' ? parseInt(value, 10) : undefined;
      onChangeWindowSize(timeWindowSizeVal);
    }
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    "data-test-subj": "timeWindowUnitSelect",
    value: timeWindowUnit,
    onChange: function onChange(e) {
      onChangeWindowUnit(e.target.value);
    },
    options: (0, _get_time_options.getTimeOptions)(timeWindowSize !== null && timeWindowSize !== void 0 ? timeWindowSize : 1)
  })))));
};

exports.ForLastExpression = ForLastExpression;