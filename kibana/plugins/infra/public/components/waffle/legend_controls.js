"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LegendControls = void 0;

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _react = require("@kbn/i18n/react");

var _react2 = _interopRequireWildcard(require("react"));

var _public = require("../../../../observability/public");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: -20px;\n  right: 6px;\n  bottom: 0;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var LegendControls = function LegendControls(_ref) {
  var autoBounds = _ref.autoBounds,
      boundsOverride = _ref.boundsOverride,
      onChange = _ref.onChange,
      dataBounds = _ref.dataBounds;

  var _useState = (0, _react2.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverOpen = _useState2[0],
      setPopoverState = _useState2[1];

  var _useState3 = (0, _react2.useState)(autoBounds),
      _useState4 = _slicedToArray(_useState3, 2),
      draftAuto = _useState4[0],
      setDraftAuto = _useState4[1];

  var _useState5 = (0, _react2.useState)(autoBounds ? dataBounds : boundsOverride),
      _useState6 = _slicedToArray(_useState5, 2),
      draftBounds = _useState6[0],
      setDraftBounds = _useState6[1]; // should come from bounds prop


  var buttonComponent = _react2.default.createElement(_eui.EuiButtonIcon, {
    iconType: "gear",
    color: "text",
    "aria-label": _i18n.i18n.translate('xpack.infra.legendControls.buttonLabel', {
      defaultMessage: 'configure legend'
    }),
    onClick: function onClick() {
      return setPopoverState(true);
    }
  });

  var handleAutoChange = function handleAutoChange(e) {
    setDraftAuto(e.target.checked);
  };

  var createBoundsHandler = function createBoundsHandler(name) {
    return function (e) {
      var value = parseFloat(e.currentTarget.value);
      setDraftBounds(_objectSpread({}, draftBounds, _defineProperty({}, name, value)));
    };
  };

  var handlePopoverClose = function handlePopoverClose() {
    setPopoverState(false);
  };

  var handleApplyClick = function handleApplyClick() {
    onChange({
      auto: draftAuto,
      bounds: draftBounds
    });
  };

  var commited = draftAuto === autoBounds && boundsOverride.min === draftBounds.min && boundsOverride.max === draftBounds.max;
  var boundsValidRange = draftBounds.min < draftBounds.max;
  return _react2.default.createElement(ControlContainer, null, _react2.default.createElement(_eui.EuiPopover, {
    isOpen: isPopoverOpen,
    closePopover: handlePopoverClose,
    id: "legendControls",
    button: buttonComponent,
    withTitle: true
  }, _react2.default.createElement(_eui.EuiPopoverTitle, null, "Legend Options"), _react2.default.createElement(_eui.EuiForm, null, _react2.default.createElement(_eui.EuiFormRow, null, _react2.default.createElement(_eui.EuiSwitch, {
    name: "bounds",
    label: _i18n.i18n.translate('xpack.infra.legendControls.switchLabel', {
      defaultMessage: 'Auto calculate range'
    }),
    checked: draftAuto,
    onChange: handleAutoChange
  })), _react2.default.createElement(_eui.EuiSpacer, null), !boundsValidRange && _react2.default.createElement(_eui.EuiText, {
    color: "danger",
    grow: false,
    size: "s"
  }, _react2.default.createElement("p", null, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.legendControls.errorMessage",
    defaultMessage: "Min should be less than max"
  }))) || null, _react2.default.createElement(_eui.EuiFlexGroup, {
    style: {
      marginTop: 0
    }
  }, _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.infra.legendControls.minLabel', {
      defaultMessage: 'Min'
    }),
    isInvalid: !boundsValidRange
  }, _react2.default.createElement(_eui.EuiFieldNumber, {
    disabled: draftAuto,
    step: 0.1,
    value: isNaN(draftBounds.min) ? '' : draftBounds.min,
    isInvalid: !boundsValidRange,
    name: "legendMin",
    onChange: createBoundsHandler('min')
  }))), _react2.default.createElement(_eui.EuiFlexItem, null, _react2.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.infra.legendControls.maxLabel', {
      defaultMessage: 'Max'
    }),
    isInvalid: !boundsValidRange
  }, _react2.default.createElement(_eui.EuiFieldNumber, {
    disabled: draftAuto,
    step: 0.1,
    isInvalid: !boundsValidRange,
    value: isNaN(draftBounds.max) ? '' : draftBounds.max,
    name: "legendMax",
    onChange: createBoundsHandler('max')
  })))), _react2.default.createElement(_eui.EuiButton, {
    type: "submit",
    size: "s",
    fill: true,
    disabled: commited || !boundsValidRange,
    onClick: handleApplyClick
  }, _react2.default.createElement(_react.FormattedMessage, {
    id: "xpack.infra.legendControls.applyButton",
    defaultMessage: "Apply"
  })))));
};

exports.LegendControls = LegendControls;

var ControlContainer = _public.euiStyled.div(_templateObject());