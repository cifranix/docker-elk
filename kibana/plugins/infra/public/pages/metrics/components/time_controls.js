"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsTimeControls = void 0;

var _eui = require("@elastic/eui");

var _react = _interopRequireWildcard(require("react"));

var _public = require("../../../../../observability/public");

var _use_kibana_ui_setting = require("../../../utils/use_kibana_ui_setting");

var _map_timepicker_quickranges_to_datepicker_ranges = require("../../../utils/map_timepicker_quickranges_to_datepicker_ranges");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  max-width: 750px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MetricsTimeControls = function MetricsTimeControls(props) {
  var _useKibanaUiSetting = (0, _use_kibana_ui_setting.useKibanaUiSetting)('timepicker:quickRanges'),
      _useKibanaUiSetting2 = _slicedToArray(_useKibanaUiSetting, 1),
      timepickerQuickRanges = _useKibanaUiSetting2[0];

  var onChangeTimeRange = props.onChangeTimeRange,
      onRefresh = props.onRefresh,
      currentTimeRange = props.currentTimeRange,
      isLiveStreaming = props.isLiveStreaming,
      refreshInterval = props.refreshInterval,
      setAutoReload = props.setAutoReload,
      setRefreshInterval = props.setRefreshInterval;
  var commonlyUsedRanges = (0, _map_timepicker_quickranges_to_datepicker_ranges.mapKibanaQuickRangesToDatePickerRanges)(timepickerQuickRanges);
  var handleTimeChange = (0, _react.useCallback)(function (_ref) {
    var start = _ref.start,
        end = _ref.end;
    onChangeTimeRange({
      from: start,
      to: end,
      interval: '>=1m'
    });
  }, [onChangeTimeRange]);
  var handleRefreshChange = (0, _react.useCallback)(function (_ref2) {
    var isPaused = _ref2.isPaused,
        _refreshInterval = _ref2.refreshInterval;

    if (isPaused) {
      setAutoReload(false);
    } else {
      setRefreshInterval(_refreshInterval);
      setAutoReload(true);
    }
  }, [setAutoReload, setRefreshInterval]);
  return _react.default.createElement(MetricsTimeControlsContainer, null, _react.default.createElement(_eui.EuiSuperDatePicker, {
    start: currentTimeRange.from,
    end: currentTimeRange.to,
    isPaused: !isLiveStreaming,
    refreshInterval: refreshInterval ? refreshInterval : 0,
    onTimeChange: handleTimeChange,
    onRefreshChange: handleRefreshChange,
    onRefresh: onRefresh,
    commonlyUsedRanges: commonlyUsedRanges
  }));
};

exports.MetricsTimeControls = MetricsTimeControls;

var MetricsTimeControlsContainer = _public.euiStyled.div(_templateObject());