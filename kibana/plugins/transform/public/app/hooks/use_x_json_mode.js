"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useXJsonMode = exports.xJsonMode = void 0;

var _react = require("react");

var _shared_imports = require("../../shared_imports");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var xJsonMode = new _shared_imports.XJsonMode();
exports.xJsonMode = xJsonMode;

var useXJsonMode = function useXJsonMode(json) {
  var _useState = (0, _react.useState)((0, _shared_imports.expandLiteralStrings)(json)),
      _useState2 = _slicedToArray(_useState, 2),
      xJson = _useState2[0],
      setXJson = _useState2[1];

  return {
    xJson: xJson,
    setXJson: setXJson,
    xJsonMode: xJsonMode,
    convertToJson: _shared_imports.collapseLiteralStrings
  };
};

exports.useXJsonMode = useXJsonMode;