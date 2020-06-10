"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SingleMetricView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _eui = require("@elastic/eui");

var _metric_selection = require("./metric_selection");

var _metric_selection_summary = require("./metric_selection_summary");

var _settings = require("./settings");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SingleMetricView = function SingleMetricView(_ref) {
  var isActive = _ref.isActive,
      setCanProceed = _ref.setCanProceed;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      metricsValid = _useState2[0],
      setMetricValid = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      settingsValid = _useState4[0],
      setSettingsValid = _useState4[1];

  (0, _react.useEffect)(function () {
    if (typeof setCanProceed === 'function') {
      setCanProceed(metricsValid && settingsValid);
    }
  }, [metricsValid, settingsValid]);
  return _react.default.createElement(_react.Fragment, null, isActive === false ? _react.default.createElement(_metric_selection_summary.SingleMetricDetectorsSummary, null) : _react.default.createElement(_react.Fragment, null, _react.default.createElement(_metric_selection.SingleMetricDetectors, {
    setIsValid: setMetricValid
  }), metricsValid && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiHorizontalRule, {
    margin: "l"
  }), _react.default.createElement(_settings.SingleMetricSettings, {
    setIsValid: setSettingsValid
  }))));
};

exports.SingleMetricView = SingleMetricView;