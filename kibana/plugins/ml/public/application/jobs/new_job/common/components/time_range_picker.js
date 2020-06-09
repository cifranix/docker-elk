"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimeRangePicker = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _ml = require("../../../../contexts/ml");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var WIDTH = '512px';

var TimeRangePicker = function TimeRangePicker(_ref) {
  var setTimeRange = _ref.setTimeRange,
      timeRange = _ref.timeRange;
  var mlContext = (0, _ml.useMlContext)();
  var dateFormat = mlContext.kibanaConfig.get('dateFormat');

  var _useState = (0, _react.useState)((0, _moment.default)(timeRange.start)),
      _useState2 = _slicedToArray(_useState, 2),
      startMoment = _useState2[0],
      setStartMoment = _useState2[1];

  var _useState3 = (0, _react.useState)((0, _moment.default)(timeRange.end)),
      _useState4 = _slicedToArray(_useState3, 2),
      endMoment = _useState4[0],
      setEndMoment = _useState4[1];

  function handleChangeStart(date) {
    setStartMoment(date || undefined);
  }

  function handleChangeEnd(date) {
    setEndMoment(date || undefined);
  } // update the parent start and end if the timepicker changes


  (0, _react.useEffect)(function () {
    if (startMoment !== undefined && endMoment !== undefined) {
      setTimeRange({
        start: startMoment.valueOf(),
        end: endMoment.valueOf()
      });
    }
  }, [startMoment, endMoment]); // update our local start and end moment objects if
  // the parent start and end updates.
  // this happens if the use full data button is pressed.

  (0, _react.useEffect)(function () {
    setStartMoment((0, _moment.default)(timeRange.start));
    setEndMoment((0, _moment.default)(timeRange.end));
  }, [JSON.stringify(timeRange)]);
  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    style: {
      minWidth: WIDTH
    },
    "data-test-subj": "mlJobWizardDateRange"
  }, _react.default.createElement(_eui.EuiDatePickerRange, {
    fullWidth: true,
    startDateControl: _react.default.createElement(_eui.EuiDatePicker, {
      selected: startMoment,
      onChange: handleChangeStart,
      startDate: startMoment,
      endDate: endMoment,
      "aria-label": _i18n.i18n.translate('xpack.ml.newJob.wizard.timeRangeStep.timeRangePicker.startDateLabel', {
        defaultMessage: 'Start date'
      }),
      showTimeSelect: true,
      dateFormat: dateFormat,
      maxDate: endMoment
    }),
    endDateControl: _react.default.createElement(_eui.EuiDatePicker, {
      selected: endMoment,
      onChange: handleChangeEnd,
      startDate: startMoment,
      endDate: endMoment,
      "aria-label": _i18n.i18n.translate('xpack.ml.newJob.wizard.timeRangeStep.timeRangePicker.endDateLabel', {
        defaultMessage: 'End date'
      }),
      showTimeSelect: true,
      dateFormat: dateFormat,
      minDate: startMoment
    })
  })));
};

exports.TimeRangePicker = TimeRangePicker;