"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThresholdExpression = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _constants = require("../constants");

var _components = require("./components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ThresholdExpression = function ThresholdExpression(_ref) {
  var thresholdComparator = _ref.thresholdComparator,
      errors = _ref.errors,
      onChangeSelectedThresholdComparator = _ref.onChangeSelectedThresholdComparator,
      onChangeSelectedThreshold = _ref.onChangeSelectedThreshold,
      customComparators = _ref.customComparators,
      _ref$threshold = _ref.threshold,
      threshold = _ref$threshold === void 0 ? [] : _ref$threshold,
      popupPosition = _ref.popupPosition;
  var comparators = customComparators !== null && customComparators !== void 0 ? customComparators : _constants.builtInComparators;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      alertThresholdPopoverOpen = _useState2[0],
      setAlertThresholdPopoverOpen = _useState2[1];

  var andThresholdText = _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.threshold.andLabel', {
    defaultMessage: 'AND'
  });

  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_eui.EuiExpression, {
      "data-test-subj": "thresholdPopover",
      description: comparators[thresholdComparator].text,
      value: (threshold || []).slice(0, comparators[thresholdComparator].requiredValues).join(" ".concat(andThresholdText, " ")),
      isActive: Boolean(alertThresholdPopoverOpen || errors.threshold0 && errors.threshold0.length || errors.threshold1 && errors.threshold1.length),
      onClick: function onClick() {
        setAlertThresholdPopoverOpen(true);
      },
      color: errors.threshold0 && errors.threshold0.length || errors.threshold1 && errors.threshold1.length ? 'danger' : 'secondary'
    }),
    isOpen: alertThresholdPopoverOpen,
    closePopover: function closePopover() {
      setAlertThresholdPopoverOpen(false);
    },
    ownFocus: true,
    withTitle: true,
    anchorPosition: popupPosition !== null && popupPosition !== void 0 ? popupPosition : 'downLeft'
  }, _react.default.createElement("div", null, _react.default.createElement(_components.ClosablePopoverTitle, {
    onClose: function onClose() {
      return setAlertThresholdPopoverOpen(false);
    }
  }, _react.default.createElement(_react.default.Fragment, null, comparators[thresholdComparator].text)), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    "data-test-subj": "comparatorOptionsComboBox",
    value: thresholdComparator,
    onChange: function onChange(e) {
      onChangeSelectedThresholdComparator(e.target.value);
      var thresholdValues = threshold.slice(0, comparators[e.target.value].requiredValues);
      onChangeSelectedThreshold(thresholdValues);
    },
    options: Object.values(comparators).map(function (_ref2) {
      var text = _ref2.text,
          value = _ref2.value;
      return {
        text: text,
        value: value
      };
    })
  })), Array.from(Array(comparators[thresholdComparator].requiredValues)).map(function (_notUsed, i) {
    return _react.default.createElement(_react.Fragment, {
      key: "threshold".concat(i)
    }, i > 0 ? _react.default.createElement(_eui.EuiFlexItem, {
      grow: false,
      className: "watcherThresholdWatchInBetweenComparatorText"
    }, _react.default.createElement(_eui.EuiText, null, andThresholdText)) : null, _react.default.createElement(_eui.EuiFlexItem, {
      grow: false
    }, _react.default.createElement(_eui.EuiFormRow, {
      isInvalid: errors["threshold".concat(i)].length > 0 || !threshold[i],
      error: errors["threshold".concat(i)]
    }, _react.default.createElement(_eui.EuiFieldNumber, {
      "data-test-subj": "alertThresholdInput",
      min: 0,
      value: !threshold || threshold[i] === undefined ? '' : threshold[i],
      isInvalid: errors["threshold".concat(i)].length > 0 || !threshold[i],
      onChange: function onChange(e) {
        var value = e.target.value;
        var thresholdVal = value !== '' ? parseFloat(value) : undefined;

        var newThreshold = _toConsumableArray(threshold);

        if (thresholdVal !== undefined) {
          newThreshold[i] = thresholdVal;
        } else {
          delete newThreshold[i];
        }

        onChangeSelectedThreshold(newThreshold);
      }
    }))));
  }))));
};

exports.ThresholdExpression = ThresholdExpression;