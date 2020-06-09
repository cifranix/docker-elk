"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectLimit = exports.useSwimlaneLimit = exports.defaultLimit = exports.limit$ = void 0;

var _react = _interopRequireDefault(require("react"));

var _useObservable = _interopRequireDefault(require("react-use/lib/useObservable"));

var _rxjs = require("rxjs");

var _eui = require("@elastic/eui");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var limitOptions = [5, 10, 25, 50];
var euiOptions = limitOptions.map(function (limit) {
  return {
    value: limit,
    text: "".concat(limit)
  };
});
var limit$ = new _rxjs.Subject();
exports.limit$ = limit$;
var defaultLimit = limitOptions[1];
exports.defaultLimit = defaultLimit;

var useSwimlaneLimit = function useSwimlaneLimit() {
  var limit = (0, _useObservable.default)(limit$, defaultLimit);
  return [limit, function (newLimit) {
    return limit$.next(newLimit);
  }];
};

exports.useSwimlaneLimit = useSwimlaneLimit;

var SelectLimit = function SelectLimit() {
  var _useSwimlaneLimit = useSwimlaneLimit(),
      _useSwimlaneLimit2 = _slicedToArray(_useSwimlaneLimit, 2),
      limit = _useSwimlaneLimit2[0],
      setLimit = _useSwimlaneLimit2[1];

  function onChange(e) {
    setLimit(parseInt(e.target.value, 10));
  }

  return _react.default.createElement(_eui.EuiSelect, {
    options: euiOptions,
    onChange: onChange,
    value: limit
  });
};

exports.SelectLimit = SelectLimit;