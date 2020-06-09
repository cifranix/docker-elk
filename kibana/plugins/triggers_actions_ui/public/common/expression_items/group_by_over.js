"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupByExpression = void 0;

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@kbn/i18n/react");

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _constants = require("../constants");

var _components = require("./components");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var GroupByExpression = function GroupByExpression(_ref) {
  var groupBy = _ref.groupBy,
      errors = _ref.errors,
      onChangeSelectedTermSize = _ref.onChangeSelectedTermSize,
      onChangeSelectedTermField = _ref.onChangeSelectedTermField,
      onChangeSelectedGroupBy = _ref.onChangeSelectedGroupBy,
      fields = _ref.fields,
      termSize = _ref.termSize,
      termField = _ref.termField,
      customGroupByTypes = _ref.customGroupByTypes,
      popupPosition = _ref.popupPosition;
  var groupByTypes = customGroupByTypes !== null && customGroupByTypes !== void 0 ? customGroupByTypes : _constants.builtInGroupByTypes;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      groupByPopoverOpen = _useState2[0],
      setGroupByPopoverOpen = _useState2[1];

  var MIN_TERM_SIZE = 1;
  var MAX_TERM_SIZE = 1000;
  var firstFieldOption = {
    text: _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.groupByType.timeFieldOptionLabel', {
      defaultMessage: 'Select a field'
    }),
    value: ''
  };
  return _react.default.createElement(_eui.EuiPopover, {
    button: _react.default.createElement(_eui.EuiExpression, {
      description: "".concat(groupByTypes[groupBy].sizeRequired ? _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.groupByType.groupedOverLabel', {
        defaultMessage: 'grouped over'
      }) : _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.groupByType.overLabel', {
        defaultMessage: 'over'
      })),
      value: "".concat(groupByTypes[groupBy].text, " ").concat(groupByTypes[groupBy].sizeRequired ? "".concat(termSize, " ").concat(termField ? "'".concat(termField, "'") : '') : ''),
      isActive: groupByPopoverOpen || groupBy === 'top' && !(termSize && termField),
      onClick: function onClick() {
        setGroupByPopoverOpen(true);
      },
      color: groupBy === 'all' || termSize && termField ? 'secondary' : 'danger'
    }),
    isOpen: groupByPopoverOpen,
    closePopover: function closePopover() {
      setGroupByPopoverOpen(false);
    },
    ownFocus: true,
    withTitle: true,
    anchorPosition: popupPosition !== null && popupPosition !== void 0 ? popupPosition : 'downRight'
  }, _react.default.createElement("div", null, _react.default.createElement(_components.ClosablePopoverTitle, {
    onClose: function onClose() {
      return setGroupByPopoverOpen(false);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.common.expressionItems.groupByType.overButtonLabel",
    defaultMessage: "over"
  })), _react.default.createElement(_eui.EuiFlexGroup, {
    justifyContent: "spaceBetween"
  }, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiSelect, {
    "data-test-subj": "overExpressionSelect",
    value: groupBy,
    onChange: function onChange(e) {
      if (groupByTypes[e.target.value].sizeRequired) {
        onChangeSelectedTermSize(MIN_TERM_SIZE);
        onChangeSelectedTermField('');
      } else {
        onChangeSelectedTermSize(undefined);
        onChangeSelectedTermField(undefined);
      }

      onChangeSelectedGroupBy(e.target.value);
    },
    options: Object.values(groupByTypes).map(function (_ref2) {
      var text = _ref2.text,
          value = _ref2.value;
      return {
        text: text,
        value: value
      };
    })
  })), groupByTypes[groupBy].sizeRequired ? _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    isInvalid: errors.termSize.length > 0,
    error: errors.termSize
  }, _react.default.createElement(_eui.EuiFieldNumber, {
    isInvalid: errors.termSize.length > 0,
    value: termSize || '',
    onChange: function onChange(e) {
      var value = e.target.value;
      var termSizeVal = value !== '' ? parseFloat(value) : undefined;
      onChangeSelectedTermSize(termSizeVal);
    },
    min: MIN_TERM_SIZE,
    max: MAX_TERM_SIZE
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false
  }, _react.default.createElement(_eui.EuiFormRow, {
    isInvalid: errors.termField.length > 0 && termField !== undefined,
    error: errors.termField
  }, _react.default.createElement(_eui.EuiSelect, {
    "data-test-subj": "fieldsExpressionSelect",
    value: termField,
    isInvalid: errors.termField.length > 0 && termField !== undefined,
    onChange: function onChange(e) {
      onChangeSelectedTermField(e.target.value);
    },
    options: fields.reduce(function (options, field) {
      if (groupByTypes[groupBy].validNormalizedTypes.includes(field.normalizedType)) {
        options.push({
          text: field.name,
          value: field.name
        });
      }

      return options;
    }, [firstFieldOption]),
    onBlur: function onBlur() {
      if (termField === undefined) {
        onChangeSelectedTermField('');
      }
    }
  })))) : null)));
};

exports.GroupByExpression = GroupByExpression;