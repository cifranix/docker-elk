"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OfExpression = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

var _constants = require("../constants");

var _components = require("./components");

require("./of.scss");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OfExpression = function OfExpression(_ref) {
  var aggType = _ref.aggType,
      aggField = _ref.aggField,
      errors = _ref.errors,
      onChangeSelectedAggField = _ref.onChangeSelectedAggField,
      fields = _ref.fields,
      customAggTypesOptions = _ref.customAggTypesOptions,
      popupPosition = _ref.popupPosition;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      aggFieldPopoverOpen = _useState2[0],
      setAggFieldPopoverOpen = _useState2[1];

  var firstFieldOption = {
    text: _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.of.selectTimeFieldOptionLabel', {
      defaultMessage: 'Select a field'
    }),
    value: ''
  };
  var aggregationTypes = customAggTypesOptions !== null && customAggTypesOptions !== void 0 ? customAggTypesOptions : _constants.builtInAggregationTypes;
  var availablefieldsOptions = fields.reduce(function (esFieldOptions, field) {
    if (aggregationTypes[aggType].validNormalizedTypes.includes(field.normalizedType)) {
      esFieldOptions.push({
        label: field.name
      });
    }

    return esFieldOptions;
  }, []);
  return _react.default.createElement(_eui.EuiPopover, {
    id: "aggFieldPopover",
    button: _react.default.createElement(_eui.EuiExpression, {
      description: _i18n.i18n.translate('xpack.triggersActionsUI.common.expressionItems.of.buttonLabel', {
        defaultMessage: 'of'
      }),
      value: aggField || firstFieldOption.text,
      isActive: aggFieldPopoverOpen || !aggField,
      onClick: function onClick() {
        setAggFieldPopoverOpen(true);
      },
      color: aggField ? 'secondary' : 'danger'
    }),
    isOpen: aggFieldPopoverOpen,
    closePopover: function closePopover() {
      setAggFieldPopoverOpen(false);
    },
    withTitle: true,
    anchorPosition: popupPosition !== null && popupPosition !== void 0 ? popupPosition : 'downRight',
    zIndex: 8000
  }, _react.default.createElement("div", null, _react.default.createElement(_components.ClosablePopoverTitle, {
    onClose: function onClose() {
      return setAggFieldPopoverOpen(false);
    }
  }, _react.default.createElement(_react2.FormattedMessage, {
    id: "xpack.triggersActionsUI.common.expressionItems.of.popoverTitle",
    defaultMessage: "of"
  })), _react.default.createElement(_eui.EuiFlexGroup, null, _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "actOf__aggFieldContainer"
  }, _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    isInvalid: errors.aggField.length > 0 && aggField !== undefined,
    error: errors.aggField
  }, _react.default.createElement(_eui.EuiComboBox, {
    fullWidth: true,
    singleSelection: {
      asPlainText: true
    },
    "data-test-subj": "availablefieldsOptionsComboBox",
    isInvalid: errors.aggField.length > 0 && aggField !== undefined,
    placeholder: firstFieldOption.text,
    options: availablefieldsOptions,
    noSuggestions: !availablefieldsOptions.length,
    selectedOptions: aggField ? [{
      label: aggField
    }] : [],
    onChange: function onChange(selectedOptions) {
      onChangeSelectedAggField(selectedOptions.length === 1 ? selectedOptions[0].label : undefined);

      if (selectedOptions.length > 0) {
        setAggFieldPopoverOpen(false);
      }
    }
  }))))));
};

exports.OfExpression = OfExpression;