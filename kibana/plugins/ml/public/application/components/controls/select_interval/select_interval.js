"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectInterval = exports.useTableInterval = void 0;

var _react = _interopRequireDefault(require("react"));

var _eui = require("@elastic/eui");

var _i18n = require("@kbn/i18n");

var _url_state = require("../../../util/url_state");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var OPTIONS = [{
  value: 'auto',
  text: _i18n.i18n.translate('xpack.ml.controls.selectInterval.autoLabel', {
    defaultMessage: 'Auto'
  })
}, {
  value: 'hour',
  text: _i18n.i18n.translate('xpack.ml.controls.selectInterval.hourLabel', {
    defaultMessage: '1 hour'
  })
}, {
  value: 'day',
  text: _i18n.i18n.translate('xpack.ml.controls.selectInterval.dayLabel', {
    defaultMessage: '1 day'
  })
}, {
  value: 'second',
  text: _i18n.i18n.translate('xpack.ml.controls.selectInterval.showAllLabel', {
    defaultMessage: 'Show all'
  })
}];

function optionValueToInterval(value) {
  // Builds the corresponding interval object with the required display and val properties
  // from the specified value.
  var option = OPTIONS.find(function (opt) {
    return opt.value === value;
  }); // Default to auto if supplied value doesn't map to one of the options.

  var interval = {
    display: OPTIONS[0].text,
    val: OPTIONS[0].value
  };

  if (option !== undefined) {
    interval = {
      display: option.text,
      val: option.value
    };
  }

  return interval;
}

var TABLE_INTERVAL_DEFAULT = optionValueToInterval('auto');
var TABLE_INTERVAL_APP_STATE_NAME = 'mlSelectInterval';

var useTableInterval = function useTableInterval() {
  var _useUrlState = (0, _url_state.useUrlState)('_a'),
      _useUrlState2 = _slicedToArray(_useUrlState, 2),
      appState = _useUrlState2[0],
      setAppState = _useUrlState2[1];

  return [appState && appState[TABLE_INTERVAL_APP_STATE_NAME] || TABLE_INTERVAL_DEFAULT, function (d) {
    return setAppState(TABLE_INTERVAL_APP_STATE_NAME, d);
  }];
};

exports.useTableInterval = useTableInterval;

var SelectInterval = function SelectInterval() {
  var _useTableInterval = useTableInterval(),
      _useTableInterval2 = _slicedToArray(_useTableInterval, 2),
      interval = _useTableInterval2[0],
      setInterval = _useTableInterval2[1];

  var onChange = function onChange(e) {
    setInterval(optionValueToInterval(e.target.value));
  };

  return _react.default.createElement(_eui.EuiSelect, {
    options: OPTIONS,
    className: "ml-select-interval",
    value: interval.val,
    onChange: onChange
  });
};

exports.SelectInterval = SelectInterval;