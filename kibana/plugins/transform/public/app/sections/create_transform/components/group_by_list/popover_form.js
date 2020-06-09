"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIntervalValid = isIntervalValid;
exports.PopoverForm = void 0;

var _react = _interopRequireWildcard(require("react"));

var _i18n = require("@kbn/i18n");

var _eui = require("@elastic/eui");

var _common = require("../../../../../../common/types/common");

var _common2 = require("../../../../common");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function isIntervalValid(interval, intervalType) {
  if (interval !== '' && interval !== undefined) {
    if (intervalType === _common2.PIVOT_SUPPORTED_GROUP_BY_AGGS.HISTOGRAM) {
      if (!_common2.histogramIntervalFormatRegex.test(interval)) {
        return false;
      }

      if (parseFloat(interval) === 0 && parseInt(interval, 10) === 0) {
        return false;
      }

      return true;
    } else if (intervalType === _common2.PIVOT_SUPPORTED_GROUP_BY_AGGS.DATE_HISTOGRAM) {
      if (!_common2.dateHistogramIntervalFormatRegex.test(interval)) {
        return false;
      }

      var timeUnitMatch = interval.match(_common2.dateHistogramIntervalFormatRegex);

      if (timeUnitMatch !== null && Array.isArray(timeUnitMatch) && timeUnitMatch.length === 2) {
        var timeUnit = timeUnitMatch[1];
        var intervalNum = parseInt(interval.replace(timeUnit, ''), 10);

        if ((timeUnit === 'w' || timeUnit === 'M' || timeUnit === 'y') && intervalNum > 1) {
          return false;
        }
      }

      return true;
    }
  }

  return false;
}

function getDefaultInterval(defaultData) {
  if ((0, _common2.isGroupByDateHistogram)(defaultData)) {
    return defaultData.calendar_interval;
  } else if ((0, _common2.isGroupByHistogram)(defaultData)) {
    return defaultData.interval;
  }

  return undefined;
}

