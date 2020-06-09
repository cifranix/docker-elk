"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FielddataFrequencyFilterPercentage = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@kbn/i18n/react");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var FielddataFrequencyFilterPercentage = function FielddataFrequencyFilterPercentage(_ref) {
  var min = _ref.min,
      max = _ref.max;

  var onFrequencyFilterChange = function onFrequencyFilterChange(_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        minValue = _ref3[0],
        maxValue = _ref3[1];

    min.setValue(minValue);
    max.setValue(maxValue);
  };

  return _react.default.createElement(_eui.EuiFormRow, {
    fullWidth: true,
    label: _react.default.createElement(_react2.FormattedMessage, {
      id: "xpack.idxMgmt.mappingsEditor.fielddata.frequencyFilterPercentageFieldLabel",
      defaultMessage: "Percentage-based frequency range"
    })
  }, _react.default.createElement(_eui.EuiDualRange, {
    min: 0,
    max: 100,
    value: [min.value, max.value],
    onChange: onFrequencyFilterChange,
    showInput: "inputWithPopover" // @ts-ignore
    ,
    append: '%'
  }));
};

exports.FielddataFrequencyFilterPercentage = FielddataFrequencyFilterPercentage;