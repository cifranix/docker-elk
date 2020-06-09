"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.availableTextScales = exports.LogViewConfiguration = exports.useLogViewConfiguration = void 0;

var _constate = _interopRequireDefault(require("constate"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useLogViewConfiguration = function useLogViewConfiguration() {
  // text scale
  var _useState = (0, _react.useState)('medium'),
      _useState2 = _slicedToArray(_useState, 2),
      textScale = _useState2[0],
      setTextScale = _useState2[1]; // text wrap


  var _useState3 = (0, _react.useState)(true),
      _useState4 = _slicedToArray(_useState3, 2),
      textWrap = _useState4[0],
      setTextWrap = _useState4[1];

  return {
    availableTextScales: availableTextScales,
    setTextScale: setTextScale,
    setTextWrap: setTextWrap,
    textScale: textScale,
    textWrap: textWrap
  };
};

exports.useLogViewConfiguration = useLogViewConfiguration;
var LogViewConfiguration = (0, _constate.default)(useLogViewConfiguration);
/**
 * constants
 */

exports.LogViewConfiguration = LogViewConfiguration;
var availableTextScales = ['large', 'medium', 'small'];
exports.availableTextScales = availableTextScales;