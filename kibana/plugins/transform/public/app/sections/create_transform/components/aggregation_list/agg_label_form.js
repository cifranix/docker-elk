"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggLabelForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _popover_form = require("./popover_form");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var AggLabelForm = function AggLabelForm(_ref) {
  var deleteHandler = _ref.deleteHandler,
      item = _ref.item,
      otherAggNames = _ref.otherAggNames,
      onChange = _ref.onChange,
      options = _ref.options;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isPopoverVisible = _useState2[0],
      setPopoverVisibility = _useState2[1];

  function update(updateItem) {
    onChange(_objectSpread({}, updateItem));
    setPopoverVisibility(false);
  }

  return _react.default.createElement(_eui.EuiFlexGroup, {
    alignItems: "center",
    gutterSize: "s",
    responsive: false
  }, _react.default.createElement(_eui.EuiFlexItem, {
    className: "transform__AggregationLabel--text"
  }, _react.default.createElement("span", {
    className: "eui-textTruncate",
    "data-test-subj": "transformAggregationEntryLabel"
  }, item.aggName)), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "transform__GroupByLabel--button"
  }, _react.default.createElement(_eui.EuiPopover, {
    id: "transformFormPopover",
    ownFocus: true,
    button: _react.default.createElement(_eui.EuiButtonIcon, {
      "aria-label": _i18n.i18n.translate('xpack.transform.aggLabelForm.editAggAriaLabel', {
        defaultMessage: 'Edit aggregation'
      }),
      size: "s",
      iconType: "pencil",
      onClick: function onClick() {
        return setPopoverVisibility(!isPopoverVisible);
      },
      "data-test-subj": "transformAggregationEntryEditButton"
    }),
    isOpen: isPopoverVisible,
    closePopover: function closePopover() {
      return setPopoverVisibility(false);
    }
  }, _react.default.createElement(_popover_form.PopoverForm, {
    defaultData: item,
    onChange: update,
    otherAggNames: otherAggNames,
    options: options
  }))), _react.default.createElement(_eui.EuiFlexItem, {
    grow: false,
    className: "transform__GroupByLabel--button"
  }, _react.default.createElement(_eui.EuiButtonIcon, {
    "aria-label": _i18n.i18n.translate('xpack.transform.aggLabelForm.deleteItemAriaLabel', {
      defaultMessage: 'Delete item'
    }),
    size: "s",
    iconType: "cross",
    onClick: function onClick() {
      return deleteHandler(item.aggName);
    },
    "data-test-subj": "transformAggregationEntryDeleteButton"
  })));
};

exports.AggLabelForm = AggLabelForm;