var PopoverForm = function PopoverForm(_ref) {
  var defaultData = _ref.defaultData,
      otherAggNames = _ref.otherAggNames,
      onChange = _ref.onChange,
      options = _ref.options;
  var isUnsupportedAgg = !(0, _common2.isPivotGroupByConfigWithUiSupport)(defaultData);

  var _useState = (0, _react.useState)(defaultData.agg),
      _useState2 = _slicedToArray(_useState, 2),
      agg = _useState2[0],
      setAgg = _useState2[1];

  var _useState3 = (0, _react.useState)(defaultData.aggName),
      _useState4 = _slicedToArray(_useState3, 2),
      aggName = _useState4[0],
      setAggName = _useState4[1];

  var _useState5 = (0, _react.useState)((0, _common2.isPivotGroupByConfigWithUiSupport)(defaultData) ? defaultData.field : ''),
      _useState6 = _slicedToArray(_useState5, 2),
      field = _useState6[0],
      setField = _useState6[1];

  var _useState7 = (0, _react.useState)(getDefaultInterval(defaultData)),
      _useState8 = _slicedToArray(_useState7, 2),
      interval = _useState8[0],
      setInterval = _useState8[1];

  function getUpdatedItem() {
    var updatedItem = _objectSpread({}, defaultData, {
      agg: agg,
      aggName: aggName,
      field: field
    });

    if ((0, _common2.isGroupByHistogram)(updatedItem) && interval !== undefined) {
      updatedItem.interval = interval;
    } else if ((0, _common2.isGroupByDateHistogram)(updatedItem) && interval !== undefined) {
      updatedItem.calendar_interval = interval;
    } // Casting to PivotGroupByConfig because TS would otherwise complain about the
    // PIVOT_SUPPORTED_GROUP_BY_AGGS type for `agg`.


    return updatedItem;
  }

  var availableFields = [];
  var availableAggs = [];

  if (!isUnsupportedAgg) {
    var optionsArr = (0, _common.dictionaryToArray)(options);
    optionsArr.filter(function (o) {
      return o.agg === defaultData.agg;
    }).forEach(function (o) {
      availableFields.push({
        text: o.field
      });
    });
    optionsArr.filter(function (o) {
      return (0, _common2.isPivotGroupByConfigWithUiSupport)(defaultData) && o.field === defaultData.field;
    }).forEach(function (o) {
      availableAggs.push({
        text: o.agg
      });
    });
  }

  var aggNameError = '';
  var validAggName = (0, _common2.isAggName)(aggName);

  if (!validAggName) {
    aggNameError = _i18n.i18n.translate('xpack.transform.groupBy.popoverForm.aggNameInvalidCharError', {
      defaultMessage: 'Invalid name. The characters "[", "]", and ">" are not allowed and the name must not start or end with a space character.'
    });
  }

  if (validAggName) {
    validAggName = !otherAggNames.includes(aggName);
    aggNameError = _i18n.i18n.translate('xpack.transform.groupBy.popoverForm.aggNameAlreadyUsedError', {
      defaultMessage: 'Another group by configuration already uses that name.'
    });
  }

  var validInterval = ((0, _common2.isGroupByDateHistogram)(defaultData) || (0, _common2.isGroupByHistogram)(defaultData)) && isIntervalValid(interval, defaultData.agg);
  var formValid = validAggName;

  if (formValid && ((0, _common2.isGroupByDateHistogram)(defaultData) || (0, _common2.isGroupByHistogram)(defaultData))) {
    formValid = isIntervalValid(interval, defaultData.agg);
  }

  return _react.default.createElement(_eui.EuiForm, {
    style: {
      width: '300px'
    }
  }, _react.default.createElement(_eui.EuiFormRow, {
    error: !validAggName && [aggNameError],
    isInvalid: !validAggName,
    helpText: isUnsupportedAgg ? _i18n.i18n.translate('xpack.transform.groupBy.popoverForm.unsupportedGroupByHelpText', {
      defaultMessage: 'Only the group_by name can be edited in this form. Please use the advanced editor to edit the other parts of the group_by configuration.'
    }) : '',
    label: _i18n.i18n.translate('xpack.transform.groupBy.popoverForm.nameLabel', {
      defaultMessage: 'Group by name'
    })
  }, _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: aggName,
    isInvalid: !validAggName,
    onChange: function onChange(e) {
      return setAggName(e.target.value);
    }
  })), availableAggs.length > 0 && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.groupby.popoverForm.aggLabel', {
      defaultMessage: 'Aggregation'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    options: availableAggs,
    value: agg,
    onChange: function onChange(e) {
      return setAgg(e.target.value);
    }
  })), availableFields.length > 0 && _react.default.createElement(_eui.EuiFormRow, {
    label: _i18n.i18n.translate('xpack.transform.groupBy.popoverForm.fieldLabel', {
      defaultMessage: 'Field'
    })
  }, _react.default.createElement(_eui.EuiSelect, {
    options: availableFields,
    value: field,
    onChange: function onChange(e) {
      return setField(e.target.value);
    }
  })), ((0, _common2.isGroupByDateHistogram)(defaultData) || (0, _common2.isGroupByHistogram)(defaultData)) && _react.default.createElement(_eui.EuiFormRow, {
    error: !validInterval && [_i18n.i18n.translate('xpack.transform.groupBy.popoverForm.intervalError', {
      defaultMessage: 'Invalid interval.'
    })],
    isInvalid: !validInterval,
    label: _i18n.i18n.translate('xpack.transform.groupBy.popoverForm.intervalLabel', {
      defaultMessage: 'Interval'
    })
  }, _react.default.createElement(_react.Fragment, null, (0, _common2.isGroupByHistogram)(defaultData) && _react.default.createElement(_eui.EuiFieldText, {
    defaultValue: interval,
    isInvalid: !validInterval,
    onChange: function onChange(e) {
      return setInterval(e.target.value);
    }
  }), (0, _common2.isGroupByDateHistogram)(defaultData) && _react.default.createElement(_eui.EuiSelect, {
    options: [{
      value: '1m',
      text: '1m'
    }, {
      value: '1h',
      text: '1h'
    }, {
      value: '1d',
      text: '1d'
    }, {
      value: '1w',
      text: '1w'
    }, {
      value: '1M',
      text: '1M'
    }, {
      value: '1q',
      text: '1q'
    }, {
      value: '1y',
      text: '1y'
    }],
    value: interval,
    onChange: function onChange(e) {
      return setInterval(e.target.value);
    }
  }))), isUnsupportedAgg && _react.default.createElement(_react.Fragment, null, _react.default.createElement(_eui.EuiSpacer, {
    size: "m"
  }), _react.default.createElement(_eui.EuiCodeEditor, {
    mode: "json",
    theme: "textmate",
    width: "100%",
    height: "200px",
    value: JSON.stringify((0, _common2.getEsAggFromGroupByConfig)(defaultData), null, 2),
    setOptions: {
      fontSize: '12px',
      showLineNumbers: false
    },
    isReadOnly: true,
    "aria-label": "Read only code editor"
  })), _react.default.createElement(_eui.EuiFormRow, {
    hasEmptyLabelSpace: true
  }, _react.default.createElement(_eui.EuiButton, {
    isDisabled: !formValid,
    onClick: function onClick() {
      return onChange(getUpdatedItem());
    }
  }, _i18n.i18n.translate('xpack.transform.groupBy.popoverForm.submitButtonLabel', {
    defaultMessage: 'Apply'
  }))));
};

exports.PopoverForm = PopoverForm;