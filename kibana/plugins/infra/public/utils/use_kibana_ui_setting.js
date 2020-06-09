"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKibanaUiSetting = useKibanaUiSetting;

var _react = require("react");

var _public = require("../../../../../src/plugins/kibana_react/public");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useKibanaUiSetting(key, defaultValue) {
  var _useUiSetting$ = (0, _public.useUiSetting$)(key),
      _useUiSetting$2 = _slicedToArray(_useUiSetting$, 2),
      uiSetting = _useUiSetting$2[0],
      setUiSetting = _useUiSetting$2[1];

  var uiSettingValue = (0, _react.useMemo)(function () {
    return uiSetting ? uiSetting : defaultValue;
  }, [uiSetting, defaultValue]);
  return [uiSettingValue, setUiSetting];
}